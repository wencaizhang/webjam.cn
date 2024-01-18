import { GetStaticProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';

import BackButton from '@/common/components/elements/BackButton';
import Container from '@/common/components/elements/Container';
import PageHeading from '@/common/components/elements/PageHeading';
import { getCollection, getEntry } from '@/common/libs/mdx';
import { ProjectItemProps } from '@/common/types/projects';
import { siteMetadata } from '@/contents/siteMetadata';
import ProjectDetail from '@/modules/projects/components/ProjectDetail';

interface ProjectsDetailPageProps {
  project: ProjectItemProps;
}

const ProjectsDetailPage: NextPage<ProjectsDetailPageProps> = ({ project }) => {
  const PAGE_TITLE = project?.title;
  const PAGE_DESCRIPTION = project?.description;

  const canonicalUrl = `${siteMetadata.siteUrl}/projects/${project?.slug}`;

  return (
    <>
      <NextSeo
        title={`${project?.title} - Project ${siteMetadata.author}`}
        description={project?.description}
        canonical={canonicalUrl}
        openGraph={{
          type: 'article',
          article: {
            publishedTime: project?.updated_at,
            modifiedTime: project?.updated_at,
            authors: [siteMetadata.author],
          },
          url: canonicalUrl,
          images: [
            {
              url: project?.image,
            },
          ],
          siteName: `Blog ${siteMetadata.author}`,
        }}
      />
      <Container data-aos='fade-up'>
        <BackButton url='/projects' />
        <PageHeading title={PAGE_TITLE} description={PAGE_DESCRIPTION} />
        <ProjectDetail {...project} />
      </Container>
    </>
  );
};

export default ProjectsDetailPage;

export const getStaticPaths = async () => {
  const list = getCollection('project');
  const paths = list.reduce((acc, curr) => {
    acc.push({
      params: {
        slug: curr.slug,
      },
    });
    return acc;
  }, [] as object[]);

  return {
    paths: paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const entry = await getEntry('project', slug);

  if (!entry) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };
  }
  const { content, frontMatter } = entry;

  return {
    props: {
      project: { content, ...frontMatter },
    },
    revalidate: 1,
  };
};
