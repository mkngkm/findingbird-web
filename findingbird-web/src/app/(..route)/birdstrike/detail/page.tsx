// ✅ 조류 충돌 상세 페이지 (서버 컴포넌트)

import { fetchBirdstrikeDetail } from '@/app/business/birdstrike/\bbirdstrike.service';
import Header from '@/app/ui/components/header';


export default async function BirdStrikeDetailPage({ searchParams }: { searchParams: { id?: string } }) {
  const id = searchParams.id;
  if (!id) return <div>잘못된 접근입니다.</div>;

  const data = await fetchBirdstrikeDetail(id);
  if (!data) return <div>데이터를 불러올 수 없습니다.</div>;

  return (
        <>
          {/* 헤더를 최상단에 고정 */}
          <Header title="조류 충돌 신고 상세" link="/birdstrike" />
    
          <main className="min-h-screen bg-white">
            {/* main의 패딩 제거, article에 마진 주기 */}
            <article className="mx-auto max-w-3xl space-y-6 rounded-xl bg-white p-6">
        {/* 제목 / 작성자 / 작성일 */}
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-gray-900">{data.title}</h1>
          <p className="text-sm text-gray-600">
            <span className="font-medium">{data.nickname}</span> · {data.createdAt}
          </p>
        </div>

        {/* 충돌 사진 */}
        <img
          src={data.imageUrl}
          alt={data.speciesInfo}
          className="w-full max-h-[420px] rounded-lg object-cover"
        />

        {/* 메타 정보 */}
        <section>
          <ul className="space-y-1 text-sm leading-relaxed">
            <Field label="개체 수">{data.birdCount}</Field>
            <Field label="충돌 장소 유형">{data.collisionSiteType}</Field>
            <Field label="저감 조치 적용 여부">{data.mitigationApplied ? '예' : '아니오'}</Field>
            <Field label="생물종 정보">{data.speciesInfo}</Field>
            <Field label="관찰 위치">{data.observationLocation}</Field>
            
          </ul>
        </section>

        {/* 관찰 내역 */}
        <section>
          <h2 className="mb-1 text-base font-semibold text-gray-800">관찰 내역</h2>
          <p className="whitespace-pre-line text-gray-700">{data.description}</p>
        </section>
      </article>
    </main>
    </>
  );
}

// ✅ 공통 필드 컴포넌트
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <li className="flex gap-2">
      <span className="min-w-[120px] font-medium text-gray-800">{label}</span>
      <span className="text-gray-700 break-words">{children}</span>
    </li>
  );
}
