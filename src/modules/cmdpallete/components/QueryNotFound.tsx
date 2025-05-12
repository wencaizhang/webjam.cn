'use client';

import { Combobox } from '@headlessui/react';
import clsx from 'clsx';
import { BiLogoGoogle as GoogleIcon } from 'react-icons/bi';
import { HiOutlineChat as AiIcon } from 'react-icons/hi';
import useSWR from 'swr';

import Button from '@/common/components/elements/Button';
import Loading from '@/common/components/elements/Loading';
import { docSearch, featureSwich } from '@/contents/siteMetadata';
import { getDocsearchHits } from '@/services/docsearch';

interface QueryNotFoundProps {
  query: string;
  onAskAiAssistant: () => void;
  onFindGoogle: () => void;
  handleDocsearchSelect: (url: string) => void;
}

const QueryNotFound = ({
  query,
  onAskAiAssistant,
  onFindGoogle,
  handleDocsearchSelect,
}: QueryNotFoundProps) => {
  const { data = [], isLoading } = useSWR(
    ['docsearch', query],
    ([_, key]) => getDocsearchHits(key),
    { isPaused: () => !docSearch.appId, keepPreviousData: false }
  );

  if (isLoading) {
    return <Loading text='Loading...' className='py-4'></Loading>;
  }

  return (
    <>
      {!isLoading && data.length === 0 && (
        <div className='flex flex-col pt-5 pb-10 px-5 space-y-6 items-center'>
          <div className='text-neutral-500 text-center space-y-2'>
            <p>
              No result found about
              <span className='italic text-neutral-600 dark:text-neutral-400 ml-1 mr-2'>
                `{query}`
              </span>
              in this website.
            </p>
            <p className='text-neutral-600 dark:text-neutral-400'>
              {featureSwich.ai
                ? 'Ask my AI Assistant or find in Google instead?'
                : 'Find in Google instead?'}
            </p>
          </div>
          <div className='flex flex-col lg:flex-row gap-3 w-full justify-center'>
            {featureSwich.ai && (
              <Button
                onClick={onAskAiAssistant}
                className='justify-center bg-green-600!'
                data-umami-event='Click Ask AI Assistant'
              >
                <AiIcon size={20} /> Ask AI Assistant
              </Button>
            )}
            <Button
              onClick={onFindGoogle}
              className='justify-center bg-indigo-600!'
              data-umami-event='Click Find in Google'
            >
              <GoogleIcon size={20} />
              Find in Google
            </Button>
          </div>
          <p className='text-neutral-500 text-sm'>
            Press `ESC` to close this window
          </p>
        </div>
      )}
      {!isLoading && data.length > 0 && (
        <Combobox
          onChange={(url: string) => handleDocsearchSelect(url)}
          as='div'
          className='w-full'
        >
          <div className={clsx('max-h-80 overflow-y-auto py-2 px-1')}>
            <Combobox.Options static className='space-y-1'>
              {data.map((hit, index) => (
                <Combobox.Option key={index} value={hit.url}>
                  {({ active }) => (
                    <div
                      className={clsx(
                        active
                          ? 'bg-neutral-200 text-neutral-600 dark:bg-neutral-700/60 dark:text-white'
                          : 'text-neutral-600 dark:text-neutral-300',
                        'mx-2 cursor-pointer rounded-md py-2 px-4 group flex flex-col gap-1',
                        'dark:hover:bg-[#ffffff14]'
                      )}
                    >
                      <div
                        className='truncate'
                        dangerouslySetInnerHTML={{
                          __html: `${hit.hierarchy.lvl0 ?? ''} ${
                            hit.hierarchy.lvl1 ? `> ${hit.hierarchy.lvl1}` : ''
                          } ${
                            hit.hierarchy.lvl2 ? `> ${hit.hierarchy.lvl2}` : ''
                          } ${
                            hit.hierarchy.lvl3 ? `> ${hit.hierarchy.lvl3}` : ''
                          } ${
                            hit.hierarchy.lvl4 ? `> ${hit.hierarchy.lvl4}` : ''
                          } ${
                            hit.hierarchy.lvl5 ? `> ${hit.hierarchy.lvl5}` : ''
                          }`,
                        }}
                      ></div>
                      <div
                        className='text-xs font-sora text-neutral-500 truncate'
                        dangerouslySetInnerHTML={{
                          __html:
                            hit.content ||
                            hit.hierarchy.lvl1 ||
                            hit.hierarchy.lvl2 ||
                            hit.hierarchy.lvl0,
                        }}
                      ></div>
                    </div>
                  )}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          </div>
        </Combobox>
      )}
    </>
  );
};

export default QueryNotFound;
