"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";

export default function Map({ lat, lng }: { lat: number; lng: number }) {
  const mapRef = useRef<naver.maps.Map | null>(null);

  useEffect(() => {
    if (lat !== 0 && lng !== 0 && typeof naver !== "undefined") {
      const center = new naver.maps.LatLng(lat, lng);

      if (!mapRef.current) {
        mapRef.current = new naver.maps.Map("map", {
          center,
          zoom: 13,
          zoomControl: true,
          mapTypeControl: true,
          zoomControlOptions: {
            position: naver.maps.Position.TOP_RIGHT,
          },
          mapDataControl: false,
        });
      } else {
        mapRef.current.setCenter(center);
      }
    }
  }, [lat, lng]);

  return (
    <>
      <Script
        src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_MAP_CLIENT_ID}`}
        strategy="afterInteractive"
        async={true}
      />
      <div id="map" className="aspect-video min-h-[300px] rounded-lg bg-gray-100" />
    </>
  );
}
