import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';

import BackButton from '@/common/components/elements/BackButton';
import Container from '@/common/components/elements/Container';
import Loading from '@/common/components/elements/Loading';
import PageHeading from '@/common/components/elements/PageHeading';
import { filterIndex } from '@/common/libs/learn';
import { getCollection } from '@/common/libs/mdx';
import { ContentProps, MdxFileContentProps } from '@/common/types/learn';
import { siteMetadata } from '@/contents/siteMetadata';
import ContentList from '@/modules/learn/components/ContentList';
interface ContentPageProps {
  content: ContentProps | null;
  subContents: MdxFileContentProps[];
}

const LearnContentPage: NextPage<ContentPageProps> = ({
  content,
  subContents,
}) => {
  const router = useRouter();

  if (router.isFallback) {
    return <Loading />;
  }

  if (!content) {
    return null;
  }

  const { title, description } = content;

  const sortedSubContents = subContents.sort(
    (a, b) => a.frontMatter.id - b.frontMatter.id
  );

  const canonicalUrl = `${siteMetadata.siteUrl}/learn/${content?.slug}`;

  return (
    <>
      <NextSeo
        title={`Learn ${title} - ${siteMetadata.author}`}
        description={description}
        canonical={canonicalUrl}
        openGraph={{
          url: canonicalUrl,
          images: [
            {
              url: content?.image,
            },
          ],
          siteName: siteMetadata.author,
        }}
      />
      <Container data-aos='fade-up'>
        <BackButton url='/learn' />
        <PageHeading title={title} description={description} />
        <ContentList
          sortedSubContents={sortedSubContents}
          content={content}
          title={title}
        />
      </Container>
    </>
  );
};

export default LearnContentPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const collection = getCollection('learn/');
  const cate = collection.filter((item) => !filterIndex(item));

  const parseSlug = (slug: string) => {
    return slug.split('/');
  };

  const paths = cate.map((content) => {
    const slugs = parseSlug(content.slug);
    return {
      params: { content: slugs[0], slug: slugs[1] },
    };
  });

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const contentSlug = params?.content as string;

  const collection = getCollection('learn/' + contentSlug);

  const index = collection.filter((item) => filterIndex(item))[0];
  const content = {};
  if (index) {
    Object.assign(content, {
      ...index.frontMatter,
      slug: index.frontMatter.dir,
    });
  }

  const subContentList = collection.filter((item) => !filterIndex(item));

  if (!content) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };
  }

  return {
    props: {
      content,
      subContents: subContentList,
    },
  };
};
