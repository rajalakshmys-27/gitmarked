import { useContext } from 'react';
import { BookmarksContext } from './bookmarks-context.js';

export function useBookmarks() {
  const ctx = useContext(BookmarksContext);
  if (!ctx) throw new Error('useBookmarks must be used within a BookmarksProvider');
  return ctx;
}
