const config = {
  plugins: {
    '@tailwindcss/postcss': {},
    // 在 v4 中，tailwindcss 自动处理 autoprefixer 和 postcss-import，所以通常可以移除它们
    // autoprefixer: {},
    // 'postcss-import': {},
  },
};
export default config;
