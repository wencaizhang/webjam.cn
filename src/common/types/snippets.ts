import { StackIconsMap } from './StackIcon';

export interface SnippetsMetaProps {
  slug: string;
  date: string;
  title: string;
  description: string;
  cover_url?: string;
  created_at: string;
  updated_at: string;
  is_playground?: boolean;
  is_comment: boolean;
  initial_code?: string;

  featured?: boolean;
  type: keyof typeof StackIconsMap;
  draft?: boolean;
}

export interface MdxFileContentProps {
  slug: string;
  frontMatter: SnippetsMetaProps;
  content: string;
}
