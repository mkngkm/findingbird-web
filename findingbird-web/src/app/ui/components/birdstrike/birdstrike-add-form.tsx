// src/app/ui/components/birdstrike/birdstrike-add-form.tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Form from '@/app/ui/molecule/form/form-index';
import { BirdstrikeReport } from './types';

export default function BirdstrikeAddForm() {
  const router = useRouter();

  // form state
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [birdCount, setBirdCount] = useState<number | ''>('');
  const [collisionSiteType, setCollisionSiteType] = useState('');
  const [mitigationApplied, setMitigationApplied] = useState(false);
  const [speciesInfo, setSpeciesInfo] = useState('');
  const [observationLocation, setObservationLocation] = useState('');
  const [description, setDescription] = useState('');

  async function createCollisionReport(prevState: any, formData: FormData) {
    try {
      // API 호출 예시
      console.log('조류 충돌 신고 데이터:', Object.fromEntries(formData.entries()));
      return { isSuccess: true, isFailure: false, message: null, validationError: {} };
    } catch (err) {
      return { isSuccess: false, isFailure: true, message: '등록 중 오류가 발생했습니다.', validationError: {} };
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 p-5">
      <header className="text-center font-semibold text-2xl text-birdGreen400 mb-6">
        조류 충돌 신고하기
      </header>

      <Form
        id="birdstrike-report-post"
        action={async (prevState, formData) => {
          if (imageFile) formData.append('image', imageFile);
          return await createCollisionReport(prevState, formData);
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
            type="number"
            required
            placeholder="충돌한 새 개체 수"
            value={birdCount}
            onValueChange={(v) => setBirdCount(Number(v) || '')}
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
            placeholder="예: 까치 (Pica pica)"
            value={speciesInfo}
            onValueChange={setSpeciesInfo}
          />

          <Form.TextInput
            id="observationLocation"
            label="관찰 위치"
            required
            placeholder="발견 위치를 입력하세요"
            value={observationLocation}
            onValueChange={setObservationLocation}
          />

          <Form.TextArea
            id="description"
            label="상세 설명"
            required
            placeholder="관찰 내용을 상세히 작성하세요"
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
