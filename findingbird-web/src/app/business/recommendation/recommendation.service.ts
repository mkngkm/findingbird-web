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

export type CreateGoalResponse = {
    id: string;
    isCompleted: boolean;
    createdAt: string;
    bird: {
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
  };
  

export async function createGoal(district: string): Promise<CreateGoalResponse | null> {
  try {
    const res = await instance.post(`${API_PATH}/goal`, { district });

    if (res.status !== 201) {
      // ❌ 비즈니스 로직 에러 처리
      if (res.status === 400) {
        // 예: 하루 3회 초과 에러
        return handleCreateGoalLimitError();
      }
      throw new Error('목표 생성 실패');
    }

    return res.data as CreateGoalResponse;
  } catch (error: any) {
    if (error?.response?.status === 400) {
      return handleCreateGoalLimitError();
    }

    console.error('[createGoal] 목표 생성 중 오류:', error);
    throw new Error('AI 목표 생성에 실패했습니다.');
  }
}

// ✅ 하루 3회 초과 처리 함수
function handleCreateGoalLimitError(): null {
  // 서버 환경에서 window.alert 사용 불가하므로 클라이언트에서 처리 필요
  console.log('[createGoal] 하루 최대 3회까지 생성 가능합니다.');
  // 또는 리디렉션
  // redirect('/recommendation'); // next/navigation
  return null;
}


  export async function fetchTodayGoals(): Promise<recommendtion[]> {
    try {
      const res = await instance.get(`${API_PATH}/goal`);
  
      if (res.status !== 200 || !Array.isArray(res.data)) {
        console.error('[fetchTodayGoals] 응답 비정상:', res.statusText);
        return [];
      }
  
      return res.data.map((goal: any) => ({
        id: goal.id,
        isCompleted: goal.isCompleted,
        createdAt: goal.createdAt,
        bird: {
          id: goal.bird.id,
          speciesName: goal.bird.speciesName,
          scientificName: goal.bird.scientificName,
          habitatType: goal.bird.habitatType,
          appearanceCount: goal.bird.appearanceCount,
          morphoTrait: goal.bird.morphoTrait,
          ecoTrait: goal.bird.ecoTrait,
          districts: goal.bird.districts,
          imageUrl: goal.bird.imageUrl,
        },
      })) as recommendtion[];
    } catch (e) {
      console.error('[fetchTodayGoals] 에러:', e);
      return [];
    }
  }
  
