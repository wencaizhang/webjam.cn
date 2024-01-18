/** @type {import('next-sitemap').IConfig} */

// import { siteMetadata } from './src/contents/siteMetadata';
// 此文件为 commonjs 规范，无法使用 import

module.exports = {
  siteUrl: process.env.SITE_URL || 'https://webjam.cn',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
};
