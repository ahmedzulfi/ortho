import type { APIRoute } from 'astro';
import { connectToDatabase } from '../../../lib/mongodb';
import { Appointment } from '../../../models/Appointment';
import { sendEmail, getConfirmationEmailHtml, getCancellationEmailHtml } from '../../../lib/email';

export const prerender = false;

// PATCH /api/appointments/[id] -> Update status or notes
export const PATCH: APIRoute = async ({ params, request }) => {
  const { id } = params;

  try {
    const body = await request.json();
    const { status, notes } = body;

    await connectToDatabase();

    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return new Response(JSON.stringify({ error: 'Appointment not found' }), { status: 404 });
    }

    const oldStatus = appointment.status;

    if (status) appointment.status = status;
    if (notes !== undefined) appointment.notes = notes;

    await appointment.save();

    // Trigger status update email if status changed
    if (status && status !== oldStatus && appointment.email) {
      let subject = '';
      let html = '';

      if (status === 'confirmed') {
        subject = 'Appointment Confirmed! - Orthodontics Align';
        html = getConfirmationEmailHtml(
          appointment.name,
          appointment.service,
          appointment.preferredDate ? appointment.preferredDate.toISOString() : undefined,
          appointment.preferredTime,
          appointment.notes
        );
      } else if (status === 'cancelled') {
        subject = 'Appointment Request Update - Orthodontics Align';
        html = getCancellationEmailHtml(
          appointment.name,
          appointment.service,
          appointment.notes
        );
      }

      if (subject && html) {
        sendEmail({
          to: appointment.email,
          subject,
          html
        }).catch(err => {
          console.error('Error sending status update email:', err);
        });
      }
    }

    return new Response(JSON.stringify(appointment), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to update appointment' }), { status: 500 });
  }
};

// DELETE /api/appointments/[id] -> Delete appointment
export const DELETE: APIRoute = async ({ params }) => {
  const { id } = params;

  try {
    await connectToDatabase();
    
    const result = await Appointment.findByIdAndDelete(id);
    if (!result) {
      return new Response(JSON.stringify({ error: 'Appointment not found' }), { status: 404 });
    }

    return new Response(JSON.stringify({ success: true, message: 'Deleted successfully' }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to delete appointment' }), { status: 500 });
  }
};
