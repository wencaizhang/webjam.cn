'use client';

import AOS from 'aos';
import clsx from 'clsx';
import { useTheme } from 'next-themes';
import { ReactNode, useEffect } from 'react';
import { useWindowSize } from 'usehooks-ts';

import CommandPalette from '@/common/components/elements/CommandPalette';
import NowPlayingBar from '@/common/components/elements/NowPlayingBar';
import NowPlayingCard from '@/common/components/elements/NowPlayingCard';
import ProgressBar from '@/common/components/elements/ProgressBar';
import TopBar from '@/common/components/elements/TopBar';
import { CommandPaletteProvider } from '@/common/context/CommandPaletteContext';
import useHasMounted from '@/common/hooks/useHasMounted';
import { featureSwich } from '@/contents/siteMetadata';

export default function MainLayout({ children }: { children: ReactNode }) {
  const { resolvedTheme } = useTheme();
  const hasMounted = useHasMounted();
  const { width } = useWindowSize();
  const isMobile = width < 480;

  const isDarkTheme =
    hasMounted && (resolvedTheme === 'dark' || resolvedTheme === 'system');

  useEffect(() => {
    AOS.init({
      duration: 800,
      delay: 50,
      mirror: false, // 滚动时是否触发反向动画（设为false防止元素滚出视图时淡出）
    });
  }, []);

  const Spotify = () => {
    if (!featureSwich.spotify) {
      return null;
    }
    return isMobile ? <NowPlayingCard /> : <NowPlayingBar />;
  };

  return (
    <CommandPaletteProvider>
      {featureSwich.topBanner && <TopBar />}
      <div
        className={clsx(
          'max-w-6xl mx-auto lg:px-8',
          isDarkTheme ? 'dark:text-darkText' : ''
        )}
      >
        <CommandPalette />
        <ProgressBar />
        {children}
      </div>
      <Spotify />
    </CommandPaletteProvider>
  );
}
