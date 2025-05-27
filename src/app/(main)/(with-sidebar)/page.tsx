import { Metadata } from 'next';

import AnimatedContainer from '@/common/components/elements/AnimatedContainer';
import Container from '@/common/components/elements/Container';
import { getCollection } from '@/common/libs/mdx';
import { MdxFileProps } from '@/common/libs/mdx';
import { BlogItemProps } from '@/common/types/blog';
import { siteMetadata } from '@/contents/siteMetadata';
import Home from '@/modules/home';

export const metadata: Metadata = {
  title: `${siteMetadata.author} - Personal Website`,
};

// 将MdxFileProps转换为BlogItemProps的辅助函数
function convertToBlogItemProps(mdxFiles: MdxFileProps[]): BlogItemProps[] {
  return mdxFiles.map((file) => ({
    ...file,
    props: {
      readingTimeMinutes: 5, // 默认阅读时间为5分钟
    },
  })) as BlogItemProps[];
}

export default async function HomePage() {
  try {
    // console.log('Fetching blog posts for homepage...');
    // 在服务器组件中直接获取数据
    const mdxFiles = getCollection('blog', false);
    // console.log(`Found ${mdxFiles.length} blog posts for homepage`);

    // 转换为BlogItemProps类型
    const blogList = convertToBlogItemProps(mdxFiles);
    // console.log('🚀 ~ HomePage ~ blogList:', blogList);

    return (
      <AnimatedContainer>
        <Container>
          <Home blogList={blogList} />
        </Container>
      </AnimatedContainer>
    );
  } catch (error) {
    console.error('Error in HomePage:', error);
    return (
      <Container>
        <div className='text-red-500'>
          <h1>Error loading homepage content</h1>
          <p>{error instanceof Error ? error.message : String(error)}</p>
        </div>
      </Container>
    );
  }
}
