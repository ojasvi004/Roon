import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === '/' || path === '/register';

  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

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
