import styles from './SiteHeader.module.css'

const nav = [
  { href: '#hero', label: 'Platform' },
  { href: '#solutions', label: 'Solutions' },
  { href: '#products', label: 'Products' },
  { href: '#trust', label: 'Trust' },
  { href: '#connect', label: 'Connect' },
  { href: '#qna', label: 'Q&A' },
  { href: '#launch', label: 'Rollout' },
] as const

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <a href="#hero" className={styles.logo}>
          ADC
        </a>
        <nav className={styles.nav} aria-label="Primary">
          {nav.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className={styles.actions}>
          <a href="#footer" className={styles.login}>
            Login
          </a>
          <button type="button" className={styles.demoBtn}>
            Watch demo
          </button>
        </div>
      </div>
    </header>
  )
}
