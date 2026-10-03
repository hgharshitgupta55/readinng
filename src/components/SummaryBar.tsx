import { BookOpen, CheckCircle2, Library } from 'lucide-react';

interface SummaryBarProps {
  total: number;
  reading: number;
  finished: number;
}

export function SummaryBar({ total, reading, finished }: SummaryBarProps) {
  const items = [
    {
      label: 'Total Books',
      value: total,
      icon: Library,
      color: 'text-slate-700',
      bg: 'bg-slate-50',
      ring: 'ring-slate-100',
    },
    {
      label: 'Currently Reading',
      value: reading,
      icon: BookOpen,
      color: 'text-sky-700',
      bg: 'bg-sky-50',
      ring: 'ring-sky-100',
    },
    {
      label: 'Finished',
      value: finished,
      icon: CheckCircle2,
      color: 'text-emerald-700',
      bg: 'bg-emerald-50',
      ring: 'ring-emerald-100',
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-3 sm:gap-4">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.label}
            className={`flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 rounded-2xl border border-slate-200 ${item.bg} p-3 sm:p-4 ring-1 ${item.ring}`}
          >
            <div
              className={`flex items-center justify-center w-9 h-9 rounded-xl bg-white shadow-sm ${item.color}`}
            >
              <Icon className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-xs sm:text-sm text-slate-500 truncate">
                {item.label}
              </p>
              <p className={`text-lg sm:text-2xl font-bold ${item.color}`}>
                {item.value}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
