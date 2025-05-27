import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import AnimatedContainer from '@/common/components/elements/AnimatedContainer';
import BackButton from '@/common/components/elements/BackButton';
import Container from '@/common/components/elements/Container';
import NavigationSection from '@/common/components/elements/NavigationSection';
import { filterIndex } from '@/common/libs/learn';
import { getCollection, getEntry } from '@/common/libs/mdx';
import { siteMetadata } from '@/contents/siteMetadata';
import ContentDetail from '@/modules/learn/components/ContentDetail';
import ContentDetailHeader from '@/modules/learn/components/ContentDetailHeader';

type PageInfo = { title: string; href: string };

// 动态生成 metadata
export async function generateMetadata({
  params,
}: {
  params: { content: string; slug: string };
}): Promise<Metadata> {
  const parentContent = params.content;
  const slug = params.slug;
  const dir = 'learn/' + parentContent;

  const contentData = await getEntry(dir, slug);

  if (!contentData) {
    return {
      title: 'Content Not Found',
    };
  }

  const { frontMatter } = contentData;
  const meta = frontMatter as Record<string, string>;

  const PAGE_TITLE = meta?.title;
  const PAGE_DESCRIPTION = `Learn ${meta?.category} - ${PAGE_TITLE} with detailed explanations`;

  return {
    title: `Learn ${meta?.category} : ${PAGE_TITLE} - ${siteMetadata.author}`,
    description: PAGE_DESCRIPTION,
    openGraph: {
      type: 'article',
      title: `Learn ${meta?.category} : ${PAGE_TITLE} - ${siteMetadata.author}`,
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
  const list = getCollection('learn', false).filter(
    (item) => !filterIndex(item)
  );

  return list.map((content) => {
    const arr = content.slug.split('/');
    return {
      content: arr[0],
      slug: arr.slice(1).join('/'),
    };
  });
}

export default async function LearnContentDetailPage({
  params,
}: {
  params: { content: string; slug: string };
}) {
  const parentContent = params.content;
  const slug = params.slug;
  const dir = 'learn/' + parentContent;

  const collection = getCollection(dir, false);
  const contentData = getEntry(dir, slug);

  if (!contentData) {
    notFound();
  }

  const { frontMatter } = contentData;

  // 查找前一个和后一个内容
  const prev = collection.find(
    (item) =>
      item.frontMatter.id ===
      Number.parseInt(contentData.frontMatter.id as string) - 1
  );
  const next = collection.find(
    (item) =>
      item.frontMatter.id ===
      Number.parseInt(contentData.frontMatter.id as string) + 1
  );

  // disable
  const prevInfo: PageInfo | null = !prev
    ? null
    : {
        title: prev?.frontMatter.title,
        href: `/learn/${parentContent}/${prev.slug}`,
      };

  const nextInfo: PageInfo | null = !next
    ? null
    : {
        title: next?.frontMatter.title,
        href: `/learn/${parentContent}/${next.slug}`,
      };

  return (
    <AnimatedContainer>
      <Container className='mb-10'>
        <BackButton url={`/learn/${parentContent}`} />
        <ContentDetailHeader {...frontMatter} />
        <ContentDetail
          content={contentData?.content}
          frontMatter={frontMatter}
        />
        <NavigationSection prev={prevInfo} next={nextInfo} />
      </Container>
    </AnimatedContainer>
  );
}
