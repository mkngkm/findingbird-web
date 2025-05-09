export const dynamic = 'force-dynamic'
import Link from 'next/link';
import Header from '@/app/ui/components/header';
import ReportItem from '@/app/ui/components/birdstrike/report-item';

import { FaPlus } from 'react-icons/fa6';
import { fetchBirdstrikeList, Report } from '@/app/business/birdstrike/\bbirdstrike.service';

export default async function BirdstrikePage() {
  const reports = await fetchBirdstrikeList();

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col">
      <Header title="조류 충돌 신고 목록" />
{/* ✅ 교육용 외부 링크 배너 */}
<a
        href="https://ecoarchive.org/items/show/60006"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-birdGreen700 text-white px-4 py-3 flex justify-between items-center w-full"
      >
        <div className="text-base font-semibold">조류 충돌 방지</div>
        <div className="text-sm bg-white text-birdGreen700 font-semibold px-3 py-1 rounded">
          자세히 알아보기 →
        </div>
      </a>
      
      <div className="flex-1 overflow-y-auto p-4">
        
        <div className="mx-auto">
          {reports && reports.length > 0 ? (
            reports.map((report: Report) => <ReportItem key={report.id} report={report} />)
          ) : (
            <div className="text-gray-500 text-center">조류 충돌 신고가 없습니다.</div>
          )}
        </div>
      </div>

      {/* ✅ 플로팅 버튼 */}
      <Link
        href="/birdstrike/add"
        className="fixed bottom-14 right-8 bg-birdGreen700 text-white rounded-full w-12 h-12 my-5 flex items-center justify-center shadow-lg hover:bg-birdGreen700 transition"
        aria-label="조류 충돌 신고 추가"
      >
        <FaPlus className="w-5 h-5" />
      </Link>
    </main>
  );
}
