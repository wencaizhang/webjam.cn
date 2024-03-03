import { NextPage } from 'next';
import { NextSeo } from 'next-seo';

import Container from '@/common/components/elements/Container';
import PageHeading from '@/common/components/elements/PageHeading';
import Contact from '@/modules/contact';

import { siteMetadata } from '../contents/siteMetadata';

const PAGE_TITLE = 'Contact';
const PAGE_DESCRIPTION =
  "Feel free to get in touch and let's have a discussion about how we can work together.";

const ContactPage: NextPage = () => {
  return (
    <>
      <NextSeo title={`${PAGE_TITLE} - ${siteMetadata.author}`} />
      <Container data-aos='fade-up'>
        <PageHeading title={PAGE_TITLE} description={PAGE_DESCRIPTION} />
        <Contact />
      </Container>
    </>
  );
};

export default ContactPage;
