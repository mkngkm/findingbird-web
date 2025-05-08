'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { createGoal } from '@/app/business/recommendation/recommendation.service';

export default function RecommendationLanding() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const district = searchParams.get('district') ?? '';

  const handleCreateGoal = async () => {
    const result = await createGoal(district);

    if (!result) {
      alert('AI 목표는 하루 최대 3개까지 생성할 수 있어요!');
      router.push('/recommendation');
      return;
    }

    router.push('/recommendation');
  };

  
}
