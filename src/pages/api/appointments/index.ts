import type { APIRoute } from 'astro';
import { connectToDatabase } from '../../../lib/mongodb';
import { Appointment } from '../../../models/Appointment';
import { appointmentSchema } from '../../../lib/validators';
import { checkRateLimit } from '../../../lib/rateLimit';
import { sendEmail, getReceiptEmailHtml } from '../../../lib/email';

export const prerender = false;

// GET /api/appointments -> Get all appointments (Protected)
export const GET: APIRoute = async () => {
  try {
    await connectToDatabase();
    const appointments = await Appointment.find().sort({ createdAt: -1 });
    return new Response(JSON.stringify(appointments), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch appointments' }), { status: 500 });
  }
};

// POST /api/appointments -> Submit a new appointment form
export const POST: APIRoute = async ({ request, clientAddress }) => {
  const ip = clientAddress || request.headers.get('x-forwarded-for') || 'unknown';
  
  // Rate limit: 3 submissions per 1 hour
  if (!checkRateLimit(ip, 'appointment', 3, 60 * 60 * 1000)) {
    return new Response(JSON.stringify({ error: 'Too many requests. Please try again later.' }), { status: 429 });
  }

  try {
    // In Astro, form submissions might be formData or JSON. Let's handle both.
    let data;
    const contentType = request.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      data = await request.json();
    } else {
      const formData = await request.formData();
      data = Object.fromEntries(formData.entries());
    }

    const result = appointmentSchema.safeParse(data);

    if (!result.success) {
      return new Response(JSON.stringify({ error: 'Validation failed', details: result.error.errors }), { status: 400 });
    }

    await connectToDatabase();

    const newAppointment = new Appointment({
      ...result.data,
      preferredDate: result.data.date ? new Date(result.data.date) : undefined,
      preferredTime: result.data.time,
      status: 'pending',
    });

    await newAppointment.save();

    // Trigger email confirmation receipt
    if (result.data.email) {
      sendEmail({
        to: result.data.email,
        subject: 'Appointment Request Received - Orthodontics Align',
        html: getReceiptEmailHtml(
          result.data.name,
          result.data.service,
          result.data.date,
          result.data.time
        )
      }).catch(err => {
        console.error('Error sending receipt email:', err);
      });
    }

    return new Response(JSON.stringify({ success: true, message: 'Appointment requested successfully' }), { status: 201 });
  } catch (error) {
    console.error('Submission error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
};
