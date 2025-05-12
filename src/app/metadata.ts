import { Metadata } from 'next';

import { siteMetadata } from '@/contents/siteMetadata';

export const metadata: Metadata = {
  title: {
    template: `%s - ${siteMetadata.author}`,
    default: `${siteMetadata.author} - Personal Website`,
  },
  description: siteMetadata.description,
  keywords: siteMetadata.keywords,
  authors: [{ name: siteMetadata.author }],
  creator: siteMetadata.author,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: siteMetadata.siteUrl,
    siteName: siteMetadata.author,
    locale: 'zh_CN',
    type: 'website',
  },
};
