"use client";

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { FaLocationCrosshairs } from "react-icons/fa6";

export type Bird = {
  lat: number;
  lng: number;
  comName: string;
  howMany: number;
};

export type NaverMap = naver.maps.Map;
export type NaverMarker = naver.maps.Marker;

const mapId = "naver-map";

// ✅ forwardRef 사용
const Map = forwardRef(function MapComponent(
  {
    lat,
    lng,
    birds,
  }: {
    lat: number;
    lng: number;
    birds: Bird[];
  },
  _ref
) {
  const mapRef = useRef<NaverMap | null>(null);
  const myMarkerRef = useRef<NaverMarker | null>(null);
  const [isMapReady, setIsMapReady] = useState(false);

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
      });

      myMarkerRef.current = new naver.maps.Marker({
        position,
        map: mapRef.current,
        icon: {
          content:
            '<div style="background:#EF5350;border-radius:50%;width:16px;height:16px;border:2px solid white;"></div>',
        },
      });
    } else {
      mapRef.current.setCenter(position);
      myMarkerRef.current?.setPosition(position);
    }
  }, [isMapReady, lat, lng]);

  useEffect(() => {
    if (!isMapReady || !mapRef.current || birds.length === 0) return;

// 초기 bounds는 첫 번째 새로
const first = new naver.maps.LatLng(birds[0].lat, birds[0].lng);
const bounds = new naver.maps.LatLngBounds(first, first);

birds.forEach((bird) => {
  const position = new naver.maps.LatLng(bird.lat, bird.lng);
  bounds.extend(position);

  const marker = new naver.maps.Marker({
    position,
    map: mapRef.current!,
    icon: {
      content: `
        <div style="width:30px;height:30px;border-radius:50%;background:#9E9D24;border:2px solid white;display:flex;align-items:center;justify-content:center;">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="white" viewBox="0 0 256 256">
            <path d="M240.49,85.12A8,8,0,0,0,232,80H188.69L98.34,21.34A8,8,0,0,0,86,28V80H24a8,8,0,0,0-8,8,88.1,88.1,0,0,0,88,88h8v32a8,8,0,0,0,13.66,5.66l96-96A8,8,0,0,0,240.49,85.12ZM112,160a72.13,72.13,0,0,1-71.43-64H96a8,8,0,0,0,8-8V47.47l75.45,50.31L124.69,160Zm24,25.37V160h35.31Z"></path>
          </svg>
        </div>
      `,
    },
  });

  const infoWindow = new naver.maps.InfoWindow({
    content: `
      <div style="
        padding:8px;
        font-size:14px;
        font-weight:bold;
        background:#9E9D24;
        border-radius:4px;
        color:white;
        border:none;
      ">
        ${bird.comName}
      </div>
    `,
    disableAnchor: true,
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  });

  naver.maps.Event.addListener(marker, "click", () => {
    infoWindow.open(mapRef.current!, marker);
  });
});

  
    mapRef.current.fitBounds(bounds, {
      top: 10,
      bottom: 10,
      left: 10,
      right: 10,
    });
    
  }, [birds, isMapReady]);
  
  

  const handleMoveToMyLocation = () => {
    if (!mapRef.current || !navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition((pos) => {
      const newCenter = new naver.maps.LatLng(
        pos.coords.latitude,
        pos.coords.longitude
      );
      mapRef.current!.setCenter(newCenter);
      mapRef.current!.setZoom(15);
      myMarkerRef.current?.setPosition(newCenter);
    });
  };

  return (
    <>
      <div id={mapId} className="absolute inset-0 w-full h-full z-0" />
      <button
  onClick={handleMoveToMyLocation}
  className="absolute top-20 right-5 bg-white rounded-full shadow px-1 py-1 text-sm font-semibold z-[9999]"
>
  내 위치
</button>

    </>
  );
});

export default Map;
