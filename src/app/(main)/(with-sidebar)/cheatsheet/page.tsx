import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import AnimatedContainer from '@/common/components/elements/AnimatedContainer';
import Container from '@/common/components/elements/Container';
import PageHeading from '@/common/components/elements/PageHeading';
import { getCollection } from '@/common/libs/mdx';
import { BrandIcon } from '@/common/types/StackIcon';
import { siteMetadata } from '@/contents/siteMetadata';

const title = '开发速查表';
const description = '精选的代码片段、命令和配置示例，提高开发效率的得力助手';

export const metadata: Metadata = {
  title: `${title} - ${siteMetadata.author}`,
  description: description,
  alternates: {
    canonical: `${siteMetadata.siteUrl}/snippets`,
  },
  openGraph: {
    url: `${siteMetadata.siteUrl}/snippets`,
    title: `${title} - ${siteMetadata.author}`,
    description: description,
    siteName: siteMetadata.author,
  },
};

export default async function SnippetsPage() {
  // 对于列表页面，我们不需要完整内容
  const contentList = getCollection('snippets', false);

  if (!contentList.length) {
    notFound();
  }

  const activeClasses = `flex justify-between w-full font-sora items-center gap-2 rounded-lg group
    text-neutral-700 dark:text-neutral-400 hover:text-neutral-900 hover:dark:text-neutral-300
     hover:dark:text-neutral-300! hover:lg:rounded-lg lg:transition-all lg:duration-300
  `;

  return (
    <AnimatedContainer>
      <Container>
        <PageHeading title={title} description={description} />
        <div className='grid-cols-2 gap-6 lg:grid'>
          {contentList.map((item) => (
            <Link
              className={activeClasses}
              href={`/cheatsheet/${item.slug}`}
              key={item.slug}
              title={item.frontMatter.description || item.frontMatter.title}
            >
              <div className='h-full w-full mb-4 p-3 lg:p-4 gap-4 flex cursor-pointer rounded-lg border border-transparent shadow-intense hover:shadow-nextjs dark:shadow-intense-dark dark:hover:shadow-nextjs-dark lg:mb-0'>
                <div className='flex items-center justify-center'>
                  <BrandIcon type={item.frontMatter.type} />
                </div>
                <div className='overflow-hidden space-y-2'>
                  <h3 className='overflow-hidden text-ellipsis whitespace-nowrap text-base font-bold leading-8 tracking-tight lg:text-lg'>
                    {' '}
                    {item.frontMatter.title}{' '}
                  </h3>
                  <p className='text-gray-600 dark:text-gray-400 text-sm lg:text-base line-clamp-2'>
                    {item.frontMatter.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </AnimatedContainer>
  );
}
