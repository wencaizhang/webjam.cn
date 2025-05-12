import { Metadata } from 'next';

import AnimatedContainer from '@/common/components/elements/AnimatedContainer';
import Container from '@/common/components/elements/Container';
import PageHeading from '@/common/components/elements/PageHeading';
import { getEntry } from '@/common/libs/mdx';
import { siteMetadata } from '@/contents/siteMetadata';
import About from '@/modules/about';
import { AboutProps } from '@/modules/about/components/About';

const PAGE_TITLE = 'About';
const PAGE_DESCRIPTION =
  'A short story of me, not important but seem better than nothing.';

export const metadata: Metadata = {
  title: `${PAGE_TITLE} - ${siteMetadata.author}`,
  description: PAGE_DESCRIPTION,
};

export default async function AboutPage() {
  // 在服务器组件中获取数据
  const about = await getEntry('', 'about');

  return (
    <AnimatedContainer>
      <Container>
        <PageHeading title={PAGE_TITLE} description={PAGE_DESCRIPTION} />
        <About about={about as unknown as AboutProps} />
      </Container>
    </AnimatedContainer>
  );
}
