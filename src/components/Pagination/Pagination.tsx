import React from 'react';
import { cn } from '../../lib/utils';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  className?: string;
}

function getPageRange(current: number, total: number, siblings: number): (number | 'dots')[] {
  const range: (number | 'dots')[] = [];
  const left = Math.max(2, current - siblings);
  const right = Math.min(total - 1, current + siblings);

  range.push(1);
  if (left > 2) range.push('dots');
  for (let i = left; i <= right; i++) range.push(i);
  if (right < total - 1) range.push('dots');
  if (total > 1) range.push(total);

  return range;
}

export function Pagination({ currentPage, totalPages, onPageChange, siblingCount = 1, className }: PaginationProps) {
  const pages = getPageRange(currentPage, totalPages, siblingCount);

  return (
    <nav aria-label="Pagination" className={className}>
      <ul className="flex items-center gap-1">
        <li>
          <button
            type="button"
            disabled={currentPage <= 1}
            onClick={() => onPageChange(currentPage - 1)}
            aria-label="Previous page"
            className={cn(
              'inline-flex h-9 w-9 items-center justify-center rounded-md text-body-sm',
              'transition-colors duration-fast',
              'hover:bg-muted focus-visible:outline-2 focus-visible:outline-ring',
              'disabled:opacity-50 disabled:pointer-events-none'
            )}
          >
            ‹
          </button>
        </li>
        {pages.map((page, i) =>
          page === 'dots' ? (
            <li key={`dots-${i}`}>
              <span className="inline-flex h-9 w-9 items-center justify-center text-muted-foreground">…</span>
            </li>
          ) : (
            <li key={page}>
              <button
                type="button"
                onClick={() => onPageChange(page)}
                aria-current={currentPage === page ? 'page' : undefined}
                aria-label={`Page ${page}`}
                className={cn(
                  'inline-flex h-9 w-9 items-center justify-center rounded-md text-body-sm font-medium',
                  'transition-colors duration-fast',
                  'focus-visible:outline-2 focus-visible:outline-ring',
                  currentPage === page
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted text-foreground'
                )}
              >
                {page}
              </button>
            </li>
          )
        )}
        <li>
          <button
            type="button"
            disabled={currentPage >= totalPages}
            onClick={() => onPageChange(currentPage + 1)}
            aria-label="Next page"
            className={cn(
              'inline-flex h-9 w-9 items-center justify-center rounded-md text-body-sm',
              'transition-colors duration-fast',
              'hover:bg-muted focus-visible:outline-2 focus-visible:outline-ring',
              'disabled:opacity-50 disabled:pointer-events-none'
            )}
          >
            ›
          </button>
        </li>
      </ul>
    </nav>
  );
}
