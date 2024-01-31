import { GetStaticProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';

import BackButton from '@/common/components/elements/BackButton';
import Container from '@/common/components/elements/Container';
import { getCollection, getEntry } from '@/common/libs/mdx';
import { MdxFileContentProps } from '@/common/types/learn';
import { siteMetadata } from '@/contents/siteMetadata';
import ContentDetail from '@/modules/weekly/components/ContentDetail';
import ContentDetailHeader from '@/modules/weekly/components/ContentDetailHeader';
import NavigationSection from '@/common/components/elements/NavigationSection';

type PageInfo = { title: string; href: string };
interface WeeklyDetailPageProps {
  data: MdxFileContentProps;
  prev: PageInfo | null;
  next: PageInfo | null;
}

const WeeklyContentDetailPage: NextPage<WeeklyDetailPageProps> = ({
  data,
  prev,
  next,
}) => {
  const { content, frontMatter } = data;

  const meta = frontMatter;

  const endpointer = 'Weekly';
  const PAGE_TITLE = meta?.title;

  const PAGE_DESCRIPTION = `${endpointer} - ${PAGE_TITLE} with detailed explanations`;

  return (
    <>
      <NextSeo
        title={`${endpointer} : ${PAGE_TITLE} - ${siteMetadata.author}`}
        description={PAGE_DESCRIPTION}
        openGraph={{
          type: 'article',
          article: {
            publishedTime: meta?.updated_at,
            modifiedTime: meta?.updated_at,
            authors: [siteMetadata.author],
          },
          images: [
            {
              url: meta?.cover_url as string,
            },
          ],
          siteName: siteMetadata.author,
        }}
      />
      <Container data-aos='fade-up' className='mb-10'>
        <BackButton url='/weekly' />
        <ContentDetailHeader {...meta} />
        <ContentDetail content={content} frontMatter={frontMatter} />
        <NavigationSection prev={prev} next={next} />
      </Container>
    </>
  );
};

export default WeeklyContentDetailPage;

export const getStaticPaths = async () => {
  const contentList = await getCollection('weekly');
  const paths = contentList.reduce((acc, curr) => {
    acc.push({
      params: {
        slug: curr.slug,
      },
    });
    return acc;
  }, [] as object[]);

  return {
    paths: paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const contentData = await getEntry('weekly', slug);

  const contentList = await getCollection('weekly');
  const index = contentList.findIndex((item) => item.slug === slug);

  // 默认按时间顺序
  const prev = contentList[index + 1];
  const next = contentList[index - 1];

  if (!contentData) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };
  }

  return {
    props: {
      data: contentData,
      prev: !prev
        ? null
        : {
            title: prev?.frontMatter.title,
            href: `/weekly/${prev.slug}`,
          },
      next: !next
        ? null
        : {
            title: next?.frontMatter.title,
            href: `/weekly/${next.slug}`,
          },
    },
  };
};
