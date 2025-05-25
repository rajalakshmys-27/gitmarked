import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import CSVImport from './CSVImport.jsx';
import { useBookmarks } from '../../context/bookmarks/useBookmarks';
import { BookmarkFilledIcon, CloseIcon, TrashIcon } from '../../icons';

export default function Bookmarks() {
  const { bookmarks, removeBookmark, clearBookmarks } = useBookmarks();
  const csvImportRef = useRef();
  const navigate = useNavigate();

  // Clear CSVImport summary if all bookmarks are removed (even one by one)
  useEffect(() => {
    if (bookmarks.length === 0 && csvImportRef.current) {
      csvImportRef.current.clearSummary?.();
    }
  }, [bookmarks]);

  // Handler to clear all bookmarks and also clear the summary in CSVImport
  const handleClearAll = () => {
    clearBookmarks();
    if (csvImportRef.current) {
      csvImportRef.current.clearSummary?.();
    }
  };

  return (
    <aside className="w-full md:w-1/3 bg-gradient-to-br from-blue-100 to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-8 min-h-[350px] border border-blue-100 dark:border-gray-800 transition-colors duration-300">
      <div 
        onClick={() => navigate('/bookmarks')} 
        className="text-2xl font-semibold text-blue-700 dark:text-blue-300 mb-4 flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            navigate('/bookmarks');
          }
        }}
      >
        <BookmarkFilledIcon />
        Bookmarks
        <span className="ml-2 inline-flex items-center justify-center px-2 py-0.5 rounded-full text-xs font-bold bg-blue-200 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
          {bookmarks.length}
        </span>
        {bookmarks.length > 0 && (
          <button
            className="ml-2 p-1 rounded-full hover:bg-red-100 dark:hover:bg-gray-700 transition"
            title="Clear All Bookmarks"
            onClick={(e) => {
              e.stopPropagation(); // Prevent navigation when clicking clear button
              handleClearAll();
            }}
            aria-label="Clear All Bookmarks"
          >
            <TrashIcon className="w-4 h-4 text-red-500" />
          </button>
        )}
      </div>
      <div className="mb-6">
        <CSVImport ref={csvImportRef} />
      </div>
      {bookmarks.length === 0 ? (
        <div className="text-gray-500 dark:text-gray-400 italic">No bookmarks yet.</div>
      ) : (
        <ul className="space-y-4">
          {bookmarks.map(repo => (
            <li key={repo.id} className="flex flex-col gap-1 bg-blue-50 dark:bg-gray-800 rounded-lg p-3 shadow border border-blue-100 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-700 dark:text-blue-300 hover:underline text-base">{repo.name || repo.full_name}</a>
                <button
                  className="ml-2 p-1 rounded-full hover:bg-red-100 dark:hover:bg-gray-700 transition"
                  title="Remove Bookmark"
                  onClick={() => removeBookmark(repo.id)}
                  aria-label="Remove Bookmark"
                >
                  <CloseIcon />
                </button>
              </div>
              {repo.owner && (
                <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                  {typeof repo.owner === 'string' ? repo.owner : repo.owner?.login}
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}
