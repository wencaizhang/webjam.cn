import { SubContentMetaProps } from '@/common/types/learn';
import GiscusComment from '@/modules/blog/components/GiscusComment';

import ContentBody from './ContentBody';
import ContentPlayground from './ContentPlayground';

interface ContentListItemProps {
  id: number;
  parent_slug: string;
  slug: string;
  title: string;
}

interface ContentDetailProps {
  content: string;
  frontMatter: SubContentMetaProps;
}

const ContentDetail = ({ content, frontMatter }: ContentDetailProps) => {
  const meta = frontMatter;
  const isShowPlayground = meta?.is_playground ?? false;
  const isShowComment = meta?.is_comment ?? false;
  const initialCode = meta?.initial_code ?? '';

  return (
    <>
      {content && <ContentBody content={content} />}

      {isShowPlayground && <ContentPlayground initialCode={initialCode} />}
      {isShowComment && (
        <section
          id='comments'
          className='border-t dark:border-neutral-700 border-gray-300 my-10'
        >
          <GiscusComment />
        </section>
      )}
    </>
  );
};

export default ContentDetail;
