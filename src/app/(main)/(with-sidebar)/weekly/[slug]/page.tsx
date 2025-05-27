import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import AnimatedContainer from '@/common/components/elements/AnimatedContainer';
import BackButton from '@/common/components/elements/BackButton';
import Container from '@/common/components/elements/Container';
import NavigationSection from '@/common/components/elements/NavigationSection';
import { getCollection, getEntry } from '@/common/libs/mdx';
import { siteMetadata } from '@/contents/siteMetadata';
import ContentDetail from '@/modules/weekly/components/ContentDetail';
import ContentDetailHeader from '@/modules/weekly/components/ContentDetailHeader';

type PageInfo = { title: string; href: string };

// 动态生成 metadata
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const slug = params.slug;
  const contentData = await getEntry('weekly', slug);

  if (!contentData) {
    return {
      title: 'Weekly Not Found',
    };
  }

  const { frontMatter } = contentData;
  const meta = frontMatter;

  const endpointer = 'Weekly';
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
  const contentList = getCollection('weekly', false);

  return contentList.map((content) => ({
    slug: content.slug,
  }));
}

export default async function WeeklyDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const slug = params.slug;
  const contentData = getEntry('weekly', slug);

  if (!contentData) {
    notFound();
  }

  const { content, frontMatter } = contentData;

  // 查找前一个和后一个内容
  const contentList = getCollection('weekly', false);
  const index = contentList.findIndex((item) => item.slug === slug);

  // 默认按时间顺序
  const prev = contentList[index + 1];
  const next = contentList[index - 1];

  const prevInfo: PageInfo | null = !prev
    ? null
    : {
        title: prev?.frontMatter.title,
        href: `/weekly/${prev.slug}`,
      };

  const nextInfo: PageInfo | null = !next
    ? null
    : {
        title: next?.frontMatter.title,
        href: `/weekly/${next.slug}`,
      };

  return (
    <AnimatedContainer>
      <Container className='mb-10'>
        <BackButton url='/weekly' />
        <ContentDetailHeader title={frontMatter.title} />
        <ContentDetail content={content} frontMatter={frontMatter} />
        <NavigationSection prev={prevInfo} next={nextInfo} />
      </Container>
    </AnimatedContainer>
  );
}
