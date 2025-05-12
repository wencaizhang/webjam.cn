'use client';

import { TbMoodSadSquint as MoodIcon } from 'react-icons/tb';

type EmptyStatePageProps = {
  message: string;
};

const EmptyState = ({ message }: EmptyStatePageProps) => {
  return (
    <div className='flex flex-col items-center justify-center space-y-3 text-neutral-400 dark:text-neutral-500 py-5'>
      <MoodIcon size={48} />
      <p>{message}</p>
    </div>
  );
};

export default EmptyState;
