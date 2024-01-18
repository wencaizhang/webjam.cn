import { GetStaticProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';

import BackButton from '@/common/components/elements/BackButton';
import Container from '@/common/components/elements/Container';
import { getCollection, getEntry } from '@/common/libs/mdx';
import { MdxFileContentProps } from '@/common/types/learn';
import { siteMetadata } from '@/contents/siteMetadata';
import ContentDetail from '@/modules/weekly/components/ContentDetail';
import ContentDetailHeader from '@/modules/weekly/components/ContentDetailHeader';

const WeeklyContentDetailPage: NextPage<{ data: MdxFileContentProps }> = ({
  data,
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
    },
  };
};
