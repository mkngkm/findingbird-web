'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CalendarModal from "./calendar-modal";
import RecordListItem from "../../components/record/record-list-item";
import GoalListItem from "../../components/record/goal-list-item";
import { fetchDailyCalendar, DailyRecord, Goal, Record } from "@/app/business/record/record.service";
import { FaPlus } from "react-icons/fa6"; // ⬅️ 상단에 추가


export default function CalendarClient() {
  const router = useRouter();
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [dailyRecords, setDailyRecords] = useState<DailyRecord[]>([]);
  const [selectedRecords, setSelectedRecords] = useState<Record[]>([]);
  const [selectedGoals, setSelectedGoals] = useState<Goal[]>([]);
  const [selectedTab, setSelectedTab] = useState<'기록' | '지난 목표'>('기록');

  useEffect(() => {
    const fetchData = async () => {
      const records = await fetchDailyCalendar(year, month);
      setDailyRecords(records);
  
      const todayDate = today.getDate();
      const found = records.find((d) => d.date === todayDate);
  
      if (found) {
        setSelectedRecords(found.records);
        setSelectedGoals(found.goals);
      } else {
        setSelectedRecords([]);
        setSelectedGoals([]);
      }
  
      setSelectedTab('기록'); // 항상 기록 탭으로 초기화
    };
  
    fetchData();
  }, [year, month]);
  

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

    const now = new Date();
    if (newYear > now.getFullYear() || (newYear === now.getFullYear() && newMonth > now.getMonth() + 1)) {
      return;
    }

    setYear(newYear);
    setMonth(newMonth);
  };

  const handleSelectDate = (date: number | null) => {
    if (date === null) return;
    const found = dailyRecords.find((d) => d.date === date);
    if (found) {
      setSelectedRecords(found.records);
      setSelectedGoals(found.goals);
    } else {
      setSelectedRecords([]);
      setSelectedGoals([]);
    }
    setSelectedTab('기록');
  };

  const firstDay = new Date(year, month - 1, 1).getDay();
  const daysInMonth = new Date(year, month, 0).getDate();
  const daysArray = [...Array(firstDay).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];

  return (
    <div className="relative pb-20"> {/* 플로팅 버튼 공간 확보 */}
      {/* 상단 연/월 변경 */}
      <div className="flex justify-between items-center w-full max-w-md mb-4 px-4 text-2xl font-semibold">        <button onClick={() => changeMonth(-1)}>&lt;</button>
        <CalendarModal year={year} month={month} setYear={setYear} setMonth={setMonth} />
        <button onClick={() => changeMonth(1)}>&gt;</button>
      </div>

      {/* 달력 */}
      <div className="grid grid-cols-7 gap-2 w-full max-w-md">
        {["일", "월", "화", "수", "목", "금", "토"].map((day, idx) => (
          <div key={idx} className="text-center text-gray-400">{day}</div>
        ))}
        {daysArray.map((day, idx) => {
          if (!day) return <div key={idx} />;
          const record = dailyRecords.find((r) => r.date === day);
          return (
            <button
              key={idx}
              onClick={() => handleSelectDate(day)}
              className={`aspect-square flex items-center justify-center rounded-full
                ${record?.hasRecords ? "bg-birdGreen600 text-white" : "bg-gray-100 text-gray-500"}
                hover:scale-110 transition-transform`}
            >
              {day}
            </button>
          );
        })}
      </div>

      {/* 기록/목표 탭 */}
      <div className="mt-6 flex justify-center space-x-4">
        <button
          className={`px-4 py-2 text-sm rounded-full ${selectedTab === '기록' ? 'bg-birdGreen400 text-white' : 'bg-gray-200'}`}
          onClick={() => setSelectedTab('기록')}
        >
          기록
        </button>
        <button
          className={`px-4 py-2 text-sm rounded-full ${selectedTab === '지난 목표' ? 'bg-birdGreen00 text-white' : 'bg-gray-200'}`}
          onClick={() => setSelectedTab('지난 목표')}
        >
          지난 목표
        </button>
      </div>

      {/* 내용 */}
      <div className="mt-4 w-full max-w-md">
        {selectedTab === '기록' ? (
          selectedRecords.length > 0 ? (
            <RecordListItem records={selectedRecords} />
          ) : (
            <div className="text-center text-gray-400 mt-4">해당 날짜에 기록이 없습니다.</div>
          )
        ) : (
          selectedGoals.length > 0 ? (
            <GoalListItem goals={selectedGoals} />
          ) : (
            <div className="text-center text-gray-400 mt-4">해당 날짜에 목표가 없습니다.</div>
          )
        )}
      </div>

      {/* ✅ 플로팅 버튼 */}
      <button
        onClick={() => router.push('/record/add')}
        className="fixed bottom-14 right-8 bg-birdGreen700 text-white rounded-full w-12 h-12 my-5  flex items-center justify-center shadow-lg hover:bg-birdGreen700 transition"
        aria-label="기록 추가하기"
      >
         <FaPlus className="w-5 h-5" /> {/* ✅ 아이콘으로 교체 */}
      </button>
    </div>
  );
}
