import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import AnimatedContainer from '@/common/components/elements/AnimatedContainer';
import Container from '@/common/components/elements/Container';
import PageHeading from '@/common/components/elements/PageHeading';
import { filterIndex } from '@/common/libs/learn';
import { getCollection } from '@/common/libs/mdx';
import { ContentProps } from '@/common/types/learn';
import { siteMetadata } from '@/contents/siteMetadata';
import LearnModule from '@/modules/learn';

const PAGE_TITLE = 'Learn';
const PAGE_DESCRIPTION = `It's not a course, it's my personal learning notes. But if you are interested, let's learn together.`;

export const metadata: Metadata = {
  title: `${PAGE_TITLE} - ${siteMetadata.author}`,
  description: PAGE_DESCRIPTION,
};

// 获取学习内容
async function getContents() {
  const collection = getCollection('learn/', false);
  const contents = collection
    .filter((item) => filterIndex(item))
    .map((item) => ({
      ...item.frontMatter,
      slug: item.frontMatter.dir,
      lessonCount: getCollection('learn/' + item.frontMatter.dir, false).filter(
        (item) => !filterIndex(item)
      ).length,
    }));

  return contents as (ContentProps & { lessonCount: number })[];
}

export default async function LearnPage() {
  const contents = await getContents();

  if (!contents || contents.length === 0) {
    notFound();
  }

  return (
    <AnimatedContainer>
      <Container>
        <PageHeading title={PAGE_TITLE} description={PAGE_DESCRIPTION} />

        {/* 新文档体验入口 */}
        {/* <div className='mb-8 p-4 border border-neutral-200 dark:border-neutral-800 rounded-lg'>
          <h3 className='text-xl font-semibold mb-2'>尝试新的文档体验</h3>
          <p className='mb-4'>
            我们正在测试一个新的文档布局，提供更好的阅读和导航体验。
          </p>
          <Link
            href='/learn-docs'
            className='inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors'
          >
            查看新文档
          </Link>
        </div> */}

        <LearnModule contents={contents} />
      </Container>
    </AnimatedContainer>
  );
}
