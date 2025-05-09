'use client';

import * as React from 'react';
import { Bird } from '@/app/business/recommendation/recommendation.service';

export interface BirdCardProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  bird: Bird;
}

export default function BirdCard({ bird, className = '', ...props }: BirdCardProps) {
  return (
    <button
      {...props}
      className={`flex flex-col p-2 bg-white rounded-lg shadow overflow-hidden mb-4 focus:outline-none ${className}`}
    >
      {/* 이미지 영역 */}
      <div className="h-40 bg-white flex items-center justify-center p-2">
        <img
          src={bird.imageUrl}
          alt={bird.speciesName}
          className="object-contain w-full h-full"
        />
      </div>

      {/* 텍스트 영역 */}
      <div className="p-2">
        <h3 className="text-lg font-semibold text-gray-800">
          {bird.speciesName}
        </h3>
        <p className="text-sm text-gray-500 italic">
          {bird.scientificName}
        </p>
      </div>
    </button>
  );
}
