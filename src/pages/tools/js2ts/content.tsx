'use client';
import Button from './components/button/Button';
import SEOMetaData from './components/seo/MetaData';
import ClipboardHelper from './helpers/clipboard';
import {
  ClipboardDocumentCheckIcon,
  ClipboardDocumentIcon,
  ClipboardDocumentListIcon,
  CodeBracketIcon,
} from '@heroicons/react/24/outline';
import useDebounce from './hooks/useDebounce';
import dynamic from 'next/dynamic';
import { useCallback, useEffect, useMemo, useState } from 'react';

const staticCode = <pre key='staticCode'>{`/*\nPaste JSON\n*/`}</pre>;

const LazyCodeHighLighter = dynamic(
  () => import('./components/highlight/HighLighter'),
  {
    loading: () => staticCode,
    ssr: false,
  }
);

export default function JS2TS() {
  const [json, setJson] = useState<string>('');
  const [interfaces, setIntefaces] = useState<string[] | string>([]);
  const [copied, setCopied] = useState(false);
  const [addExport, setAddExport] = useState('');
  const [rootObjectName, setRootObjectName] = useState('');

  const debounceJson = useDebounce(json, 200);

  const loading = json !== debounceJson;

  const generateInterfaces = useCallback(async () => {
    if (!json.length) {
      setIntefaces(`Paste JSON or JS Object in Left
在左侧粘贴 JSON 或者 JS 对象`);
      return;
    }
    try {
      const JsonToTS = (await import('json-to-ts')).default;
      const interfaces = JsonToTS(JSON.parse(json), {
        rootName: rootObjectName.length ? rootObjectName : 'RootInterface',
      });
      setIntefaces(interfaces);
    } catch (e) {
      setIntefaces(`Not a valid JSON or JS Object
不是一个 JSON 也不是 JS 对象`);
    }
  }, [json, rootObjectName]);

  useEffect(() => {
    generateInterfaces();
  }, [debounceJson, rootObjectName, generateInterfaces]);

  const tsInterface = useMemo(() => {
    if (loading) return '/*\nGenerating...\n*/';

    if (typeof interfaces === 'string') return `/*\n${interfaces}\n*/`;
    return interfaces
      .map((int) => addExport + int)
      .join('\n\n')
      .trim();
  }, [interfaces, loading, addExport]);

  function getClipboardAndPaste() {
    ClipboardHelper.read().then((data) => setJson(data));
  }

  function pasteToClipboard() {
    ClipboardHelper.write(tsInterface).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function onInputChange(value: string): void {
    console.log(
      '%c 🥖 value',
      'font-size:18px;color:#ffffff;background:#2eafb0',
      value
    );

    try {
      const data = eval(`(${value})`);
      data && setJson(JSON.stringify(data));
    } catch (error) {
      setJson(value);
    }
  }

  return (
    <div className='bg-slate-50 dark:bg-black'>
      <SEOMetaData />
      <div className='grid grid-cols-1 lg:grid-cols-2'>
        <section className='p-6 grid grid-cols-1 gap-4 place-content-start'>
          <textarea
            name='json'
            id='json'
            placeholder={'JSON or JavaScript Object'}
            className='whitespace-pre
            bg-white dark:bg-black text-black dark:text-white
            border border-gray-700 rounded w-full h-96 hide-scrollbar pl-4 py-4 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
            onChange={(ev) => onInputChange(ev.target.value)}
            autoCorrect='off'
            value={json}
          />
          <input
            className=' bg-white dark:bg-black text-black dark:text-white border focus:border-blue-500 focus:ring-1 focus:ring-blue-500 border-gray-700 rounded w-full hide-scrollbar pl-4 py-2 outline-none'
            type='text'
            name='root'
            id='rootObject'
            value={rootObjectName}
            onChange={(e) => setRootObjectName(e.target.value)}
            placeholder='Root Interface Name'
          />
          <div className='flex space-y-4 flex-col items-start'>
            <Button onClick={getClipboardAndPaste}>
              <div className='flex space-x-2 items-center'>
                <p>Paste from Clipboard</p>
                <ClipboardDocumentIcon className='h-5' />
              </div>
            </Button>
            <Button onClick={pasteToClipboard}>
              <div className='flex space-x-2 items-center'>
                <p>Copy Interfaces</p>
                {copied ? (
                  <ClipboardDocumentCheckIcon className='h-5' />
                ) : (
                  <ClipboardDocumentListIcon className='h-5' />
                )}
              </div>
            </Button>
          </div>
          <div className='flex gap-4'>
            <label className='space-x-2 flex items-center cursor-pointer'>
              <input
                type='radio'
                checked={addExport === ''}
                className='cursor-pointer scale-110'
                value=''
                onChange={(e) => {
                  setAddExport(e.currentTarget.value);
                }}
              />
              <p>No Export</p>
            </label>
            <label className='space-x-2 flex items-center cursor-pointer'>
              <input
                type='radio'
                checked={addExport === 'export '}
                className='cursor-pointer scale-110'
                value='export '
                onChange={(e) => {
                  setAddExport(e.currentTarget.value);
                }}
              />
              <p>Export interfaces</p>
            </label>
            <label className='space-x-2 flex items-center cursor-pointer'>
              <input
                type='radio'
                checked={addExport === 'export default '}
                className='cursor-pointer scale-110'
                value='export default '
                onChange={(e) => {
                  setAddExport(e.currentTarget.value);
                }}
              />
              <p>Export default</p>
            </label>
          </div>
          <div className='py-2' />

          <div className='flex items-center gap-1'>
            <span>基于 GitHub 项目</span>
            <a
              href='https://github.com/yc-codes/json-2-ts'
              className='hover:underline'
              target='_blank'
            >
              yc-codes/json-2-ts
            </a>
            <span>改造</span>
          </div>
        </section>
        <section>
          <div className='whitespace-pre p-6 lg:h-screen overflow-y-auto text-gray-200'>
            <LazyCodeHighLighter code={tsInterface} />
          </div>
        </section>
      </div>
    </div>
  );
}
