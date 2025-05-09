'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Form from '../../molecule/form/form-index';
import { createBirdRecord } from '@/app/business/record/record.service';

interface RecordAddFormProps {
  recommendationId: string | null;
}

export default function RecordAddForm({ recommendationId }: RecordAddFormProps) {
  const router = useRouter();

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [name, setName] = useState('');
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [district, setDistrict] = useState('');
  const [locationDescription, setLocationDescription] = useState('');

  return (
    <main>
      <div className="text-center font-semibold px-5 py-1 text-birdGreen400 mb-2 leading-tight">
        오늘 관찰한 새를 기록해보세요!
      </div>
      <Form
        id="bird-record-post"
        action={async (prevState, formData) => {
          if (imageFile) formData.append('image', imageFile);

          formData.set('name', name || '');
          formData.set('district', district);
          formData.set('size', size);
          formData.set('color', color);
          formData.set('locationDescription', locationDescription);
          formData.set('goalId', recommendationId || '');

          return await createBirdRecord(prevState, formData);
        }}
        failMessageControl="alert"
        onSuccess={() => {
          alert('기록이 추가되었습니다!');
          router.push('/record');
        }}
      >
        <div className="flex flex-col gap-5 p-4">
          <Form.TextInput
            id="name"
            label="새 이름"
            placeholder="(알 수 없는 경우 비워두세요)"
            value={name}
            onValueChange={setName}
          />

          <Form.TextInput
            id="district"
            label="자치구"
            required
            placeholder="예: 강남구"
            //placeholder="예: 서울특별시 강남구"
            value={district}
            onValueChange={setDistrict}
          />

          <Form.TextInput
            id="size"
            label="크기"
            required
            placeholder="예: 작음 / 중간 / 큼"
            value={size}
            onValueChange={setSize}
          />

          <Form.TextInput
            id="color"
            label="색상"
            required
            placeholder="예: 갈색, 회색 등"
            value={color}
            onValueChange={setColor}
          />

          <Form.TextArea
            id="locationDescription"
            label="발견 위치 설명"
            required
            placeholder="예: 학교 뒤편 잔디밭 근처"
            value={locationDescription}
            onValueChange={setLocationDescription}
          />

          <Form.Image
            id="image"
            label="사진 업로드"
            value={imageFile}
            required
            onImageChange={setImageFile}
          />

          <Form.SubmitButton label="기록 추가하기" className="w-full h-12 text-base" />
        </div>
      </Form>
    </main>
  );
}
