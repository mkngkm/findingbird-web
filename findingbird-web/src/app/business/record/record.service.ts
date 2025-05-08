'use server';

import { FormState } from '@/app/ui/molecule/form/form-root';
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

export type Goal = {
  id: string;
  isCompleted: boolean;
  createdAt: string;
  bird: Bird;
};

export type Record = {
  id: string;
  name: string;
  imageUrl: string;
  district: string;
  size: string;
  color: string;
  locationDescription: string;
  goalId: string;
  createdAt: string;
};

export type DailyRecord = {
  date: number;
  hasRecords: boolean;
  records: Record[];
  goals: Goal[];
};


export async function createBirdRecord(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const name = formData.get('name')?.toString() || '';
  const coordinate = formData.get('coordinate')?.toString(); // 좌표 → 자치구 추출 가능하면 여기에
  const size = formData.get('size')?.toString();
  const color = formData.get('color')?.toString();
  const district = formData.get('district')?.toString();
  const locationDescription = formData.get('locationDescription')?.toString();
  const image = formData.get('image') as File | null;
  const goalId = formData.get('goalId')?.toString() || '';

  if (!district || !size || !color || !locationDescription || !image) {
    return {
      isSuccess: false,
      isFailure: true,
      validationError: { district: ['필수 값이 누락되었습니다.'] },
      message: '입력값을 확인해주세요.',
    };
  }

  const multipartFormData = new FormData();
  multipartFormData.append('name', name); // null일 수 있음 → 빈 문자열 허용
  multipartFormData.append('district', district);
  multipartFormData.append('size', size);
  multipartFormData.append('color', color);
  multipartFormData.append('locationDescription', locationDescription);
  multipartFormData.append('goalId', goalId); // null인 경우 빈 문자열
  multipartFormData.append('image', image);

  try {
    const response = await instance.post(`${API_PATH}/record`, multipartFormData);

    if (response.status === 201) {
      return {
        isSuccess: true,
        isFailure: false,
        validationError: {},
        message: '기록이 성공적으로 생성되었습니다.',
      };
    } else {
      throw new Error('Unexpected server response');
    }
  } catch (error) {
    console.error(error);
    return {
      isSuccess: false,
      isFailure: true,
      validationError: {},
      message: '기록 생성 중 오류가 발생했습니다.',
    };
  }
}



export async function fetchDailyCalendar(year: number, month: number): Promise<DailyRecord[]> {
  try {
    const res = await instance.get(`${API_PATH}/calendar`, {
      params: { year, month },
    });

    return res.data.dailyPreviews.map((preview: any) => ({
      date: preview.date,
      hasRecords: preview.hasRecords,
      records: (preview.records || []).map((r: any) => ({
        id: r.id,
        name: r.name,
        imageUrl: r.imageUrl,
        district: r.district,
        size: r.size,
        color: r.color,
        locationDescription: r.locationDescription,
        goalId: r.goalId,
        createdAt: r.createdAt,
      })),
      goals: (preview.goals || []).map((g: any) => ({
        id: g.id,
        isCompleted: g.isCompleted,
        createdAt: g.createdAt,
        bird: g.bird,
      })),
    }));
  } catch (e) {
    console.error('[fetchDailyCalendar] 에러:', e);
    return [];
  }
}
