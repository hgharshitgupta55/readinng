import { useMemo, useState } from 'react';
import { BookOpen, Library } from 'lucide-react';
import { useBooks } from '@/hooks/useBooks';
import { AddBookForm } from '@/components/AddBookForm';
import { FilterTabs } from '@/components/FilterTabs';
import { BookCard } from '@/components/BookCard';
import { SummaryBar } from '@/components/SummaryBar';
import { FilterType } from '@/types';

const EMPTY_MESSAGES: Record<FilterType, string> = {
  all: 'Your reading list is empty. Add your first book.',
  'want-to-read': 'No books in your Want to Read list.',
  reading: "You're not reading anything right now.",
  finished: 'No finished books yet. Keep reading!',
};

export default function App() {
  const { books, loaded, addBook, updateStatus, removeBook } = useBooks();
  const [filter, setFilter] = useState<FilterType>('all');

  const counts = useMemo(() => {
    const base: Record<FilterType, number> = {
      all: books.length,
      'want-to-read': 0,
      reading: 0,
      finished: 0,
    };
    for (const b of books) base[b.status]++;
    return base;
  }, [books]);

  const visibleBooks = useMemo(() => {
    if (filter === 'all') return books;
    return books.filter((b) => b.status === filter);
  }, [books, filter]);

  const existingTitles = useMemo(
    () => new Set(books.map((b) => b.title.trim().replace(/\s+/g, ' ').toLowerCase())),
    [books],
  );

  const showEmpty = loaded && books.length === 0;
  const showFilteredEmpty = !showEmpty && visibleBooks.length === 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 text-slate-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Header */}
        <header className="flex items-center gap-3 mb-8">
          <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-slate-900 text-white shadow-sm">
            <Library className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight"> My Reading List</h1>
            <p className="text-sm text-slate-500">
              Track books you want to read, are reading, or have finished.
            </p>
          </div>
        </header>

        {/* Add form */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-5 mb-6">
          <AddBookForm onAdd={addBook} existingTitles={existingTitles} />
        </div>

        {/* Summary */}
        {books.length > 0 && (
          <SummaryBar
            total={counts.all}
            reading={counts.reading}
            finished={counts.finished}
          />
        )}

        {/* Filters */}
        {books.length > 0 && (
          <FilterTabs filter={filter} onChange={setFilter} counts={counts} />
        )}

        {/* List */}
        <main className="mt-6">
          {showEmpty && <EmptyState message={EMPTY_MESSAGES.all} />}
          {showFilteredEmpty && <EmptyState message={EMPTY_MESSAGES[filter]} />}

          {!showEmpty && visibleBooks.length > 0 && (
            <div className="grid gap-4 sm:grid-cols-2">
              {visibleBooks.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  onStatusChange={updateStatus}
                  onRemove={removeBook}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4">
      <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-100 text-slate-300 mb-4">
        <BookOpen className="w-8 h-8" />
      </div>
      <p className="text-slate-500 max-w-xs">{message}</p>
    </div>
  );
}
