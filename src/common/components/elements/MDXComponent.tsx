/* eslint-disable unused-imports/no-unused-vars */
import { ReactNode } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { siteMetadata } from '@/contents/siteMetadata';

import CodeBlock from './CodeBlock';

interface MarkdownRendererProps {
  children: string;
}

interface TableProps {
  children: ReactNode;
}

const Table = ({ children }: TableProps) => (
  <div className='table-container'>
    <table className='table w-full'>{children}</table>
  </div>
);

const MDXComponent = ({ children }: MarkdownRendererProps) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        a: (props) => (
          <a
            className='text-indigo-500 hover:text-indigo-400 hover:underline cursor-pointer'
            target={
              props.href?.startsWith(siteMetadata.siteUrl) ||
              props.href?.startsWith('#')
                ? '_self'
                : '_blank'
            }
            {...props}
          />
        ),
        p: (props) => <div {...props} />,
        h2: (props) => (
          <h2
            className='text-xl font-medium dark:text-neutral-300'
            id={props.children[0] as string}
            {...props}
          />
        ),
        h3: (props) => (
          <h3
            className='text-[18px] leading-snug pt-4 font-medium dark:text-neutral-300'
            id={props.children[0] as string}
            {...props}
          />
        ),
        ul: ({ ordered, ...props }) => (
          <ul className='pl-10 space-y-3 list-disc pb-2' {...props} />
        ),
        ol: ({ ordered, ...props }) => (
          <ol className='pl-10 space-y-3 list-decimal pb-2' {...props} />
        ),
        code: (props) => <CodeBlock {...props} />,
        blockquote: (props) => (
          <blockquote
            className='pl-6 py-3 text-lg border-l-[5px] border-neutral-700 border-l-cyan-500 bg-neutral-200 dark:bg-neutral-800 rounded-br-2xl text-cyan-800 dark:text-cyan-200 font-sora break-all'
            {...props}
          />
        ),
        table: (props) => <Table {...props} />,
        th: (props) => (
          <th className='border dark:border-neutral-600 py-1 px-3 text-left'>
            {props.children}
          </th>
        ),
        td: (props) => (
          <td className='border dark:border-neutral-600  py-1 px-3'>
            {props.children}
          </td>
        ),
      }}
    >
      {children}
    </ReactMarkdown>
  );
};

export default MDXComponent;
