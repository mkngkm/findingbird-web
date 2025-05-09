// src/app/(..route)/recommendation/page.tsx
import { fetchTodayGoals, Bird } from '@/app/business/recommendation/recommendation.service';
import BirdCard from '@/app/ui/components/bird/bird-card';
import Header from '@/app/ui/components/header';
import AddGoalButton from '@/app/ui/components/recommendation/add-goal-button';
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
    <main className="flex-1 overflow-y-auto bg-gray-100 flex flex-col">
      <Header title="AI 추천 목표" link="/home" />
{/* ✅ 교육용 외부 링크 배너 */}
<a
        href="https://parks.seoul.go.kr/ecoinfo/ecology/wild.do"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-birdGreen700 text-white px-4 py-3 flex justify-between items-center w-full mb-5"
      >
        <div className="text-base font-semibold">서울시의 환경생태는?</div>
        <div className="text-sm bg-white text-birdGreen700 font-semibold px-3 py-1 rounded">
          자세히 →
        </div>
      </a>
      <section className="grid grid-cols-1 gap-4">
  {goals.length === 0 ? (
    <div className="col-span-full text-center text-gray-500 py-10">
      아직 제안된 목표가 없습니다.<br />
      아래 버튼을 눌러 AI 목표를 추가해보세요!<br />
      (하루 최대 3번까지 가능합니다)
    </div>
  ) : (
    goals.map((goal) => {
      const bird: Bird = goal.bird;

      return (
        <Dialog key={bird.id}>
          <DialogTrigger asChild>
            <BirdCard bird={bird} />
          </DialogTrigger>
          <DialogContent title={bird.speciesName} description={bird.scientificName}>
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

            <Link
              href={`/record/add?recommendationId=${goal.id}`}
              className="block w-full mt-6 bg-birdGreen700 text-white text-center py-2 rounded hover:bg-birdGreen800 transition"
            >
              관찰 기록하러 가기
            </Link>
          </DialogContent>
        </Dialog>
      );
    })
  )}
</section>
       <AddGoalButton districtParam={districtParam} />
    </main>
  );
}
