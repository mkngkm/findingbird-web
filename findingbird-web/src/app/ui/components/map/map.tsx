"use client";

import Script from "next/script";
import { useCallback, useRef } from "react";

export type NaverMap = naver.maps.Map;

const mapId = "naver-map";

export default function Map() {
  const mapRef = useRef<NaverMap | null>(null);

  const initializeMap = useCallback(() => {
    naver.maps.onJSContentLoaded = function () {
      const defaultLat = 37.5665; // 서울 위도
      const defaultLng = 126.9780; // 서울 경도

      const mapOptions = {
        center: new naver.maps.LatLng(defaultLat, defaultLng),
        zoom: 13,
        scaleControl: true,
        mapDataControl: true,
        logoControlOptions: {
          position: naver.maps.Position.BOTTOM_LEFT,
        },
      };

      const map = new naver.maps.Map(mapId, mapOptions);
      mapRef.current = map;
    };
  }, []);

  return (
    <>
      <Script
        strategy="afterInteractive"
        type="text/javascript"
        src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_MAP_CLIENT_ID}`}
        async={true}
        onReady={initializeMap}
      />
      <div id={mapId} className="aspect-video rounded-lg" />
    </>
  );
}
