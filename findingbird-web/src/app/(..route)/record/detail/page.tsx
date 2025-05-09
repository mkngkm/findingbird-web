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
    <main className="min-h-screen bg-gray-100 p-5">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">기록 상세</h1>
      </header>

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
