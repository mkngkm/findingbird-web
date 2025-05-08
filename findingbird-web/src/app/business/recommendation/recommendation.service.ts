'use server';

import { API_PATH } from '@/app/utils/http/api-query';
import { createHttpInstance } from '@/app/utils/http/index';

const instance = createHttpInstance(true); // ✅ 서버 사이드

export type Bird = {
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

export type recommendtion = {
    id: string;
    isCompleted: boolean;
    createdAt: string;
    bird: Bird;
};

export async function getRecommendationById(
    id: string,
): Promise<recommendtion | null> {
    if (!id) return null;

    try {
        const response = await instance.get(`${API_PATH}/recommendation/${id}`);
        
        if (response.status !== 200) {
            console.error('Error fetching recommendation:', response.statusText);
            return null;    
        }

        return response.data as recommendtion;
    } catch (error) {
        console.error('Error fetching recommendation:', error);
        return null;
    }
}


