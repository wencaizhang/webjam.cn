import { Metadata } from 'next';

import AnimatedContainer from '@/common/components/elements/AnimatedContainer';
import Container from '@/common/components/elements/Container';
import PageHeading from '@/common/components/elements/PageHeading';
import { siteMetadata } from '@/contents/siteMetadata';
import Contact from '@/modules/contact';

const PAGE_TITLE = 'Contact';
const PAGE_DESCRIPTION =
  "Feel free to get in touch and let's have a discussion about how we can work together.";

export const metadata: Metadata = {
  title: `${PAGE_TITLE} - ${siteMetadata.author}`,
  description: PAGE_DESCRIPTION,
};

export default function ContactPage() {
  return (
    <AnimatedContainer>
      <Container>
        <PageHeading title={PAGE_TITLE} description={PAGE_DESCRIPTION} />
        <Contact />
      </Container>
    </AnimatedContainer>
  );
}
