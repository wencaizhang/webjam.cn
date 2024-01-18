import { Head, Html, Main, NextScript } from 'next/document';

import { siteMetadata } from '@/contents/siteMetadata';

const { umamiScriptSrc, umamiSiteId } = siteMetadata.analytics;

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        {umamiScriptSrc && umamiSiteId && (
          <script
            async
            defer
            src={umamiScriptSrc}
            data-website-id={umamiSiteId}
          ></script>
        )}

        <link rel='apple-touch-icon' sizes='57x57' href='/images/logo.jpg' />
        <link rel='apple-touch-icon' sizes='60x60' href='/images/logo.jpg' />
        <link rel='apple-touch-icon' sizes='72x72' href='/images/logo.jpg' />
        <link rel='apple-touch-icon' sizes='76x76' href='/images/logo.jpg' />
        <link rel='apple-touch-icon' sizes='114x114' href='/images/logo.jpg' />
        <link rel='apple-touch-icon' sizes='120x120' href='/images/logo.jpg' />
        <link rel='apple-touch-icon' sizes='144x144' href='/images/logo.jpg' />
        <link rel='apple-touch-icon' sizes='152x152' href='/images/logo.jpg' />
        <link rel='apple-touch-icon' sizes='180x180' href='/images/logo.jpg' />
        <link
          rel='icon'
          type='image/png'
          sizes='192x192'
          href='/images/logo.jpg'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/images/logo.jpg'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='96x96'
          href='/images/logo.jpg'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/images/logo.jpg'
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
