//findingbird-web/src/app/business/collection/birdAdapter.ts
import type { Bird as ApiBird } from '@/app/business/collection/collection.service';
// dialog 컴포넌트가 기대하는 타입
import type { Bird as DialogBird } from '@/app/ui/components/bird/types';

/**
 * API 응답 객체를 BirdDetailDialog 가 이해할 수 있는 형태로 매핑
 */
export function toDialogBird(apiBird: ApiBird): DialogBird {
  return {
    ...apiBird,

    // ⬇️ 필드명 맞춰서 새로 붙여주기
    commonName: apiBird.speciesName,
    morphology: apiBird.morphoTrait,
    ecology: apiBird.ecoTrait,
  } as unknown as DialogBird; // 타입 단언: 필드가 모두 들어갔으니 안전
}

