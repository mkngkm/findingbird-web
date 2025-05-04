'use client';

import React from 'react';
import ReportList from '@/app/ui/components/birdstrike/report-list';
import { Report } from '@/app/business/birdstrike/types';
import Header from '@/app/ui/components/header';

// 샘플 데이터 (추후 API 연동)
const dummyReports: Report[] = [
  { id: 1, title: '도심에서 한미 물총새 충돌 목격', date: '2025-04-10', author: '홍길동' },
  { id: 2, title: '공원 산책 중 까치 충돌 신고', date: '2025-04-08', author: '김철수' },
  // ... 추가 데이터
];

export default function BirdstrikePage() {
  return (
    <main className="min-h-screen bg-gray-100 flex flex-col">
      <Header title="조류 충돌 신고 목록" link="/home" />
      <div className="flex-1 overflow-y-auto p-4">
        <ReportList reports={dummyReports} />
      </div>
    </main>
  );
}