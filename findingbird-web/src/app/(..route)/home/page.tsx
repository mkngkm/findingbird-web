// home/page.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Map, { Bird} from "@/app/ui/components/map/map";
import Link from "next/link";
import { getNearbyBirds, BirdObservation } from "@/app/business/ebird/ebird.service";

export default function Home() {
  const [center, setCenter] = useState<{ lat: number; lng: number }>({ lat: 37.5665, lng: 126.978 });
  const [birds, setBirds] = useState<Bird[]>([]);

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const newCenter = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setCenter(newCenter);

        try {
          const result: BirdObservation[] = await getNearbyBirds(newCenter.lat, newCenter.lng);
          const mapped: Bird[] = result
            .map((b) => ({ lat: b.lat, lng: b.lng, comName: b.comName, howMany: b.howMany }))
            .filter((bird, idx, self) => self.findIndex((b2) => b2.comName === bird.comName) === idx);

          setBirds(mapped);
        } catch (err) {
          console.error("🪶 새 목록 가져오기 실패", err);
        }
      },
      (error) => console.error("❌ 위치 가져오기 실패", error)
    );
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <Map lat={center.lat} lng={center.lng} birds={birds} />
      <Link href="/recommendation">
        <button className="absolute bottom-16 left-1/2 transform -translate-x-1/2 bg-birdGreen600 text-white font-semibold rounded-full px-6 py-3 shadow-lg">
          ai 목표 생성
        </button>
      </Link>
    </div>
  );
}
