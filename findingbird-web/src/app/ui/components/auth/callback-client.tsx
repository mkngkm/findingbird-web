// src/app/(..route)/auth/callback/callback-client.tsx
'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function CallbackClient() {
  const searchParams = useSearchParams();
  const accessToken = searchParams.get('accessToken');
  const router = useRouter();

  useEffect(() => {
    if (accessToken) {
      window.location.href = `/api/auth/kakao?accessToken=${accessToken}`;
    } else {
      router.replace('/auth/fail');
    }
  }, [accessToken, router]);

  return (
    <div className="p-10 text-center">
      <h1 className="text-xl font-semibold">카카오 로그인 처리 중...</h1>
    </div>
  );
}
