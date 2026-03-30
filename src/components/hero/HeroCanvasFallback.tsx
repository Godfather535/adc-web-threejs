import styles from './Hero.module.css'

export function HeroCanvasFallback() {
  return (
    <div className={styles.fallback} aria-hidden>
      <div className={styles.fallbackPulse} />
      <div className={styles.fallbackBars}>
        <span />
        <span />
        <span />
        <span />
      </div>
    </div>
  )
}
