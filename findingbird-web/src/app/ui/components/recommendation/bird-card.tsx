'use client';
import React from 'react';
import { Bird } from './types';

interface BirdCardProps {
  bird: Bird;
  onSelect: (bird: Bird) => void;
}

export default function BirdCard({ bird, onSelect }: BirdCardProps) {
  return (
    <button
      onClick={() => onSelect(bird)}
      className="flex flex-col bg-white rounded-lg shadow overflow-hidden mb-4 focus:outline-none"
    >
      <div className="h-40 bg-gray-200">
        <img
          src={bird.imageUrl}
          alt={bird.commonName}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{bird.commonName}</h3>
        <p className="text-sm text-gray-500 italic">{bird.scientificName}</p>
      </div>
    </button>
  );
}
