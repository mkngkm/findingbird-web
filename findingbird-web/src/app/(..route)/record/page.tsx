import CalendarServer from "@/app/ui/molecule/calendar/calendar-server";


const dummyDailyRecords = [
  { date: 1, hasRecords: true, records: [{ id: "1", createdAt: "2025-04-01 10:00:00" }] },
  { date: 2, hasRecords: false, records: [] },
  { date: 3, hasRecords: true, records: [{ id: "2", createdAt: "2025-04-03 15:30:00" }] },
  // 필요한 만큼 추가
];

export default async function RecordPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const year = Number(searchParams.year) || new Date().getFullYear();
  const month = Number(searchParams.month) || new Date().getMonth() + 1;

  const dailyRecords = dummyDailyRecords; // 더미 데이터 사용
  const hasAnyRecords = dailyRecords?.some((d) => d.hasRecords);

  return (
    <main>
      <div className="h-full flex flex-col justify-center">
        <div className="flex-1 overflow-y-auto p-5">
       
          {hasAnyRecords ? (
            <CalendarServer year={year} month={month} dailyRecords={dailyRecords} />
          ) : (
            <div>              
                <h2 className="text-lg font-semibold text-gray-700">기록이 없습니다.</h2>
              <p className="text-gray-500">기록을 추가해보세요!</p> 
              </div>          )}
            
        </div>
      </div>
    </main>
  );
}
