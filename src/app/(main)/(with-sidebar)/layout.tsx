'use client';

import { ReactNode } from 'react';

import HeaderSidebar from '@/common/components/layouts/header/HeaderSidebar';

export default function WithSidebarLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className='flex flex-col lg:flex-row lg:gap-5 lg:py-4 xl:pb-8'>
      <HeaderSidebar />
      <main className='lg:w-4/5 max-w-[854px] transition-all duration-300'>
        {children}
      </main>
    </div>
  );
}
