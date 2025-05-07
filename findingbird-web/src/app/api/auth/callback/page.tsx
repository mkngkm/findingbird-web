'use client';

import { setAccessToken } from '@/app/utils/auth/token';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function KakaoCallbackPage() {
  const searchParams = useSearchParams();
  const accessToken = searchParams.get('accessToken');
  const router = useRouter();

  useEffect(() => {
    if (accessToken) {
      setAccessToken(accessToken);
      router.push('/home');
    } else {
      router.push('/auth/fail');
    }
  }, [accessToken, router]);

  return (
    <div className="p-10 text-center">
      <h1 className="text-lg font-semibold">카카오 로그인 처리 중...</h1>
    </div>
  );
}
