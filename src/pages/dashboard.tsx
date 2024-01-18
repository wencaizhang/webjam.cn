import { GetStaticProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { SWRConfig } from 'swr';

import Container from '@/common/components/elements/Container';
import PageHeading from '@/common/components/elements/PageHeading';
import { featureSwich, siteMetadata } from '@/contents/siteMetadata';
import Dashboard from '@/modules/dashboard';
import { getGithubUser } from '@/services/github';
import { getReadStats } from '@/services/wakatime';

interface DashboardPageProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fallback: any;
}

const PAGE_TITLE = 'Dashboard';
const PAGE_DESCRIPTION =
  'This is my personal dashboard, built with Next.js API routes deployed as serverless functions.';

const DashboardPage: NextPage<DashboardPageProps> = ({ fallback }) => {
  return (
    <SWRConfig value={{ fallback }}>
      <NextSeo title={`${PAGE_TITLE} - ${siteMetadata.author}`} />
      <Container data-aos='fade-up'>
        <PageHeading title={PAGE_TITLE} description={PAGE_DESCRIPTION} />
        <Dashboard />
      </Container>
    </SWRConfig>
  );
};

export default DashboardPage;

export const getStaticProps: GetStaticProps = async () => {
  const fallback = {};
  if (featureSwich.dashboard_wakatime) {
    const readStats = await getReadStats();
    Object.assign(fallback, { '/api/read-stats': readStats.data });
  }
  if (featureSwich.dashboard_github) {
    const githubUserPersonal = await getGithubUser('personal');
    Object.assign(fallback, {
      '/api/github?type=personal': githubUserPersonal?.data,
    });
  }

  return {
    props: {
      fallback: fallback,
    },
    revalidate: 1,
  };
};
