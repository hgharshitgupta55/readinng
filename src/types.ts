export type BookStatus = 'want-to-read' | 'reading' | 'finished';

export interface Book {
  id: string;
  title: string;
  status: BookStatus;
  createdAt: number;
}

export const STATUS_META: Record<
  BookStatus,
  { label: string; color: string; dot: string; ring: string }
> = {
  'want-to-read': {
    label: 'Want to Read',
    color: 'bg-amber-100 text-amber-800 border-amber-200',
    dot: 'bg-amber-500',
    ring: 'focus:ring-amber-400 focus:border-amber-400',
  },
  reading: {
    label: 'Reading',
    color: 'bg-sky-100 text-sky-800 border-sky-200',
    dot: 'bg-sky-500',
    ring: 'focus:ring-sky-400 focus:border-sky-400',
  },
  finished: {
    label: 'Finished',
    color: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    dot: 'bg-emerald-500',
    ring: 'focus:ring-emerald-400 focus:border-emerald-400',
  },
};

export const STATUS_ORDER: BookStatus[] = [
  'want-to-read',
  'reading',
  'finished',
];

export type FilterType = 'all' | BookStatus;

export const FILTER_META: Record<FilterType, { label: string }> = {
  all: { label: 'All' },
  'want-to-read': { label: 'Want to Read' },
  reading: { label: 'Reading' },
  finished: { label: 'Finished' },
};
