

import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { redirect, useRouter } from 'next/navigation';
import LoginForm from './ui/components/auth/login-form';
import Image from 'next/image';
import { cookies } from 'next/headers';

export default function RootPage() {
  const token = cookies().get('accessToken')?.value;

  if (token) {
    // ✅ 로그인 되어있으면 /home으로 보냄
    redirect('/home');
  }

  return (
    <div className='px-10 mb-10 flex flex-col items-center'>
      <div className="mt-8 w-full">
        <LoginForm />
      </div>
    </div>
  );
}
