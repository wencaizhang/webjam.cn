# [webjam.cn](https://webjam.cn)

前不久在 [GitHub](https://github.com/) 上看到一个很惊艳我的个人网站：

![](https://static.webjam.cn/images/202401/aulianza.webp)

- 网站地址：[Ryan Aulia](https://aulianza.id/)
- 代码仓库：[aulianza/aulianza.id](https://github.com/aulianza/aulianza.id)

## 我也想要这样一个网站

我一直没有一个很满意的个人网站，主要原因是个人审美/设计能力不达标，做出来的网站总感觉差点意思。

直到我看到今天的主角：这不就是我的「梦中情网」吗？刚好技术栈我也感兴趣（基于 Next.js, TypeScript, Tailwind CSS 构建），一切都刚刚好。

于是乎，我基于 [aulianza/aulianza.id](https://github.com/aulianza/aulianza.id)(GPL-3.0 license) 修改了上百个文件诞生了这个项目：[wencaizhang/webjam.cn · GitHub](https://github.com/wencaizhang/webjam.cn)

项目使用 Vercel 部署：[webjam.cn](https://webjam.cn)

## 为什么要修改这么多文件？

答案很简单：不修改没法儿用啊。

原仓库的一些特点：

- 博客内容和评论都是通过 API 调用 [dev.to](https://dev.to/) 的数据
- 实时在线留言，使用 [Firebase](https://firebase.google.com/?hl=zh-cn) 数据库
- 支持 [ChatGPT AI](https://openai.com/) 对话
- 显示 [Spotify](https://open.spotify.com/?) 实时信息
- 通过 [Cal.com](https://cal.com/) 预约会议
- 使用 [Web3Forms](https://web3forms.com/) 填写联系表单
- 甚至一些本地数据（本地文件信息）都是以 API 接口形式调用
- 个人信息/站点信息**硬编码**到项目中

所以这个项目没办法直接使用的，我修改了上百个文件，现在就好多了：

- 博客文章是本地文件，评论可使用 giscus（可选择不用）
- 关闭在线留言功能(Guestbook)功能
- ChatGPT AI、Spotify、Cal.com、Web3Forms、Github 分析、wakatime 记录都改为可配置项，自由决定是否启用
- 「Project」和 「learn」功能取消 API 层，直接在 `getStaticProps` 中完成数据获取
- 所有个人信息/站点信息改为可配置项
- 更容易扩展和定制（例如 menu 和技术栈）
- 增加「周刊」功能
- 一些优化：例如减少 `getStaticProps` 数据体积、链接代替 js 跳转等等
- 更多小细节...

## Roadmap

不过现在还是不够完美的，也就是能用，下一步我的计划是：

- [ ] 提供使用文档
- [ ] 增加 RSS 功能
- [ ] 增加自动化脚本，创建博客模版功能，这样就不需要手动复制粘贴 frontMattter
- [ ] 替换 markdown 渲染库，支持 mdx 渲染，提供更多组件增强 mdx 表现力
- [ ] 优化 「learn」 改成文档布局，参考 https://vercel.com/templates/next.js/documentation-starter-kit
- [ ] 扩展 「dashboard」 信息
- [ ] 优化 「weekly」 页面
- [x] 增加 「代码段」模块
- [ ] 重构代码结构（ contents 放在最外层，nextjs 代码作为主题放在某个子目录下）
- [ ] 增加分享功能：https://github.com/nygardk/react-share?tab=readme-ov-file
- [ ] 递增式静态再生 ISR： https://vercel.com/templates/next.js/isr-blog-nextjs-wordpress 增量

## 如何运行

克隆代码

```sh
git clone https://github.com/webjam.cn
```

安装依赖

```sh
cd webjam.cn && pnpm install

# 或者
cd webjam.cn && yarn
```

启动开发服务

```sh
pnpm run dev
# 或者
yarn dev
```

然后修改 `src/contents/` 里面的内容即可。

## 如果你有一些想法或者建议

如果你有什么想法或者建议，可以通过 [Issues](https://github.com/wencaizhang/webjam.cn/issues/new) 告诉我或者直接给我[发邮件](mailto:1052642137@qq.com)。

当然如果你有能力对代码进行优化也欢迎直接 PR。

_以下是原 readme_

---

<div align="center">
  <h1>Personal Website</h1>
  <p>🔥 Personal website was built originally from scratch using Next.js, TypeScript, Tailwind CSS, SWR, Firebase and Prisma with MySQL</p>
</div>
<br />

![3-devices-black](https://github.com/aulianza/aulianza.id/assets/15605885/068cae0e-7867-4767-b558-80ee049c9f1b)

## Introduction

This website was meticulously crafted from the ground up using Next.js, along with various complementary technologies. Its inception dates back to June 2023.

Ongoing enhancements, encompassing both functionality and content, are in the pipeline. This website stands as a treasured repository of my acquired knowledge, also serving as a platform for me to disseminate insights.

Feel welcome to utilize this website as a point of reference, a wellspring of inspiration, or as a template, all in accordance with the provided license. The source code is at your disposal to suit your specific requirements.

Should you find value in this resource, your consideration of leaving a rating is greatly appreciated. 😎👍🏻

If you have any questions, suggestions, input or anything else, don't hesitate to contact me🧑‍💻
<br /><br />

## Features

On this website there are several features that will continue to be updated and added in the future.

### 🤖 ChatGPT AI

You can access this feature by opening the command palette [cmd+k], then typing whatever you want to search/ask for.

Note:

If you're using Chat Completions engine model of ChatGPT, please concern about this:

Due this site is using free cloud hosting services (Vercel) with certain limitations (Serverless Function Execution Timeout), sometimes an error will occur if the response from the open AI API is too long, but you can change it in the vercel.json file to upgrade memory and maxDuration to be bigger according to the capabilities of your vercel plan.

### 💻 JavaScript Playground

A no-fuss pure JavaScript playground with a live feedback loop.

### 💬 Realtime Guestbook

Realtime guestbook chat is powered by Firebase. Anyone can leave me a message in this website.

### 🎧 Spotify

Displays song information being played on spotify in real time using the Spotify API and SWR.

### 🕗 Wakatime

Data is retrieved using the Wakatime API and then displayed on the dashboard, built with Next.js API routes deployed as serverless functions.

### 📝 Blogs

The content on this blog is meticulously managed and sourced from a self-hosted headless CMS powered by WordPress, exemplifying our commitment to a streamlined and efficient content delivery system.

The data fetching technique used to retrieve articles from WordPress CMS API involves using Client-Side Rendering (CSR) for the blog list and Server-Side Rendering (SSR) for the blog details.

### 🗳 Projects

The data projects on this blog are taken from the MySQL database connected through the Prisma Client. The database for this application is hosted on PlanetScale DB.

The data fetching method used to retrieve data projects is Incremental Static Regeneration (ISR) with 1 second revalidation and Server-Side Rendering (SSR) for the project details..
<br /><br />

## Performance

### PageSpeed Insights

Report URL: https://pagespeed.web.dev/analysis/https-aulianza-id/pk0y6xcz25?form_factor=desktop

![image](https://github.com/aulianza/aulianza.id/assets/15605885/d87a6083-caf3-4b84-ba59-975c07193a9f)

### GTmetrix

Report URL: [https://pagespeed.web.dev/analysis/https-aulianza-id/pk0y6xcz25?form_factor=desktop](https://gtmetrix.com/reports/aulianza.id/REEiduoo/)

![image](https://github.com/aulianza/aulianza.id/assets/15605885/953dc131-bf52-4ef6-913c-f6eb8fb6c6a7)
<br /><br />

## Getting Started

If you are interested in running this project on your local machine, you can do so in just 3 easy steps below. Additionally, remember to update the ".env.example" file to ".env" and replace the variables with your own in the ".env" file.

### 1. Clone this template using one of the three ways:

1. Clone using git

   ```bash
   git clone https://github.com/aulianza/aulianza.id
   ```

2. Using `create-next-app`

   ```bash
   npx create-next-app -e https://github.com/aulianza/aulianza.id project-name
   ```

3. Using `degit`

   ```bash
   npx degit aulianza/aulianza.id YOUR_APP_NAME
   ```

4. Deploy to Vercel or Netlify, etc

   [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/aulianza/aulianza.id)
   [![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/aulianza/aulianza.id)

### 2. Install dependencies

It is encouraged to use **yarn** so the husky hooks can work properly.

```bash
yarn install
```

### 3. Run the development server

You can start the server using this command:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. You can start editing the page by modifying `src/pages/index.tsx`.
<br /><br />

## License

Licensed under the [GPL-3.0 license](https://github.com/aulianza/aulianza.id/blob/master/LICENSE).
