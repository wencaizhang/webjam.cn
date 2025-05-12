'use client';

import { ReactNode } from 'react';

import HeaderSidebar from '@/common/components/layouts/header/HeaderSidebar';

// <div className='flex flex-col lg:flex-row lg:gap-5 lg:py-4 xl:pb-8'>
export default function LayoutWithSidebar({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className='max-w-6xl mx-auto lg:px-8 flex flex-col lg:flex-row lg:gap-5 lg:py-4 xl:pb-8'>
      <HeaderSidebar />
      <main className='w-full lg:w-4/5 max-w-[854px] transition-all duration-300'>
        {children}
      </main>
    </div>
  );
}
