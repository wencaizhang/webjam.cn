import { Metadata } from 'next';

import AnimatedContainer from '@/common/components/elements/AnimatedContainer';
import Container from '@/common/components/elements/Container';
import PageHeading from '@/common/components/elements/PageHeading';
import { getCollection } from '@/common/libs/mdx';
import { ProjectItemProps } from '@/common/types/projects';
import { siteMetadata } from '@/contents/siteMetadata';

import ProjectsClient from './client';

const PAGE_TITLE = 'Projects';
const PAGE_DESCRIPTION =
  'Several projects that I have worked on, both private and open source.';

// 客户端组件不能使用 metadata 导出
// export const metadata: Metadata = {
//   title: `${PAGE_TITLE} - ${siteMetadata.author}`,
//   description: PAGE_DESCRIPTION,
// };

// 创建一个服务器组件来处理 metadata
export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: `${PAGE_TITLE} - ${siteMetadata.author}`,
    description: PAGE_DESCRIPTION,
  };
};

// 获取项目数据
async function getProjects() {
  const collection = getCollection('project', false);
  const list = collection
    .filter((item) => item.frontMatter.is_show)
    .map((item) => item.frontMatter);

  return list as ProjectItemProps[];
}

export default async function ProjectsPage() {
  // 在服务器组件中获取数据
  const projects = await getProjects();

  // 客户端状态和逻辑
  return (
    <AnimatedContainer>
      <Container>
        <PageHeading title={PAGE_TITLE} description={PAGE_DESCRIPTION} />
        <ProjectsClient initialProjects={projects} />
      </Container>
    </AnimatedContainer>
  );
}
