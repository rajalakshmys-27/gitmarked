import { useState, useCallback } from 'react';

import { ThemeProvider } from './context/theme/ThemeContext.jsx';
import { BookmarksProvider } from './context/bookmarks/BookmarksContext.jsx';

import ThemeToggle from './components/ui/ThemeToggle.jsx';
import SearchBar from './components/search/SearchBar.jsx';
import SearchResults from './components/search/SearchResults.jsx';
import Bookmarks from './components/bookmarks/Bookmarks.jsx';

import { getUsernameFromSuggestion } from './utils/getUsernameFromSuggestion.js';

function AppLayout() {
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

  const handleSelectSuggestion = useCallback((suggestion) => {
    const username = getUsernameFromSuggestion(suggestion);
    setSelectedUser(username || null);
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-100 to-blue-50 dark:from-gray-900 dark:to-gray-800 font-sans transition-colors duration-300">
      <nav className="flex items-center justify-between bg-white/80 dark:bg-gray-900/80 backdrop-blur shadow-md px-8 py-4 sticky top-0 z-10 w-full">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-blue-600 via-fuchsia-500 to-amber-400 dark:from-blue-300 dark:via-fuchsia-400 dark:to-yellow-200 bg-clip-text text-transparent drop-shadow-lg shadow-blue-100 dark:shadow-blue-900 py-1 px-2 rounded-xl select-none transition-all duration-500">
          <span className="inline-block align-text-top animate-pulse bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-fuchsia-500 to-amber-400 dark:from-blue-300 dark:via-fuchsia-400 dark:to-yellow-200">G</span>it
          <span className="inline-block align-text-top animate-pulse delay-150 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-fuchsia-500 to-amber-400 dark:from-blue-300 dark:via-fuchsia-400 dark:to-yellow-200">M</span>arked
        </h1>
        <ThemeToggle />
      </nav>
      <main className="flex flex-col items-center gap-10 max-w-7xl mx-auto py-12 px-4 w-full">
        <SearchBar value={search} onChange={e => setSearch(e.target.value)} onSelectSuggestion={handleSelectSuggestion}/>
        <div className="flex flex-col md:flex-row gap-8 w-full mt-6">
          <SearchResults selectedUser={selectedUser} />
          <Bookmarks />
        </div>
      </main>
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <BookmarksProvider>
        <AppLayout />
      </BookmarksProvider>
    </ThemeProvider>
  )
}

export default App
