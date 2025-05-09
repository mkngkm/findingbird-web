'use client';
import * as React from 'react';
import { Bird } from '@/app/business/recommendation/recommendation.service'; // ✅ 타입 정확히 가져오기

export interface BirdCardProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  bird: Bird;
}

const BirdCard = React.forwardRef<HTMLButtonElement, BirdCardProps>(
  ({ bird, className = '', ...props }, ref) => (
    <button
      ref={ref}
      {...props}
      className={`flex flex-col bg-white rounded-lg shadow overflow-hidden mb-4 focus:outline-none ${className}`}
    >
      {/* 이미지 영역 */}
      <div className="h-40 bg-gray-200">
        <img
          src={bird.imageUrl}
          alt={bird.speciesName}
          className="object-cover w-full flex-1 overflow-y-auto"
        />
      </div>
      {/* 텍스트 영역 */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">
          {bird.speciesName}
        </h3>
        <p className="text-sm text-gray-500 italic">
          {bird.scientificName}
        </p>
      </div>
    </button>
  )
);

BirdCard.displayName = 'BirdCard';
export default BirdCard;
