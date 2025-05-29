import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import CSVImport from './CSVImport.jsx';
import { useBookmarks } from '../../context/bookmarks/useBookmarks';
import { useAuth } from '../../context/auth/useAuth';
import { BookmarkFilledIcon, CloseIcon, TrashIcon } from '../../icons';

export default function Bookmarks() {
  const { bookmarks, removeBookmark, clearBookmarks, loading } = useBookmarks();
  const { user } = useAuth();
  const csvImportRef = useRef();
  const navigate = useNavigate();

  // Clear CSVImport summary if all bookmarks are removed
  useEffect(() => {
    if (bookmarks.length === 0 && csvImportRef.current) {
      csvImportRef.current.clearSummary?.();
    }
  }, [bookmarks]);

  // Handler to clear all bookmarks
  const handleClearAll = () => {
    clearBookmarks();
    if (csvImportRef.current) {
      csvImportRef.current.clearSummary?.();
    }
  };

  if (!user) {
    return (
      <aside className="w-full md:w-1/3 bg-gradient-to-br from-blue-100 to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-8 min-h-[350px] border border-blue-100 dark:border-gray-800">
        <div className="text-gray-500 dark:text-gray-400 italic">Please login to see your bookmarks.</div>
      </aside>
    );
  }

  return (
    <aside className="w-full md:w-1/3 bg-gradient-to-br from-blue-100 to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-4 sm:p-8 min-h-[250px] sm:min-h-[350px] border border-blue-100 dark:border-gray-800 mt-4 md:mt-0">
      <div
        onClick={() => navigate('/bookmarks')}
        className="text-xl sm:text-2xl font-semibold text-blue-700 dark:text-blue-300 mb-2 sm:mb-4 flex items-center justify-between gap-1 sm:gap-2 cursor-pointer hover:opacity-80 transition-opacity"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            navigate('/bookmarks');
          }
        }}
      >
        <div className="flex items-center gap-1 sm:gap-2">
          <BookmarkFilledIcon />
          Bookmarks
          <span className="ml-1 sm:ml-2 inline-flex items-center justify-center px-2 py-0.5 rounded-full text-xs font-bold bg-blue-200 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            {bookmarks.length}
          </span>
        </div>
        {bookmarks.length > 0 && (
          <button
            className="ml-1 sm:ml-2 p-1 rounded-full hover:bg-red-100 dark:hover:bg-gray-700 transition"
            title="Clear All Bookmarks"
            onClick={(e) => {
              e.stopPropagation();
              handleClearAll();
            }}
            aria-label="Clear All Bookmarks"
          >
            <TrashIcon className="w-4 h-4 text-red-500" />
          </button>
        )}
      </div>
      <div className="mb-4 sm:mb-6">
        <CSVImport ref={csvImportRef} />
      </div>
      {loading ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 dark:border-blue-400"></div>
        </div>
      ) : bookmarks.length === 0 ? (
        <div className="text-gray-500 dark:text-gray-400 italic">No bookmarks yet.</div>
      ) : (
        <ul className="space-y-2 sm:space-y-4">
          {bookmarks.map(repo => {
            // Extract owner name from full_name if available
            const ownerName = repo.full_name ? repo.full_name.split('/')[0] :
              (typeof repo.owner === 'string' ? repo.owner : repo.owner?.login);

            return (
              <li key={repo.id} className="flex flex-col gap-1 bg-blue-50 dark:bg-gray-800 rounded-lg p-3 shadow border border-blue-100 dark:border-gray-700">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-700 dark:text-blue-300 hover:underline text-base block truncate">
                      {repo.name || repo.full_name?.split('/')[1]}
                    </a>
                    <span className="text-xs text-gray-500 dark:text-gray-400 block mt-0.5">
                      by {ownerName}
                    </span>
                  </div>
                  <button
                    className="ml-2 p-1 rounded-full hover:bg-red-100 dark:hover:bg-gray-700 transition shrink-0"
                    title="Remove Bookmark"
                    onClick={() => removeBookmark(repo.id)}
                    aria-label="Remove Bookmark"
                  >
                    <CloseIcon />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </aside>
  );
}
