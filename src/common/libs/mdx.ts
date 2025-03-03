import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkMdx from 'remark-mdx';
import remarkParse from 'remark-parse';

import { calculateReadingTime, formatExcerpt } from '@/common/helpers';
import { getTimestamp } from '@/common/helpers';
export interface MdxFileProps {
  slug: string;
  frontMatter: Record<string, unknown>;
  content?: string;
}

export const _loadMdxFiles = (dirPath: string): MdxFileProps[] => {
  if (!fs.existsSync(dirPath)) {
    return [];
  }

  const files = fs.readdirSync(dirPath, { recursive: true });

  const contents = (files as string[])
    .filter((file) => {
      // 同时允许 md 和 mdx 文件
      return file.endsWith('.mdx') || file.endsWith('.md');
    })
    .map((file) => {
      const filePath = path.join(dirPath, file);
      const source = fs.readFileSync(filePath, 'utf-8');
      const { content, data } = matter(source);

      const mdxCompiler = remark()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkMdx);
      const mdxContent = mdxCompiler.processSync(content).toString();
      const filename = file.endsWith('.mdx')
        ? file.replace('.mdx', '')
        : file.replace('.md', '');

      if (!data.featured_image_url) {
        const randomSrc = `/images/bg/bg${Math.floor(Math.random() * 15)}.svg`;
        data.featured_image_url = randomSrc;
      }

      return {
        slug: data.slug || filename,
        frontMatter: data,
        content: mdxContent,
        props: {
          readingTimeMinutes: calculateReadingTime(mdxContent) ?? 0,
          description: formatExcerpt(mdxContent) || '', // TODO 截取文章内容需要先转为 html，目前还是 md 语法
        },
      };
    });

  return contents;
};

export const getCollectionCount = (endpointer: string): number => {
  const dirPath = path.join(process.cwd(), 'src/contents', endpointer);
  const files = fs.readdirSync(dirPath);
  const mdxFiles = files.filter(
    (file) => file.endsWith('.mdx') || file.endsWith('.md')
  );
  return mdxFiles.length;
};

export const getCollection = (
  endpointer: string,
  withContent = false
): MdxFileProps[] => {
  const dirPath = path.join(process.cwd(), 'src/contents', endpointer);
  const files = _loadMdxFiles(dirPath);

  files.sort((a, b) => {
    return getTimestamp(a.frontMatter.date as string) <
      getTimestamp(b.frontMatter.date as string)
      ? 1
      : -1;
  });

  if (withContent) {
    return files;
  }
  return files.map(({ content, ...rest }) => ({ ...rest }));
};

export const getEntry = (
  endpointer: string,
  slug: string
): MdxFileProps | null => {
  const dirPath = path.join(process.cwd(), 'src/contents', endpointer);
  const collection = _loadMdxFiles(dirPath);
  return collection.find((item) => item.slug === slug) || null;
};
