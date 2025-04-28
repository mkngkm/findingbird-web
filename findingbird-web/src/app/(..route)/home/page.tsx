"use client";

import { useEffect, useState } from "react";
import Map from "@/app/ui/components/map/map";

export default function Home() {
  const [center, setCenter] = useState<{ lat: number; lng: number }>({
    lat: 37.5665, // 기본값
    lng: 126.9780,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          console.log("위치 가져오기 성공", position);
        },
        (error) => {
          console.error('❌ 위치 가져오기 실패', error);
        }
      );
    }
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <Map lat={center.lat} lng={center.lng} />
      <button className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white font-semibold rounded-full px-6 py-3 shadow-lg">
        ai 목표 생성
      </button>
    </div>
  );
}
