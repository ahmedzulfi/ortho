import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const appointmentSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  phone: z.string().min(5, 'Phone number is required'),
  email: z.string().email('Invalid email address'),
  service: z.string().min(1, 'Service is required'),
  date: z.string().optional(),
  time: z.string().optional(),
  message: z.string().optional(),
});
