'use client';

import CalendarServer from "@/app/ui/molecule/calendar/calendar-server";
import { useState } from "react";
import TextToggleButton from "@/app/ui/atom/toggle/text-toggle-button";
import Encyclopedia from "@/app/ui/components/record/encyclopedia";

const dummyDailyRecords = [
  { date: 1, hasRecords: true, records: [{ id: "1", createdAt: "2025-04-01 10:00:00" }] },
  { date: 2, hasRecords: false, records: [] },
  { date: 3, hasRecords: true, records: [{ id: "2", createdAt: "2025-04-03 15:30:00" }] },
];

export default function RecordPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const [showEncyclopedia, setShowEncyclopedia] = useState(false);

  const year = Number(searchParams.year) || new Date().getFullYear();
  const month = Number(searchParams.month) || new Date().getMonth() + 1;

  const dailyRecords = dummyDailyRecords;
  const hasAnyRecords = dailyRecords?.some((d) => d.hasRecords);

  return (
    <main>
      <div className="h-full flex flex-col justify-center">
        <div className="flex-1 overflow-y-auto p-5">
          
          {/* 기록/도감 토글 */}
          <div className="flex justify-center mb-6">
            <TextToggleButton text="기록/도감" onToggle={(active) => setShowEncyclopedia(active)} />
          </div>

          {/* 토글 결과 보여주기 */}
          {!showEncyclopedia ? (
            hasAnyRecords ? (
              <CalendarServer year={year} month={month} dailyRecords={dailyRecords} />
            ) : (
              <div className="text-center">
                <h2 className="text-lg font-semibold text-gray-700">기록이 없습니다.</h2>
                <p className="text-gray-500">기록을 추가해보세요!</p>
              </div>
            )
          ) : (
            <Encyclopedia />
          )}

        </div>
      </div>
    </main>
  );
}
