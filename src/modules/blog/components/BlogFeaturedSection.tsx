import React from 'react';

import { BlogFeaturedProps } from '@/common/types/blog';

import BlogFeaturedHero from './BlogFeaturedHero';

const BlogFeaturedSection = ({ data }: BlogFeaturedProps) => {
  const featuredData = data;

  return (
    <>
      <BlogFeaturedHero data={featuredData} />
    </>
  );
};

export default BlogFeaturedSection;
