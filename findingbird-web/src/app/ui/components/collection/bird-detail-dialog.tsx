'use client';
import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { cn } from '@/app/utils/style/helper';
import { Bird } from './types';

interface BirdDetailDialogProps {
  bird: Bird | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function BirdDetailDialog({ bird, isOpen, onClose }: BirdDetailDialogProps) {
  if (!isOpen || !bird) return null;
  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={onClose}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 bg-black/50" />
        <DialogPrimitive.Content
          className={cn(
            'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
            'bg-white rounded-lg shadow-lg w-11/12 max-w-md p-6'
          )}
        >
          <DialogPrimitive.Title className="text-xl font-bold text-center mb-2">
            {bird.commonName}
          </DialogPrimitive.Title>
          <DialogPrimitive.Description className="text-sm text-center mb-4 italic">
            {bird.scientificName}
          </DialogPrimitive.Description>
          <div id="scrollableDiv" className="overflow-y-auto max-h-[54vh]">
            <img src={bird.imageUrl} alt={bird.commonName} className="w-full h-auto mb-4 rounded" />
            <h3 className="font-medium text-gray-700">형태특성</h3>
            <p className="text-gray-600 mb-4">{bird.morphology}</p>
            <h3 className="font-medium text-gray-700">생태특성</h3>
            <p className="text-gray-600">{bird.ecology}</p>
          </div>
          <DialogPrimitive.Close asChild>
            <button className="mt-4 w-full text-center py-2 bg-gray-100 rounded">닫기</button>
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}