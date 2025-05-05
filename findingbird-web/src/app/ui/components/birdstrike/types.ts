// src/app/ui/components/birdstrike/types.ts

/**
 * 조류 충돌 신고를 서버에 보낼 때 사용하는 데이터 타입
 */
export interface BirdstrikeReport {
    /** 신고 제목 */
    title: string;
    /** 충돌한 새 개체 수 */
    birdCount: number;
    /** 충돌 장소 유형 (예: 건물, 전봇대 등) */
    collisionSiteType: string;
    /** 저감 조치(예: 조명 차단 등)가 적용되었는지 여부 */
    mitigationApplied: boolean;
    /** 관찰된 종 정보 (예: 까치 (Pica pica)) */
    speciesInfo: string;
    /** 관찰 위치 (예: 서울시 종로구) */
    observationLocation: string;
    /** 관찰 내역 상세 설명 */
    description: string;
    /** 충돌 현장 사진 파일 */
    image: File | null;
  }