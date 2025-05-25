import Bookmarks from '../components/bookmarks/Bookmarks';
import { BookmarkFilledIcon, TrashIcon, CloseIcon } from '../icons';
import { useBookmarks } from '../context/bookmarks/useBookmarks';
import CSVImport from '../components/bookmarks/CSVImport';
import BookmarkGraph from '../components/bookmarks/BookmarkGraph';

function BookmarksPage() {
  const { bookmarks, removeBookmark, clearBookmarks } = useBookmarks();

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <div className="flex flex-col items-center space-y-8">
        <div className="text-center space-y-4 w-full">
          <div className="flex items-center justify-center gap-3">
            <BookmarkFilledIcon className="w-10 h-10" />
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 dark:from-blue-400 dark:via-indigo-300 dark:to-purple-400 bg-clip-text text-transparent">
              Your Bookmarks
            </h1>
            <span className="px-4 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full font-bold">
              {bookmarks.length}
            </span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            {bookmarks.length > 0 && (
              <button
                onClick={clearBookmarks}
                className="ml-4 p-2 rounded-full hover:bg-red-100 dark:hover:bg-gray-700 transition group"
                title="Clear All Bookmarks"
                aria-label="Clear All Bookmarks"
              >
                <TrashIcon className="w-5 h-5 text-red-500 group-hover:text-red-600 dark:group-hover:text-red-400" />
              </button>
            )}
          </div>
          <div className="max-w-2xl mx-auto">
            <CSVImport />
          </div>
        </div>

        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Graph takes full width if no bookmarks, otherwise sits in the left column on desktop */}
          {bookmarks.length > 0 && (
            <div className="w-full order-2 lg:order-1">
              <BookmarkGraph />
            </div>
          )}
          
          {/* Bookmarks list takes full width if no bookmarks, otherwise sits in the right column on desktop */}
          <div className={`w-full order-1 lg:order-2 ${bookmarks.length === 0 ? 'lg:col-span-2' : ''}`}>
            <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-blue-100/50 dark:border-gray-700/50">
              <ul className="space-y-4">
                {bookmarks.map(repo => (
                  <li key={repo.id} className="bg-blue-50 dark:bg-gray-800 rounded-lg p-4 shadow border border-blue-100 dark:border-gray-700">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-700 dark:text-blue-300 hover:underline text-lg">
                          {repo.name || repo.full_name}
                        </a>
                        {repo.description && (
                          <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">{repo.description}</p>
                        )}
                        {repo.owner && (
                          <span className="text-xs text-gray-500 dark:text-gray-400 mt-2 block">
                            by {typeof repo.owner === 'string' ? repo.owner : repo.owner?.login}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => removeBookmark(repo.id)}
                        className="p-2 rounded-full hover:bg-red-100 dark:hover:bg-gray-700 transition group"
                        title="Remove Bookmark"
                        aria-label="Remove Bookmark"
                      >
                        <CloseIcon className="w-4 h-4 text-red-500 group-hover:text-red-600 dark:group-hover:text-red-400" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              {bookmarks.length === 0 && (
                <div className="text-center text-gray-500 dark:text-gray-400 italic py-8">
                  No bookmarks yet. Start by importing from CSV or searching repositories.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookmarksPage;
