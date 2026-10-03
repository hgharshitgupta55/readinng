import { useCallback, useEffect, useState } from 'react';
import { Book, BookStatus } from '@/types';

const STORAGE_KEY = 'reading-list-books';

const BOOK_STATUSES: BookStatus[] = ['want-to-read', 'reading', 'finished'];

function isValidStatus(value: unknown): value is BookStatus {
  return typeof value === 'string' && BOOK_STATUSES.includes(value as BookStatus);
}

function isBook(value: unknown): value is Book {
  return (
    typeof value === 'object' &&
    value !== null &&
    typeof (value as Book).id === 'string' &&
    typeof (value as Book).title === 'string' &&
    (value as Book).title.trim().length > 0 &&
    isValidStatus((value as Book).status) &&
    typeof (value as Book).createdAt === 'number'
  );
}

export function useBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.every(isBook)) {
          setBooks(parsed);
        }
      }
    } catch {
      // ignore malformed storage
    }
    setLoaded(true);
  }, []);

  const persist = useCallback((next: Book[]) => {
    setBooks(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // storage may be unavailable; state still updates in memory
    }
  }, []);

  const addBook = useCallback(
    (title: string, status: BookStatus) => {
      const trimmed = title.trim();
      if (!trimmed) return;
      const book: Book = {
        id:
          (crypto?.randomUUID?.() as string) ??
          `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        title: trimmed,
        status,
        createdAt: Date.now(),
      };
      persist([book, ...books]);
    },
    [books, persist],
  );

  const updateStatus = useCallback(
    (id: string, status: BookStatus) => {
      persist(books.map((b) => (b.id === id ? { ...b, status } : b)));
    },
    [books, persist],
  );

  const removeBook = useCallback(
    (id: string) => {
      persist(books.filter((b) => b.id !== id));
    },
    [books, persist],
  );

  return { books, loaded, addBook, updateStatus, removeBook };
}
