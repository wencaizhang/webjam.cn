export interface ProjectItemProps {
  type: 'work' | 'self';
  title: string;
  slug: string;
  description: string;
  image: string;
  link_demo?: string;
  link_github?: string;
  stacks: string[];
  content?: string;
  is_show: boolean;
  is_featured: boolean;
  updated_at: string;
  state?: '开发中' | '维护中' | '待发布' | '待更新' | '停止更新';
  demo?: { name: string; link_demo: string }[];
}

export interface ProjectsProps {
  projects: ProjectItemProps[];
}
