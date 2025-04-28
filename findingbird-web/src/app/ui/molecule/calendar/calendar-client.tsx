"use client";

import { useState } from "react";
import RecordListItem from "../../components/record/record-list-item";

type Record = {
  id: string;
  createdAt: string;
};

type DailyRecord = {
  date: number;
  hasRecords: boolean;
  records: Record[];
};

interface CalendarClientProps {
  daysArray: (number | null)[];
  dailyRecords: DailyRecord[];
}

export default function CalendarClient({ daysArray, dailyRecords }: CalendarClientProps) {
  const [selectedRecords, setSelectedRecords] = useState<Record[]>([]);

  const handleSelectDate = (date: number | null) => {
    if (date === null) return;
    const found = dailyRecords.find((d) => d.date === date);
    if (found) {
      setSelectedRecords(found.records);
    } else {
      setSelectedRecords([]);
    }
  };

  const findRecordForDate = (date: number) => {
    return dailyRecords.find((record) => record.date === date);
  };

  return (
    <>
      <div className="grid grid-cols-7 gap-2 w-full max-w-md">
        {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
          <div key={day} className="text-center text-gray-400">{day}</div>
        ))}

        {daysArray.map((day, idx) => {
          if (day === null) return <div key={idx} />;

          const record = findRecordForDate(day);

          return (
            <button
              key={day}
              onClick={() => handleSelectDate(day)}
              className={`aspect-square flex items-center justify-center rounded-full
                ${record?.hasRecords ? "bg-blue-400 text-white" : "bg-gray-100 text-gray-500"}
                hover:scale-110 transition-transform`}
            >
              {day}
            </button>
          );
        })}
      </div>

      {/* 클릭한 기록 목록 */}
      <RecordListItem records={selectedRecords} />
    </>
  );
}
