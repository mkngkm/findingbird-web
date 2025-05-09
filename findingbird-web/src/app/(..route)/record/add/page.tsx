// src/app/(..route)/record/add/page.tsx
import Header from "@/app/ui/components/header";
import RecordAddForm from "@/app/ui/components/record/record-add-form";

export default function RecordAddPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const recommendationId = (searchParams.recommendationId ?? null) as string | null;


  return (
    <div className="flex-1 overflow-y-auto flex flex-col justify-center">
      <Header title="관찰 기록 추가하기" link="/record" />
      <div className="px-5 mb-10 mt-5">
        <RecordAddForm recommendationId={recommendationId} />
      </div>
    </div>
  );
}
