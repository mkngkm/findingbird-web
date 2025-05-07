'use client';

import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import LoginForm from './ui/components/auth/login-form';
import Image from 'next/image';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      router.replace('/home');
    }
  }, [router]);

  return (
    <div className='px-10 mb-10 flex flex-col items-center'>
      <div className="mt-8 w-full">
        <LoginForm />
      </div>
    </div>
  );
}
