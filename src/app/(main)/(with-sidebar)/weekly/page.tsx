import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import AnimatedContainer from '@/common/components/elements/AnimatedContainer';
import Container from '@/common/components/elements/Container';
import PageHeading from '@/common/components/elements/PageHeading';
import { getCollection } from '@/common/libs/mdx';
import { siteMetadata } from '@/contents/siteMetadata';

const title = '周刊';
const description =
  '这里是「果酱前端周刊」，以后每周都会把看到的有趣的工具、开源项目、文章发布到周刊，欢迎关注。';

export const metadata: Metadata = {
  title: `${title} - ${siteMetadata.author}`,
  description: description,
  alternates: {
    canonical: `${siteMetadata.siteUrl}/weekly`,
  },
  openGraph: {
    url: `${siteMetadata.siteUrl}/weekly`,
    title: `${title} - ${siteMetadata.author}`,
    description: description,
    siteName: siteMetadata.author,
  },
};

export default async function WeeklyPage() {
  const contentList = getCollection('weekly', false);

  if (!contentList.length) {
    notFound();
  }

  const activeClasses = `flex justify-between w-full font-sora items-center gap-2 py-2 px-4 rounded-lg group
    text-neutral-700 dark:text-neutral-400 hover:text-neutral-900 hover:dark:text-neutral-300 
    hover:dark:lg:bg-neutral-800 hover:dark:text-neutral-300! hover:lg:bg-neutral-200 hover:lg:rounded-lg lg:hover:scale-105 lg:transition-all lg:duration-300
  `;

  return (
    <AnimatedContainer>
      <Container>
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
    </AnimatedContainer>
  );
}
