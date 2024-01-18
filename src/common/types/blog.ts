export type UserProps = {
  name: string;
  username: string;
  twitter_username: string;
  github_username: string;
  user_id: number;
  website_url: string;
  profile_image: string;
  profile_image_90: string;
};

export type BlogItemProps = {
  slug: string;
  content: string;
  props: {
    readingTimeMinutes: number;
  };
  frontMatter: {
    title: string;
    date: string;
    draft: boolean;
    summary: string;
    featured: boolean;
    tags: string[];
    featured_image_url: string;
  };
};

export type BlogDetailProps = {
  slug: string;
  content: string;
  props: {
    readingTimeMinutes: number;
  };
  frontMatter: {
    title: string;
    date: string;
    draft: boolean;
    summary: string;
    featured: boolean;
    tags: string[];
    featured_image_url: string;
  };
};

export type BlogProps = {
  blogs: BlogItemProps[];
};

export type BlogFeaturedProps = {
  data: BlogItemProps[];
};

export type CommentItemProps = {
  type_of: string;
  id_code: string;
  created_at: string;
  body_html: string;
  user: UserProps;
  children: Comment[];
};
