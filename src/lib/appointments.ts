import { Appointment } from '../models/Appointment';

/**
 * Calculates the exact end date/time for an appointment slot.
 * If no time slot is specified, assumes the end of the day.
 */
export function getAppointmentEndDateTime(date: Date, timeStr?: string): Date {
  const d = new Date(date);
  if (!timeStr) {
    // If no time is specified, assume end of day (23:59:59.999)
    d.setHours(23, 59, 59, 999);
    return d;
  }
  
  // Parse preferredTime (e.g. "10:00 AM", "02:30 PM", "11:15 AM")
  const match = timeStr.match(/^(\d+):(\d+)\s*(AM|PM)$/i);
  if (match) {
    let hours = parseInt(match[1], 10);
    const minutes = parseInt(match[2], 10);
    const ampm = match[3].toUpperCase();
    
    if (ampm === 'PM' && hours < 12) hours += 12;
    if (ampm === 'AM' && hours === 12) hours = 0;
    
    d.setHours(hours, minutes, 0, 0);
  } else {
    // Fallback to end of day if format is not standard
    d.setHours(23, 59, 59, 999);
  }
  return d;
}

/**
 * Automatically marks all active (pending or confirmed) appointments
 * whose scheduled date and time has passed as "completed".
 */
export async function autoClosePastAppointments() {
  const now = new Date();
  
  try {
    // Find all appointments with status 'pending' or 'confirmed'
    const activeApps = await Appointment.find({
      status: { $in: ['pending', 'confirmed'] }
    });
    
    let closedCount = 0;
    for (const app of activeApps) {
      if (app.preferredDate) {
        const endDateTime = getAppointmentEndDateTime(app.preferredDate, app.preferredTime);
        if (endDateTime < now) {
          app.status = 'completed';
          await app.save();
          closedCount++;
        }
      }
    }
    
    if (closedCount > 0) {
      console.log(`[Auto-Close] Automatically closed ${closedCount} past-due appointments.`);
    }
  } catch (error) {
    console.error('[Auto-Close] Failed to auto-close past appointments:', error);
  }
}
