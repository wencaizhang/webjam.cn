import { Metadata } from 'next';

import LayoutWithHeader from '@/app/layout-with-header';
import AnimatedContainer from '@/common/components/elements/AnimatedContainer';
import Container from '@/common/components/elements/Container';
import { getCollection, MdxFileProps } from '@/common/libs/mdx';
import { BlogItemProps } from '@/common/types/blog';
import { siteMetadata } from '@/contents/siteMetadata';
import BlogListNew from '@/modules/blog/components/BlogListNew';

const PAGE_TITLE = 'Blog';

// 将MdxFileProps转换为BlogItemProps的辅助函数
function convertToBlogItemProps(mdxFiles: MdxFileProps[]): BlogItemProps[] {
  return mdxFiles.map((file) => ({
    ...file,
    content: file.content || '', // 确保 content 不为 undefined
    props: {
      readingTimeMinutes: file.props?.readingTimeMinutes || 5, // 使用实际的阅读时间或默认值
    },
    frontMatter: {
      title: String(file.frontMatter.title || ''),
      date: String(file.frontMatter.date || ''),
      draft: Boolean(file.frontMatter.draft || false),
      summary: String(file.frontMatter.summary || ''),
      featured: Boolean(file.frontMatter.featured || false),
      tags: Array.isArray(file.frontMatter.tags)
        ? (file.frontMatter.tags as string[])
        : [],
      featured_image_url: String(file.frontMatter.featured_image_url || ''),
    },
  }));
}

export const metadata: Metadata = {
  title: `${PAGE_TITLE} - ${siteMetadata.author}`,
};

export default async function BlogPage() {
  try {
    console.log('Fetching blog posts...');
    // 对于列表页面，我们不需要完整的内容，只需要 frontMatter
    const mdxFiles = getCollection('blog', false);
    console.log(`Found ${mdxFiles.length} posts`);

    // 转换为BlogItemProps类型
    const posts = convertToBlogItemProps(mdxFiles);

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
