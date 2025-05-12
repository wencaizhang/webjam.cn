'use client';

import AOS from 'aos';
import { ReactNode, useEffect, useRef } from 'react';

interface AnimatedContainerProps {
  children: ReactNode;
  animation?: string;
  className?: string;
}

export default function AnimatedContainer({
  children,
  animation = 'fade-up',
  className = '',
}: AnimatedContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 确保AOS已初始化
    if (typeof window !== 'undefined') {
      AOS.refresh();
    }
  }, []);

  return (
    <div ref={containerRef} data-aos={animation} className={className}>
      {children}
    </div>
  );
}
