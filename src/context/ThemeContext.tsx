/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'

type Theme = 'dark' | 'light'

type ThemeContextValue = {
  theme: Theme
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'dark'
  const saved = window.localStorage.getItem('adc-theme')
  if (saved === 'light' || saved === 'dark') return saved
  return 'dark'
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => getInitialTheme())
  const glitchTimersRef = useRef<number[]>([])

  const clearGlitchTimers = useCallback(() => {
    glitchTimersRef.current.forEach((id) => window.clearTimeout(id))
    glitchTimersRef.current = []
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    window.localStorage.setItem('adc-theme', theme)
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === 'dark' ? 'light' : 'dark'
      const root = document.documentElement

      clearGlitchTimers()
      root.setAttribute('data-theme-transition', 'true')
      root.setAttribute('data-theme-transition-dir', next)
      root.setAttribute('data-theme-transition-phase', 'entry')

      glitchTimersRef.current.push(
        window.setTimeout(() => {
          root.setAttribute('data-theme-transition-phase', 'peak')
        }, 120),
      )

      glitchTimersRef.current.push(
        window.setTimeout(() => {
          root.setAttribute('data-theme-transition-phase', 'exit')
        }, 360),
      )

      glitchTimersRef.current.push(
        window.setTimeout(() => {
          root.removeAttribute('data-theme-transition-phase')
          root.removeAttribute('data-theme-transition')
          root.removeAttribute('data-theme-transition-dir')
          clearGlitchTimers()
        }, 680),
      )

      return next
    })
  }, [clearGlitchTimers])

  useEffect(() => {
    return () => {
      clearGlitchTimers()
      const root = document.documentElement
      root.removeAttribute('data-theme-transition-phase')
        root.removeAttribute('data-theme-transition')
        root.removeAttribute('data-theme-transition-dir')
    }
  }, [clearGlitchTimers])

  const value = useMemo(() => ({ theme, toggleTheme, setTheme }), [theme, toggleTheme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
