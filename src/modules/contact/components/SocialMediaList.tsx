import clsx from 'clsx';
import Link from 'next/link';

import Button from '@/common/components/elements/Button';
import { SOCIAL_MEDIA } from '@/contents/menu';

const SocialMediaList = () => {
  return (
    <div className='space-y-5 pb-2'>
      <h3 className='text-lg font-medium'>Find me on social media</h3>
      <div className='flex flex-col md:flex-row justify-start gap-3'>
        {SOCIAL_MEDIA?.map((item) => (
          <Link
            href={item?.href}
            key={item?.href}
            target='_blank'
            className='w-full md:w-1/5'
          >
            <Button
              className={clsx(
                'w-full flex justify-center items-center hover:scale-105 transition-all duration-300',
                item?.className
              )}
              icon={item?.icon}
              data-umami-event={item?.eventName}
            >
              {item?.title}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SocialMediaList;
