// 注意：这个文件需要在安装 fumadocs-mdx 并运行 postinstall 脚本后才能正常工作
// 因为 .source 文件夹是由 fumadocs-mdx 生成的

import { loader } from 'fumadocs-core/source';

// 创建一个临时的空源，以便在安装依赖前编译通过
const emptySource = {
  pageTree: [],
  pages: [],
  getPage: () => null,
  getPages: () => [],
  generateParams: () => [],
};

// 使用空源，直到 Fumadocs 安装完成
export const learnSource = loader({
  baseUrl: '/learn-docs', // 新的文档路径，避免与现有路由冲突
  source: emptySource,
});
