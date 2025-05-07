'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import TabBar from './tabbar';

export default function TabBarWrapper() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hiddenRoutes = ['/', '/auth/login', '/auth/signup', '/auth/callback'];
    setShow(!hiddenRoutes.includes(pathname));
  }, [pathname]);

  return show ? <TabBar /> : null;
}
