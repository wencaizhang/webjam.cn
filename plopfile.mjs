import { format } from 'date-fns';
import { projectStates, STACK_CHOICES, cheatsheetTypes } from './plop-templates/config.mjs';

export default function (plop) {
  // 博客文章生成器
  plop.setGenerator('blog', {
    description: '创建新的博客文章',
    prompts: [
      {
        type: 'input',
        name: 'title',
        message: '文章标题:',
        validate: (value) => {
          if (!value) {
            return '标题不能为空';
          }
          return true;
        },
      },
      {
        type: 'input',
        name: 'slug',
        message: '文章 slug (URL 路径):',
        default: (answers) => {
          return answers.title
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w\-]+/g, '')
            .replace(/\-\-+/g, '-')
            .replace(/^-+/, '')
            .replace(/-+$/, '');
        },
      },
      {
        type: 'input',
        name: 'summary',
        message: '文章摘要:',
      },
      {
        type: 'confirm',
        name: 'featured',
        message: '是否为精选文章?',
        default: false,
      },
      {
        type: 'input',
        name: 'tags',
        message: '文章标签 (用逗号分隔):',
      },
      {
        type: 'confirm',
        name: 'draft',
        message: '是否为草稿?',
        default: true,
      },
      {
        type: 'input',
        name: 'featured_image_url',
        message: '特色图片 URL (可选):',
      },
    ],
    actions: (data) => {
      const date = new Date();
      const formattedDate = format(date, 'yyyy-MM-dd');
      const year = format(date, 'yyyy');

      // 处理标签
      const tags = data.tags
        ? data.tags.split(',').map((tag) => tag.trim())
        : [];

      // 设置数据
      data.date = formattedDate;
      data.tags = tags;

      return [
        {
          type: 'add',
          path: `src/contents/blog/${year}/${formattedDate}-{{slug}}.mdx`,
          templateFile: 'plop-templates/blog.mdx.hbs',
        },
      ];
    },
  });

  // 代码片段生成器
  plop.setGenerator('snippet', {
    description: '创建新的代码片段',
    prompts: [
      {
        type: 'input',
        name: 'title',
        message: '代码片段标题:',
        validate: (value) => {
          if (!value) {
            return '标题不能为空';
          }
          return true;
        },
      },
      {
        type: 'input',
        name: 'description',
        message: '代码片段描述:',
      },
      {
        type: 'input',
        name: 'slug',
        message: '代码片段 slug:',
        default: (answers) => {
          return answers.title
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w\-]+/g, '')
            .replace(/\-\-+/g, '-')
            .replace(/^-+/, '')
            .replace(/-+$/, '');
        },
      },
      {
        type: 'list',
        name: 'type',
        message: '代码片段类型 (例如: npm, js, css):',
				choices: cheatsheetTypes,
      },
      {
        type: 'confirm',
        name: 'draft',
        message: '是否为草稿?',
        default: true,
      },
    ],
    actions: (data) => {
      const date = new Date();
      const formattedDate = format(date, 'yyyy-MM-dd');

      // 设置数据
      data.date = formattedDate;

      return [
        {
          type: 'add',
          path: `src/contents/snippets/{{slug}}.mdx`,
          templateFile: 'plop-templates/snippet.mdx.hbs',
        },
      ];
    },
  });

  // 周刊生成器
  plop.setGenerator('weekly', {
    description: '创建新的周刊',
    prompts: [
      {
        type: 'input',
        name: 'title',
        message: '周刊标题:',
        validate: (value) => {
          if (!value) {
            return '标题不能为空';
          }
          return true;
        },
      },
      {
        type: 'input',
        name: 'slug',
        message: '周刊 slug:',
        default: (answers) => {
          return answers.title
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w\-]+/g, '')
            .replace(/\-\-+/g, '-')
            .replace(/^-+/, '')
            .replace(/-+$/, '');
        },
      },
      {
        type: 'input',
        name: 'description',
        message: '周刊描述:',
      },
      {
        type: 'input',
        name: 'cover_url',
        message: '封面图 URL:',
      },
      {
        type: 'confirm',
        name: 'draft',
        message: '是否为草稿?',
        default: false,
      },
    ],
    actions: (data) => {
      const date = new Date();
      const formattedDate = format(date, 'yyyy-MM-dd');

      // 设置数据
      data.date = formattedDate;
      data.created_at = formattedDate;
      data.updated_at = formattedDate;

      return [
        {
          type: 'add',
          path: `src/contents/weekly/{{slug}}.mdx`,
          templateFile: 'plop-templates/weekly.mdx.hbs',
        },
      ];
    },
  });

  // 项目生成器
  plop.setGenerator('project', {
    description: '创建新的项目',
    prompts: [
      {
        type: 'list',
        name: 'type',
        message: '项目类型:',
        choices: ['self', 'work', 'open-source'],
      },
      {
        type: 'input',
        name: 'title',
        message: '项目标题:',
        validate: (value) => {
          if (!value) {
            return '标题不能为空';
          }
          return true;
        },
      },
      {
        type: 'input',
        name: 'slug',
        message: '项目 slug:',
        default: (answers) => {
          return answers.title;
        },
      },
      {
        type: 'confirm',
        name: 'is_show',
        message: '是否显示?',
        default: true,
      },
      {
        type: 'confirm',
        name: 'is_featured',
        message: '是否为精选项目?',
        default: false,
      },
      {
        type: 'input',
        name: 'description',
        message: '项目描述:',
      },
      {
        type: 'input',
        name: 'image',
        message: '项目图片 URL:',
      },
      {
        type: 'input',
        name: 'link_github',
        message: 'GitHub 链接:',
      },
      {
        type: 'input',
        name: 'link_demo',
        message: '演示链接:',
      },
      {
        type: 'checkbox',
        name: 'stacks',
        message: '技术栈 (多选):',
        choices: STACK_CHOICES,
      },
			{
        type: 'list',
       	name: 'state',
        message: '项目状态:',
				// src/common/types/projects.ts
        choices: projectStates,
      },
    ],
    actions: (data) => {
      const date = new Date();
      const formattedDate = format(date, 'yyyy-MM-dd');

      // 处理技术栈 - 多选结果已经是数组，不需要分割
      const stacks = data.stacks || [];

      // 设置数据
      data.date = formattedDate;
      data.stacks = stacks;

      return [
        {
          type: 'add',
          path: `src/contents/project/{{slug}}.mdx`,
          templateFile: 'plop-templates/project.mdx.hbs',
        },
      ];
    },
  });
};
