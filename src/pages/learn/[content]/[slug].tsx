import { GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';

import BackButton from '@/common/components/elements/BackButton';
import Container from '@/common/components/elements/Container';
import NavigationSection from '@/common/components/elements/NavigationSection';
import { parseUrl } from '@/common/helpers';
import { filterIndex } from '@/common/libs/learn';
import { getCollection, getEntry } from '@/common/libs/mdx';
import { MdxFileContentProps } from '@/common/types/learn';
import { siteMetadata } from '@/contents/siteMetadata';
import ContentDetail from '@/modules/learn/components/ContentDetail';
import ContentDetailHeader from '@/modules/learn/components/ContentDetailHeader';

type PageInfo = { title: string; href: string };
interface PageProps {
  data: MdxFileContentProps;
  prev: PageInfo | null;
  next: PageInfo | null;
}

const LearnContentDetailPage: NextPage<PageProps> = ({ data, prev, next }) => {
  const { frontMatter } = data;
  const router = useRouter();
  const currentUrl = router.asPath;
  const { parentSlug } = parseUrl(currentUrl);

  const meta = frontMatter;

  const PAGE_TITLE = meta?.title;
  const PAGE_DESCRIPTION = `Learn ${meta?.category} - ${PAGE_TITLE} with detailed explanations`;

  return (
    <article>
      <NextSeo
        title={`Learn ${meta?.category} : ${PAGE_TITLE} - ${siteMetadata.author}`}
        description={PAGE_DESCRIPTION}
        openGraph={{
          type: 'article',
          article: {
            publishedTime: meta?.updated_at,
            modifiedTime: meta?.updated_at,
            authors: [siteMetadata.author],
          },
          images: [
            {
              url: meta?.cover_url as string,
            },
          ],
          siteName: siteMetadata.author,
        }}
      />
      <Container data-aos='fade-up' className='mb-10 '>
        <BackButton url={`/learn/${parentSlug}`} />
        <ContentDetailHeader {...meta} />
        <ContentDetail content={data?.content} frontMatter={frontMatter} />
        <NavigationSection prev={prev} next={next} />
      </Container>
    </article>
  );
};

export default LearnContentDetailPage;

export const getStaticPaths = async () => {
  const list = getCollection('learn').filter((item) => !filterIndex(item));
  const paths = list.reduce((acc, curr) => {
    const arr = curr.slug.split('/');
    acc.push({
      params: {
        content: arr[0],
        slug: arr.slice(1).join('/'),
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
  const parentContent = params?.content as string;
  const slug = params?.slug as string;
  const dir = 'learn/' + parentContent;

  const collection = await getCollection(dir);

  const contentData = await getEntry(dir, slug);

  if (!contentData) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };
  }

  const prev = collection.find(
    (item) =>
      item.frontMatter.id ===
      Number.parseInt(contentData.frontMatter.id as string) - 1
  );
  const next = collection.find(
    (item) =>
      item.frontMatter.id ===
      Number.parseInt(contentData.frontMatter.id as string) + 1
  );

  return {
    props: {
      data: contentData,
      prev: !prev
        ? null
        : {
            title: prev?.frontMatter.title,
            href: `/learn/${parentContent}/${prev.slug}`,
          },
      next: !next
        ? null
        : {
            title: next?.frontMatter.title,
            href: `/learn/${parentContent}/${next.slug}`,
          },
    },
  };
};
