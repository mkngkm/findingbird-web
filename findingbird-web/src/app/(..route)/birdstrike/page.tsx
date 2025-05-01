'use client';

import React from 'react';
import ReportList from '@/app/ui/molecule/birdstrike/report-list';
import { Report } from '@/app/ui/molecule/birdstrike/types';

// 샘플 데이터 (추후 API 연동)
const dummyReports: Report[] = [
  { id: 1, title: '도심에서 한미 물총새 충돌 목격', date: '2025-04-10', author: '홍길동' },
  { id: 2, title: '공원 산책 중 까치 충돌 신고', date: '2025-04-08', author: '김철수' },
  // ... 추가 데이터
];

export default function BirdstrikePage() {
  return (
    <main className="min-h-screen bg-gray-100 flex flex-col">
      {/* 헤더 */}
      <header className="bg-white shadow p-4 flex items-center justify-between">
        <button aria-label="뒤로가기" className="text-gray-600 text-xl">◀</button>
        <h1 className="text-xl font-semibold text-gray-800">조류 충돌 신고 목록</h1>
        <div className="flex space-x-4">
          <button aria-label="새소식" className="text-gray-600 text-xl">📬</button>
          <button aria-label="메뉴" className="text-gray-600 text-xl">☰</button>
        </div>
      </header>

      {/* 리스트 */}
      <div className="flex-1 overflow-y-auto p-5">
        <ReportList reports={dummyReports} />
      </div>
    </main>
  );
}