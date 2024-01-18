import { GetStaticProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';

import Container from '@/common/components/elements/Container';
import PageHeading from '@/common/components/elements/PageHeading';
import { getEntry } from '@/common/libs/mdx';
import { CareerProps } from '@/common/types/careers';
import { EducationProps } from '@/common/types/education';
import { siteMetadata } from '@/contents/siteMetadata';
import About from '@/modules/about';
const PAGE_TITLE = 'About';
const PAGE_DESCRIPTION =
  'A short story of me, not important but seem better than nothing.';

interface About {
  content: string;
  frontMatter: {
    resume: string;
    education: EducationProps[];
    career: CareerProps[];
  };
}

const AboutPage: NextPage<{ about: About }> = ({ about }) => {
  return (
    <>
      <NextSeo title={`${PAGE_TITLE} - ${siteMetadata.author}`} />
      <Container data-aos='fade-up'>
        <PageHeading title={PAGE_TITLE} description={PAGE_DESCRIPTION} />
        <About about={about} />
      </Container>
    </>
  );
};

export default AboutPage;

export const getStaticProps: GetStaticProps = async () => {
  const about = await getEntry('', 'about');

  return {
    props: {
      about: about,
    },
  };
};
