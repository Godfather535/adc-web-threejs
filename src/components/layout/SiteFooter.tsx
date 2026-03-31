import styles from './SiteFooter.module.css'
import { useI18n } from '../../i18n/useI18n'

export function SiteFooter() {
  const { t } = useI18n()
  const year = new Date().getFullYear()

  const footerLinks = [
    { href: '#', label: t<string>('footer.legal') },
    { href: '#', label: t<string>('footer.privacy') },
    { href: '#', label: t<string>('footer.contact') },
    { href: '#', label: t<string>('footer.careers') },
  ] as const

  return (
    <footer id="footer" className={styles.footer}>
      <div className={styles.inner}>
        <div>
          <p className={styles.brand}>ADC</p>
          <p className={styles.copy}>© {year} ADC. {t<string>('footer.brandCopy')}</p>
        </div>
        <div className={styles.links}>
          {footerLinks.map((l) => (
            <a key={l.label} href={l.href}>
              {l.label}
            </a>
          ))}
          <div className={styles.social} aria-label={t<string>('footer.socialLabel')}>
            <a href="#" aria-label={t<string>('footer.linkedin')}>
              in
            </a>
            <a href="#" aria-label={t<string>('footer.share')}>
              ↗
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
