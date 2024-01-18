import clsx from 'clsx';
import Link from 'next/link';
import {
  BiChevronLeft as PrevIcon,
  BiChevronRight as NextIcon,
} from 'react-icons/bi';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  buildHref: (page: number) => string;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  buildHref,
}) => {
  const renderPageNumbers = () => {
    const visiblePages = 3;
    const firstPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
    const lastPage = Math.min(totalPages, firstPage + visiblePages - 1);

    const pageNumbers: (number | '...')[] = [];

    if (firstPage > 1) {
      pageNumbers.push(1, '...');
    }

    for (let i = firstPage; i <= lastPage; i++) {
      pageNumbers.push(i);
    }

    if (lastPage < totalPages) {
      pageNumbers.push('...', totalPages);
    }

    return pageNumbers.map((page, index) => {
      if (page === '...') {
        return (
          <button
            key={index}
            className={clsx(
              'mx-1 px-4 py-1.5 rounded items-center',
              '!bg-transparent !cursor-default',
              'bg-neutral-200 text-neutral-700 dark:bg-neutral-700 dark:text-neutral-200'
            )}
          >
            {page}
          </button>
        );
      }

      const href = buildHref(page);
      return (
        <Link href={href} key={href}>
          <button
            className={clsx(
              'mx-1 px-4 py-1.5 rounded items-center',
              currentPage === page
                ? 'bg-sky-600 text-white'
                : 'bg-neutral-200 text-neutral-700 dark:bg-neutral-700 dark:text-neutral-200'
            )}
          >
            {page}
          </button>
        </Link>
      );
    });
  };

  if (!totalPages) {
    return null;
  }

  const prevPage = Math.max(currentPage - 1, 1);
  const nextPage = Math.min(currentPage + 1, totalPages);
  return (
    <div className='flex justify-center pt-5 font-sora'>
      {currentPage !== 1 && (
        <Link href={buildHref(prevPage)}>
          <button
            className='mx-1 px-2 py-1.5 rounded bg-neutral-200 text-neutral-700 dark:bg-neutral-700 dark:text-neutral-200'
            disabled={currentPage === 1}
          >
            <PrevIcon size={24} />
          </button>
        </Link>
      )}

      <div className='hidden sm:flex'>{renderPageNumbers()}</div>

      {currentPage !== totalPages && (
        <Link href={buildHref(nextPage)}>
          <button
            className='mx-1 px-2 py-1.5 rounded bg-neutral-200 text-neutral-700 dark:bg-neutral-700 dark:text-neutral-200'
            disabled={currentPage === totalPages}
          >
            <NextIcon size={24} />
          </button>
        </Link>
      )}
    </div>
  );
};

export default Pagination;
