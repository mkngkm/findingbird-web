interface CalendarHeaderProps {
    year: number;
    month: number;
    onPrevMonth?: () => void;
    onNextMonth?: () => void;
  }
  
  export default function CalendarHeader({ year, month, onPrevMonth, onNextMonth }: CalendarHeaderProps) {
    return (
      <div className="flex items-center justify-between w-full max-w-md mb-4">
        {/* 이전 월 버튼 */}
        <button
          onClick={onPrevMonth}
          disabled={!onPrevMonth}
          className="p-2 rounded-full hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          ◀️
        </button>
  
        {/* 연도 / 월 */}
        <div className="text-center">
          <div className="text-gray-400 text-sm">{year}</div>
          <div className="text-2xl font-bold">{month}월</div>
        </div>
  
        {/* 다음 월 버튼 */}
        <button
          onClick={onNextMonth}
          disabled={!onNextMonth}
          className="p-2 rounded-full hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          ▶️
        </button>
      </div>
    );
  }
  