import { GetStaticProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';

import Container from '@/common/components/elements/Container';
import PageHeading from '@/common/components/elements/PageHeading';
import { filterIndex } from '@/common/libs/learn';
import { getCollection } from '@/common/libs/mdx';
import { ContentProps } from '@/common/types/learn';
import { siteMetadata } from '@/contents/siteMetadata';
import LearnModule from '@/modules/learn';

const PAGE_TITLE = 'Learn';
const PAGE_DESCRIPTION = `It's not a course, it's my personal learning notes. But if you are interested, let's learn together.`;

const LearnPage: NextPage<{
  contents: (ContentProps & { lessonCount: number })[];
}> = ({ contents }) => {
  return (
    <>
      <NextSeo title={`${PAGE_TITLE} - ${siteMetadata.author}`} />
      <Container data-aos='fade-up'>
        <PageHeading title={PAGE_TITLE} description={PAGE_DESCRIPTION} />
        <LearnModule contents={contents} />
      </Container>
    </>
  );
};

export default LearnPage;

export const getStaticProps: GetStaticProps = async () => {
  const collection = getCollection('learn/');
  const contents = collection
    .filter((item) => filterIndex(item))
    .map((item) => ({
      ...item.frontMatter,
      slug: item.frontMatter.dir,
      lessonCount: getCollection('learn/' + item.frontMatter.dir).filter(
        (item) => !filterIndex(item)
      ).length,
    }));

  if (!contents || contents.length === 0) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };
  }

  return {
    props: {
      contents: contents,
    },
  };
};
