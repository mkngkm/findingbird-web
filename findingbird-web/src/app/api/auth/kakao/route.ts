import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const accessToken = searchParams.get('accessToken');

  if (!accessToken) {
    return NextResponse.redirect(new URL('/auth/fail', req.url));
  }

  const res = NextResponse.redirect(new URL('/home', req.url));

  // ✅ 서버 쿠키에 HttpOnly로 저장 (sameSite: 'lax' ← 소문자)
  res.cookies.set('accessToken', accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax', // ← 여기를 이렇게!
    path: '/',
    maxAge: 60 * 60 * 24, // 1일
  });

  return res;
}
