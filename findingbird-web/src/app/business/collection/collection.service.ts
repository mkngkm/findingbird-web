//findingbird-web/src/app/business/collection/collection.service.ts
'use server';

import { API_PATH } from '@/app/utils/http/api-query';
import { createHttpInstance } from '@/app/utils/http/index';

const instance = createHttpInstance(true); // ✅ 서버 사이드

export type ApiBird = {
    id: string;
    speciesName: string;
    scientificName: string;
    habitatType: string;
    appearanceCount: number;
    morphoTrait: string;
    ecoTrait: string;
    districts: string[];
    imageUrl: string;
};

export type BirdInCollection = {
    isfound: boolean;
    bookImageUrl: string;
    bird: ApiBird;
};

export type Collection = {
    BirdInCollection: BirdInCollection[];
};

function mapBookResponseToApiBirds(
    payload: any
  ): ApiBird[] {
    if (payload && Array.isArray(payload.birds)) {
      return payload.birds
        .filter((entry: any) => entry.bird != null)
        .map((entry: any) => entry.bird as ApiBird);
    }
    console.warn('[mapBookResponseToApiBirds] unexpected payload:', payload);
    return [];
}

export async function getBirdsInCollection(): Promise<ApiBird[]> {
    try {
      const res = await instance.get(`${API_PATH}/book`);
      // raw data → ApiBird 타입으로 매핑
      return mapBookResponseToApiBirds(res.data);
    } catch (e) {
      console.error('[getBirdsInCollection] error:', e);
      return [];
    }
  }
