import Link from 'next/link';
import { AiFillPushpin as PinIcon } from 'react-icons/ai';
import { HiOutlineArrowSmRight as ViewIcon } from 'react-icons/hi';

import Card from '@/common/components/elements/Card';
import Image from '@/common/components/elements/Image';
import Tooltip from '@/common/components/elements/Tooltip';
import { ProjectItemProps } from '@/common/types/projects';
import { STACKS, defaultStackIcon } from '@/contents/stacks';

const ProjectCard = ({
  title,
  slug,
  description,
  image,
  stacks,
  is_featured,
}: ProjectItemProps) => {
  const stacksArray = stacks;

  return (
    <Link href={`/projects/${slug}`}>
      <Card className='group relative border border-neutral-200 dark:border-neutral-900 lg:hover:scale-[102%] cursor-pointer'>
        {is_featured && (
          <div className='flex items-center gap-1 absolute top-0 right-0 bg-lime-300 text-emerald-950 text-[13px] font-medium py-1 px-2 rounded-bl-xl rounded-tr-xl z-2'>
            <PinIcon size={15} />
            <span>Featured</span>
          </div>
        )}
        <div className='relative'>
          <Image
            src={image}
            width={400}
            height={200}
            alt={title}
            className='object-cover object-left h-48 rounded-t-xl'
          />
          <div className='absolute top-0 left-0 flex items-center justify-center w-full h-full gap-1 text-sm font-medium text-white transition-opacity duration-300 bg-black opacity-0 group-hover:opacity-80 rounded-t-xl'>
            <span>View Project</span>
            <ViewIcon size={20} />
          </div>
        </div>
        <div className='p-5 space-y-2'>
          <div className='flex justify-between'>
            <div className='text-lg transition-all duration-300 cursor-pointer font-sora text-neutral-700 dark:text-neutral-300 lg:group-hover:text-teal-600 dark:group-hover:text-teal-400'>
              {title}
            </div>
          </div>
          <p
            className='text-neutral-700 line-clamp-2 dark:text-neutral-400 text-[15px] leading-relaxed'
            title={description}
          >
            {description}
          </p>
          <div className='flex flex-wrap items-center gap-3 pt-2'>
            {stacksArray?.map((stack) => (
              <Tooltip key={stack} title={stack}>
                {STACKS[stack] || (
                  <span className='block px-2 py-1 text-xs font-semibold leading-none text-white rounded-full bg-cyan-500'>
                    {stack}
                  </span>
                )}
              </Tooltip>
            ))}
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default ProjectCard;
