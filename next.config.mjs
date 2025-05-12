/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export', // 启用静态导出
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'aulianza.s3.ap-southeast-1.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'static.webjam.cn',
      },
    ],
    unoptimized: true, // 静态导出时需要禁用图片优化
  },
  eslint: {
    ignoreDuringBuilds: true, // 忽略 eslint 检查
  },
  typescript: {
    ignoreBuildErrors: true, // 忽略 TypeScript 检查
  },
  // 配置需要排除的路径，这些路径在静态导出时不会生成
  trailingSlash: true, // 为每个HTML文件添加尾部斜杠，有助于部署到某些静态托管服务
};

export default nextConfig;
