import { Metadata } from 'next';

import AnimatedContainer from '@/common/components/elements/AnimatedContainer';
import Container from '@/common/components/elements/Container';
import PageHeading from '@/common/components/elements/PageHeading';
import { siteMetadata } from '@/contents/siteMetadata';
import Dashboard from '@/modules/dashboard';

const PAGE_TITLE = 'Dashboard';
const PAGE_DESCRIPTION =
  'This is my personal dashboard, built with Next.js API routes deployed as serverless functions.';

export const metadata: Metadata = {
  title: `${PAGE_TITLE} - ${siteMetadata.author}`,
  description: PAGE_DESCRIPTION,
};

export default function DashboardPage() {
  return (
    <AnimatedContainer>
      <Container>
        <PageHeading title={PAGE_TITLE} description={PAGE_DESCRIPTION} />
        <Dashboard />
      </Container>
    </AnimatedContainer>
  );
}
