'use client';

import { useState } from 'react';

import { ProjectItemProps } from '@/common/types/projects';
import Projects from '@/modules/projects';

// 客户端组件处理交互逻辑
export default function ProjectsClient({
  initialProjects,
}: {
  initialProjects: ProjectItemProps[];
}) {
  const [visibleProjects, setVisibleProjects] = useState(6);

  const loadMore = () => setVisibleProjects((prev) => prev + 2);
  const hasMore = visibleProjects < initialProjects.length;

  return (
    <Projects
      projects={initialProjects.slice(0, visibleProjects)}
      loadMore={loadMore}
      hasMore={hasMore}
    />
  );
}
