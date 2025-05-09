// src/app/(..route)/auth/callback/page.tsx
import { Suspense } from 'react';
import CallbackClient from '@/app/ui/components/auth/callback-client';

export default function CallbackPage() {
  return (
    <Suspense fallback={<div className="text-center mt-10">처리 중입니다...</div>}>
      <CallbackClient />
    </Suspense>
  );
}
