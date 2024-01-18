import Giscus from '@giscus/react';
import { useTheme } from 'next-themes';

import { commentConfig } from '@/contents/siteMetadata';

const config = commentConfig.giscusConfig;

const GiscusComment = () => {
  const { theme } = useTheme();

  if (!commentConfig.enable) {
    return null;
  }

  return (
    <div className='mt-5 mb-2'>
      <Giscus
        repo={`${config.gitUsername}/${config.repo}`}
        repoId={config.repositoryId}
        category={config.category}
        categoryId={config.categoryId}
        // mapping={config.mapping}
        mapping='title'
        reactionsEnabled={config.reactions ? '1' : '0'}
        // emitMetadata={config.metadata}
        emitMetadata='0'
        inputPosition='top'
        theme={theme === 'dark' ? config.darkTheme : config.lightTheme}
        lang={config.lang}
        loading='lazy'
      />
    </div>
  );
};

export default GiscusComment;
