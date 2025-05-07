// src/app/(..route)/recommendation/page.tsx
'use client';
import React from 'react';
import { Dialog, DialogTrigger, DialogContent } from '@/app/ui/molecule/dialog/dialog';
import { Close as DialogClose } from '@radix-ui/react-dialog';
import BirdCard from '@/app/ui/components/bird/bird-card';
import { Bird } from '@/app/ui/components/bird/types';
import Header from '@/app/ui/components/header';


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
];

export default function RecommendationPage() {
  return (
    <main className="min-h-screen bg-gray-100 p-5">
      <Header title="AI 추천 목표" link="/home" />
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {dummyBirds.map((bird) => (
          <Dialog key={bird.id}>
            <DialogTrigger asChild>
              <BirdCard bird={bird} variant="ghost" size="default" />
            </DialogTrigger>
            <DialogContent title={bird.commonName} description={bird.scientificName}>
              <div id="scrollableDiv" className="overflow-y-auto max-h-[54vh] pr-2">
                <img
                  src={bird.imageUrl}
                  alt={bird.commonName}
                  className="mb-4 w-full h-auto object-cover rounded"
                />
                <h3 className="font-medium text-gray-700">형태특성</h3>
                <p className="text-gray-600 mb-4">{bird.morphology}</p>
                <h3 className="font-medium text-gray-700">생태특성</h3>
                <p className="text-gray-600">{bird.ecology}</p>
              </div>
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
