// src/app/(..route)/recommendation/page.tsx
'use client';

import React, { useState } from 'react';
import BirdCard from '@/app/ui/components/recommendation/bird-card';
import BirdDetailDialog from '@/app/ui/components/recommendation/bird-detail-dialog';
import { Bird } from '@/app/ui/components/recommendation/types';

const dummyBirds: Bird[] = [
  {
    id: 1,
    imageUrl: '/images/birds/heron.jpg',
    commonName: '해오라기',
    scientificName: 'Nycticorax nycticorax',
    morphology: '몸길이는 57~65cm, 머리꼭대기에서 뒷목까지 흑색이며 등은 녹색을 띤 흑색.',
    ecology: '갈대밭, 호숫가, 하천, 습지 등지에서 생활하며 어류나 곤충 등을 먹음.',
  },
  {
    id: 2,
    imageUrl: '/images/birds/magpie.jpg',
    commonName: '까치',
    scientificName: 'Pica pica',
    morphology: '길이 약 45cm, 검은색과 흰색이 대비되는 깃털.',
    ecology: '농경지 주변, 도시 공원 등에 서식하며 잡식성.',
  },
  // ...추가 항목
];

export default function RecommendationPage() {
  const [selectedBird, setSelectedBird] = useState<Bird | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = (bird: Bird) => {
    setSelectedBird(bird);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedBird(null);
  };

  return (
    <main className="min-h-screen bg-gray-100 p-5">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">AI가 제안한 목표</h1>
      </header>
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {dummyBirds.map((bird) => (
          <BirdCard key={bird.id} bird={bird} onSelect={openDialog} />
        ))}
      </section>
      <BirdDetailDialog bird={selectedBird} isOpen={isDialogOpen} onClose={closeDialog} />
    </main>
  );
}
