# 静态导出指南

本项目已配置为支持 Next.js 的静态导出功能，可以生成完全静态的 HTML/CSS/JS 文件，无需服务器端渲染。

## 静态导出的优势

1. **无需服务器** - 可以部署到任何静态文件托管服务，如 GitHub Pages、Netlify、Vercel 等
2. **更快的加载速度** - 预渲染的 HTML 文件可以直接提供给用户，无需服务器处理
3. **更高的安全性** - 没有服务器端代码执行，减少了安全风险
4. **更低的成本** - 静态托管通常比需要服务器的托管方案成本更低

## 如何生成静态文件

执行以下命令生成静态文件：

```bash
# 使用pnpm
pnpm build

# 或使用npm
npm run build
```

生成的静态文件将位于`out`目录中。

## 本地测试静态文件

可以使用以下命令在本地测试静态文件：

```bash
# 使用pnpm
pnpm serve-static

# 或使用npm
npm run serve-static
```

这将启动一个本地服务器，默认在`http://localhost:3000`提供静态文件。

## 部署到静态托管服务

### Vercel

Vercel 会自动检测 Next.js 的静态导出配置，无需额外设置。

### Netlify

1. 在 Netlify 中创建新站点
2. 设置构建命令为`npm run build`
3. 设置发布目录为`out`

### GitHub Pages

1. 生成静态文件
2. 将`out`目录中的内容推送到 GitHub Pages 分支（通常是`gh-pages`）

## 限制和注意事项

静态导出有一些限制：

1. **不支持 API 路由** - 所有`/api`路由在静态导出中不可用
2. **不支持中间件** - Next.js 中间件在静态导出中不可用
3. **不支持服务器组件的动态功能** - 如动态数据获取等
4. **图片优化受限** - `next/image`组件的一些优化功能在静态导出中不可用

## 恢复服务器端渲染

如果需要恢复服务器端渲染功能，请修改`next.config.js`文件，移除或注释以下配置：

```js
output: 'export',
```

并恢复`middleware.ts`文件（从`middleware.ts.bak`）。
