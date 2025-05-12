'use client';

// import { ABOUT } from '@/common/constant/about';
import MDXComponent from '@/common/components/elements/MDXComponent';

interface ContentBodyProps {
  content: string;
}

const ContentBody = ({ content }: ContentBodyProps) => {
  return (
    <div className='space-y-5 leading-[1.8] dark:text-neutral-300 mt-5'>
      <MDXComponent>{content}</MDXComponent>
    </div>
  );
};

export default ContentBody;

// const Story = () => {
//   return (
//     <section
//       className='space-y-4 leading-[1.8] md:leading-loose text-neutral-800 dark:text-neutral-300'
//       dangerouslySetInnerHTML={{ __html: ABOUT }}
//     />
//   );
// };

// export default Story;
