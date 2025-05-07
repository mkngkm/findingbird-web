'use client';

import React from 'react';

type BirdStrikeDetail = {
  id: number;
  title: string;
  createdAt: string;
  authorName: string;             
  birdCount: number;
  collisionSiteType: string;
  mitigationApplied: boolean;
  speciesInfo: string;
  observationLocation: string;
  description: string;
  imageUrl: string;
};

const dummy: BirdStrikeDetail = {
  id: 1,
  title: '도심에서 물총새 충돌 목격',
  createdAt: '2025-04-10',
  authorName: '쇠딱따구리3487',               
  birdCount: 2,
  collisionSiteType: '고층 건물 유리창',
  mitigationApplied: false,
  speciesInfo: '물총새',
  observationLocation: '창경궁 근처 고층 건물',
  description:
    `건물 2층 유리창 아래에서 물총새 두 마리 폐사체 발견.\n\n` +
    `유리 외관에 새 실루엣 모양 오염 흔적 확인, 현장에는 충돌 방지 스티커 미부착.\n` +
    `현행 건물 관리 지침상 충돌 저감 설비 미설치 상태임.`,
  imageUrl: '/images/birdstrike/kingfisher.jpg',
};

export default function BirdStrikeDetailPage() {
  const data = dummy;

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <article className="mx-auto max-w-3xl space-y-6 rounded-xl bg-white p-6 shadow">
        {/* 제목 / 작성자 / 작성일 */}
        <header className="space-y-1">
          <h1 className="text-2xl font-bold text-gray-900">{data.title}</h1>
          <p className="text-sm text-gray-600">
            <span className="font-medium">{data.authorName}</span> · {data.createdAt}
          </p>
        </header>

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
            <Field label="저감 조치 적용 여부">
              {data.mitigationApplied ? '예' : '아니오'}
            </Field>
            <Field label="생물종 정보">{data.speciesInfo}</Field>
            <Field label="관찰 위치">{data.observationLocation}</Field>
            <Field label="게시글 ID">{data.id}</Field>
          </ul>
        </section>

        {/* 관찰 내역 */}
        <section>
          <h2 className="mb-1 text-base font-semibold text-gray-800">관찰 내역</h2>
          <p className="whitespace-pre-line text-gray-700">{data.description}</p>
        </section>
      </article>
    </main>
  );
}

type FieldProps = { label: string; children: React.ReactNode };
function Field({ label, children }: FieldProps) {
  return (
    <li className="flex gap-2">
      <span className="min-w-[120px] font-medium text-gray-800">{label}</span>
      <span className="text-gray-700 break-words">{children}</span>
    </li>
  );
}
