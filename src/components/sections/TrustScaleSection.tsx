import { useLayoutEffect, useRef, type ComponentType } from 'react'
import { gsap } from '../../lib/gsap'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { useI18n } from '../../i18n/useI18n'
import { useTheme } from '../../context/ThemeContext'
import styles from './TrustScaleSection.module.css'

const easeNone = 'none'

type Theme = 'dark' | 'light'
type TrustVisualProps = { theme: Theme }

function TrustVisualConsent({ theme }: TrustVisualProps) {
  const isLight = theme === 'light'
  return (
    <svg viewBox="0 0 280 160" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <defs>
        <linearGradient id="tvConsentRing" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00ffc6" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.35" />
        </linearGradient>
      </defs>
      <circle cx="140" cy="78" r="52" fill="none" stroke="url(#tvConsentRing)" strokeWidth="1" opacity={isLight ? 0.68 : 0.45} />
      <circle cx="140" cy="78" r="36" fill="none" stroke={isLight ? 'rgba(14,165,233,0.28)' : 'rgba(0,255,198,0.2)'} strokeWidth="0.75" strokeDasharray="4 6" />
      <path
        d="M 140 52 L 140 68 M 132 60 L 148 60"
        stroke={isLight ? 'rgba(14,165,233,0.58)' : 'rgba(0,255,198,0.5)'}
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
      />
      <rect x="124" y="70" width="32" height="26" rx="4" fill={isLight ? 'rgba(14,165,233,0.12)' : 'rgba(0,255,198,0.12)'} stroke={isLight ? 'rgba(14,165,233,0.4)' : 'rgba(0,255,198,0.45)'} strokeWidth="1" />
      <path d="M 132 82 L 136 86 L 148 74" fill="none" stroke="#00ffc6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="62" cy="48" r="6" fill="rgba(59,130,246,0.35)" stroke="rgba(59,130,246,0.6)" />
      <circle cx="218" cy="52" r="6" fill="rgba(139,92,246,0.3)" stroke="rgba(139,92,246,0.55)" />
      <circle cx="52" cy="108" r="6" fill="rgba(0,255,198,0.2)" stroke="rgba(0,255,198,0.45)" />
      <path
        d="M 68 50 Q 100 62 124 78 M 212 54 Q 180 66 156 78 M 58 104 Q 90 92 124 88"
        fill="none"
        stroke={isLight ? 'rgba(30,41,59,0.24)' : 'rgba(255,255,255,0.12)'}
        strokeWidth="0.9"
      />
    </svg>
  )
}

function TrustVisualAudit({ theme }: TrustVisualProps) {
  const isLight = theme === 'light'
  return (
    <svg viewBox="0 0 280 160" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <defs>
        <linearGradient id="tvAuditBar" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.45" />
        </linearGradient>
      </defs>
      <rect x="48" y="38" width="184" height="10" rx="2" fill={isLight ? 'rgba(30,41,59,0.12)' : 'rgba(255,255,255,0.06)'} />
      <rect x="48" y="54" width="140" height="10" rx="2" fill="url(#tvAuditBar)" opacity="0.85" />
      <rect x="48" y="70" width="168" height="10" rx="2" fill={isLight ? 'rgba(30,41,59,0.1)' : 'rgba(255,255,255,0.05)'} />
      <rect x="48" y="86" width="96" height="10" rx="2" fill={isLight ? 'rgba(30,41,59,0.1)' : 'rgba(255,255,255,0.05)'} />
      <g transform="translate(196, 50)">
        <circle r="14" fill="rgba(59,130,246,0.15)" stroke="rgba(59,130,246,0.5)" strokeWidth="1" />
        <path d="M -4 0 L -1 4 L 6 -5" fill="none" stroke="#60a5fa" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <rect x="48" y="108" width="184" height="22" rx="4" fill={isLight ? 'rgba(30,41,59,0.12)' : 'rgba(0,0,0,0.35)'} stroke={isLight ? 'rgba(30,41,59,0.2)' : 'rgba(255,255,255,0.08)'} />
      <text x="56" y="123" fill={isLight ? 'rgba(51,65,85,0.62)' : 'rgba(255,255,255,0.25)'} fontSize="9" fontFamily="system-ui, sans-serif" letterSpacing="0.12em">
        HASH · TS · ACTOR
      </text>
    </svg>
  )
}

function TrustVisualResilient({ theme }: TrustVisualProps) {
  const isLight = theme === 'light'
  return (
    <svg viewBox="0 0 280 160" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <path
        d="M 40 118 Q 140 28 240 118"
        fill="none"
        stroke={isLight ? 'rgba(59,130,246,0.28)' : 'rgba(139,92,246,0.25)'}
        strokeWidth="1"
      />
      <rect x="108" y="44" width="64" height="48" rx="6" fill={isLight ? 'rgba(59,130,246,0.12)' : 'rgba(139,92,246,0.1)'} stroke={isLight ? 'rgba(59,130,246,0.45)' : 'rgba(167,139,250,0.45)'} strokeWidth="1" />
      <rect x="118" y="54" width="44" height="8" rx="2" fill={isLight ? 'rgba(30,41,59,0.14)' : 'rgba(255,255,255,0.08)'} />
      <rect x="118" y="66" width="32" height="8" rx="2" fill={isLight ? 'rgba(30,41,59,0.1)' : 'rgba(255,255,255,0.06)'} />
      <rect x="118" y="78" width="38" height="8" rx="2" fill="rgba(0,255,198,0.15)" />
      <circle cx="140" cy="32" r="5" fill="rgba(0,255,198,0.35)" />
      <path d="M 140 37 L 140 44" stroke={isLight ? 'rgba(14,165,233,0.45)' : 'rgba(0,255,198,0.4)'} strokeWidth="0.8" />
      <rect x="52" y="96" width="36" height="40" rx="4" fill="rgba(59,130,246,0.12)" stroke="rgba(59,130,246,0.35)" />
      <rect x="192" y="96" width="36" height="40" rx="4" fill="rgba(59,130,246,0.12)" stroke="rgba(59,130,246,0.35)" />
      <path
        d="M 88 116 L 108 108 M 172 108 L 192 116"
        stroke={isLight ? 'rgba(30,41,59,0.18)' : 'rgba(255,255,255,0.1)'}
        strokeWidth="0.8"
      />
      <circle cx="76" cy="124" r="3" fill="#3b82f6" opacity="0.7" className={styles.pulseDot} />
      <circle cx="204" cy="124" r="3" fill="#00ffc6" opacity="0.7" className={styles.pulseDot} />
    </svg>
  )
}

function AsmTls() {
  return (
    <svg viewBox="0 0 64 36" aria-hidden>
      <rect x="22" y="8" width="20" height="16" rx="3" fill="none" stroke="rgba(0,255,198,0.5)" strokeWidth="1.2" />
      <path d="M 26 14 L 30 18 L 38 10" fill="none" stroke="#00ffc6" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M 8 26 L 14 20 M 50 20 L 56 26" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />
    </svg>
  )
}

function AsmHipaa() {
  return (
    <svg viewBox="0 0 64 36" aria-hidden>
      <path
        d="M 32 6 L 38 12 L 32 18 L 26 12 Z"
        fill="rgba(59,130,246,0.15)"
        stroke="rgba(96,165,250,0.55)"
        strokeWidth="1"
      />
      <rect x="24" y="20" width="16" height="12" rx="2" fill="rgba(59,130,246,0.1)" stroke="rgba(59,130,246,0.35)" />
    </svg>
  )
}

function AsmSoc() {
  return (
    <svg viewBox="0 0 64 36" aria-hidden>
      <circle cx="32" cy="18" r="14" fill="none" stroke="rgba(139,92,246,0.35)" strokeWidth="1" strokeDasharray="3 4" />
      <path
        d="M 24 18 L 30 24 L 42 12"
        fill="none"
        stroke="#a78bfa"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function AsmE2e() {
  return (
    <svg viewBox="0 0 64 36" aria-hidden>
      <circle cx="18" cy="18" r="6" fill="rgba(0,255,198,0.15)" stroke="rgba(0,255,198,0.45)" />
      <circle cx="46" cy="18" r="6" fill="rgba(59,130,246,0.15)" stroke="rgba(59,130,246,0.45)" />
      <path d="M 24 18 L 40 18" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="2 3" />
    </svg>
  )
}

const pillarsEn: readonly {
  title: string
  tagline: string
  tone: 'cardA' | 'cardB' | 'cardC'
  Visual: ComponentType<TrustVisualProps>
}[] = [
  {
    title: 'Consent & lineage',
    tagline: 'Policy travels with every record.',
    tone: 'cardA',
    Visual: TrustVisualConsent,
  },
  {
    title: 'Audit-ready trails',
    tagline: 'Receipts for access & exports.',
    tone: 'cardB',
    Visual: TrustVisualAudit,
  },
  {
    title: 'Resilient operations',
    tagline: 'Regions · transit · runbooks.',
    tone: 'cardC',
    Visual: TrustVisualResilient,
  },
]

const pillarsDe: typeof pillarsEn = [
  {
    title: 'Einwilligung & Herkunft',
    tagline: 'Policy reist mit jedem Datensatz.',
    tone: 'cardA',
    Visual: TrustVisualConsent,
  },
  {
    title: 'Audit-fähige Nachweise',
    tagline: 'Belege für Zugriff & Exporte.',
    tone: 'cardB',
    Visual: TrustVisualAudit,
  },
  {
    title: 'Resiliente Abläufe',
    tagline: 'Regionen · Transit · Runbooks.',
    tone: 'cardC',
    Visual: TrustVisualResilient,
  },
]

const assurancesEn = [
  { name: 'mTLS', status: 'Live', statusClass: styles.statusLive, Glyph: AsmTls },
] as const

const assurancesDe = [
  { name: 'mTLS', status: 'Live', statusClass: styles.statusLive, Glyph: AsmTls },
  { name: 'HIPAA-Status', status: 'Bereit', statusClass: styles.statusReady, Glyph: AsmHipaa },
  { name: 'SOC 2', status: 'Roadmap', statusClass: styles.statusRoadmap, Glyph: AsmSoc },
  { name: 'E2E-Abdeckung', status: 'Eingegrenzt', statusClass: styles.statusReady, Glyph: AsmE2e },
] as const

export function TrustScaleSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const reduceMotion = usePrefersReducedMotion()
  const { lang } = useI18n()
  const { theme } = useTheme()

  const pillars = lang === 'de' ? pillarsDe : pillarsEn
  const assurances = lang === 'de' ? assurancesDe : assurancesEn

  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const reduce = reduceMotion

    const ctx = gsap.context(() => {
      const header = section.querySelector<HTMLElement>(`.${styles.header}`)
      const rule = section.querySelector<HTMLElement>(`[data-trust-rule]`)
      const eyebrow = section.querySelector<HTMLElement>(`[data-trust-eyebrow]`)
      const headline = section.querySelector<HTMLElement>(`[data-trust-headline]`)
      const lede = section.querySelector<HTMLElement>(`[data-trust-lede]`)
      const cards = section.querySelectorAll<HTMLElement>(`[data-trust-card]`)
      const strip = section.querySelector<HTMLElement>(`.${styles.strip}`)
      const stripLabel = section.querySelector<HTMLElement>(`[data-trust-strip-label]`)
      const assuranceEls = strip?.querySelectorAll<HTMLElement>(`[data-trust-assurance]`)

      const blurA = reduce ? {} : { filter: 'blur(10px)' }
      const blurB = reduce ? {} : { filter: 'blur(0px)' }

      const hTrigger = {
        trigger: header ?? section,
        start: 'top 88%',
        end: 'top 36%',
        scrub: 1,
      }

      if (rule) {
        gsap.fromTo(
          rule,
          { scaleX: 0, opacity: 0, transformOrigin: 'left center' },
          { scaleX: 1, opacity: 1, ease: easeNone, scrollTrigger: hTrigger },
        )
      }
      if (eyebrow) {
        gsap.fromTo(
          eyebrow,
          { opacity: 0, x: -10, ...blurA },
          { opacity: 1, x: 0, ...blurB, ease: easeNone, scrollTrigger: hTrigger },
        )
      }
      if (headline) {
        gsap.fromTo(
          headline,
          { opacity: 0, y: 20, ...blurA },
          { opacity: 1, y: 0, ...blurB, ease: easeNone, scrollTrigger: hTrigger },
        )
      }
      if (lede) {
        gsap.fromTo(
          lede,
          { opacity: 0, y: 16, ...blurA },
          { opacity: 1, y: 0, ...blurB, ease: easeNone, scrollTrigger: hTrigger },
        )
      }

      if (cards.length) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 24, ...blurA },
          {
            opacity: 1,
            y: 0,
            ...blurB,
            stagger: 0.08,
            ease: easeNone,
            scrollTrigger: {
              trigger: section.querySelector(`.${styles.cards}`) ?? section,
              start: 'top 86%',
              end: 'top 32%',
              scrub: 1,
            },
          },
        )
      }

      if (strip && (stripLabel || assuranceEls?.length)) {
        const stripTl = gsap.timeline({
          scrollTrigger: {
            trigger: strip,
            start: 'top 90%',
            end: 'top 52%',
            scrub: 1,
          },
        })
        if (stripLabel) {
          stripTl.fromTo(
            stripLabel,
            { opacity: 0, y: 8 },
            { opacity: 1, y: 0, duration: 1, ease: easeNone },
            0,
          )
        }
        if (assuranceEls?.length) {
          stripTl.fromTo(
            assuranceEls,
            { opacity: 0, y: 10, scale: 0.98 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              stagger: 0.05,
              duration: 1,
              ease: easeNone,
            },
            0.04,
          )
        }
      }
    }, section)

    return () => ctx.revert()
  }, [reduceMotion])

  return (
    <section
      ref={sectionRef}
      id="trust"
      className={styles.section}
      aria-labelledby="trust-heading"
    >
      <svg
        className={styles.orbitArt}
        viewBox="0 0 1200 600"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <defs>
          <linearGradient id="trustOrbitGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
            <stop offset="45%" stopColor="#00ffc6" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M -80 420 Q 280 80 620 280 T 1280 200" opacity="0.7" />
        <path d="M 120 520 Q 520 200 900 380 T 1220 120" opacity="0.5" />
      </svg>
      <div className={styles.gridBg} aria-hidden />
      <div className={styles.inner}>
        <header className={styles.header}>
          <div className={styles.headerTop}>
            <span className={styles.rule} data-trust-rule aria-hidden />
            <p className={styles.eyebrow} data-trust-eyebrow>
              {lang === 'de' ? 'Vertrauen & Governance' : 'Trust & governance'}
            </p>
          </div>
          <h2 id="trust-heading" className={styles.headline} data-trust-headline>
            {lang === 'de' ? (
              <>
                Sicherheit und Klarheit, <span className={styles.headlineAccent}>ohne Reibung</span>
              </>
            ) : (
              <>
                Security and clarity, <span className={styles.headlineAccent}>without the drag</span>
              </>
            )}
          </h2>
          <p className={styles.lede} data-trust-lede>
            {lang === 'de'
              ? 'Leitplanken, die sowohl Regulatoren als auch Athleten überzeugen—ohne das Team auszubremsen.'
              : 'Guardrails that keep regulators and athletes both confident—without slowing the team.'}
          </p>
        </header>

        <div className={styles.cards}>
          {pillars.map((p) => {
            const V = p.Visual
            return (
              <article
                key={p.title}
                className={`${styles.card} ${styles[p.tone]}`}
                data-trust-card
              >
                <div className={styles.cardVisual}>
                  <V theme={theme} />
                </div>
                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>{p.title}</h3>
                  <p className={styles.cardTagline}>{p.tagline}</p>
                </div>
              </article>
            )
          })}
        </div>

        <div className={styles.strip}>
          <span className={styles.stripLabel} data-trust-strip-label>
            {lang === 'de' ? 'Absicherungs-Oberfläche' : 'Assurance surface'}
          </span>
          {assurances.map((a) => {
            const G = a.Glyph
            return (
              <div key={a.name} className={styles.assuranceItem} data-trust-assurance>
                <div className={styles.assuranceGlyph}>
                  <G />
                </div>
                <div className={styles.assuranceRow}>
                  <span className={styles.assuranceName}>{a.name}</span>
                  <span className={`${styles.assuranceStatus} ${a.statusClass}`}>{a.status}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
