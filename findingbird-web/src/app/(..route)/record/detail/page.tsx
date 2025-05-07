// src/app/(..route)/record/page.tsx
'use client';

import React, { useState } from 'react';
import { Dialog, DialogTrigger, DialogContent } from '@/app/ui/molecule/dialog/dialog';
import { Close as DialogClose } from '@radix-ui/react-dialog';
import BirdCard from '@/app/ui/components/bird/bird-card';

// RecordDetail 타입 정의
interface RecordDetail {
  id: number;
  date: string;                  // YYYY-MM-DD
  name: string | null;           // 발견한 새의 이름
  district: string;              // 자치구
  size: string;                  // 새의 크기
  color: string;                 // 새의 색상
  locationDescription: string;   // 위치 설명
  goalId: string | null;         // 목표 Id
  imageUrl: string;              // 사진 URL
}

// 더미 레코드 데이터
const dummyRecords: RecordDetail[] = [
  {
    id: 1,
    date: '2025-05-07',
    name: '집비둘기',
    district: '성북구',
    size: '중간',
    color: '회색',
    locationDescription: '한성대입구역 근처',
    goalId: 'goal-001',
    imageUrl: '/images/birds/rock-pigeon.jpg',
  },
  {
    id: 2,
    date: '2025-05-07',
    name: '직박구리',
    district: '성북구',
    size: '작음',
    color: '올리브그린',
    locationDescription: '성북천',
    goalId: null,
    imageUrl: '/images/birds/bulbul.jpg',
  },
  // ... 추가 레코드
];

export default function RecordPage() {
  const [selectedRecord, setSelectedRecord] = useState<RecordDetail | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = (rec: RecordDetail) => {
    setSelectedRecord(rec);
    setIsOpen(true);
  };
  const closeDialog = () => setIsOpen(false);

  // modified: 선택된 기록의 날짜, 자치구, id로 페이지 상단 헤더 타이틀 동적 설정
  const headerTitle = selectedRecord
    ? `${selectedRecord.date} ${selectedRecord.district} #${selectedRecord.id}`
    : '기록 상세 조회';

  return (
    <main className="min-h-screen bg-gray-100 p-5">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">{headerTitle}</h1>
      </header>

      <section className="grid grid-cols-1 gap-4">
        {dummyRecords.map((rec) => (
          <Dialog
            key={rec.id}
            open={isOpen && selectedRecord?.id === rec.id}
            onOpenChange={(open) => { if (!open) closeDialog(); }}
          >
            <DialogTrigger asChild>
              {/* modified: 클릭 시 openDialog 호출 */}
              <div onClick={() => openDialog(rec)}>
                <BirdCard // modified: 카드 가로 전체 사용을 위해 w-full 클래스 추가
                  className="w-full"
                  
                  bird={{
                    id: rec.id,
                    imageUrl: rec.imageUrl,
                    commonName: rec.name ?? '(알 수 없음)',
                    scientificName: rec.district,
                    morphology: '',
                    ecology: '',
                  }}
                />
              </div>
            </DialogTrigger>
            <DialogContent>
              <img
                src={rec.imageUrl}
                alt={rec.name ?? ''}
                className="mb-4 w-full h-auto object-cover rounded"
              />
              <ul className="space-y-2">
                <li><strong>새 이름:</strong> {rec.name ?? '알 수 없음'}</li>
                <li><strong>크기:</strong> {rec.size}</li>
                <li><strong>색상:</strong> {rec.color}</li>
                <li><strong>위치 설명:</strong> {rec.locationDescription}</li>
                <li><strong>목표 ID:</strong> {rec.goalId ?? '없음'}</li>
              </ul>
              <DialogClose asChild>
                <button className="w-full mt-4 text-center text-gray-700 hover:text-gray-900">
                  닫기
                </button>
              </DialogClose>
            </DialogContent>
          </Dialog>
        ))}
      </section>
    </main>
  );
}
