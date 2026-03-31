import { useContext } from 'react'
import { I18nContext, type Lang } from './I18nContext'

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}

export type { Lang }

