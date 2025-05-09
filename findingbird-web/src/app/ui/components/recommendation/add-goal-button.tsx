// app/ui/components/recommendation/AddGoalButton.tsx
'use client';

import { useLocationStore } from '@/app/store/geolocation';
import Link from 'next/link';

export default function AddGoalButton({ districtParam }: { districtParam?: string }) {
  const { district: storedDistrict } = useLocationStore();
  const district = districtParam || storedDistrict || '';

  return (
    <Link
      href={`/recommendation/landing?district=${encodeURIComponent(district)}`}
      className="fixed bottom-16 left-1/2 transform -translate-x-1/2 bg-birdGreen600 text-white font-semibold rounded-full px-6 py-3 shadow-lg"
      aria-label="AI 목표 생성"
    >
      AI 목표 추가
    </Link>
  );
}
