'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Map, { Bird } from '@/app/ui/components/map/map';
import { getNearbyBirds, BirdObservation } from '@/app/business/ebird/ebird.service';
import { getDistrictFromLatLng } from '@/app/ui/components/map/location';

export default function Home() {
  const [center, setCenter] = useState({ lat: 37.5665, lng: 126.978 }); // 기본값: 서울
  const [birds, setBirds] = useState<Bird[]>([]);
  const [district, setDistrict] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const newCenter = { lat: latitude, lng: longitude };
        setCenter(newCenter);

        try {
          // 1️⃣ 주변 새 데이터 불러오기
          const birdData: BirdObservation[] = await getNearbyBirds(latitude, longitude);
          const uniqueBirds: Bird[] = birdData
            .map((b) => ({ lat: b.lat, lng: b.lng, comName: b.comName, howMany: b.howMany }))
            .filter((bird, idx, self) => self.findIndex((b2) => b2.comName === bird.comName) === idx);
          setBirds(uniqueBirds);

          // 2️⃣ 자치구명 변환
          const resolvedDistrict = await getDistrictFromLatLng(latitude, longitude);
          setDistrict(resolvedDistrict);
          console.log(resolvedDistrict)
        } catch (error) {
          console.error('🪶 위치 처리 중 오류 발생:', error);
        }
      },
      (err) => console.error('❌ 위치 권한 거부:', err)
    );
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <Map lat={center.lat} lng={center.lng} birds={birds} />

      {district && (
        <Link
          href={`/recommendation?lat=${center.lat}&lng=${center.lng}&district=${encodeURIComponent(
            district
          )}`}
        >
          <button className="absolute bottom-16 left-1/2 transform -translate-x-1/2 bg-birdGreen600 text-white font-semibold rounded-full px-6 py-3 shadow-lg">
            ai 목표 생성
          </button>
        </Link>
      )}
    </div>
  );
}
