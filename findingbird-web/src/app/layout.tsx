// app/layout.tsx
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Script from 'next/script';
import './globals.css';
import { cn } from './utils/style/helper';
import TabBarWrapper from './ui/components/tabbar-wrapper';

const globalFont = localFont({
  src: './PretendardVariable.woff2',
  display: 'swap',
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  title: 'Findingbird',
  description: 'Findingbird',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="flex justify-center"> {/* ✅ 데스크탑 중앙 정렬 */}
      <body
  className={cn(
    globalFont.variable,
    'font-dung w-full max-w-[420px] min-h-screen bg-white relative',
    'shadow-[0_0_5px_rgba(0,0,0,0.08)] rounded-xl overflow-hidden' // ✅ 미세 그림자
  )}
>

        <Script
          strategy="beforeInteractive"
          src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_MAP_CLIENT_ID}&submodules=geocoder`}
        />
        <div className="pb-14">{children}</div> {/* ✅ 하단 탭바 여백 확보 */}
        <TabBarWrapper /> {/* ✅ 고정된 너비 내에서 함께 렌더링 */}
      </body>
    </html>
  );
}
