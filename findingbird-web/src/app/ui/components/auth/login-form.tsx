'use client';

import AchromaticButton from "@/app/ui/atom/button/achromatic-button";

export default function LoginForm() {
  const handleKakaoLogin = () => {
    const callbackUrl = `${window.location.origin}/auth/callback`;
    const kakaoAuthUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/kakao?callback=${encodeURIComponent(callbackUrl)}`;
    window.location.href = kakaoAuthUrl;
  };

  return (
    <div className="flex flex-col gap-6 items-center">
      <AchromaticButton
        onClick={handleKakaoLogin}
        className="w-full h-12 bg-yellow-300 text-black font-semibold rounded-lg shadow"
      >
        카카오로 로그인
      </AchromaticButton>
    </div>
  );
}
