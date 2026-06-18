import type { APIRoute } from 'astro';
import { connectToDatabase } from '../../../lib/mongodb';
import { Appointment } from '../../../models/Appointment';

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

    if (status) appointment.status = status;
    if (notes !== undefined) appointment.notes = notes;

    await appointment.save();

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
