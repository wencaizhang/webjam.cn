'use client';

import { ReactNode } from 'react';

import HeaderTop from '@/common/components/layouts/header/HeaderTop';

export default function LayoutWithHeader({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className='max-w-6xl mx-auto flex flex-col xl:pb-8'>
      <HeaderTop />
      <main className='w-full transition-all duration-300'>{children}</main>
    </div>
  );
}
