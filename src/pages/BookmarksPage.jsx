import Bookmarks from '../components/bookmarks/Bookmarks';

function BookmarksPage() {
  return (
    <div className="flex flex-col items-center gap-10 w-full">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Your Bookmarks</h1>
      <div className="w-full max-w-4xl">
        <Bookmarks />
      </div>
    </div>
  );
}

export default BookmarksPage;
