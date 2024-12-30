import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath = path === '/' || path === '/register';

  const token = request.cookies.get('next-auth.session-token')?.value || '';

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/chats', request.nextUrl));
  }

  if ((path.startsWith('/chats') || path === '/profile') && !token) {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/register', '/chats', '/chats/:path*', '/profile'],
};
