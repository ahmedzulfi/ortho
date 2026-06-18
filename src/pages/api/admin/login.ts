import type { APIRoute } from 'astro';
import bcrypt from 'bcryptjs';
import { connectToDatabase } from '../../../lib/mongodb';
import { Admin } from '../../../models/Admin';
import { signToken } from '../../../lib/auth';
import { loginSchema } from '../../../lib/validators';
import { checkRateLimit } from '../../../lib/rateLimit';

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies, clientAddress }) => {
  const ip = clientAddress || request.headers.get('x-forwarded-for') || 'unknown';
  
  // Rate limit: 5 attempts per 15 minutes
  if (!checkRateLimit(ip, 'login', 5, 15 * 60 * 1000)) {
    return new Response(JSON.stringify({ error: 'Too many login attempts. Try again later.' }), { status: 429 });
  }

  try {
    const body = await request.json();
    const result = loginSchema.safeParse(body);

    if (!result.success) {
      return new Response(JSON.stringify({ error: 'Invalid input', details: result.error.errors }), { status: 400 });
    }

    const { email, password } = result.data;

    await connectToDatabase();

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401 });
    }

    const isValid = await bcrypt.compare(password, admin.passwordHash);
    if (!isValid) {
      return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401 });
    }

    const token = signToken({
      adminId: admin._id.toString(),
      email: admin.email,
      role: admin.role,
    });

    cookies.set('admin_session', token, {
      path: '/',
      httpOnly: true,
      secure: import.meta.env.PROD,
      sameSite: 'lax',
      maxAge: 8 * 60 * 60, // 8 hours
    });

    return new Response(JSON.stringify({ success: true, message: 'Logged in successfully' }), { status: 200 });
  } catch (error) {
    console.error('Login error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
};
