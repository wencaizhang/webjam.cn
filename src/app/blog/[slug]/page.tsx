import { Metadata } from 'next';

import LayoutWithHeader from '@/app/layout-with-header';
import AnimatedContainer from '@/common/components/elements/AnimatedContainer';
import BackButton from '@/common/components/elements/BackButton';
import Container from '@/common/components/elements/Container';
import NavigationSection from '@/common/components/elements/NavigationSection';
import { getCollection, getEntry } from '@/common/libs/mdx';
import { siteMetadata } from '@/contents/siteMetadata';
import BlogDetail from '@/modules/blog/components/BlogDetail';
import GiscusComment from '@/modules/blog/components/GiscusComment';
import TableOfContents from '@/modules/blog/components/TableOfContents';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const blogData = getEntry('blog', slug);

  if (!blogData) {
    return {
      title: 'Not Found',
    };
  }

  const description =
    blogData.frontMatter.description || blogData.frontMatter.title;
  const canonicalUrl = `${siteMetadata.siteUrl}/blog/${slug}`;

  return {
    title: `${blogData.frontMatter.title} - Blog ${siteMetadata.author}`,
    description,
    openGraph: {
      type: 'article',
      url: canonicalUrl,
      title: blogData.frontMatter.title,
      description,
      publishedTime: blogData.frontMatter.date,
      modifiedTime: blogData.frontMatter.date,
      authors: [siteMetadata.author, 'aulianza'],
      images: [
        {
          url: blogData.frontMatter.featured_image_url,
        },
      ],
      siteName: 'aulianza blog',
    },
  };
}

export async function generateStaticParams() {
  const blogs = getCollection('blog', false);

  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const mdxData = getEntry('blog', slug);

  if (!mdxData) {
    return <div>Not Found</div>;
  }

  // 创建一个符合 BlogDetailProps 类型的对象
  const blogData = {
    slug: mdxData.slug,
    content: mdxData.content || '',
    props: {
      readingTimeMinutes: 5, // 默认阅读时间
    },
    frontMatter: {
      title: String(mdxData.frontMatter.title || ''),
      date: String(mdxData.frontMatter.date || ''),
      draft: Boolean(mdxData.frontMatter.draft || false),
      summary: String(mdxData.frontMatter.summary || ''),
      featured: Boolean(mdxData.frontMatter.featured || false),
      tags: Array.isArray(mdxData.frontMatter.tags)
        ? mdxData.frontMatter.tags
        : [],
      featured_image_url: String(mdxData.frontMatter.featured_image_url || ''),
    },
  };

  const blogs = getCollection('blog', false);

  // 查找前一篇和后一篇文章
  const currentIndex = blogs.findIndex((blog) => blog.slug === slug);
  const prev = currentIndex > 0 ? blogs[currentIndex - 1] : null;
  const next = currentIndex < blogs.length - 1 ? blogs[currentIndex + 1] : null;

  // 确保 title 是字符串类型
  const prevInfo = prev
    ? {
        title: String(prev.frontMatter.title || ''),
        href: `/blog/${prev.slug}`,
      }
    : null;

  const nextInfo = next
    ? {
        title: String(next.frontMatter.title || ''),
        href: `/blog/${next.slug}`,
      }
    : null;

  return (
    <LayoutWithHeader>
      <AnimatedContainer>
        <Container>
          <BackButton url='/blog' />

          {/* 左右分布布局 */}
          <div className='flex gap-8 xl:gap-12'>
            {/* 主要内容区域 */}
            <div className='flex-1 min-w-0'>
              <BlogDetail {...blogData} />

              <section id='comments'>
                <GiscusComment />
              </section>

              <NavigationSection prev={prevInfo} next={nextInfo} />
            </div>

            {/* TOC 侧边栏 */}
            <aside className='flex-shrink-0 hidden w-64 xl:block'>
              {blogData.content && (
                <TableOfContents content={blogData.content} />
              )}
            </aside>
          </div>
        </Container>
      </AnimatedContainer>
    </LayoutWithHeader>
  );
}
