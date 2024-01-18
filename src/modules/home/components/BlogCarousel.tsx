import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useDraggable } from 'react-use-draggable-scroll';

import { BlogItemProps } from '@/common/types/blog';
import BlogCardNew from '@/modules/blog/components/BlogCardNew';

const BlogCarousel = ({ blogList }: { blogList: BlogItemProps[] }) => {
  const blogData = blogList;

  const ref =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(ref);

  const renderBlogCards = () => {
    return blogData.map((item, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.5 }}
        className='min-w-[326px] gap-x-5'
      >
        <BlogCardNew {...item} />
      </motion.div>
    ));
  };

  return (
    <div
      className='flex p-1 gap-4 overflow-x-scroll scrollbar-hide'
      {...events}
      ref={ref}
    >
      {renderBlogCards()}
    </div>
  );
};

export default BlogCarousel;
