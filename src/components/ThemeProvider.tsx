'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { MotionConfig } from 'framer-motion'

type Theme = 'dark' | 'light' | 'system'
type ResolvedTheme = 'dark' | 'light'

interface ThemeContextType {
  theme: Theme
  resolvedTheme: ResolvedTheme
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  resolvedTheme: 'light',
  setTheme: () => {},
})

export function useTheme() {
  return useContext(ThemeContext)
}

function getSystemTheme(): ResolvedTheme {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('light')
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('theme') as Theme | null
    const initial = stored || 'light'
    setThemeState(initial)
    const resolved = initial === 'system' ? getSystemTheme() : initial
    setResolvedTheme(resolved)
    document.documentElement.classList.toggle('dark', resolved === 'dark')
    document.documentElement.classList.toggle('light', resolved === 'light')
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = () => {
      if (theme === 'system') {
        const resolved = getSystemTheme()
        setResolvedTheme(resolved)
        document.documentElement.classList.toggle('dark', resolved === 'dark')
        document.documentElement.classList.toggle('light', resolved === 'light')
      }
    }
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [theme, mounted])

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    localStorage.setItem('theme', newTheme)
    const resolved = newTheme === 'system' ? getSystemTheme() : newTheme
    setResolvedTheme(resolved)
    document.documentElement.classList.toggle('dark', resolved === 'dark')
    document.documentElement.classList.toggle('light', resolved === 'light')
  }

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </ThemeContext.Provider>
  )
}
