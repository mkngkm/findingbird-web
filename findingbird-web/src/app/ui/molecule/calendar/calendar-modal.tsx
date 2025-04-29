"use client";

import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/app/utils/style/helper";
import { Dispatch, SetStateAction } from "react";

interface CalendarModalProps {
  year: number;
  month: number;
  setYear: Dispatch<SetStateAction<number>>;
  setMonth: Dispatch<SetStateAction<number>>;
}

export default function CalendarModal({ year, month, setYear, setMonth }: CalendarModalProps) {
  const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth() + 1;

  const yearMonthList = [];
  for (let y = todayYear; y >= todayYear - 1; y--) {
    for (let m = 12; m >= 1; m--) {
      if (y > todayYear || (y === todayYear && m > todayMonth)) {
        continue;
      }
      yearMonthList.push({ year: y, month: m });
    }
  }

  const handleSelectYearMonth = (y: number, m: number) => {
    setYear(y);
    setMonth(m);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="text-lg font-semibold cursor-pointer">
          {year}.{month.toString().padStart(2, "0")}
        </div>
      </DialogTrigger>

      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 bg-black/50" />
        <DialogPrimitive.Content
          className={cn(
            "fixed bottom-0 w-full bg-white rounded-t-lg p-6 animate-slideUp max-h-[40vh] overflow-y-auto",
          )}
        >
          {/* 모달 헤더 */}
          <div className="flex justify-between items-center mb-4">
            <DialogPrimitive.Title className="text-lg font-bold text-center w-full">월 선택하기</DialogPrimitive.Title>
            <DialogPrimitive.Close aria-label="Close" className="absolute top-4 right-4">
              ✕
            </DialogPrimitive.Close>
          </div>

          {/* 월 리스트 */}
          <ul>
            {yearMonthList.map(({ year: y, month: m }) => (
              <li
                key={`${y}-${m}`}
                onClick={() => handleSelectYearMonth(y, m)}
                className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                  year === y && month === m ? "text-blue-500 font-bold" : ""
                }`}
              >
                {y}년 {m.toString().padStart(2, '0')}월
              </li>
            ))}
          </ul>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </Dialog>
  );
}
