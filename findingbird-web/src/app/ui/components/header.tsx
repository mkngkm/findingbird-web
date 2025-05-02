import Image from 'next/image';
import IconBack from '../../assets/img/icon-back.svg';
import Link from 'next/link';

interface HeaderProps {
  title: string;
  link: string;
}

export default function Header({ title, link }: HeaderProps) {
  return (
    <div className='p-5 flex justify-start items-center h-14 text-xl gap-1'>
        <Link href={link}>
            <Image src={IconBack} alt='뒤로가기' />
        </Link>
      <div>{title}</div>
    </div>
  );
}
