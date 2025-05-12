'use client';

import { ReactNode } from 'react';

import HeaderTop from '@/common/components/layouts/header/HeaderTop';

export default function FullHeaderLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className='flex flex-col xl:pb-8'>
      <HeaderTop />
      <main className='transition-all duration-300'>{children}</main>
    </div>
  );
}
