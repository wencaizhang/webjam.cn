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
  try {
    console.log(`Loading MDX files from: ${dirPath}`);
    if (!fs.existsSync(dirPath)) {
      console.error(`Directory does not exist: ${dirPath}`);
      return [];
    }

    const files = fs.readdirSync(dirPath, { recursive: true });
    console.log(`Found ${files.length} total files in directory`);

    const mdxFiles = (files as string[]).filter((file) => {
      // 同时允许 md 和 mdx 文件
      return file.endsWith('.mdx') || file.endsWith('.md');
    });

    console.log(`Found ${mdxFiles.length} MDX/MD files`);

    const contents = mdxFiles.map((file) => {
      try {
        const filePath = path.join(dirPath, file);
        console.log(`Processing file: ${filePath}`);

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
          const randomSrc = `/images/bg/bg${Math.floor(
            Math.random() * 15
          )}.svg`;
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
      } catch (error) {
        console.error(`Error processing file ${file}:`, error);
        // Return a minimal valid object to avoid breaking the entire collection
        return {
          slug: file,
          frontMatter: {
            title: `Error loading ${file}`,
            date: new Date().toISOString(),
            tags: ['error'],
            featured_image_url: '/images/bg/bg0.svg',
          },
          content: '',
          props: {
            readingTimeMinutes: 0,
            description: 'Error loading this file',
          },
        };
      }
    });

    console.log(`Successfully processed ${contents.length} MDX files`);
    return contents;
  } catch (error) {
    console.error(`Error in _loadMdxFiles:`, error);
    return [];
  }
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
  try {
    console.log(`Getting collection from: ${endpointer}`);
    const dirPath = path.join(process.cwd(), 'src/contents', endpointer);
    console.log(`Full directory path: ${dirPath}`);

    // Check if directory exists
    if (!fs.existsSync(dirPath)) {
      console.error(`Directory does not exist: ${dirPath}`);
      return [];
    }

    const files = _loadMdxFiles(dirPath);
    console.log(`Loaded ${files.length} files from ${endpointer}`);

    files.sort((a, b) => {
      return getTimestamp(a.frontMatter.date as string) <
        getTimestamp(b.frontMatter.date as string)
        ? 1
        : -1;
    });

    if (withContent) {
      return files;
    }
    return files.map(({ content: _content, ...rest }) => ({ ...rest }));
  } catch (error) {
    console.error(`Error in getCollection(${endpointer}):`, error);
    return [];
  }
};

export const getEntry = (
  endpointer: string,
  slug: string
): MdxFileProps | null => {
  const dirPath = path.join(process.cwd(), 'src/contents', endpointer);
  const collection = _loadMdxFiles(dirPath);
  return collection.find((item) => item.slug === slug) || null;
};

/**
 * 读取站点设置文件内容
 * 用于服务器组件中获取设置
 */
export const readSettingsFile = async (): Promise<string> => {
  try {
    const filePath = path.join(process.cwd(), 'src/contents/siteMetadata.ts');
    return fs.readFileSync(filePath, 'utf-8');
  } catch (error) {
    console.error('Error reading settings file:', error);
    return '';
  }
};
