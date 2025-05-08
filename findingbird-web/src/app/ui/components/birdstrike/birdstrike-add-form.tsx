// src/app/ui/components/birdstrike/birdstrike-add-form.tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Form from '@/app/ui/molecule/form/form-index';
import { createBirdstrikeReport } from '@/app/business/birdstrike/\bbirdstrike.service';


export default function BirdstrikeAddForm() {
  const router = useRouter();

  // form state
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [birdCount, setBirdCount] = useState(''); // ✅ string 타입
  const [collisionSiteType, setCollisionSiteType] = useState('');
  const [mitigationApplied, setMitigationApplied] = useState(false);
  const [speciesInfo, setSpeciesInfo] = useState('');
  const [observationLocation, setObservationLocation] = useState('');
  const [description, setDescription] = useState('');

  return (
    <main className="min-h-screen bg-gray-100 p-5">
      
      <Form
        id="birdstrike-report-post"
        action={async (prevState, formData) => {
          if (imageFile) formData.append('image', imageFile);

          formData.set('title', title);
          formData.set('birdCount', String(Number(birdCount))); // ✅ 제출 시 숫자로 변환
          formData.set('collisionSiteType', collisionSiteType);
          formData.set('mitigationApplied', mitigationApplied ? 'true' : 'false');
          formData.set('speciesInfo', speciesInfo);
          formData.set('observationLocation', observationLocation);
          formData.set('description', description);

          return await createBirdstrikeReport(prevState, formData);
        }}
        failMessageControl="alert"
        onSuccess={() => {
          alert('신고가 등록되었습니다!');
          router.push('/birdstrike');
        }}
      >
        <div className="flex flex-col gap-5 p-4">
          <Form.TextInput
            id="title"
            label="제목"
            required
            placeholder="신고 제목을 입력하세요"
            value={title}
            onValueChange={setTitle}
          />

          <Form.TextInput
            id="birdCount"
            label="개체 수"
            required
            placeholder="충돌한 새 개체 수를 입력하세요"
            value={birdCount}
            onValueChange={setBirdCount}
          />

          <Form.TextInput
            id="collisionSiteType"
            label="충돌 장소 유형"
            required
            placeholder="예: 건물, 전봇대 등"
            value={collisionSiteType}
            onValueChange={setCollisionSiteType}
          />

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="mitigationApplied"
              checked={mitigationApplied}
              onChange={(e) => setMitigationApplied(e.target.checked)}
              className="w-4 h-4"
            />
            <label htmlFor="mitigationApplied" className="text-sm">
              저감 조치 적용 여부
            </label>
          </div>

          <Form.TextInput
            id="speciesInfo"
            label="생물종 정보"
            required
            placeholder="예: 까치"
            value={speciesInfo}
            onValueChange={setSpeciesInfo}
          />

          <Form.TextInput
            id="observationLocation"
            label="관찰 위치"
            required
            placeholder="예: 초등학교 유리창 앞 화단"
            value={observationLocation}
            onValueChange={setObservationLocation}
          />

          <Form.TextArea
            id="description"
            label="상세 설명"
            required
            placeholder="예: 충돌 흔적 있음, 사체 존재 등. 새 이름을 모를 경우 외관을 상세히 기입해 주세요."
            value={description}
            onValueChange={setDescription}
          />

          <Form.Image
            id="image"
            label="사진 업로드"
            required
            value={imageFile}
            onImageChange={setImageFile}
          />

          <Form.SubmitButton
            label="신고하기"
            className="w-full h-12 text-base"
          />
        </div>
      </Form>
    </main>
  );
}
