'use client';

import { author, siteMetadata } from '@/contents/siteMetadata';

const Introduction = () => {
  return (
    <section className='bg-cover bg-no-repeat '>
      <div className='space-y-3'>
        <div className='flex gap-2 text-2xl lg:text-3xl font-medium font-sora'>
          <h1>Hi, I&apos;m {author.name}</h1>{' '}
          <div className='ml-1 animate-waving-hand'>👋</div>
        </div>
        <div className='space-y-4'>
          <ul className='flex flex-col lg:flex-row gap-1 lg:gap-10 ml-5 list-disc text-neutral-700 dark:text-neutral-400'>
            <li>
              Based in {author.location}{' '}
              <span className='ml-1'>{author.locationIcon}</span>
            </li>
            <li>{author.status}</li>
          </ul>
        </div>
      </div>

      <p className='leading-[1.8] md:leading-loose mt-6 text-neutral-800 dark:text-neutral-300'>
        {siteMetadata.siteDescription}
      </p>
    </section>
  );
};

export default Introduction;
