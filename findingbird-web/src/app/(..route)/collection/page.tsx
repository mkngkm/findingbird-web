'use client';
import React, { useState } from 'react';
import BirdCard from '@/app/ui/components/collection/bird-card';
import BirdDetailDialog from '@/app/ui/components/collection/bird-detail-dialog';
import { Bird } from '@/app/ui/components/collection/types';

const dummyBirds: Bird[] = [
    { id: 1, imageUrl: '/images/birds/large-billed-crow.jpg', commonName: '큰부리까마귀', scientificName: 'Corvus macrorhynchos', morphology: '몸길이 약 55cm, 짙은 검은색 깃털과 크고 강한 부리가 특징입니다.', ecology: '숲과 농경지 등 다양한 서식지에서 잡식성으로 생활합니다.' },
    { id: 2, imageUrl: '/images/birds/magpie.jpg', commonName: '까치', scientificName: 'Pica pica', morphology: '길이 약 45cm, 검은색과 흰색이 대비되는 깃털을 가집니다.', ecology: '도시 공원과 농경지 주변에서 잡식성으로 서식합니다.' },
    { id: 3, imageUrl: '/images/birds/rock-pigeon.jpg', commonName: '집비둘기', scientificName: 'Columba livia', morphology: '몸길이 약 32cm, 회색 바탕에 두 줄 흰색 무늬가 특징입니다.', ecology: '도시 및 농촌 지역에서 흔히 볼 수 있으며, 잡식성입니다.' },
    { id: 4, imageUrl: '/images/birds/turtle-dove.jpg', commonName: '멧비둘기', scientificName: 'Streptopelia orientalis', morphology: '길이 약 28cm, 회색 갈색 깃털과 흰색 목 깃이 특징입니다.', ecology: '숲가 및 농경지 주변에서 씨앗과 열매를 주로 먹습니다.' },
    { id: 5, imageUrl: '/images/birds/sparrow.jpg', commonName: '참새', scientificName: 'Passer montanus', morphology: '길이 약 14cm, 갈색과 회색이 섞인 작은 몸집을 가집니다.', ecology: '도심과 농경지 근처에서 곡물과 씨앗을 먹으며 서식합니다.' },
    { id: 6, imageUrl: '/images/birds/bulbul.jpg', commonName: '직박구리', scientificName: 'Pycnonotus sinensis', morphology: '길이 약 20cm, 올리브색 깃털과 검은 머리색이 특징입니다.', ecology: '과일과 곤충을 먹으며 산림 주변에서 서식합니다.' },
    { id: 7, imageUrl: '/images/birds/great-tit.jpg', commonName: '박새', scientificName: 'Parus major', morphology: '길이 약 14cm, 노란 배와 검은 머리 줄무늬가 특징입니다.', ecology: '숲과 공원에서 곤충과 씨앗을 먹습니다.' },
    { id: 8, imageUrl: '/images/birds/coal-tit.jpg', commonName: '쇠박새', scientificName: 'Periparus ater', morphology: '길이 약 11cm, 작은 머리와 두 줄 흰 깃 무늬가 특징입니다.', ecology: '침엽수림에서 곤충을 주로 사냥합니다.' },
    { id: 9, imageUrl: '/images/birds/daurian-redstart.jpg', commonName: '딱새', scientificName: 'Phoenicurus auroreus', morphology: '길이 약 14cm, 주황색과 검은색이 조화를 이룹니다.', ecology: '숲 가장자리와 정원에서 곤충을 잡아먹습니다.' },
    { id: 10, imageUrl: '/images/birds/bullfinch.jpg', commonName: '붉은머리오목눈이', scientificName: 'Carpodacus erythrinus', morphology: '길이 약 16cm, 밝은 빨간 머리와 회색 몸통을 가집니다.', ecology: '산림 가장자리에서 씨앗과 딸기를 먹습니다.' },
    { id: 11, imageUrl: '/images/birds/great-tit.jpg', commonName: '곤줄박이', scientificName: 'Parus monticolus', morphology: '길이 약 13cm, 흰 얼굴과 검은 머리띠를 가집니다.', ecology: '산림과 산책로 주변에서 곤충을 사냥합니다.' },
    { id: 12, imageUrl: '/images/birds/mallard.jpg', commonName: '청둥오리', scientificName: 'Anas platyrhynchos', morphology: '수컷은 녹색 머리와 회색 몸통, 암컷은 갈색 깃털을 가집니다.', ecology: '호수와 하천에서 수초와 작은 수생생물을 먹습니다.' },
    { id: 13, imageUrl: '/images/birds/white-cheeked-duck.jpg', commonName: '흰뺨검둥오리', scientificName: 'Chenonetta jubata', morphology: '흰 뺨과 검은 몸통, 짧은 부리가 특징입니다.', ecology: '호수와 해안가에서 물풀과 곤충을 먹습니다.' },
    { id: 14, imageUrl: '/images/birds/domestic-duck.jpg', commonName: '집오리', scientificName: 'Anas platyrhynchos domesticus', morphology: '가축화된 품종으로 다양한 색상과 체형을 가집니다.', ecology: '농장과 인공 연못에서 곡물과 식물성 사료를 먹습니다.' },
    { id: 15, imageUrl: '/images/birds/heron.jpg', commonName: '왜가리', scientificName: 'Ardea cinerea', morphology: '길이 약 90cm, 회색과 흰색 깃털, 긴 목과 다리가 특징입니다.', ecology: '습지와 하천에서 물고기와 양서류를 사냥합니다.' },
  ];
  

export default function CollectionPage() {
  const [selectedBird, setSelectedBird] = useState<Bird | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = (bird: Bird) => {
    setSelectedBird(bird);
    setIsOpen(true);
  };
  const closeDialog = () => setIsOpen(false);

  return (
    <main className="min-h-screen bg-gray-100 p-5">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">도감</h1>
      </header>
      <section className="grid grid-cols-3 gap-4">
        {dummyBirds.map((bird) => (
          <BirdCard key={bird.id} bird={bird} onClick={() => openDialog(bird)} />
        ))}
      </section>
      <BirdDetailDialog bird={selectedBird} isOpen={isOpen} onClose={closeDialog} />
    </main>
  );
}
