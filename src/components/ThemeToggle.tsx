'use client'

import { useTheme } from './ThemeProvider'
import { Sun, Moon } from 'lucide-react'

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="p-2 rounded-lg text-gray-400 hover:text-accent dark:hover:text-accent hover:bg-gray-200/50 dark:hover:bg-accent/10 transition-colors"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      title={`Switch to ${isDark ? 'light' : 'dark'} theme`}
    >
      {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  )
}
