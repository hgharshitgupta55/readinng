import { BookOpen, CheckCircle2, Trash2, Clock } from 'lucide-react';
import { Book, BookStatus, STATUS_META, STATUS_ORDER } from '@/types';

interface BookCardProps {
  book: Book;
  onStatusChange: (id: string, status: BookStatus) => void;
  onRemove: (id: string) => void;
}

function StatusIcon({ status }: { status: BookStatus }) {
  if (status === 'finished') return <CheckCircle2 className="w-3.5 h-3.5" />;
  if (status === 'reading') return <BookOpen className="w-3.5 h-3.5" />;
  return <Clock className="w-3.5 h-3.5" />;
}

export function BookCard({ book, onStatusChange, onRemove }: BookCardProps) {
  const meta = STATUS_META[book.status];

  return (
    <div className="group relative bg-white rounded-2xl border border-slate-200 p-5 shadow-sm transition hover:shadow-md hover:border-slate-300">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-slate-900 leading-snug break-words pr-8">
            {book.title}
          </h3>
        </div>
        <button
          onClick={() => onRemove(book.id)}
          aria-label={`Remove ${book.title}`}
          className="shrink-0 p-1.5 rounded-lg text-slate-300 transition hover:text-red-500 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-200"
        >
          <Trash2 className="w-4.5 h-4.5" />
        </button>
      </div>

      <div className="mt-3 flex items-center gap-2">
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${meta.color}`}
        >
          <span className={`w-2 h-2 rounded-full ${meta.dot}`} />
          <StatusIcon status={book.status} />
          {meta.label}
        </span>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-100">
        <label className="block text-xs font-medium text-slate-400 mb-2">
          Change status
        </label>
        <div className="flex gap-1.5">
          {STATUS_ORDER.map((s) => {
            const active = book.status === s;
            const sMeta = STATUS_META[s];
            return (
              <button
                key={s}
                onClick={() => onStatusChange(book.id, s)}
                className={`flex-1 px-3 py-1.5 rounded-lg text-xs font-medium transition border ${
                  active
                    ? `${sMeta.color} ring-2 ring-offset-0`
                    : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {sMeta.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
