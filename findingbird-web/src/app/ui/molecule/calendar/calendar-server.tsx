import CalendarClient from "./calendar-client";

type Record = {
  id: string;
  createdAt: string;
};

type DailyRecord = {
  date: number;
  hasRecords: boolean;
  records: Record[];
};

interface CalendarServerProps {
  year: number;
  month: number;
  dailyRecords: DailyRecord[];
}

// 서버 컴포넌트
export default function CalendarServer({ year, month, dailyRecords }: CalendarServerProps) {
  return (
    <div className="flex flex-col items-center">
      <CalendarClient 
        initialYear={year} 
        initialMonth={month} 
        initialDailyRecords={dailyRecords} 
      />
    </div>
  );
}
