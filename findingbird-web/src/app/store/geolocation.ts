// store/geolocation.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LocationState {
  lat: number | null;
  lng: number | null;
  district: string | null;
  setLocation: (lat: number, lng: number, district: string) => void;
}

export const useLocationStore = create<LocationState>()(
  persist(
    (set) => ({
      lat: null,
      lng: null,
      district: null,
      setLocation: (lat, lng, district) => set({ lat, lng, district }),
    }),
    {
      name: 'user-location',
      partialize: (state) => ({
        lat: state.lat,
        lng: state.lng,
        district: state.district,
      }),
    }
  )
);
