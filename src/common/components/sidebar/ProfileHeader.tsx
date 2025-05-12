'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { MdVerified as VerifiedIcon } from 'react-icons/md';

import { author, siteMetadata } from '@/contents/siteMetadata';

import Image from '../elements/Image';
import Tooltip from '../elements/Tooltip';

interface ProfileHeaderProps {
  expandMenu: boolean;
  imageSize: number;
  isScrolled?: boolean;
}

const ProfileHeader = ({ expandMenu, imageSize }: ProfileHeaderProps) => {
  return (
    <div
      className={clsx(
        'flex items-center lg:items-start gap-4 lg:gap-0.5 grow lg:flex-col w-full',
        expandMenu && 'flex-col items-start!'
      )}
    >
      <Image
        src={siteMetadata.siteLogo}
        alt={author.name}
        width={expandMenu ? 80 : imageSize}
        height={expandMenu ? 80 : imageSize}
        rounded='rounded-full'
        className='lg:hover:scale-105'
      />
      <div className='flex gap-2 items-center mt-1 lg:mt-4'>
        <Link href='/' passHref>
          <h2 className='grow text-lg lg:text-xl font-sora font-medium'>
            {siteMetadata.siteShortTitle}
          </h2>
        </Link>
        <Tooltip title='Verified'>
          <VerifiedIcon size={18} className='text-blue-400' />
        </Tooltip>
      </div>
      <div className='hidden lg:flex text-sm font-sora text-neutral-600 hover:text-neutral-700 dark:text-neutral-500 dark:hover:text-neutral-400 transition-all duration-300'>
        @{author.name}
      </div>
    </div>
  );
};

export default ProfileHeader;
