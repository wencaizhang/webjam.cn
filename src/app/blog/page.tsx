import { Metadata } from 'next';

import LayoutWithHeader from '@/app/layout-with-header';
import AnimatedContainer from '@/common/components/elements/AnimatedContainer';
import Container from '@/common/components/elements/Container';
import { getCollection } from '@/common/libs/mdx';
import { siteMetadata } from '@/contents/siteMetadata';
import BlogListNew from '@/modules/blog/components/BlogListNew';

const PAGE_TITLE = 'Blog';

export const metadata: Metadata = {
  title: `${PAGE_TITLE} - ${siteMetadata.author}`,
};

export default async function BlogPage() {
  try {
    console.log('Fetching blog posts...');
    const posts = await getCollection('blog');
    console.log(`Found ${posts.length} posts`);

    const pageSize = siteMetadata.postPageSize || 10;

    const pagination = {
      currentPage: 1,
      totalPages: Math.ceil(posts.length / pageSize),
      count: posts.length,
    };

    const initialDisplayPosts = posts.slice(0, pageSize);

    return (
      <LayoutWithHeader>
        <AnimatedContainer>
          <Container className='xl:-mt-5!'>
            <BlogListNew
              posts={posts}
              initialDisplayPosts={initialDisplayPosts}
              pagination={pagination}
            />
          </Container>
        </AnimatedContainer>
      </LayoutWithHeader>
    );
  } catch (error) {
    console.error('Error in BlogPage:', error);
    return (
      <LayoutWithHeader>
        <Container>
          <div className='text-red-500'>
            <h1>Error loading blog posts</h1>
            <p>{error instanceof Error ? error.message : String(error)}</p>
          </div>
        </Container>
      </LayoutWithHeader>
    );
  }
}
