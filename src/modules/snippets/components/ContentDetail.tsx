import { SnippetsMetaProps } from '@/common/types/snippets';
import GiscusComment from '@/modules/blog/components/GiscusComment';

import ContentBody from './ContentBody';

interface ContentDetailProps {
  content: string;
  frontMatter: SnippetsMetaProps;
}

const ContentDetail = ({ content, frontMatter }: ContentDetailProps) => {
  const meta = frontMatter;
  const isShowComment = meta?.is_comment ?? false;

  return (
    <>
      {content && <ContentBody content={content} />}

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
