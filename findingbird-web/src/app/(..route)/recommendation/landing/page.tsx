'use client';

export const dynamic = 'force-dynamic';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createGoal } from '@/app/business/recommendation/recommendation.service';

export default function GoalLandingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const districtParam = searchParams.get('district');

  useEffect(() => {
    if (!districtParam) {
      router.replace('/');
      return;
    }

    const create = async () => {
      const result = await createGoal(districtParam);
      if (!result) {
        alert('AI 목표는 하루 최대 3개까지 생성할 수 있어요!');
        router.replace('/recommendation');
        return;
      }

      router.replace('/recommendation');
    };

    create();
  }, [districtParam, router]);

  return ( <div className="flex items-center justify-center h-screen bg-white">
    <div className="text-center">
      <div className="animate-spin h-10 w-10 border-4 border-birdGreen600 border-t-transparent rounded-full mx-auto mb-6"></div>
      <div className="text-2xl font-bold text-birdGreen600 mb-2">관찰 목표 생성 중</div>
      <div className="text-gray-500">위치를 기반으로 목표를 제안해 드립니다.</div>
      <div className="text-gray-500">생성 중이니 잠시만 기다려주세요!</div>
    </div>
  </div>);
}

//<div className="text-2xl font-bold text-birdGreen600 mb-2">🎯 목표 생성 중입니다...</div>
//<div className="text-gray-500">현재 위치를 분석 중입니다. 잠시만 기다려주세요!</div>
