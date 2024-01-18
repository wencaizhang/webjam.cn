const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['aulianza.s3.ap-southeast-1.amazonaws.com', 'static.webjam.cn'],
  },
};

module.exports = nextConfig;
