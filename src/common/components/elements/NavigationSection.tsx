import Link from 'next/link';
import {
  FiArrowLeft as PreviousButtonIcon,
  FiArrowRight as NextButtonIcon,
} from 'react-icons/fi';

type PageInfo = { title: string; href: string };
interface NavigationSectionProps {
  prev: PageInfo | null;
  next: PageInfo | null;
}

const activeClasses = `flex font-sora items-center gap-2 py-2 px-4 rounded-lg group
  text-neutral-700 dark:text-neutral-400 hover:text-neutral-900 hover:dark:text-neutral-300 
  hover:dark:lg:bg-neutral-800 hover:dark:!text-neutral-300 hover:lg:bg-neutral-200 hover:lg:rounded-lg lg:hover:scale-105 lg:transition-all lg:duration-300
`;

const NavigationSection = ({ prev, next }: NavigationSectionProps) => {
  return (
    <div className='flex justify-between mt-8 border-t dark:border-neutral-700 border-gray-300 py-5'>
      {prev && (
        <Link href={prev.href} className={activeClasses}>
          <PreviousButtonIcon className='group-hover:rotate-6 transition-all duration-300' />
          <div className='flex items-center gap-1'>
            Previous
            <span className='hidden lg:flex'> : {prev.title}</span>
          </div>
        </Link>
      )}
      <div className='flex-grow'></div>
      {next && (
        <Link href={next.href} className={activeClasses}>
          <div className='flex items-center gap-1'>
            Next
            <span className='hidden lg:flex'> : {next.title}</span>
          </div>
          <NextButtonIcon className='group-hover:-rotate-6 transition-all duration-300' />
        </Link>
      )}
    </div>
  );
};

export default NavigationSection;
