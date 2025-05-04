import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import { cn } from "./utils/style/helper";
import "antd/dist/reset.css";
import TabBar from "./ui/components/tabbar";

const globalFont = localFont({
  src: "./PretendardVariable.woff2",
  display: "swap",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: "Findingbird",
  description: "Findingbird",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(globalFont.variable, "font-pretendard")}>
        {/* ✅ 네이버 지도 SDK 전역 로딩 */}
        <Script
          strategy="beforeInteractive"
          src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_MAP_CLIENT_ID}`}
        />

        {/* ✅ 페이지 컨텐츠 */}
        <div className="pb-14">{children}</div>

        {/* ✅ 탭바 하단 고정 */}
        <TabBar />
      </body>
    </html>
  );
}
