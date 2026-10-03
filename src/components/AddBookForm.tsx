import { useState } from 'react';
import { Plus } from 'lucide-react';
import { BookStatus, STATUS_META, STATUS_ORDER } from '@/types';

interface AddBookFormProps {
  onAdd: (title: string, status: BookStatus) => void;
  existingTitles: Set<string>;
}

const MAX_TITLE_LENGTH = 60;

export function AddBookForm({ onAdd, existingTitles }: AddBookFormProps) {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState<BookStatus>('want-to-read');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = title.trim().replace(/\s+/g, ' ');
    if (!trimmed) {
      setError('Please enter a book title.');
      return;
    }
    if (trimmed.length > MAX_TITLE_LENGTH) {
      setError('Book title must be 60 characters or fewer.');
      return;
    }
    if (existingTitles.has(trimmed.toLowerCase())) {
      setError('This book is already in your reading list.');
      return;
    }
    onAdd(trimmed, status);
    setTitle('');
    setStatus('want-to-read');
    setError('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-3 w-full"
    >
      <div className="flex-1">
        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (error) setError('');
          }}
          placeholder="Enter a book title..."
          aria-label="Book title"
          className={`w-full px-4 py-3 rounded-xl border bg-white text-slate-900 placeholder-slate-400 transition focus:outline-none focus:ring-2 ${
            error ? 'border-red-300 focus:ring-red-400' : 'border-slate-200 focus:ring-sky-400'
          }`}
        />
        {error && <p className="mt-1.5 text-sm text-red-600">{error}</p>}
      </div>

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value as BookStatus)}
        aria-label="Reading status"
        className="px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 transition focus:outline-none focus:ring-2 focus:ring-sky-400 cursor-pointer"
      >
        {STATUS_ORDER.map((s) => (
          <option key={s} value={s}>
            {STATUS_META[s].label}
          </option>
        ))}
      </select>

      <button
        type="submit"
        className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-900 text-white font-medium transition hover:bg-slate-800 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-slate-400"
      >
        <Plus className="w-5 h-5" />
        Add Book
      </button>
    </form>
  );
}
