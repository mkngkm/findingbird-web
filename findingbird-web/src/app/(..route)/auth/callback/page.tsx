'use client';

export const dynamic = 'force-dynamic'; // ✅ 정적 빌드 방지

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function KakaoCallbackPage() {
  const searchParams = useSearchParams();
  const accessToken = searchParams.get('accessToken');

  useEffect(() => {
    if (accessToken) {
      // ✅ 서버 API를 통해 HttpOnly 쿠키 저장
      window.location.href = `/api/auth/kakao?accessToken=${accessToken}`;
    } else {
      window.location.href = '/auth/fail';
    }
  }, [accessToken]);

  return (
    <div className="p-10 text-center">
      <h1 className="text-xl font-semibold">카카오 로그인 처리 중...</h1>
    </div>
  );
}
