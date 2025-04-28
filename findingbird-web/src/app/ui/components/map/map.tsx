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

      markerRef.current = new naver.maps.Marker({
        position,
        map: mapRef.current,
      });
    };
  }, [scriptLoaded]);

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
        async
        onLoad={() => setScriptLoaded(true)}
      />
      <div id={mapId} className="absolute inset-0 w-full h-full" />
    </>
  );
}
