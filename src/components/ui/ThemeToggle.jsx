import { useTheme } from '../../context/theme/useTheme';
import { SunIcon, MoonIcon } from '../../icons';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  return (
    <button
      type="button"
      aria-label="Toggle theme"
      className="ml-4 p-2 rounded-lg border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-700 shadow hover:bg-gray-100 dark:hover:bg-gray-700 transition"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      {theme === 'dark' ? (
        <SunIcon />
      ) : (
        <MoonIcon />
      )}
    </button>
  )
}
