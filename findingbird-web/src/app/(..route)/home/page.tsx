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
          console.log("위치 가져오기 성공", position.coords);

        },
        () => {
          console.warn("위치 가져오기 실패, 기본 위치 사용");
        }
      );
    }
  }, []);

  return (
    <div className="p-5 grid grid-cols-1 gap-3 min-h-screen">
      <Map lat={center.lat} lng={center.lng} /> {/* 🔥 lat, lng 넘겨주기 */}
    </div>
  );
}
