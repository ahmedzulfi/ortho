import type { APIRoute } from 'astro';
import { connectToDatabase } from '../../../lib/mongodb';
import { Appointment } from '../../../models/Appointment';
import { sendEmail, getConfirmationEmailHtml, getCancellationEmailHtml } from '../../../lib/email';
import { getAppointmentEndDateTime } from '../../../lib/appointments';

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

    // Guard: Prevent modification of past appointments
    if (appointment.preferredDate) {
      const endDateTime = getAppointmentEndDateTime(appointment.preferredDate, appointment.preferredTime);
      if (endDateTime < new Date()) {
        return new Response(JSON.stringify({ error: 'Cannot modify an appointment whose scheduled time has passed.' }), { status: 400 });
      }
    }

    const oldStatus = appointment.status;
    const oldNotes = appointment.notes || '';

    if (status) appointment.status = status;
    if (notes !== undefined) appointment.notes = notes;

    await appointment.save();

    const isStatusChanged = status && status !== oldStatus;
    const isNotesChanged = notes !== undefined && notes !== oldNotes;

    // Trigger email if status changed OR if notes changed and current status is confirmed or cancelled
    if (appointment.email) {
      const currentStatus = appointment.status;
      const shouldEmail = isStatusChanged || (isNotesChanged && (currentStatus === 'confirmed' || currentStatus === 'cancelled'));

      if (shouldEmail) {
        let subject = '';
        let html = '';

        if (currentStatus === 'confirmed') {
          // Customize subject to indicate notes update if status did not change
          subject = (isNotesChanged && !isStatusChanged)
            ? 'Appointment Schedule Update - Orthodontics Align'
            : 'Appointment Confirmed! - Orthodontics Align';
            
          html = getConfirmationEmailHtml(
            appointment.name,
            appointment.service,
            appointment.preferredDate ? appointment.preferredDate.toISOString() : undefined,
            appointment.preferredTime,
            appointment.notes
          );
        } else if (currentStatus === 'cancelled') {
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
            console.error('Error sending email update:', err);
          });
        }
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
