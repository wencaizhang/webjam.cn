import { useTheme } from 'next-themes';

import Image from '@/common/components/elements/Image';
import { siteMetadata } from '@/contents/siteMetadata';
const TopBar = () => {
  const { resolvedTheme } = useTheme();

  const lightBg = 'linear-gradient(to right, #ffc3a0 0%, #ffafbd 100%)';
  const darkBg = 'linear-gradient(to top, #b224ef 0%, #7579ff 100%)';
  const bg = resolvedTheme === 'light' ? lightBg : darkBg;

  return (
    <div
      className='hidden xl:flex gap-x-2 items-center justify-center p-2.5 shadow-lg backdrop-blur-2xl bg-no-repeat bg-cover text-sm dark:text-neutral-300 dark:border-b dark:border-neutral-800'
      style={{ backgroundImage: bg }}
    >
      <span>🌟🍺✨🎉</span>
      <span>你好，2025</span>
      <span>🎉✨🍺🌟</span>
      <a
        href={siteMetadata.siteUrl}
        target='_blank'
        className='ml-0.5 underline'
      >
        {siteMetadata.siteTitle}
      </a>
      <Image
        src='/images/dot_new_animated.svg'
        width={30}
        height={30}
        alt='new'
      />
    </div>
  );
};

export default TopBar;
