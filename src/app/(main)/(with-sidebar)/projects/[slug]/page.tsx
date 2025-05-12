import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import AnimatedContainer from '@/common/components/elements/AnimatedContainer';
import BackButton from '@/common/components/elements/BackButton';
import Container from '@/common/components/elements/Container';
import PageHeading from '@/common/components/elements/PageHeading';
import { getCollection, getEntry } from '@/common/libs/mdx';
import { ProjectItemProps } from '@/common/types/projects';
import { siteMetadata } from '@/contents/siteMetadata';
import ProjectDetail from '@/modules/projects/components/ProjectDetail';

// 动态生成 metadata
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const slug = params.slug;
  const entry = await getEntry('project', slug);

  if (!entry) {
    return {
      title: 'Project Not Found',
    };
  }

  const { frontMatter } = entry;
  const canonicalUrl = `${siteMetadata.siteUrl}/projects/${slug}`;

  return {
    title: `${frontMatter.title} - Project ${siteMetadata.author}`,
    description: frontMatter.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: 'article',
      url: canonicalUrl,
      title: frontMatter.title,
      description: frontMatter.description,
      images: [
        {
          url: frontMatter.image,
          width: 800,
          height: 600,
          alt: frontMatter.title,
        },
      ],
      publishedTime: frontMatter.updated_at,
      modifiedTime: frontMatter.updated_at,
      authors: [siteMetadata.author],
    },
  };
}

// 生成静态路径
export async function generateStaticParams() {
  const list = await getCollection('project');
  return list.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const slug = params.slug;
  const entry = await getEntry('project', slug);

  if (!entry) {
    notFound();
  }

  const { content, frontMatter } = entry;
  const project = { content, ...frontMatter } as ProjectItemProps;

  return (
    <AnimatedContainer>
      <Container>
        <BackButton url='/projects' />
        <PageHeading title={project.title} description={project.description} />
        <ProjectDetail {...project} />
      </Container>
    </AnimatedContainer>
  );
}
