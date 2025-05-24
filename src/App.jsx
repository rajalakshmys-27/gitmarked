import { useState } from 'react'
import { ThemeProvider } from './context/theme-context'
import ThemeToggle from './components/ThemeToggle.jsx'
import SearchBar from './components/SearchBar.jsx'

function AppLayout() {
  const [search, setSearch] = useState("");
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
        <SearchBar value={search} onChange={e => setSearch(e.target.value)} />
        <div className="flex flex-col md:flex-row gap-8 w-full mt-6">
          <section className="flex-1 bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 min-h-[350px] border border-slate-100 dark:border-gray-800 transition-colors duration-300">
            <h2 className="text-2xl font-semibold text-blue-700 dark:text-blue-300 mb-4 flex items-center gap-2">
              <svg className="h-6 w-6 text-blue-400 dark:text-blue-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 21l-4.35-4.35" /><circle cx="11" cy="11" r="8" /></svg>
              Search Results
            </h2>
            <div className="text-gray-500 dark:text-gray-400 italic">No results yet. Start searching above.</div>
          </section>
          <aside className="w-full md:w-1/3 bg-gradient-to-br from-blue-100 to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-8 min-h-[350px] border border-blue-100 dark:border-gray-800 transition-colors duration-300">
            <h2 className="text-2xl font-semibold text-blue-700 dark:text-blue-300 mb-4 flex items-center gap-2">
              <svg className="h-6 w-6 text-blue-400 dark:text-blue-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 5v14l7-7 7 7V5z" /></svg>
              Bookmarks
            </h2>
            <div className="text-gray-500 dark:text-gray-400 italic">No bookmarks yet.</div>
          </aside>
        </div>
      </main>
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <AppLayout />
    </ThemeProvider>
  )
}

export default App
