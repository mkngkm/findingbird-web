'use client';

import { Record } from '@/app/business/record/record.service';
import Link from 'next/link';

export default function RecordListItem({ records }: { records: Record[] }) {
  if (records.length === 0) {
    return <div className="mt-8 text-gray-400">선택한 날짜에 기록이 없습니다.</div>;
  }

  return (
    <div className="mt-8 flex flex-col items-center gap-2">
      {records.map((record) => {
        const query = new URLSearchParams({
          name: record.name ?? '',
          district: record.district,
          size: record.size,
          color: record.color,
          locationDescription: record.locationDescription,
          imageUrl: record.imageUrl,
        }).toString();

        return (
          <Link
            key={record.name}
            href={`/record/detail?${query}`}
            className="px-4 py-2 bg-gray-100 rounded-lg w-full max-w-md shadow-sm flex flex-row justify-between items-center hover:bg-gray-200 transition"
          >
            <div className="font-semibold text-lg">{record.name}</div>
            <div className="text-sm text-gray-500">{record.district}</div>
          </Link>
        );
      })}
    </div>
  );
}
