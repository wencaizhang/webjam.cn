import { NextPage } from 'next';
import { NextSeo } from 'next-seo';

import Container from '@/common/components/elements/Container';
import { getCollection } from '@/common/libs/mdx';
import { BlogItemProps } from '@/common/types/blog';
import { siteMetadata } from '@/contents/siteMetadata';
import BlogListNew from '@/modules/blog';

const PAGE_TITLE = 'Blog';
interface ContentPageProps {
  initialDisplayPosts: BlogItemProps[];
  posts: BlogItemProps[];
  pagination: {
    count: number;
    currentPage: number;
    totalPages: number;
  };
}

const BlogPage: NextPage<ContentPageProps> = ({
  posts,
  initialDisplayPosts,
  pagination,
}) => {
  return (
    <>
      <NextSeo title={`${PAGE_TITLE} - ${siteMetadata.author}`} />
      <Container className='xl:!-mt-5' data-aos='fade-up'>
        <BlogListNew
          posts={posts}
          initialDisplayPosts={initialDisplayPosts}
          pagination={pagination}
        />
      </Container>
    </>
  );
};

export default BlogPage;

export const getStaticPaths = async () => {
  const pageSize = siteMetadata.postPageSize || 10;

  const totalPosts = await getCollection('blog');

  const totalPages = Math.ceil(totalPosts.length / pageSize);
  const paths = Array.from({ length: totalPages }, (_, i) => ({
    params: { page: (i + 1).toString() },
  }));

  return {
    paths,
    fallback: false,
  };
};

export async function getStaticProps({ params }: { params: { page: string } }) {
  const { page } = params;
  const pageNumber = parseInt(page);

  const pageSize = siteMetadata.postPageSize || 10;
  const posts = await getCollection('blog');

  const initialDisplayPosts = posts.slice(
    pageSize * (pageNumber - 1),
    pageSize * pageNumber
  );

  const pagination = {
    count: posts.length,
    currentPage: pageNumber,
    totalPages: Math.ceil(posts.length / pageSize),
  };

  return {
    props: {
      posts,
      initialDisplayPosts,
      pagination,
    },
  };
}
