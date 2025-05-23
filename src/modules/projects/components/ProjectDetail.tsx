'use client';

import Image from '@/common/components/elements/Image';
import MDXComponent from '@/common/components/elements/MDXComponent';
import Tooltip from '@/common/components/elements/Tooltip';
import { ProjectItemProps } from '@/common/types/projects';
import { STACKS } from '@/contents/stacks';

import ProjectLink from './ProjectLink';

const ProjectDetail = ({
  title,
  image,
  stacks,
  link_demo,
  link_github,
  content,
}: ProjectItemProps) => {
  const stacksArray = stacks;

  return (
    <div className='space-y-8'>
      <div className='flex flex-col items-start justify-between gap-5 lg:flex-row lg:items-center sm:flex-row'>
        <div className='flex flex-wrap items-center gap-2'>
          <span className='text-[15px] mb-1 text-neutral-700 dark:text-neutral-300'>
            技术栈 :
          </span>
          <div className='flex flex-wrap items-center gap-3'>
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
        <ProjectLink
          title={title}
          link_demo={link_demo}
          link_github={link_github}
        />
      </div>
      <Image
        src={image}
        width={800}
        height={400}
        alt={title}
        className='hover:scale-105'
      />
      {content && (
        <div className='space-y-6 leading-[1.8] dark:text-neutral-300 mt-5'>
          <MDXComponent>{content}</MDXComponent>
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;
