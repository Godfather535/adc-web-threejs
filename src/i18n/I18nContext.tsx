/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useMemo, useState, type ReactNode } from 'react'
import { translations } from './dict'

export type Lang = 'en' | 'de'

type I18nContextValue = {
  lang: Lang
  setLang: (l: Lang) => void
  t: <T = unknown>(key: string) => T
}

export const I18nContext = createContext<I18nContextValue | null>(null)

function getInitialLang(): Lang {
  if (typeof window === 'undefined') return 'en'
  const raw = window.navigator.language || ''
  return raw.toLowerCase().startsWith('de') ? 'de' : 'en'
}

function getByPath(obj: unknown, path: string): unknown {
  const parts = path.split('.').filter(Boolean)
  let cur: unknown = obj
  for (const p of parts) {
    if (cur == null || typeof cur !== 'object') return undefined
    cur = (cur as Record<string, unknown>)[p]
  }
  return cur
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => getInitialLang())

  const t = useCallback(
    <T = unknown,>(key: string) => {
      return getByPath(translations[lang], key) as T
    },
    [lang],
  )

  const value = useMemo<I18nContextValue>(
    () => ({
      lang,
      setLang,
      t,
    }),
    [lang, t],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

