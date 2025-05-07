'use client';
import React from 'react';
import { Bird } from './types';


interface BirdDetailDialogProps {
  bird: Bird | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function BirdDetailDialog({ bird, isOpen, onClose }: BirdDetailDialogProps) {
  if (!isOpen || !bird) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4 overflow-hidden">
        <div className="relative h-48 bg-gray-100">
          <img
            src={bird.imageUrl}
            alt={bird.commonName}
            className="object-cover w-full h-full"
          />
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-xl text-gray-700 hover:text-gray-900"
            aria-label="닫기"
          >
            ×
          </button>
        </div>
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">{bird.commonName}</h2>
          <p className="text-sm text-gray-500 italic mb-4">{bird.scientificName}</p>
          <h3 className="font-medium text-gray-700">형태특성</h3>
          <p className="text-gray-600 mb-4">{bird.morphology}</p>
          <h3 className="font-medium text-gray-700">생태특성</h3>
          <p className="text-gray-600">{bird.ecology}</p>
        </div>
      </div>
    </div>
  );
}