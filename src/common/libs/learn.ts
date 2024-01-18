import { MdxFileProps } from './mdx';

export function filterIndex(item: MdxFileProps) {
  return item.frontMatter.slug === '_index';
}
