import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import LayoutWithHeader from '@/app/layout-with-header';
import AnimatedContainer from '@/common/components/elements/AnimatedContainer';
import Container from '@/common/components/elements/Container';
import { getCollection } from '@/common/libs/mdx';
import { MdxFileProps } from '@/common/libs/mdx';
import { BlogItemProps } from '@/common/types/blog';
import { siteMetadata } from '@/contents/siteMetadata';
import BlogListNew from '@/modules/blog';

const PAGE_TITLE = 'Blog';

export const metadata: Metadata = {
  title: `${PAGE_TITLE} - ${siteMetadata.author}`,
  // description: siteMetadata.description,
};

// 将MdxFileProps转换为BlogItemProps的辅助函数
function convertToBlogItemProps(mdxFiles: MdxFileProps[]): BlogItemProps[] {
  return mdxFiles.map((file) => ({
    ...file,
    props: {
      readingTimeMinutes: 5, // 默认阅读时间为5分钟
    },
  })) as BlogItemProps[];
}

// 生成静态路径
export async function generateStaticParams() {
  const pageSize = siteMetadata.postPageSize || 10;
  // 对于生成静态路径，我们只需要数量，不需要内容
  const totalPosts = getCollection('blog', false);
  const totalPages = Math.ceil(totalPosts.length / pageSize);

  return Array.from({ length: totalPages }, (_, i) => ({
    page: (i + 1).toString(),
  }));
}

export default async function BlogPaginationPage({
  params,
}: {
  params: { page: string };
}) {
  const { page } = params;
  const pageNumber = parseInt(page);

  if (isNaN(pageNumber) || pageNumber < 1) {
    notFound();
  }

  const pageSize = siteMetadata.postPageSize || 10;
  // 对于分页页面，我们也不需要完整内容
  const mdxFiles = getCollection('blog', false);
  const posts = convertToBlogItemProps(mdxFiles);

  const totalPages = Math.ceil(posts.length / pageSize);

  if (pageNumber > totalPages) {
    notFound();
  }

  const initialDisplayPosts = posts.slice(
    pageSize * (pageNumber - 1),
    pageSize * pageNumber
  );

  const pagination = {
    count: posts.length,
    currentPage: pageNumber,
    totalPages: totalPages,
  };

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
}
