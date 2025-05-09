
import { redirect, useRouter } from 'next/navigation';
import LoginForm from './ui/components/auth/login-form';
import { cookies } from 'next/headers';
import bird from '@/app/assets/img/bird.png';
import Image from 'next/image';

export default function RootPage() {
  const token = cookies().get('accessToken')?.value;

  if (token) {
    // ✅ 로그인 되어있으면 /home으로 보냄
    redirect('/home');
  }

  return (
    <div className="flex flex-col items-center justify-center flex-1 overflow-y-auto px-6 py-12 bg-white">
      {/* 🐦 새 이미지 */}
      <div className="w-120 h-120 ">
        <Image
          src={bird}
          alt="귀여운 새"
          width={280}
          height={280}
          className="object-contain"
        />
      </div>

      {/* "새 보러 가자~!" 텍스트 */}
      <h1 className="text-4xl font-bold text-birdGreen700 mb-20">{"{새}^{*}보러가자!"}</h1>

      {/* 카카오 로그인 버튼 */}
      <div className="w-full max-w-xs">
        <LoginForm />
      </div>
    </div>
  );
}
