import Header from "@/app/ui/components/header";

// src/app/(..route)/record/detail/page.tsx
export default function RecordDetailPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const name = (searchParams.name ?? null) as string | null;
  const district = (searchParams.district ?? null) as string | null;
  const size = (searchParams.size ?? null) as string | null;
  const color = (searchParams.color ?? null) as string | null;
  const locationDescription = (searchParams.locationDescription ?? null) as string | null;
  const imageUrl = (searchParams.imageUrl ?? null) as string | null;

  return (
    <main className="flex-1 overflow-y-auto bg-gray-100">
      <Header title="기록 상세보기" link="/record" />
      <section className="bg-white rounded-lg shadow p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <img
          src={imageUrl || ''}
          alt={name ?? '기록 이미지'}
          className="w-full h-auto object-cover rounded"
        />

        <ul className="space-y-1 text-sm text-gray-700">
          <li><strong>새 이름:</strong> {name || '알 수 없음'}</li>
          <li><strong>자치구:</strong> {district}</li>
          <li><strong>크기:</strong> {size}</li>
          <li><strong>색상:</strong> {color}</li>
          <li><strong>위치 설명:</strong> {locationDescription}</li>
        </ul>
      </section>
    </main>
  );
}
