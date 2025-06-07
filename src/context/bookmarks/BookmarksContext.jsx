import { useState, useEffect, useCallback } from 'react';
import { BookmarksContext } from './bookmarks-context.js';
import { useAuth } from '../auth/useAuth';
import { 
  addBookmark as addBookmarkToFirebase,
  removeBookmark as removeBookmarkFromFirebase,
  getUserBookmarks as getFirebaseBookmarks,
  isRepoBookmarked as checkRepoBookmarked
} from '../../services/firestore.js';

export function BookmarksProvider({ children }) {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // Load bookmarks when user changes
  useEffect(() => {
    const loadBookmarks = async () => {
      if (!user) {
        setBookmarks([]);
        setLoading(false);
        return;
      }

      try {
        const result = await getFirebaseBookmarks(user.uid);
        if (result.success) {
          setBookmarks(result.data);
        }
      } catch (error) {
        console.error('Error loading bookmarks:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBookmarks();
  }, [user]);

  const addBookmark = useCallback(async (repo) => {
    if (!user) return;

    const isAlreadyBookmarked = await checkRepoBookmarked(user.uid, repo.id);
    if (isAlreadyBookmarked.exists) return;

    const result = await addBookmarkToFirebase(user.uid, repo);
    if (result.success) {
      setBookmarks(prev => [...prev, { ...repo, bookmarkedAt: new Date().toISOString() }]);
    }
  }, [user]);

  const removeBookmark = useCallback(async (repoId) => {
    if (!user) return;

    const result = await removeBookmarkFromFirebase(user.uid, repoId);
    if (result.success) {
      setBookmarks(prev => prev.filter(b => b.id !== repoId));
    }
  }, [user]);

  const clearBookmarks = useCallback(async () => {
    if (!user) return;

    // Remove all bookmarks one by one
    const promises = bookmarks.map(bookmark => 
      removeBookmarkFromFirebase(user.uid, bookmark.id)
    );
    
    try {
      await Promise.all(promises);
      setBookmarks([]);
    } catch (error) {
      console.error('Error clearing bookmarks:', error);
    }
  }, [user, bookmarks]);

  return (
    <BookmarksContext.Provider value={{ 
      bookmarks, 
      addBookmark, 
      removeBookmark, 
      clearBookmarks,
      loading 
    }}>
      {children}
    </BookmarksContext.Provider>
  );
}
