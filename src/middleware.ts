import { defineMiddleware } from 'astro:middleware';
import { verifyToken } from './lib/auth';

export const onRequest = defineMiddleware(async (context, next) => {
  const { url, cookies, redirect } = context;

  // Protect /admin and /api/admin routes, except /admin/login and /api/admin/login and setup
  if (
    (url.pathname.startsWith('/admin') || url.pathname.startsWith('/api/admin')) &&
    !url.pathname.includes('/login') &&
    !url.pathname.includes('/setup')
  ) {
    const token = cookies.get('admin_session')?.value;

    if (!token) {
      if (url.pathname.startsWith('/api')) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
      }
      return redirect('/admin/login');
    }

    const payload = verifyToken(token);
    if (!payload) {
      if (url.pathname.startsWith('/api')) {
        return new Response(JSON.stringify({ error: 'Invalid or expired token' }), { status: 401 });
      }
      return redirect('/admin/login');
    }

    // Attach user to locals
    context.locals.admin = payload;
  }

  // Also protect API routes that aren't POST (e.g., getting list of appointments)
  if (url.pathname === '/api/appointments' && context.request.method !== 'POST') {
    const token = cookies.get('admin_session')?.value;
    if (!token || !verifyToken(token)) {
       return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }
  }
  
  if (url.pathname.startsWith('/api/appointments/') && context.request.method !== 'POST') {
    const token = cookies.get('admin_session')?.value;
    if (!token || !verifyToken(token)) {
       return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }
  }

  return next();
});
