// src/app/(..route)/record/page.tsx
'use client';

import React from 'react';
import BirdCard from '@/app/ui/components/bird/bird-card';

// RecordDetail 타입 정의
type RecordDetail = {
  id: number;
  date: string;                  // YYYY-MM-DD
  name: string | null;           // 발견한 새의 이름
  district: string;              // 자치구
  size: string;                  // 새의 크기
  color: string;                 // 새의 색상
  locationDescription: string;   // 위치 설명
  goalId: string | null;         // 목표 Id
  imageUrl: string;              // 사진 URL
};

// 더미 레코드 데이터
const dummyRecords: RecordDetail[] = [
  {
    id: 1,
    date: '2025-04-01',
    name: '집비둘기',
    district: '성북구',
    size: '중간',
    color: '회색',
    locationDescription: '한성대입구역 근처',
    goalId: 'goal-001',
    imageUrl: '/images/birds/rock-pigeon.jpg',
  },
  // ... 추가 레코드
];

export default function RecordPage() {
  return (
    <main className="min-h-screen bg-gray-100 p-5">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">기록 상세 목록</h1>
      </header>

      <section className="space-y-8">
        {dummyRecords.map((rec) => (
          <article key={rec.id} className="bg-white rounded-lg shadow p-6">
      
    
            {/* 상세 정보 */}
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <img
                src={rec.imageUrl}
                alt={rec.name ?? ''}
                className="w-full h-auto object-cover rounded"
              />

              <ul className="space-y-1 text-sm text-gray-700">
                <li><strong>날짜:</strong> {rec.date}</li>
                <li><strong>새 이름:</strong> {rec.name ?? '알 수 없음'}</li>
                <li><strong>자치구:</strong> {rec.district}</li>
                <li><strong>크기:</strong> {rec.size}</li>
                <li><strong>색상:</strong> {rec.color}</li>
                <li><strong>위치 설명:</strong> {rec.locationDescription}</li>
                <li><strong>목표 ID:</strong> {rec.goalId ?? '없음'}</li>
                <li><strong>Record ID:</strong> {rec.id}</li>
              </ul>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
