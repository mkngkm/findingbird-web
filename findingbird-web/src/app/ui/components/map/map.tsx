"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

export type NaverMap = naver.maps.Map;
export type NaverMarker = naver.maps.Marker;

const mapId = "naver-map";

export default function Map({ lat, lng }: { lat: number; lng: number }) {
  const mapRef = useRef<NaverMap | null>(null);
  const markerRef = useRef<NaverMarker | null>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  // 스크립트 로드 완료 후 지도 초기화
  useEffect(() => {
    if (!scriptLoaded || typeof naver === "undefined") return;

    naver.maps.onJSContentLoaded = function () {
      const position = new naver.maps.LatLng(lat, lng);

      mapRef.current = new naver.maps.Map(mapId, {
        center: position,
        zoom: 13,
        scaleControl: true,
        mapDataControl: true,
        logoControlOptions: {
          position: naver.maps.Position.BOTTOM_LEFT,
        },
      });

      // ⭐ 지도 생성할 때 마커도 같이 생성
      markerRef.current = new naver.maps.Marker({
        position,
        map: mapRef.current,
      });
    };
  }, [scriptLoaded]);

  // lat, lng 변경될 때마다 center + 마커 이동
  useEffect(() => {
    if (!mapRef.current) return;
    const position = new naver.maps.LatLng(lat, lng);

    mapRef.current.setCenter(position);

    if (markerRef.current) {
      markerRef.current.setPosition(position);
    }
  }, [lat, lng]);

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_MAP_CLIENT_ID}`}
        async={true}
        onLoad={() => setScriptLoaded(true)}
      />
      <div id={mapId} className="aspect-video rounded-lg bg-gray-100 relative" />
      
    </>
  );
}
