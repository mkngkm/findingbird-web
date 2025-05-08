// src/middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('accessToken')?.value;
  const { pathname } = request.nextUrl;

  console.log('[middleware] token:', token);

  const isRoot = pathname === '/';
  const protectedPaths = ['/home', '/record', '/recommendation', '/birdstrike'];

  // ✅ 1. 로그인 상태인데 '/'로 접근하면 → '/home'으로 리디렉션
  if (token && isRoot) {
    return NextResponse.redirect(new URL('/home', request.url));
  }

  // ✅ 2. 비로그인 상태인데 보호된 경로 접근하면 → '/'로 리디렉션
  if (!token && protectedPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: [
    '/home/:path*',
    '/record/:path*',
    '/recommendation/:path*',
    '/birdstrike/:path*',
  ],
};