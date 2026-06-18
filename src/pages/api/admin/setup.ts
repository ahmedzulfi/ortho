import type { APIRoute } from 'astro';
import bcrypt from 'bcryptjs';
import { connectToDatabase } from '../../../lib/mongodb';
import { Admin } from '../../../models/Admin';

export const prerender = false;

export const POST: APIRoute = async () => {
  try {
    const email = import.meta.env.ADMIN_INIT_EMAIL;
    const password = import.meta.env.ADMIN_INIT_PASSWORD;

    if (!email || !password) {
      return new Response(JSON.stringify({ error: 'Init variables not set' }), { status: 400 });
    }

    await connectToDatabase();

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return new Response(JSON.stringify({ error: 'Admin already exists' }), { status: 400 });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const admin = new Admin({
      name: 'Super Admin',
      email,
      passwordHash,
      role: 'admin',
    });

    await admin.save();

    return new Response(JSON.stringify({ success: true, message: 'Admin created successfully' }), { status: 201 });
  } catch (error) {
    console.error('Setup error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
};
