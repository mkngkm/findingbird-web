"use client";

import { useState } from "react";
import RecordListItem from "../../components/record/record-list-item";
import CalendarModal from "./calendar-modal";

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
  initialYear: number;
  initialMonth: number;
  initialDailyRecords: DailyRecord[];
}

export default function CalendarClient({ initialYear, initialMonth, initialDailyRecords }: CalendarClientProps) {
  const [year, setYear] = useState(initialYear);
  const [month, setMonth] = useState(initialMonth);
  const [selectedRecords, setSelectedRecords] = useState<Record[]>([]);

  const firstDayOfMonth = new Date(year, month - 1, 1);
  const lastDayOfMonth = new Date(year, month, 0);

  const startDay = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();

  const daysArray: (number | null)[] = [];

  for (let i = 0; i < startDay; i++) {
    daysArray.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    daysArray.push(i);
  }

  const handleSelectDate = (date: number | null) => {
    if (date === null) return;
    const found = initialDailyRecords.find((d) => d.date === date);
    if (found) {
      setSelectedRecords(found.records);
    } else {
      setSelectedRecords([]);
    }
  };

  const changeMonth = (delta: number) => {
    let newMonth = month + delta;
    let newYear = year;
  
    if (newMonth > 12) {
      newMonth = 1;
      newYear += 1;
    }
    if (newMonth < 1) {
      newMonth = 12;
      newYear -= 1;
    }
  
    const today = new Date();
    const todayYear = today.getFullYear();
    const todayMonth = today.getMonth() + 1;
  
    // 이동하려는 년/월이 오늘 이후면 막기
    if (newYear > todayYear || (newYear === todayYear && newMonth > todayMonth)) {
      return; // 막아버려!
    }
  
    setMonth(newMonth);
    setYear(newYear);
    setSelectedRecords([]);
  };
  

  return (
    <>
      {/* 상단: 이전달 / 현재 연월 / 다음달 */}
      <div className="flex justify-between items-center w-full max-w-md mb-4 px-4">
        <button onClick={() => changeMonth(-1)}>&lt;</button>

        <CalendarModal year={year} month={month} setYear={setYear} setMonth={setMonth} />

        <button onClick={() => changeMonth(1)}>&gt;</button>
      </div>

      {/* 달력 */}
      <div className="grid grid-cols-7 gap-2 w-full max-w-md">
        {["일", "월", "화", "수", "목", "금", "토"].map((day, idx) => (
          <div key={idx} className="text-center text-gray-400">{day}</div>
        ))}

        {daysArray.map((day, idx) => {
          if (day === null) return <div key={idx} />;

          const record = initialDailyRecords.find((r) => r.date === day);

          return (
            <button
              key={idx}
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

      <RecordListItem records={selectedRecords} />
    </>
  );
}
