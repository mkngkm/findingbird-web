// src/app/(..route)/recommendation/page.tsx
import { fetchTodayGoals, Bird } from '@/app/business/recommendation/recommendation.service';
import Header from '@/app/ui/components/header';
import BirdCard from '@/app/ui/components/bird/bird-card';
import { Dialog, DialogTrigger, DialogContent } from '@/app/ui/molecule/dialog/dialog';
import { Close as DialogClose } from '@radix-ui/react-dialog';
import Link from 'next/link';

export default async function RecommendationPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const districtParam = searchParams['district'];
  const goals = await fetchTodayGoals();

  return (
    <main className="min-h-screen bg-gray-100 p-5 relative">
      <Header title="AI 추천 목표" link="/home" />

      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {goals.map((goal) => {
          const bird: Bird = goal.bird;

          return (
            <Dialog key={bird.id}>
              <DialogTrigger asChild>
                <BirdCard bird={bird} />
              </DialogTrigger>
              <DialogContent title={bird.speciesName} description={bird.scientificName}>
                {/* 상단 닫기 버튼 */}
                <DialogClose asChild>
                  <button
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl"
                    aria-label="닫기"
                  >
                    ×
                  </button>
                </DialogClose>

                <div id="scrollableDiv" className="overflow-y-auto max-h-[54vh] pr-2 mt-2">
                  <img
                    src={bird.imageUrl}
                    alt={bird.speciesName}
                    className="mb-4 w-full h-auto object-cover rounded"
                  />
                  <h3 className="font-medium text-gray-700">형태특성</h3>
                  <p className="text-gray-600 mb-4">{bird.morphoTrait}</p>
                  <h3 className="font-medium text-gray-700">생태특성</h3>
                  <p className="text-gray-600">{bird.ecoTrait}</p>
                </div>

                {/* 관찰 기록하러 가기 */}
                <Link
                  href={`/record/add?recommendationId=${goal.id}`}
                  className="block w-full mt-6 bg-birdGreen700 text-white text-center py-2 rounded hover:bg-birdGreen800 transition"
                >
                  관찰 기록하러 가기
                </Link>
              </DialogContent>
            </Dialog>
          );
        })}
      </section>

      {/* 하단 중앙 플로팅 버튼 */}
      <Link
        href={`/recommendation/landing?district=${districtParam ?? ''}`}
        className="fixed bottom-14 left-1/2 -translate-x-1/2 bg-birdGreen700 text-white rounded-2xl p-3 flex items-center justify-center shadow-lg hover:bg-birdGreen800 transition z-50"
        aria-label="AI 목표 생성"
      >
        AI 목표 추가
      </Link>
    </main>
  );
}
