import mongoose from 'mongoose';

export interface IAppointment extends mongoose.Document {
  name: string;
  phone: string;
  email?: string;
  service: string;
  preferredDate?: Date;
  preferredTime?: string;
  message?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const AppointmentSchema = new mongoose.Schema<IAppointment>(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: false },
    service: { type: String, required: true },
    preferredDate: { type: Date, required: false },
    preferredTime: { type: String, required: false },
    message: { type: String, required: false },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'completed', 'cancelled'],
      default: 'pending',
    },
    notes: { type: String, required: false },
  },
  { timestamps: true }
);

// Prevent re-compilation of the model in development (hot reload)
export const Appointment = mongoose.models.Appointment || mongoose.model<IAppointment>('Appointment', AppointmentSchema);
