import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { BiCommand as CommandIcon } from 'react-icons/bi';
import { FiMenu as MenuIcon } from 'react-icons/fi';
import {
  MdClose as CloseIcon,
  MdVerified as VerifiedIcon,
} from 'react-icons/md';

import { CommandPaletteContext } from '@/common/context/CommandPaletteContext';
import { MENU_ITEMS } from '@/contents/menu';
import { author, siteMetadata } from '@/contents/siteMetadata';

import Image from '../../elements/Image';
import ThemeToggleButton from '../../elements/ThemeToggleButton';
import Tooltip from '../../elements/Tooltip';
import Profile from '../../sidebar/Profile';
import useIsMobile from '../../../hooks/useIsMobile';

const HeaderTop = () => {
  const { setIsOpen } = useContext(CommandPaletteContext);
  const [showMenu, setShowMenu] = useState(false);

  const router = useRouter();
  const isMobile = useIsMobile();

  const menus = MENU_ITEMS.filter(
    (item) => item.isShow && item.title !== 'Home'
  );

  return (
    <header>
      <div className='hidden lg:flex gap-5 items-center justify-between py-8 mx-8'>
        <div className='flex items-center gap-5'>
          <Link href='/' passHref>
            <Image
              src={siteMetadata.siteLogo}
              alt={author.name}
              width={40}
              height={40}
              rounded='rounded-full'
              className='lg:hover:scale-105'
            />
          </Link>
          {!showMenu && (
            <div className='flex items-center gap-3'>
              <Link href='/' passHref>
                <h2 className='flex-grow text-lg lg:text-xl font-sora font-medium'>
                  {siteMetadata.siteShortTitle}
                </h2>
              </Link>
              <Tooltip title='Verified'>
                <VerifiedIcon
                  size={18}
                  className='text-blue-400'
                  data-aos='flip-right'
                />
              </Tooltip>
            </div>
          )}
        </div>

        <div className='flex justify-between items-center gap-5'>
          {showMenu && (
            <div className='flex gap-6 items-center' data-aos='flip-up'>
              {menus.map((menu, index) => (
                <Link
                  key={index}
                  href={menu.href}
                  passHref
                  className={clsx(
                    'text-neutral-700 hover:text-neutral-800 dark:text-neutral-400 hover:dark:text-neutral-100',
                    router.pathname === menu?.href &&
                      '!text-neutral-800 dark:!text-neutral-100'
                  )}
                >
                  <div>{menu.title}</div>
                </Link>
              ))}
            </div>
          )}

          {!showMenu && (
            <>
              {!isMobile && <ThemeToggleButton />}
              <CommandIcon
                onClick={() => setIsOpen(true)}
                className='cursor-pointer'
                size={20}
              />
            </>
          )}

          <button
            className='flex items-center gap-2 dark:bg-neutral-900 backdrop-blur border dark:border-neutral-700 rounded-md p-2'
            onClick={() => setShowMenu(!showMenu)}
          >
            {showMenu ? <CloseIcon size={18} /> : <MenuIcon size={18} />}
          </button>
        </div>
      </div>
      <div className='block lg:hidden'>
        <Profile />
      </div>
    </header>
  );
};

export default HeaderTop;
