// app/ui/components/tab-bar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/app/utils/style/helper';

const tabs = [
  { name: '홈', href: '/home' },
  { name: '조류충돌', href: '/birdstrike' },
  { name: '기록', href: '/record' },
];

export default function TabBar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white border-t shadow z-50">
      <div className="flex justify-around py-2">
        {tabs.map((tab) => {
          const isActive = pathname.startsWith(tab.href);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                'text-center flex-1 py-2 text-sm',
                isActive ? 'text-birdGreen600 font-bold' : 'text-gray-500'
              )}
            >
              {tab.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
