import { siteMetadata } from '@/contents/siteMetadata';
const canonicalUrl = siteMetadata.siteUrl;
const metaImage = siteMetadata.siteScreenshot;
const metaDescription = siteMetadata.siteDescription;

const defaultSEOConfig = {
  defaultTitle: siteMetadata.siteTitle,
  description: metaDescription,
  canonical: canonicalUrl,
  openGraph: {
    canonical: canonicalUrl,
    title: siteMetadata.siteTitle,
    description: metaDescription,
    type: 'website',
    images: [
      {
        url: metaImage,
        alt: `${siteMetadata.siteTitle} og-image`,
        width: 800,
        height: 600,
      },
      {
        url: metaImage,
        alt: `${siteMetadata.siteTitle} og-image`,
        width: 1200,
        height: 630,
      },
      {
        url: metaImage,
        alt: `${siteMetadata.siteTitle} og-image`,
        width: 1600,
        height: 900,
      },
    ],
    site_name: siteMetadata.siteTitle,
  },
  twitter: {
    handle: '@handle',
    site: '@site',
    cardType: 'summary_large_image',
  },
};

export default defaultSEOConfig;
