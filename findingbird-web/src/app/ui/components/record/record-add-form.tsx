'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Form from '../../molecule/form/form-index';
import { createBirdRecord } from '@/app/business/record/record.service';

export default function RecordAddForm() {
  const router = useRouter();

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [name, setName] = useState('');
  const [coordinate, setCoordinate] = useState('');
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [locationDescription, setLocationDescription] = useState('');
  const [isSuggested, setIsSuggested] = useState(false);

  return (
    <main>
      <div className="text-center font-semibold text-2xl text-birdGreen400 mb-6">
        오늘 새를 발견하셨나요?
      </div>
      <Form
        id="bird-record-post"
        action={async (prevState, formData) => {
          if (imageFile) {
            formData.append('image', imageFile);
          }
          formData.set('name', name || '');
          formData.set('coordinate', coordinate);
          formData.set('size', size);
          formData.set('color', color);
          formData.set('locationDescription', locationDescription);
          formData.set('isSuggested', isSuggested ? 'on' : '');

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
            id="coordinate"
            label="자치구"
            required
            placeholder="예: 서울특별시 강남구"
            value={coordinate}
            onValueChange={setCoordinate}
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
            label="위치 설명"
            required
            placeholder="발견한 위치에 대해 설명해 주세요."
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

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="isSuggested"
              checked={isSuggested}
              onChange={(e) => setIsSuggested(e.target.checked)}
              className="w-4 h-4"
            />
            <label htmlFor="isSuggested" className="text-sm">
              AI가 추천한 새인가요?
            </label>
          </div>

          <Form.SubmitButton label="기록 추가하기" className="w-full h-12 text-base" />
        </div>
      </Form>
    </main>
  );
}
