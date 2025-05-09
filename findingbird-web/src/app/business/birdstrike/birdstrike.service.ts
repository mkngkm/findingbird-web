'use server';

import { FormState } from '@/app/ui/molecule/form/form-root';
import { createHttpInstance } from '@/app/utils/http';
import { API_PATH } from '@/app/utils/http/api-query';

const instance = createHttpInstance(true);

// ✅ 타입 정의
export type Report = {
  id: string;
  nickname: string;
  title: string;
  createdAt: string;
};

export type BirdStrikeDetail = {
  id: string;
  userId: string;
  nickname: string;
  title: string;
  birdCount: number;
  collisionSiteType: string;
  mitigationApplied: boolean;
  speciesInfo: string;
  observationLocation: string;
  description: string;
  imageFileId: string;
  imageUrl: string;
  createdAt: string;
};

// ✅ 목록 조회 함수
export async function fetchBirdstrikeList(): Promise<Report[]> {
    try {
      const res = await instance.get(`${API_PATH}/report`);
      return (res.data || []).map((item: Report) => ({
        id: item.id,
        nickname: item.nickname,
        title: item.title,
        createdAt: item.createdAt,
      }));
    } catch (error) {
      console.error('[fetchBirdstrikeList] 에러:', error);
      return [];
    }
  }
  
  // ✅ 상세 조회 함수
  export async function fetchBirdstrikeDetail(id: string): Promise<BirdStrikeDetail | null> {
    try {
      const res = await instance.get(`${API_PATH}/report/${id}`);
      const d = res.data;
      return {
        id: d.id,
        userId: d.userId,
        nickname: d.nickname,
        title: d.title,
        birdCount: d.birdCount,
        collisionSiteType: d.collisionSiteType,
        mitigationApplied: d.mitigationApplied,
        speciesInfo: d.speciesInfo,
        observationLocation: d.observationLocation,
        description: d.description,
        imageFileId: d.imageFileId,
        imageUrl: d.imageUrl,
        createdAt: d.createdAt,
      };
    } catch (error) {
      console.error('[fetchBirdstrikeDetail] 에러:', error);
      return null;
    }
  }


  export async function createBirdstrikeReport(
    prevState: FormState,
    formData: FormData
  ): Promise<FormState> {
    const title = formData.get('title')?.toString() || '';
    const birdCount = formData.get('birdCount')?.toString();
    const collisionSiteType = formData.get('collisionSiteType')?.toString();
    const mitigationApplied = formData.get('mitigationApplied') === 'on';
    const speciesInfo = formData.get('speciesInfo')?.toString();
    const observationLocation = formData.get('observationLocation')?.toString();
    const description = formData.get('description')?.toString();
    const image = formData.get('image') as File | null;
  
    // 유효성 검증
    if (
      !title ||
      !birdCount ||
      !collisionSiteType ||
      !speciesInfo ||
      !observationLocation ||
      !description ||
      !image
    ) {
      return {
        isSuccess: false,
        isFailure: true,
        validationError: { title: ['필수 항목 누락'] },
        message: '입력값을 확인해주세요.',
      };
    }
  
    // multipart/form-data 구성
    const multipartFormData = new FormData();
    multipartFormData.append('title', title);
    multipartFormData.append('birdCount', birdCount);
    multipartFormData.append('collisionSiteType', collisionSiteType);
    multipartFormData.append('mitigationApplied', mitigationApplied.toString());
    multipartFormData.append('speciesInfo', speciesInfo);
    multipartFormData.append('observationLocation', observationLocation);
    multipartFormData.append('description', description);
    multipartFormData.append('image', image);
  
    try {
      const response = await instance.post(`${API_PATH}/report`, multipartFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.status === 201) {
        return {
          isSuccess: true,
          isFailure: false,
          validationError: {},
          message: '조류 충돌 신고가 성공적으로 등록되었습니다.',
        };
      } else {
        throw new Error('Unexpected response status');
      }
    } catch (error) {
      console.error('신고 등록 오류:', error);
      return {
        isSuccess: false,
        isFailure: true,
        validationError: {},
        message: '조류 충돌 신고 중 오류가 발생했습니다.',
      };
    }
  }