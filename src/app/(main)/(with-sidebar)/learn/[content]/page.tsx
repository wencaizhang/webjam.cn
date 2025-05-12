import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import AnimatedContainer from '@/common/components/elements/AnimatedContainer';
import BackButton from '@/common/components/elements/BackButton';
import Container from '@/common/components/elements/Container';
import PageHeading from '@/common/components/elements/PageHeading';
import { filterIndex } from '@/common/libs/learn';
import { getCollection } from '@/common/libs/mdx';
import { ContentProps } from '@/common/types/learn';
import { siteMetadata } from '@/contents/siteMetadata';
import ContentList from '@/modules/learn/components/ContentList';

// 动态生成 metadata
export async function generateMetadata({
  params,
}: {
  params: { content: string };
}): Promise<Metadata> {
  const contentSlug = params.content;
  const collection = await getCollection('learn/' + contentSlug);
  const index = collection.filter((item) => filterIndex(item))[0];

  if (!index) {
    return {
      title: 'Content Not Found',
    };
  }

  const content = {
    ...index.frontMatter,
    slug: index.frontMatter.dir,
  };

  const { title, description, image } = content;
  const canonicalUrl = `${siteMetadata.siteUrl}/learn/${content?.slug}`;

  return {
    title: `Learn ${title} - ${siteMetadata.author}`,
    description: description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      url: canonicalUrl,
      title: `Learn ${title} - ${siteMetadata.author}`,
      description: description,
      images: [
        {
          url: image,
        },
      ],
      siteName: siteMetadata.author,
    },
  };
}

// 生成静态路径
export async function generateStaticParams() {
  const collection = await getCollection('learn/');
  const cate = collection.filter((item) => !filterIndex(item));

  const parseSlug = (slug: string) => {
    return slug.split('/');
  };

  return cate.map((content) => {
    const slugs = parseSlug(content.slug);
    return {
      content: slugs[0],
      slug: slugs[1],
    };
  });
}

export default async function LearnContentPage({
  params,
}: {
  params: { content: string };
}) {
  const contentSlug = params.content;

  const collection = await getCollection('learn/' + contentSlug);

  const index = collection.filter((item) => filterIndex(item))[0];
  let content: ContentProps | null = null;

  if (index) {
    content = {
      ...index.frontMatter,
      slug: index.frontMatter.dir,
    } as ContentProps;
  }

  const subContentList = collection.filter((item) => !filterIndex(item));

  if (!content) {
    notFound();
  }

  const sortedSubContents = subContentList.sort(
    (a, b) => a.frontMatter.id - b.frontMatter.id
  );

  return (
    <AnimatedContainer>
      <Container>
        <BackButton url='/learn' />
        <PageHeading title={content.title} description={content.description} />
        <ContentList
          sortedSubContents={sortedSubContents}
          content={content}
          title={content.title}
        />
      </Container>
    </AnimatedContainer>
  );
}
