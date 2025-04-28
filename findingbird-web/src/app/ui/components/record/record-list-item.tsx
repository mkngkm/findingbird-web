"use client";

type Record = {
  id: string;
  createdAt: string;
};

export default function RecordListItem({ records }: { records: Record[] }) {
  if (records.length === 0) {
    return (
      <div className="mt-8 text-gray-400">선택한 날짜에 기록이 없습니다.</div>
    );
  }

  return (
    <div className="mt-8 flex flex-col items-center gap-2">
      {records.map((record) => (
        <div
          key={record.id}
          className="px-4 py-2 bg-gray-100 rounded-lg w-full max-w-md shadow-sm"
        >
          {record.createdAt}
        </div>
      ))}
    </div>
  );
}
