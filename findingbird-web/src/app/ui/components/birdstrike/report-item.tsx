

import { Report } from '@/app/business/birdstrike/\bbirdstrike.service';
import Link from 'next/link';


export default function ReportItem({ report }: { report: Report }) {
  return (
    <Link
      href={`/birdstrike/detail?id=${report.id}`}
      className="block cursor-pointer bg-white p-4 rounded-lg shadow mb-2 hover:bg-gray-50"
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-800">{report.title}</h3>
          <p className="text-sm text-gray-500">{report.createdAt}</p>
        </div>
        <span className="text-sm text-gray-700">{report.nickname}</span>
      </div>
    </Link>
  );
}
