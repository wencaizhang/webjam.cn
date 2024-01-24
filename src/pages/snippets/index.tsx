import { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import { NextSeo } from 'next-seo';

import Container from '@/common/components/elements/Container';
import PageHeading from '@/common/components/elements/PageHeading';
import { getCollection } from '@/common/libs/mdx';
import { MdxFileContentProps } from '@/common/types/learn';
import { siteMetadata } from '@/contents/siteMetadata';

interface ContentPageProps {
  contentList: MdxFileContentProps[];
}

const SnippetsContentPage: NextPage<ContentPageProps> = ({ contentList }) => {
  if (!contentList.length) {
    return null;
  }

  const title = '代码段';
  const description = '这里是代码片段';

  const canonicalUrl = `${siteMetadata.siteUrl}/snippets`;

  const activeClasses = `flex justify-between w-full font-sora items-center gap-2 py-2 px-4 rounded-lg group
    text-neutral-700 dark:text-neutral-400 hover:text-neutral-900 hover:dark:text-neutral-300 
    hover:dark:lg:bg-neutral-800 hover:dark:!text-neutral-300 hover:lg:bg-neutral-200 hover:lg:rounded-lg lg:hover:scale-105 lg:transition-all lg:duration-300
  `;
  return (
    <>
      <NextSeo
        title={`${title} - ${siteMetadata.author}`}
        description={description}
        canonical={canonicalUrl}
        openGraph={{
          url: canonicalUrl,
          images: [
            {
              url: '',
            },
          ],
          siteName: siteMetadata.author,
        }}
      />
      <Container data-aos='fade-up'>
        <PageHeading title={title} description={description} />
        {contentList.map((item) => (
          <Link
            className={activeClasses}
            href={`/snippets/${item.slug}`}
            key={item.slug}
          >
            <span> {item.frontMatter.title} </span>
            <span> {item.frontMatter.date} </span>
          </Link>
        ))}
      </Container>
    </>
  );
};

export default SnippetsContentPage;

export const getStaticProps: GetStaticProps = async () => {
  const contentList = await getCollection('snippets');

  if (!contentList.length) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };
  }

  return {
    props: {
      contentList: contentList,
    },
  };
};
