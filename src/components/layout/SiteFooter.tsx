import styles from './SiteFooter.module.css'

const footerLinks = [
  { href: '#', label: 'Legal notice' },
  { href: '#', label: 'Privacy' },
  { href: '#', label: 'Contact' },
  { href: '#', label: 'Careers' },
] as const

export function SiteFooter() {
  const year = new Date().getFullYear()
  return (
    <footer id="footer" className={styles.footer}>
      <div className={styles.inner}>
        <div>
          <p className={styles.brand}>ADC</p>
          <p className={styles.copy}>© {year} ADC. All rights reserved.</p>
        </div>
        <div className={styles.links}>
          {footerLinks.map((l) => (
            <a key={l.label} href={l.href}>
              {l.label}
            </a>
          ))}
          <div className={styles.social} aria-label="Social">
            <a href="#" aria-label="LinkedIn">
              in
            </a>
            <a href="#" aria-label="Share">
              ↗
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
