import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../../lib/gsap'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { useI18n } from '../../i18n/useI18n'
import styles from './ConnectSection.module.css'

const easeNone = 'none'

const stackChipsEn = ['OpenAPI 3.1', 'Signed webhooks', 'Idempotent writes'] as const
const stackChipsDe = ['OpenAPI 3.1', 'Signierte Webhooks', 'Idempotente Writes'] as const

function WebhookSvg() {
  return (
    <svg viewBox="0 0 200 64" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <defs>
        <linearGradient id="connWh" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
          <stop offset="50%" stopColor="#00ffc6" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      <rect x="8" y="20" width="44" height="28" rx="6" fill="rgba(59,130,246,0.15)" stroke="rgba(59,130,246,0.4)" />
      <text x="30" y="38" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9" fontFamily="system-ui">
        ADC
      </text>
      <path
        d="M 56 34 L 100 34 L 100 24 L 144 24"
        fill="none"
        stroke="url(#connWh)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <polygon points="138,20 148,24 138,28" fill="#00ffc6" opacity="0.7" />
      <rect x="148" y="14" width="44" height="36" rx="6" fill="rgba(0,255,198,0.08)" stroke="rgba(0,255,198,0.35)" />
      <path d="M 162 28 L 170 36 L 182 24" fill="none" stroke="#00ffc6" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

function SyncSvg() {
  return (
    <svg viewBox="0 0 200 64" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <ellipse cx="100" cy="32" rx="72" ry="22" fill="none" stroke="rgba(139,92,246,0.25)" strokeWidth="0.8" />
      <path
        d="M 40 32 A 60 18 0 0 1 160 32"
        fill="none"
        stroke="rgba(167,139,250,0.45)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <circle cx="100" cy="32" r="8" fill="rgba(139,92,246,0.2)" stroke="rgba(167,139,250,0.55)" />
      <circle cx="52" cy="28" r="5" fill="rgba(59,130,246,0.3)" />
      <circle cx="148" cy="36" r="5" fill="rgba(0,255,198,0.25)" />
      <path d="M 148 28 L 154 22 M 154 22 L 154 28" stroke="rgba(255,255,255,0.25)" strokeWidth="0.9" />
    </svg>
  )
}

export function ConnectSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const reduceMotion = usePrefersReducedMotion()
  const { lang } = useI18n()

  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const reduce = reduceMotion

    const ctx = gsap.context(() => {
      const copy = section.querySelector<HTMLElement>(`.${styles.copy}`)
      const eyebrow = copy?.querySelector<HTMLElement>(`[data-conn-eyebrow]`)
      const headline = copy?.querySelector<HTMLElement>(`[data-conn-headline]`)
      const lede = copy?.querySelector<HTMLElement>(`[data-conn-lede]`)
      const chips = copy?.querySelectorAll<HTMLElement>(`[data-conn-chip]`)
      const bento = section.querySelector<HTMLElement>(`.${styles.bento}`)
      const apiPanel = section.querySelector<HTMLElement>(`.${styles.apiPanel}`)
      const tiles = section.querySelectorAll<HTMLElement>(`[data-conn-tile]`)

      const blurA = reduce ? {} : { filter: 'blur(8px)' }
      const blurB = reduce ? {} : { filter: 'blur(0px)' }

      const copyTrig = {
        trigger: copy ?? section,
        start: 'top 88%',
        end: 'top 40%',
        scrub: 1,
      }

      if (eyebrow) {
        gsap.fromTo(
          eyebrow,
          { opacity: 0, y: 12, ...blurA },
          { opacity: 1, y: 0, ...blurB, ease: easeNone, scrollTrigger: copyTrig },
        )
      }
      if (headline) {
        gsap.fromTo(
          headline,
          { opacity: 0, y: 18, ...blurA },
          { opacity: 1, y: 0, ...blurB, ease: easeNone, scrollTrigger: copyTrig },
        )
      }
      if (lede) {
        gsap.fromTo(
          lede,
          { opacity: 0, y: 14, ...blurA },
          { opacity: 1, y: 0, ...blurB, ease: easeNone, scrollTrigger: copyTrig },
        )
      }
      if (chips?.length) {
        gsap.fromTo(
          chips,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, stagger: 0.06, ease: easeNone, scrollTrigger: copyTrig },
        )
      }

      if (bento) {
        const bt = {
          trigger: bento,
          start: 'top 88%',
          end: 'top 34%',
          scrub: 1,
        }
        if (apiPanel) {
          gsap.fromTo(
            apiPanel,
            { opacity: 0, y: 22, ...blurA },
            { opacity: 1, y: 0, ...blurB, ease: easeNone, scrollTrigger: bt },
          )
        }
        if (tiles.length) {
          gsap.fromTo(
            tiles,
            { opacity: 0, y: 18, ...blurA },
            {
              opacity: 1,
              y: 0,
              ...blurB,
              stagger: 0.07,
              ease: easeNone,
              scrollTrigger: bt,
            },
          )
        }
      }
    }, section)

    return () => ctx.revert()
  }, [reduceMotion])

  return (
    <section
      ref={sectionRef}
      id="connect"
      className={styles.section}
      aria-labelledby="connect-heading"
    >
      <svg
        className={styles.flowLines}
        viewBox="0 0 1000 400"
        preserveAspectRatio="none"
        aria-hidden
      >
        <defs>
          <linearGradient id="connFlowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
            <stop offset="45%" stopColor="#00ffc6" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M 0 120 Q 200 60 400 140 T 800 100 T 1000 180" />
        <path d="M 0 280 Q 300 200 500 260 T 1000 220" opacity="0.6" />
      </svg>

      <div className={styles.inner}>
        <div className={styles.copy}>
          <p className={styles.eyebrow} data-conn-eyebrow>
            {lang === 'de' ? 'Konnektivität' : 'Connectivity'}
          </p>
          <h2 id="connect-heading" className={styles.headline} data-conn-headline>
            {lang === 'de' ? (
              <>
                In Ihren Stack eingebunden—<span>nicht umgekehrt</span>
              </>
            ) : (
              <>
                Plugs into your stack—<span>not the other way around</span>
              </>
            )}
          </h2>
          <p className={styles.lede} data-conn-lede>
            {lang === 'de'
              ? 'Senden Sie Events, Roster-Deltas und klinische Signale an die Systeme, denen Ihr Team bereits vertraut.'
              : 'Ship events, roster deltas, and clinical signals to the systems your staff already trust.'}
          </p>
          <div className={styles.chips}>
            {(lang === 'de' ? stackChipsDe : stackChipsEn).map((c) => (
              <span key={c} className={styles.chip} data-conn-chip>
                {c}
              </span>
            ))}
          </div>
        </div>

        <div className={styles.bento}>
          <div className={styles.apiPanel}>
            <div className={styles.apiHead}>
              <span className={styles.dot} />
              <span className={styles.dot} />
              <span className={styles.dot} />
              <span className={styles.apiTitle}>integration.ts</span>
            </div>
            <pre className={styles.apiBody}>
              {lang === 'de'
                ? `// Roster-Snapshot abrufen — signierte Anfrage
const res = await fetch('/v1/roster/snapshot', {
  headers: { Authorization: 'Bearer …' },
});
await ingestEvents('load.updated');`
                : `// Pull roster snapshot — signed request
const res = await fetch('/v1/roster/snapshot', {
  headers: { Authorization: 'Bearer …' },
});
await ingestEvents('load.updated');`}
            </pre>
          </div>

          <div className={styles.tile} data-conn-tile>
            <div className={styles.tileSvg}>
              <WebhookSvg />
            </div>
            <h3 className={styles.tileTitle}>{lang === 'de' ? 'Webhooks' : 'Webhooks'}</h3>
            <p className={styles.tileHint}>
              {lang === 'de' ? 'HMAC-verifizierte Payloads zu Ihren Endpunkten.' : 'HMAC-verified payloads to your endpoints.'}
            </p>
          </div>

          <div className={styles.tile} data-conn-tile>
            <div className={styles.tileSvg}>
              <SyncSvg />
            </div>
            <h3 className={styles.tileTitle}>
              {lang === 'de' ? 'Roster- &amp; EMR-Synchronisation' : 'Roster &amp; EMR sync'}
            </h3>
            <p className={styles.tileHint}>
              {lang === 'de' ? 'Bidirektionale Flows mit Konfliktregeln.' : 'Bi-directional flows with conflict rules.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
