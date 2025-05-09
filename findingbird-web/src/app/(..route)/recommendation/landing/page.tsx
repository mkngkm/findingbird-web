// src/app/(..route)/recommendation/landing/page.tsx
import GoalLandingClient from '@/app/ui/components/recommendation/goal-landing-client';
import { Suspense } from 'react';


export default function GoalLandingPage() {
  return (
    <Suspense fallback={<div className="text-center mt-10 text-gray-500">목표 생성 중...</div>}>
      <GoalLandingClient />
    </Suspense>
  );
}
