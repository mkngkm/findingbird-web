// src/app/(..route)/recommendation/[id]/page.tsx
import { getRecommendationById } from '@/app/business/recommendation/recommendation.service';
import BirdDetailDialog from '@/app/ui/components/bird/bird-detail-dialog';
import { toDialogBird } from '@/app/business/recommendation/birdAdapter';
import { redirect } from 'next/navigation';

export default async function RecommendationPage({
  params,
}: {
  params: { id: string };
}) {
  const data = await getRecommendationById(params.id);
  if (!data) redirect('/recommendation');

  // 🔄 API Bird → Dialog Bird
  const dialogBird = toDialogBird(data.bird);

  return (
    <BirdDetailDialog
      bird={dialogBird}
      isOpen={true}
      onClose={() => redirect('/recommendation')}
    />
  );
}