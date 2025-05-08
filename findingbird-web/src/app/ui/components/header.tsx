// src/app/ui/components/Header.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import IconBack from '../../assets/img/icon-back.svg';

interface HeaderProps {
  title: string;
  link?: string | null;
}

export default function Header({ title, link }: HeaderProps) {
  return (
    <div className="relative p-5 h-14 flex items-center text-xl gap-2 shadow">
      {/* 백버튼: 좌측에 절대 위치 */}
      {link && (
        <Link
          href={link}
          className="absolute left-5 top-1/2 -translate-y-1/2"
        >
          <Image src={IconBack} alt="뒤로가기" />
        </Link>
      )}

      {/* 제목: 뷰포트 중앙에 절대 위치, 부모의 text-xl 상속 */}
      <h1
        className="
          absolute
          left-1/2
          top-1/2
          -translate-x-1/2
          -translate-y-1/2
        "
      >
        {title}
      </h1>
    </div>
  );
}
