import { GetStaticProps, NextPage } from 'next';
import dynamic from 'next/dynamic';
import { NextSeo } from 'next-seo';

import BackButton from '@/common/components/elements/BackButton';
import Container from '@/common/components/elements/Container';
import NavigationSection from '@/common/components/elements/NavigationSection';
import { formatExcerpt } from '@/common/helpers';
import { getCollection, getEntry } from '@/common/libs/mdx';
import { BlogDetailProps } from '@/common/types/blog';
import { siteMetadata } from '@/contents/siteMetadata';
import BlogDetail from '@/modules/blog/components/BlogDetail';

const GiscusComment = dynamic(
  () => import('@/modules/blog/components/GiscusComment')
);
type PageInfo = { title: string; href: string };

interface BlogDetailPageProps {
  post: BlogDetailProps;
  prev: PageInfo | null;
  next: PageInfo | null;
}

const BlogDetailPage: NextPage<BlogDetailPageProps> = ({
  post,
  prev,
  next,
}) => {
  const blogData = post;

  const slug = blogData.slug;
  const canonicalUrl = `${siteMetadata.siteUrl}/${slug}`;
  const description = formatExcerpt(blogData?.frontMatter.summary) || '';

  return (
    <>
      <NextSeo
        title={`${blogData.frontMatter.title} - Blog ${siteMetadata.author}`}
        description={description}
        canonical={canonicalUrl}
        openGraph={{
          type: 'article',
          article: {
            publishedTime: blogData.frontMatter.date,
            modifiedTime: blogData.frontMatter.date,
            authors: [siteMetadata.author, 'aulianza'],
          },
          url: canonicalUrl,
          images: [
            {
              url: blogData.frontMatter.featured_image_url,
            },
          ],
          siteName: 'aulianza blog',
        }}
      />
      <Container data-aos='fade-up'>
        <BackButton url='/blog' />
        <BlogDetail {...blogData} />

        <section id='comments'>
          <GiscusComment />
        </section>

        <NavigationSection prev={prev} next={next} />
      </Container>
    </>
  );
};

export default BlogDetailPage;

export async function getStaticPaths() {
  const contentList = await getCollection('blog');
  const paths = contentList.reduce((acc, curr) => {
    acc.push({
      params: {
        slug: curr.slug,
      },
    });
    return acc;
  }, [] as object[]);
  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const contentList = await getCollection('blog');
  const post = await getEntry('blog', slug);

  const postIndex = contentList.findIndex((item) => item.slug === slug);
  const prev = contentList[postIndex + 1] || null;
  const next = contentList[postIndex - 1] || null;

  if (!post) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };
  }
  return {
    props: {
      post,
      prev: !prev
        ? null
        : {
            title: prev?.frontMatter.title,
            href: `/blog/${prev.slug}`,
          },
      next: !next
        ? null
        : {
            title: next?.frontMatter.title,
            href: `/blog/${next.slug}`,
          },
    },
  };
};
