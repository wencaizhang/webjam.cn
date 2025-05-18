# 内容生成器使用指南

这个工具使用 [Plop.js](https://plopjs.com/) 来生成不同类型的内容模板文件，帮助您快速创建博客文章、代码片段、学习内容、周刊和项目介绍等。

## 安装

首先，确保已经安装了依赖：

```bash
pnpm install
```

## 使用方法

### 通用命令

使用以下命令启动交互式生成器，然后选择要创建的内容类型：

```bash
pnpm new
```

### 直接生成特定类型内容

也可以直接指定要创建的内容类型：

```bash
# 创建博客文章
pnpm new:blog

# 创建代码片段
pnpm new:snippet

# 创建学习内容
pnpm new:learn

# 创建周刊
pnpm new:weekly

# 创建项目介绍
pnpm new:project
```

## 内容类型说明

### 博客文章 (Blog)

生成路径：`src/contents/blog/YYYY/YYYY-MM-DD-slug.mdx`

提示输入：
- 文章标题
- 文章 slug (URL 路径)
- 文章摘要
- 是否为精选文章
- 文章标签
- 是否为草稿
- 特色图片 URL

### 代码片段 (Snippet)

生成路径：`src/contents/snippets/slug.mdx`

提示输入：
- 代码片段标题
- 代码片段描述
- 代码片段 slug
- 代码片段类型 (例如: npm, js, css)
- 是否为草稿

### 学习内容 (Learn)

生成路径：`src/contents/learn/category/id-title.mdx`

提示输入：
- 内容 ID
- 章节 ID
- 章节标题
- 内容标题
- 分类
- 编程语言
- 难度
- 封面图 URL
- 是否包含代码操作区
- 是否允许评论

### 周刊 (Weekly)

生成路径：`src/contents/weekly/slug.mdx`

提示输入：
- 周刊标题
- 周刊 slug
- 周刊描述
- 封面图 URL
- 是否为草稿

### 项目 (Project)

生成路径：`src/contents/project/slug.mdx`

提示输入：
- 项目类型 (self, work, open-source)
- 项目标题
- 项目 slug
- 是否显示
- 是否为精选项目
- 项目描述
- 项目图片 URL
- GitHub 链接
- 演示链接
- 技术栈
- 项目状态

## 自定义模板

如果需要修改生成的内容模板，可以编辑 `plop-templates` 目录下的相应文件：

- `blog.mdx.hbs` - 博客文章模板
- `snippet.mdx.hbs` - 代码片段模板
- `learn.mdx.hbs` - 学习内容模板
- `weekly.mdx.hbs` - 周刊模板
- `project.mdx.hbs` - 项目模板

## 自定义生成器

如果需要修改生成器的行为，可以编辑 `plopfile.mjs` 文件。

## 技术说明

本生成器使用 ESM (ECMAScript Modules) 规范编写，文件扩展名为 `.mjs`。这使得我们可以使用现代 JavaScript 的 `import/export` 语法，而不是传统的 CommonJS 的 `require/module.exports` 语法。
