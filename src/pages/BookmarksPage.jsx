import { BookmarkFilledIcon, TrashIcon, CloseIcon } from '../icons';
import { useBookmarks } from '../context/bookmarks/useBookmarks';
import CSVImport from '../components/bookmarks/CSVImport';
import BookmarkGraph from '../components/bookmarks/BookmarkGraph';

function BookmarksPage() {
  const { bookmarks, removeBookmark, clearBookmarks } = useBookmarks();

  return (
    <div className="max-w-7xl mx-auto py-8 md:py-12 px-2 sm:px-4">
      <div className="pt-8 md:pt-12 flex flex-col items-center gap-6 md:gap-8">
        <div className="text-center space-y-4 md:space-y-6 w-full">
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2 sm:gap-3">
              <BookmarkFilledIcon className="w-8 h-8 sm:w-10 sm:h-10" />
              <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 dark:from-blue-400 dark:via-indigo-300 dark:to-purple-400 bg-clip-text text-transparent">
                GitHub Bookmarks
              </h1>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-md">Your curated collection of remarkable repositories</p>
          </div>
          <div className="flex justify-center w-full">
            <div className="w-full max-w-md sm:max-w-lg mx-auto bg-white/50 dark:bg-gray-900/50 backdrop-blur-lg rounded-2xl p-4 sm:p-6 shadow-lg border border-blue-100/50 dark:border-gray-700/50">
              <CSVImport />
            </div>
          </div>
        </div>

        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
          {/* Graph takes full width if no bookmarks, otherwise sits in the left column on desktop */}
          {bookmarks.length > 0 && (
            <div className="w-full order-2 lg:order-1">
              <BookmarkGraph />
            </div>
          )}

          {/* Bookmarks list takes full width if no bookmarks, otherwise sits in the right column on desktop */}
          <div className={`w-full order-1 lg:order-2 ${bookmarks.length === 0 ? 'lg:col-span-2' : ''}`}>
            <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-lg rounded-3xl p-4 sm:p-8 shadow-xl border border-blue-100/50 dark:border-gray-700/50">
              <div className="flex flex-col sm:flex-row items-center justify-between mb-4 sm:mb-6 gap-2 sm:gap-0">
                <div className="flex items-center gap-2 sm:gap-4">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-200">Saved Repositories</h2>
                  <span className="px-3 py-1 sm:px-4 sm:py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full font-bold text-sm sm:text-base">
                    {bookmarks.length}
                  </span>
                </div>
                <div className="flex items-center gap-2 sm:gap-4">
                  {bookmarks.length > 0 && (
                    <button
                      onClick={clearBookmarks}
                      className="p-2 rounded-full hover:bg-red-100 dark:hover:bg-gray-700 transition group"
                      title="Clear All Bookmarks"
                      aria-label="Clear All Bookmarks"
                    >
                      <TrashIcon className="w-5 h-5 text-red-500 group-hover:text-red-600 dark:group-hover:text-red-400" />
                    </button>
                  )}
                </div>
              </div>
              <ul className="space-y-3 sm:space-y-4">
                {bookmarks.map(repo => {
                  // Extract owner name from full_name if available
                  const ownerName = repo.full_name ? repo.full_name.split('/')[0] :
                    (typeof repo.owner === 'string' ? repo.owner : repo.owner?.login);

                  return (
                    <li key={repo.id} className="bg-blue-50 dark:bg-gray-800 rounded-lg p-4 shadow border border-blue-100 dark:border-gray-700">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-baseline gap-2">
                            <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-700 dark:text-blue-300 hover:underline text-lg">
                              {repo.name || repo.full_name?.split('/')[1]}
                            </a>
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              by {ownerName}
                            </span>
                          </div>
                          {repo.description && (
                            <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">{repo.description}</p>
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
                  );
                })}
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
