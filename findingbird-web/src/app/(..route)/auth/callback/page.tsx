'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Cookies from 'js-cookie';

export default function KakaoCallbackPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const accessToken = searchParams.get('accessToken');

  useEffect(() => {
    if (accessToken) {
      // ✅ 클라이언트 쿠키에 accessToken 저장
      Cookies.set('token', accessToken, {
        secure: true,
        sameSite: 'Lax',
        path: '/',
        expires: 1, // 1일 (선택사항)
      });

      router.push('/home');
    } else {
      router.push('/auth/fail'); // 실패 페이지로 이동
    }
  }, [accessToken, router]);

  return (
    <div className="p-10 text-center">
      <h1 className="text-xl font-semibold">카카오 로그인 처리 중...</h1>
    </div>
  );
}
