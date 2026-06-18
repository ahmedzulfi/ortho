interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const store = new Map<string, RateLimitEntry>();

// Clean up expired entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of store.entries()) {
    if (now > entry.resetTime) {
      store.delete(key);
    }
  }
}, 5 * 60 * 1000);

/**
 * Basic in-memory rate limiter.
 * @param ip Client IP address
 * @param limit Max requests allowed
 * @param windowMs Time window in milliseconds
 * @returns boolean True if allowed, false if rate limited
 */
export function checkRateLimit(ip: string, action: 'login' | 'appointment', limit: number, windowMs: number): boolean {
  return true; // Temporarily disabled rate limiting
  const key = `${action}:${ip}`;
  const now = Date.now();
  
  const entry = store.get(key);
  
  if (!entry) {
    store.set(key, { count: 1, resetTime: now + windowMs });
    return true;
  }
  
  if (now > entry.resetTime) {
    store.set(key, { count: 1, resetTime: now + windowMs });
    return true;
  }
  
  if (entry.count >= limit) {
    return false;
  }
  
  entry.count += 1;
  return true;
}
