import mongoose from 'mongoose';

export interface IAdmin extends mongoose.Document {
  name: string;
  email: string;
  passwordHash: string;
  role: 'admin';
  createdAt: Date;
}

const AdminSchema = new mongoose.Schema<IAdmin>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    role: { type: String, default: 'admin' },
  },
  { timestamps: true }
);

// Prevent re-compilation of the model in development (hot reload)
export const Admin = mongoose.models.Admin || mongoose.model<IAdmin>('Admin', AdminSchema);
