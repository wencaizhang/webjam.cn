import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import AnimatedContainer from '@/common/components/elements/AnimatedContainer';
import BackButton from '@/common/components/elements/BackButton';
import Container from '@/common/components/elements/Container';
import { getCollection, getEntry } from '@/common/libs/mdx';
import { siteMetadata } from '@/contents/siteMetadata';
import ContentDetail from '@/modules/snippets/components/ContentDetail';
import ContentDetailHeader from '@/modules/snippets/components/ContentDetailHeader';

// 动态生成 metadata
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const slug = params.slug;
  const contentData = await getEntry('snippets', slug);

  if (!contentData) {
    return {
      title: 'Snippet Not Found',
    };
  }

  const { frontMatter } = contentData;
  const meta = frontMatter;
  const endpointer = 'Snippets';
  const PAGE_TITLE = meta?.title;
  const PAGE_DESCRIPTION = `${endpointer} - ${PAGE_TITLE} with detailed explanations`;

  return {
    title: `${endpointer} : ${PAGE_TITLE} - ${siteMetadata.author}`,
    description: PAGE_DESCRIPTION,
    openGraph: {
      type: 'article',
      title: `${endpointer} : ${PAGE_TITLE} - ${siteMetadata.author}`,
      description: PAGE_DESCRIPTION,
      publishedTime: meta?.updated_at,
      modifiedTime: meta?.updated_at,
      authors: [siteMetadata.author],
      images: [
        {
          url: meta?.cover_url as string,
        },
      ],
      siteName: siteMetadata.author,
    },
  };
}

// 生成静态路径
export async function generateStaticParams() {
  // 对于生成静态路径，我们只需要 slug，不需要内容
  const contentList = getCollection('snippets', false);
  return contentList.map((content) => ({
    slug: content.slug,
  }));
}

export default async function SnippetDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const slug = params.slug;
  const contentData = getEntry('snippets', slug);

  if (!contentData) {
    notFound();
  }

  const { content, frontMatter } = contentData;

  return (
    <AnimatedContainer>
      <Container className='mb-10'>
        <BackButton url='/cheatsheet' />
        <ContentDetailHeader title={frontMatter.title} />
        <ContentDetail content={content} frontMatter={frontMatter} />
      </Container>
    </AnimatedContainer>
  );
}
