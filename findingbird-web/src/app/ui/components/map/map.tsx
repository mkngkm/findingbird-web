"use client";

import { useEffect, useRef, useState } from "react";

export type NaverMap = naver.maps.Map;
export type NaverMarker = naver.maps.Marker;

const mapId = "naver-map";

export default function Map({ lat, lng }: { lat: number; lng: number }) {
  const mapRef = useRef<NaverMap | null>(null);
  const markerRef = useRef<NaverMarker | null>(null);
  const [isMapReady, setIsMapReady] = useState(false);

  // 네이버 맵 SDK 로딩 확인 (window.naver 존재 여부)
  useEffect(() => {
    const check = setInterval(() => {
      if (typeof window !== "undefined" && window.naver?.maps) {
        setIsMapReady(true);
        clearInterval(check);
      }
    }, 100);
    return () => clearInterval(check);
  }, []);

  useEffect(() => {
    if (!isMapReady) return;

    const position = new naver.maps.LatLng(lat, lng);

    if (!mapRef.current) {
      mapRef.current = new naver.maps.Map(mapId, {
        center: position,
        zoom: 13,
        scaleControl: true,
        mapDataControl: true,
        logoControlOptions: {
          position: naver.maps.Position.BOTTOM_LEFT,
        },
      });

      markerRef.current = new naver.maps.Marker({
        position,
        map: mapRef.current,
      });
    } else {
      mapRef.current.setCenter(position);
      markerRef.current?.setPosition(position);
    }
  }, [isMapReady, lat, lng]);

  return <div id={mapId} className="absolute inset-0 w-full h-full z-0" />;

}
