'use client';

import { useEffect, useState } from 'react';
import { getNearbyBirds, BirdObservation } from '@/app/business/ebird/ebird.service';
import { getDistrictFromLatLng } from '@/app/ui/components/map/location';
import { useLocationStore } from '@/app/store/geolocation';
import { Bird } from '@/app/ui/components/map/map';

interface UseCurrentLocationResult {
  center: { lat: number; lng: number };
  birds: Bird[];
  district: string | null;
  loading: boolean;
}

export function useCurrentLocation(): UseCurrentLocationResult {
  const [center, setCenter] = useState({ lat: 37.5665, lng: 126.978 }); // 기본: 서울
  const [birds, setBirds] = useState<Bird[]>([]);
  const [district, setDistrict] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const { lat: savedLat, lng: savedLng, district: savedDistrict, setLocation } = useLocationStore();

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      async ({ coords: { latitude, longitude } }) => {
        const newCenter = { lat: latitude, lng: longitude };
        setCenter(newCenter);

        try {
          const birdData: BirdObservation[] = await getNearbyBirds(latitude, longitude);
          const uniqueBirds: Bird[] = birdData
            .map((b) => ({ lat: b.lat, lng: b.lng, comName: b.comName, howMany: b.howMany }))
            .filter((bird, idx, self) => self.findIndex((b2) => b2.comName === bird.comName) === idx);
          setBirds(uniqueBirds);

          const resolvedDistrict = await getDistrictFromLatLng(latitude, longitude);
          setDistrict(resolvedDistrict);

          const changed =
            savedLat !== latitude || savedLng !== longitude || savedDistrict !== resolvedDistrict;
          if (changed) {
            setLocation(latitude, longitude, resolvedDistrict);
          }
        } catch (err) {
          console.error('🪶 위치 처리 오류:', err);
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        console.error('❌ 위치 권한 거부:', err);
        setLoading(false);
      }
    );
  }, [savedLat, savedLng, savedDistrict, setLocation]);

  return { center, birds, district, loading };
}
