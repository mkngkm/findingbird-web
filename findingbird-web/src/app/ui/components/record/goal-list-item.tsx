'use client';

import { Goal } from '@/app/business/record/record.service';
import { Dialog, DialogTrigger, DialogContent } from '@/app/ui/molecule/dialog/dialog';
import { Close as DialogClose } from '@radix-ui/react-dialog';

export default function GoalListItem({ goals }: { goals: Goal[] }) {
  if (goals.length === 0) {
    return <div className="text-center text-gray-400">지난 목표가 없습니다.</div>;
  }

  return (
    <ul className="mt-2 space-y-2">
      {goals.map((goal) => {
        const bird = goal.bird;

        return (
          <Dialog key={goal.id}>
            <DialogTrigger asChild>
              <li className="p-4 rounded border shadow-sm bg-white flex flex-row justify-between items-center cursor-pointer hover:bg-gray-50 transition">
                <div className="font-semibold">{bird.speciesName}</div>
                <div className="text-xs text-gray-400">
                  {goal.isCompleted ? '완료됨' : '미완료'}
                </div>
              </li>
            </DialogTrigger>

            <DialogContent title={bird.speciesName} description={bird.scientificName}>
              <DialogClose asChild>
                <button
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl"
                  aria-label="닫기"
                >
                  ×
                </button>
              </DialogClose>

              <div className="overflow-y-auto max-h-[54vh] pr-2 mt-2">
                <img
                  src={bird.imageUrl}
                  alt={bird.speciesName}
                  className="mb-4 w-full h-auto object-cover rounded"
                />

                <h3 className="font-medium text-gray-700">형태특성</h3>
                <p className="text-gray-600 mb-4">{bird.morphoTrait}</p>

                <h3 className="font-medium text-gray-700">생태특성</h3>
                <p className="text-gray-600">{bird.ecoTrait}</p>
              </div>
            </DialogContent>
          </Dialog>
        );
      })}
    </ul>
  );
}
