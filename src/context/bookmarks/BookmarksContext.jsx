import { useState, useEffect, useCallback } from 'react';
import { BookmarksContext } from './bookmarks-context.js';

const BOOKMARKS_KEY = 'bookmarks';

function getStoredBookmarks() {
  try {
    const stored = localStorage.getItem(BOOKMARKS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function BookmarksProvider({ children }) {
  const [bookmarks, setBookmarks] = useState(() => getStoredBookmarks());

  useEffect(() => {
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
  }, [bookmarks]);
  const addBookmark = useCallback((repo) => {
    setBookmarks(prev => {
      if (prev.some(b => b.id === repo.id || b.full_name === repo.full_name)) return prev;
      return [...prev, { ...repo, bookmarkedAt: new Date().toISOString() }];
    });
  }, []);

  const removeBookmark = useCallback((repoId) => {
    setBookmarks(prev => prev.filter(b => b.id !== repoId));
  }, []);

  const clearBookmarks = useCallback(() => {
    setBookmarks([]);
  }, []);

  return (
    <BookmarksContext.Provider value={{ bookmarks, addBookmark, removeBookmark, clearBookmarks }}>
      {children}
    </BookmarksContext.Provider>
  );
}
