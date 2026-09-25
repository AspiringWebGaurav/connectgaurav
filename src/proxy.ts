import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Next.js Edge Proxy (Formerly Middleware)
 * Intercepts requests before they hit the server. 
 * Used for extreme performance routing and Edge security.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Example: Future Edge Authentication
  // If a user hits /admin but lacks a secure session cookie, instantly redirect them to /login
  // before the page even attempts to render on the server.
  if (pathname.startsWith('/admin')) {
    // const sessionCookie = request.cookies.get('__session');
    // if (!sessionCookie) {
    //   return NextResponse.redirect(new URL('/login', request.url));
    // }
  }

  // Continue rendering the route normally
  return NextResponse.next();
}

// Strictly configure which paths trigger this middleware to save compute resources
export const config = {
  matcher: ['/admin/:path*'],
};
