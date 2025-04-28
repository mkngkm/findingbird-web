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

  return (
    <div className="flex flex-col items-center">
      <CalendarClient daysArray={daysArray} dailyRecords={dailyRecords} />
    </div>
  );
}
