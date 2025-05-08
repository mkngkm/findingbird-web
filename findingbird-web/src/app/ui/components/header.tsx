import Image from 'next/image';
import IconBack from '../../assets/img/icon-back.svg';
import Link from 'next/link';

interface HeaderProps {
  title: string;
  link?: string | null;
}

export default function Header({ title, link }: HeaderProps) {
  return (
    <div className='p-5 flex items-center h-14 text-xl gap-2'>
      {link ? (
        <Link href={link}>
          <Image src={IconBack} alt='뒤로가기' />
        </Link>
      ) : null}
      <div>{title}</div>
    </div>
  );
}
