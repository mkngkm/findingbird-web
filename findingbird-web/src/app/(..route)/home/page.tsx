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
    <div className="grid grid-cols-1 gap-3 min-h-screen">
      <Map lat={center.lat} lng={center.lng}/>
      <button className="absolute bottom-2 left-1/2 bg-black rounded-full shadow-md">
        <span>button</span>
      </button>
      
    </div>
  );
}
