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

const WeeklyContentPage: NextPage<ContentPageProps> = ({ contentList }) => {
  if (!contentList.length) {
    return null;
  }

  const title = '周刊';
  const description =
    '这里是「果酱前端周刊」，以后每周都会把看到的有趣的工具、开源项目、文章发布到周刊，欢迎关注。';

  const canonicalUrl = `${siteMetadata.siteUrl}/weekly`;

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
            href={`/weekly/${item.slug}`}
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

export default WeeklyContentPage;

export const getStaticProps: GetStaticProps = async () => {
  const contentList = await getCollection('weekly');

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
