import { Metadata } from 'next';

import LayoutWithHeader from '@/app/layout-with-header';
import AnimatedContainer from '@/common/components/elements/AnimatedContainer';
import Container from '@/common/components/elements/Container';
import { siteMetadata } from '@/contents/siteMetadata';
import Playground from '@/modules/playground';

const PAGE_TITLE = 'JavaScript Playground';

export const metadata: Metadata = {
  title: `${PAGE_TITLE} - ${siteMetadata.author}`,
};

export default function PlaygroundPage() {
  return (
    <LayoutWithHeader>
      <AnimatedContainer>
        <Container className='mt-0! pt-20 md:pt-0'>
          <Playground id='playground' isHeading />
        </Container>
      </AnimatedContainer>
    </LayoutWithHeader>
  );
}
