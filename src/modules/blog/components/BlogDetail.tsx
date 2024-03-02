import Breakline from '@/common/components/elements/Breakline';
import MDXComponent from '@/common/components/elements/MDXComponent';
import { BlogDetailProps } from '@/common/types/blog';

import BlogHeader from './BlogHeader';

const BlogDetail = (blogData: BlogDetailProps) => {
  return (
    <article>
      <BlogHeader
        title={blogData.frontMatter.title}
        comments_count={0}
        reading_time_minutes={blogData.props.readingTimeMinutes}
        published_at={blogData.frontMatter.date}
      />
      <div className='article space-y-6 leading-[1.8] dark:text-neutral-300 '>
        {blogData.content && <MDXComponent>{blogData.content}</MDXComponent>}
      </div>
      {blogData.frontMatter.tags.length >= 1 && (
        <div className='my-10 space-y-2'>
          <h6 className='text-lg font-medium'>Tags:</h6>
          <div className='flex flex-wrap gap-2 pt-2'>
            {blogData.frontMatter.tags.map((tag) => (
              <div
                key={tag}
                className='bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-200 rounded-full px-4 py-1 text-[14px] font-medium'
              >
                <span className='font-semibold mr-1'>#</span>
                {tag.charAt(0).toUpperCase() + tag.slice(1)}
              </div>
            ))}
          </div>
        </div>
      )}
      <Breakline className='!my-10' />
    </article>
  );
};

export default BlogDetail;
