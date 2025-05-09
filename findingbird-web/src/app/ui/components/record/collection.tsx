// src/app/ui/components/record/Collection.tsx
'use client';

import { useEffect, useState } from 'react';
import { getBirdsInCollection } from '@/app/business/collection/collection.service';
import { toDialogBird } from '@/app/business/collection/birdAdapter';
import type { Bird as DialogBird } from '@/app/ui/components/bird/types';

import { Dialog, DialogTrigger, DialogContent } from '@/app/ui/molecule/dialog/dialog';
import { Close as DialogClose } from '@radix-ui/react-dialog';
import BirdCard from '../bird/bird-card';

export default function Collection() {
  const [birds, setBirds] = useState<DialogBird[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const apiBirds = await getBirdsInCollection();
      const converted = apiBirds.map((bird) => toDialogBird(bird));
      setBirds(converted);
    };

    fetchData();
  }, []);

  return (
    <section className="min-h-screen bg-gray-100 p-5">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">도감</h1>
      </header>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {birds.map((bird) => (
          <Dialog key={bird.id}>
            <DialogTrigger asChild>
              <BirdCard bird={bird} />
            </DialogTrigger>

            <DialogContent title={bird.speciesName} description={bird.scientificName}>
              <div id="scrollableDiv" className="max-h-[54vh] overflow-y-auto pr-2">
                <img
                  src={bird.imageUrl}
                  alt={bird.speciesName}
                  className="mb-4 w-full rounded object-cover"
                />

                <h3 className="font-medium text-gray-700">형태특성</h3>
                <p className="mb-4 text-gray-600">{bird.morphoTrait}</p>

                <h3 className="font-medium text-gray-700">생태특성</h3>
                <p className="text-gray-600">{bird.ecoTrait}</p>
              </div>

              <DialogClose asChild>
                <button className="mt-4 w-full text-center text-gray-700 hover:text-gray-900">
                  닫기
                </button>
              </DialogClose>
            </DialogContent>
          </Dialog>
        ))}
      </section>
    </section>
  );
}
