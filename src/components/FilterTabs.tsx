import { FILTER_META, FilterType } from '@/types';

interface FilterTabsProps {
  filter: FilterType;
  onChange: (filter: FilterType) => void;
  counts: Record<FilterType, number>;
}

const FILTER_ORDER: FilterType[] = [
  'all',
  'want-to-read',
  'reading',
  'finished',
];

export function FilterTabs({ filter, onChange, counts }: FilterTabsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {FILTER_ORDER.map((f) => {
        const active = filter === f;
        return (
          <button
            key={f}
            onClick={() => onChange(f)}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition border focus:outline-none focus:ring-2 focus:ring-sky-300 ${
              active
                ? 'bg-slate-900 text-white border-slate-900'
                : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            {FILTER_META[f].label}
            <span
              className={`inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1.5 rounded-full text-xs font-semibold ${
                active ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
              }`}
            >
              {counts[f] ?? 0}
            </span>
          </button>
        );
      })}
    </div>
  );
}
