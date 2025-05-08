'use client';

import Header from "@/app/ui/components/header";
import RecordAddForm from "@/app/ui/components/record/record-add-form";
import { useSearchParams } from 'next/navigation';

export default function RecordAddPage() {
  const searchParams = useSearchParams();
  const recommendationId = searchParams.get('recommendationId');

  return (
    <div className="h-full flex flex-col justify-center">
      <Header title="기록 추가" link="/record" />
      <div className="px-5 mb-10 mt-5">
        {/* ✅ prop으로 넘기기 */}
        <RecordAddForm recommendationId={recommendationId} />
      </div>
    </div>
  );
}
