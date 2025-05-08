// app/layout.tsx
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Script from 'next/script';
import './globals.css';
import { cn } from './utils/style/helper';
import TabBarWrapper from './ui/components/tabbar-wrapper'; // ✅ 분리된 TabBar

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
    <html lang="en">
      <body className={cn(globalFont.variable, 'font-pretendard')}>
        <Script
          strategy="beforeInteractive"
          src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_MAP_CLIENT_ID}&submodules=geocoder`}
        />
        <div className="pb-14">{children}</div>
        <TabBarWrapper /> {/* ✅ 클라이언트에서 조건 렌더링 */}
      </body>
    </html>
  );
}
