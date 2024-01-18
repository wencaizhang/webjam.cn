import { motion } from 'framer-motion';
import { useState } from 'react';
import { useDebounce } from 'usehooks-ts';

import EmptyState from '@/common/components/elements/EmptyState';
import Pagination from '@/common/components/elements/Pagination';
import SearchBar from '@/common/components/elements/SearchBar';
import { BlogItemProps } from '@/common/types/blog';

import BlogCardNew from './BlogCardNew';
import BlogFeaturedSection from './BlogFeaturedSection';

interface ContentPageProps {
  initialDisplayPosts: BlogItemProps[];
  posts: BlogItemProps[];
  pagination: {
    count: number;
    currentPage: number;
    totalPages: number;
  };
}

const BlogListNew = ({
  posts,
  initialDisplayPosts,
  pagination,
}: ContentPageProps) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const featuredBlogData = initialDisplayPosts.filter(
    (item) => item.frontMatter.featured
  );

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event?.target?.value;
    setSearchTerm(searchValue);
  };
  const handleClearSearch = () => {
    setSearchTerm('');
  };

  const filteredBlogPosts = posts.filter((item) => {
    const searchContent =
      item.frontMatter.title +
      item.frontMatter.summary +
      item.frontMatter.tags.join(' ');
    return searchContent
      .toLowerCase()
      .includes(debouncedSearchTerm.toLowerCase());
  });

  const displayPosts =
    initialDisplayPosts.length > 0 && !debouncedSearchTerm
      ? initialDisplayPosts
      : filteredBlogPosts;

  const showPagition =
    pagination && pagination.totalPages > 1 && !debouncedSearchTerm;

  const postCount = debouncedSearchTerm
    ? displayPosts.length
    : pagination.count;

  return (
    <div className='space-y-10'>
      {featuredBlogData.length > 0 && (
        <BlogFeaturedSection data={featuredBlogData} />
      )}

      <div className='space-y-5'>
        <div className='flex flex-col sm:flex-row gap-3 justify-between items-center mb-6'>
          <div className='flex items-center gap-2 text-xl font-sora font-medium px-1'>
            {searchTerm ? (
              <div>
                <span className='text-neutral-600 dark:text-neutral-400 mr-2'>
                  Search:
                </span>
                <span className='italic'>{searchTerm}</span>
              </div>
            ) : (
              <h4 className='text-neutral-800 dark:text-neutral-200'>
                Latest Articles
              </h4>
            )}
            <span className='rounded-full py-1 px-2 bg-neutral-300 text-neutral-900 dark:bg-neutral-700 dark:text-neutral-50 text-xs font-sora'>
              {postCount}
            </span>
          </div>
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={handleSearch}
            onClearSearch={handleClearSearch}
          />
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5'>
          <>
            {displayPosts.map((item: BlogItemProps, index: number) => (
              <motion.div
                key={item.slug}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <BlogCardNew {...item} />
              </motion.div>
            ))}
          </>
        </div>

        {showPagition && (
          <Pagination
            totalPages={pagination.totalPages}
            currentPage={pagination.currentPage}
            buildHref={(page: number) => {
              return page === 1 ? `/blog` : `/blog/page/${page}`;
            }}
          />
        )}
      </div>

      {displayPosts.length === 0 && <EmptyState message='No Post Found.' />}
    </div>
  );
};

export default BlogListNew;
