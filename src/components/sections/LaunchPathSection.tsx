import { useLayoutEffect, useRef, type ReactElement } from 'react'
import { gsap, ScrollTrigger } from '../../lib/gsap'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { useI18n } from '../../i18n/useI18n'
import { useTheme } from '../../context/ThemeContext'
import styles from './LaunchPathSection.module.css'

type Lang = 'en' | 'de'
type Theme = 'dark' | 'light'
type VisualProps = { uid: number; lang: Lang; theme: Theme }

function getVisualTheme(theme: Theme) {
  const isLight = theme === 'light'
  return {
    panelBg: isLight ? 'rgba(236,244,254,0.92)' : 'rgba(0,0,0,0.2)',
    panelStroke: isLight ? 'rgba(37,99,235,0.2)' : 'rgba(255,255,255,0.06)',
    textStrong: isLight ? 'rgba(15,23,42,0.78)' : 'rgba(255,255,255,0.75)',
    textMuted: isLight ? 'rgba(30,41,59,0.56)' : 'rgba(255,255,255,0.5)',
    textSoft: isLight ? 'rgba(51,65,85,0.46)' : 'rgba(255,255,255,0.38)',
    ringFill: isLight ? 'rgba(37,99,235,0.08)' : 'rgba(0,255,198,0.08)',
  }
}

function VisualDiscover({ uid, lang, theme }: VisualProps) {
  const p = `lv${uid}`
  const t = getVisualTheme(theme)
  const scopeText = lang === 'de' ? 'BEREICH' : 'SCOPE'
  const noBuildText = lang === 'de' ? 'KEIN BUILD' : 'NO BUILD YET'
  return (
    <svg className={styles.visual} viewBox="0 0 260 118" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <defs>
        <linearGradient id={`${p}-stroke`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.25" />
          <stop offset="50%" stopColor="#00ffc6" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.35" />
        </linearGradient>
      </defs>
      <rect x="12" y="10" width="236" height="98" rx="8" fill={t.panelBg} stroke={t.panelStroke} />
      <circle cx="130" cy="58" r="22" fill={t.ringFill} stroke="rgba(14,165,233,0.35)" strokeWidth="1" />
      <text x="130" y="56" textAnchor="middle" fill={t.textStrong} fontSize="8" fontWeight="700">
        {scopeText}
      </text>
      <text x="130" y="66" textAnchor="middle" fill="rgba(0,255,198,0.5)" fontSize="5.5" fontWeight="600">
        {noBuildText}
      </text>
      <path
        data-launch-draw
        d="M 130 36 L 52 28"
        stroke={`url(#${p}-stroke)`}
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
      />
      <path
        data-launch-draw
        d="M 130 36 L 208 28"
        stroke={`url(#${p}-stroke)`}
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
      />
      <path
        data-launch-draw
        d="M 130 80 L 52 88"
        stroke={`url(#${p}-stroke)`}
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
      />
      <path
        data-launch-draw
        d="M 130 80 L 208 88"
        stroke={`url(#${p}-stroke)`}
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
      />
      <rect x="34" y="18" width="36" height="18" rx="4" fill="rgba(59,130,246,0.12)" stroke="rgba(59,130,246,0.35)" />
      <text x="52" y="29" textAnchor="middle" fill={t.textMuted}>
        EMR
      </text>
      <rect x="190" y="18" width="36" height="18" rx="4" fill="rgba(139,92,246,0.1)" stroke="rgba(167,139,250,0.4)" />
      <text x="208" y="29" textAnchor="middle" fill={t.textMuted}>
        HRIS
      </text>
      <rect x="34" y="78" width="40" height="18" rx="4" fill="rgba(0,255,198,0.08)" stroke="rgba(0,255,198,0.3)" />
      <text x="54" y="89" textAnchor="middle" fill={t.textMuted}>
        POLICY
      </text>
      <rect x="186" y="78" width="44" height="18" rx="4" fill="rgba(59,130,246,0.1)" stroke="rgba(96,165,250,0.35)" />
      <text x="208" y="89" textAnchor="middle" fill={t.textMuted}>
        KPIs
      </text>
      <circle data-launch-pulse cx="130" cy="58" r="3" fill="#00ffc6" opacity="0.55" />
    </svg>
  )
}

function VisualIntegrate({ uid, lang, theme }: VisualProps) {
  const p = `lv${uid}`
  const t = getVisualTheme(theme)
  const controlText = lang === 'de' ? 'KONTROLLE' : 'CONTROL'
  const keysText = lang === 'de' ? 'IAM / SCHLÜSSEL' : 'IAM / KEYS'
  const signedLine = lang === 'de' ? 'SIGNIERT · IDEMPOTENT · HMAC' : 'SIGNED · IDEMPOTENT · HMAC'
  return (
    <svg className={styles.visual} viewBox="0 0 260 118" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <defs>
        <linearGradient id={`${p}-flow`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
          <stop offset="50%" stopColor="#00ffc6" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.35" />
        </linearGradient>
      </defs>
      <rect x="10" y="38" width="52" height="44" rx="6" fill="rgba(59,130,246,0.1)" stroke="rgba(59,130,246,0.45)" />
      <text x="36" y="58" textAnchor="middle" fill={t.textStrong} fontSize="8" fontWeight="700">
        ADC
      </text>
      <text x="36" y="70" textAnchor="middle" fill={t.textSoft} fontSize="5.5">
        {controlText}
      </text>
      <rect x="104" y="42" width="56" height="36" rx="5" fill={t.panelBg} stroke={t.panelStroke} />
      <text x="132" y="58" textAnchor="middle" fill={t.textMuted} fontSize="6">
        SANDBOX
      </text>
      <text x="132" y="68" textAnchor="middle" fill="rgba(0,255,198,0.45)" fontSize="5.5">
        OPENAPI
      </text>
      <rect x="198" y="40" width="52" height="40" rx="6" fill="rgba(0,255,198,0.06)" stroke="rgba(0,255,198,0.35)" />
      <path
        d="M 218 52 L 228 60 L 218 68 M 222 60 H 234"
        stroke="rgba(255,255,255,0.4)"
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
      />
      <text x="224" y="84" textAnchor="middle" fill={t.textSoft} fontSize="5.5">
        {keysText}
      </text>
      <path
        data-launch-draw
        d="M 62 60 H 88"
        stroke={`url(#${p}-flow)`}
        strokeWidth="1.4"
        fill="none"
        strokeLinecap="round"
      />
      <path
        data-launch-draw
        d="M 160 60 H 186"
        stroke={`url(#${p}-flow)`}
        strokeWidth="1.4"
        fill="none"
        strokeLinecap="round"
      />
      <polygon points="94,56 102,60 94,64" fill="#00ffc6" opacity="0.75" />
      <polygon points="192,56 200,60 192,64" fill="#00ffc6" opacity="0.75" />
      <text x="130" y="28" textAnchor="middle" fill={t.textSoft} fontSize="5.5" fontWeight="600">
        {signedLine}
      </text>
      <circle data-launch-pulse cx="132" cy="60" r="2.5" fill="#60a5fa" opacity="0.6" />
    </svg>
  )
}

function VisualPilot({ uid, lang, theme }: VisualProps) {
  const p = `lv${uid}`
  const t = getVisualTheme(theme)
  const loopText = lang === 'de' ? 'FEEDBACK-SCHLEIFE' : 'FEEDBACK LOOP'
  return (
    <svg className={styles.visual} viewBox="0 0 260 118" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <defs>
        <linearGradient id={`${p}-ring`} x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.15" />
          <stop offset="50%" stopColor="#00ffc6" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      <path
        data-launch-draw
        d="M 130 28 A 42 42 0 1 1 129.9 28"
        stroke={`url(#${p}-ring)`}
        strokeWidth="1.3"
        fill="none"
        strokeLinecap="round"
        transform="rotate(-90 130 70)"
      />
      <text x="130" y="22" textAnchor="middle" fill={t.textSoft} fontSize="5.5" fontWeight="600">
        {loopText}
      </text>
      <circle cx="130" cy="70" r="8" fill="rgba(0,255,198,0.12)" stroke="rgba(0,255,198,0.4)" />
      <text x="130" y="72" textAnchor="middle" fill={t.textStrong} fontSize="6" fontWeight="700">
        PILOT
      </text>
      <circle cx="88" cy="48" r="4" fill="rgba(59,130,246,0.35)" stroke="rgba(96,165,250,0.6)" />
      <circle cx="172" cy="48" r="4" fill="rgba(139,92,246,0.35)" stroke="rgba(167,139,250,0.55)" />
      <circle cx="88" cy="92" r="4" fill="rgba(0,255,198,0.2)" stroke="rgba(0,255,198,0.45)" />
      <circle cx="172" cy="92" r="4" fill="rgba(59,130,246,0.25)" stroke="rgba(96,165,250,0.5)" />
      <text x="88" y="41" textAnchor="middle" fill={t.textSoft} fontSize="5">
        W1
      </text>
      <text x="172" y="41" textAnchor="middle" fill={t.textSoft} fontSize="5">
        W2
      </text>
      <text x="88" y="105" textAnchor="middle" fill={t.textSoft} fontSize="5">
        W3
      </text>
      <text x="172" y="105" textAnchor="middle" fill={t.textSoft} fontSize="5">
        W4
      </text>
      <path
        data-launch-draw
        d="M 130 38 L 130 62"
        stroke="rgba(0,255,198,0.45)"
        strokeWidth="1"
        strokeDasharray="3 3"
        fill="none"
      />
      <circle data-launch-pulse cx="130" cy="70" r="2.5" fill="#00ffc6" opacity="0.55" />
    </svg>
  )
}

function VisualScale({ uid, lang, theme }: VisualProps) {
  const p = `lv${uid}`
  const t = getVisualTheme(theme)
  const bars = [
    { x: 48, h: 28 },
    { x: 78, h: 40 },
    { x: 108, h: 34 },
    { x: 138, h: 52 },
    { x: 168, h: 46 },
  ]
  return (
    <svg className={styles.visual} viewBox="0 0 260 118" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <defs>
        <linearGradient id={`${p}-bar`} x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#00ffc6" stopOpacity="0.65" />
        </linearGradient>
      </defs>
      <text x="130" y="18" textAnchor="middle" fill={t.textSoft} fontSize="5.5" fontWeight="600">
        DEMAND · ROSTER · LATENCY
      </text>
      <line x1="32" y1="88" x2="228" y2="88" stroke={theme === 'light' ? 'rgba(30,41,59,0.18)' : 'rgba(255,255,255,0.12)'} strokeWidth="1" />
      {bars.map((b) => (
        <rect
          key={b.x}
          x={b.x}
          y={88 - b.h}
          width="18"
          height={b.h}
          rx="3"
          fill={`url(#${p}-bar)`}
          opacity="0.85"
        />
      ))}
      <path
        data-launch-draw
        d="M 38 72 Q 80 58 120 64 T 210 52"
        stroke={theme === 'light' ? 'rgba(30, 64, 175, 0.45)' : 'rgba(248, 250, 252, 0.45)'}
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
      />
      <text x="210" y="48" textAnchor="end" fill="rgba(0,255,198,0.55)" fontSize="5.5" fontWeight="700">
        SLO
      </text>
      <g>
        <rect x="14" y="96" width="52" height="16" rx="3" fill="rgba(59,130,246,0.08)" stroke="rgba(59,130,246,0.25)" />
        <text x="40" y="106" textAnchor="middle" fill={t.textSoft} fontSize="5.5">
          {lang === 'de' ? '+ STANDORT' : '+ SITE'}
        </text>
        <rect x="194" y="96" width="52" height="16" rx="3" fill="rgba(0,255,198,0.06)" stroke="rgba(0,255,198,0.28)" />
        <text x="220" y="106" textAnchor="middle" fill={t.textSoft} fontSize="5.5">
          {lang === 'de' ? 'GLEICHER STACK' : 'SAME STACK'}
        </text>
      </g>
      <circle data-launch-pulse cx="168" cy="42" r="2.5" fill="#fff" opacity="0.35" />
    </svg>
  )
}

const phasesEn: readonly {
  n: string
  title: string
  hint: string
  tag: string
  label: string
  Visual: (props: VisualProps) => ReactElement
}[] = [
  {
    n: '01',
    title: 'Discover & align',
    hint: 'Week 0–2',
    tag: 'EMR · HRIS · policy · KPIs → one shared scope first.',
    label: 'Phase one: inventory systems and governance targets into a single scope diagram.',
    Visual: VisualDiscover,
  },
  {
    n: '02',
    title: 'Integrate & harden',
    hint: 'Week 2–5',
    tag: 'Sandbox · signed payloads · IAM—security signs off.',
    label: 'Phase two: connect sandbox endpoints and lock down identity and signatures.',
    Visual: VisualIntegrate,
  },
  {
    n: '03',
    title: 'Pilot with operators',
    hint: 'Week 5–8',
    tag: 'Small cohort · weekly loop · runbooks on the wall.',
    label: 'Phase three: run a limited cohort with weekly feedback and runbooks.',
    Visual: VisualPilot,
  },
  {
    n: '04',
    title: 'Scale & observe',
    hint: 'Week 8+',
    tag: 'More sites · same stack · SLO line stays green.',
    label: 'Phase four: expand sites while monitoring SLOs and demand.',
    Visual: VisualScale,
  },
]

const phasesDe: typeof phasesEn = [
  {
    n: '01',
    title: 'Entdecken & ausrichten',
    hint: 'Woche 0–2',
    tag: 'EMR · HRIS · policy · KPIs → zuerst ein gemeinsamer Scope.',
    label: 'Phase eins: Inventarsysteme und Governance-Ziele in ein gemeinsames Scope-Diagramm.',
    Visual: VisualDiscover,
  },
  {
    n: '02',
    title: 'Integrieren & härten',
    hint: 'Woche 2–5',
    tag: 'Sandbox · signierte Payloads · IAM—Security gibt das Go.',
    label: 'Phase zwei: Sandbox-Endpunkte verbinden und Identität sowie Signaturen absichern.',
    Visual: VisualIntegrate,
  },
  {
    n: '03',
    title: 'Pilot mit Operatoren',
    hint: 'Woche 5–8',
    tag: 'Kleines Cohort · wöchentliche Schleife · Runbooks an der Wand.',
    label: 'Phase drei: Begrenztes Cohort mit wöchentlichem Feedback und Runbooks.',
    Visual: VisualPilot,
  },
  {
    n: '04',
    title: 'Skalieren & beobachten',
    hint: 'Woche 8+',
    tag: 'Mehr Standorte · gleicher Stack · SLO-Linie bleibt grün.',
    label: 'Phase vier: Standorte erweitern und SLOs sowie Demand beobachten.',
    Visual: VisualScale,
  },
]

export function LaunchPathSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const reduceMotion = usePrefersReducedMotion()
  const { lang } = useI18n()
  const { theme } = useTheme()
  const phases = lang === 'de' ? phasesDe : phasesEn

  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const reduce = reduceMotion

    const ctx = gsap.context(() => {
      const header = section.querySelector<HTMLElement>(`.${styles.header}`)
      const eyebrow = header?.querySelector<HTMLElement>(`[data-launch-eyebrow]`)
      const headline = header?.querySelector<HTMLElement>(`[data-launch-headline]`)
      const lede = header?.querySelector<HTMLElement>(`[data-launch-lede]`)
      const cards = section.querySelectorAll<HTMLElement>(`[data-launch-card]`)
      const trackPath = section.querySelector<SVGPathElement>(`[data-launch-track]`)
      const flowPaths = section.querySelectorAll<SVGPathElement>(`[data-launch-energy]`)

      const blurFrom = reduce ? {} : { filter: 'blur(10px)' }
      const blurTo = reduce ? {} : { filter: 'blur(0px)' }

      const copySt = {
        trigger: header ?? section,
        start: 'top 82%',
        once: true,
      }

      if (eyebrow && headline && lede) {
        const tl = gsap.timeline({
          scrollTrigger: { ...copySt, invalidateOnRefresh: true },
          defaults: { immediateRender: false },
        })
        tl.fromTo(
          eyebrow,
          { opacity: 0, y: 14, ...blurFrom },
          { opacity: 1, y: 0, duration: 0.52, ease: 'power3.out', ...blurTo },
        )
          .fromTo(
            headline,
            { opacity: 0, y: 22, ...blurFrom },
            { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out', ...blurTo },
            '-=0.34',
          )
          .fromTo(
            lede,
            { opacity: 0, y: 10, ...blurFrom },
            { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out', ...blurTo },
            '-=0.36',
          )
      }

      if (cards.length) {
        const from = reduce
          ? { opacity: 0, y: 18 }
          : { opacity: 0, y: 32, rotateX: -10, transformOrigin: 'center top' as const }
        const to = reduce ? { opacity: 1, y: 0 } : { opacity: 1, y: 0, rotateX: 0 }

        gsap.fromTo(cards, from, {
          ...to,
          duration: 0.82,
          stagger: { each: 0.11, from: 'start' },
          ease: 'power3.out',
          immediateRender: false,
          scrollTrigger: {
            trigger: section.querySelector(`.${styles.phases}`) ?? section,
            start: 'top 88%',
            once: true,
            invalidateOnRefresh: true,
          },
          onComplete: () => {
            gsap.set(cards, { clearProps: 'transform' })
          },
        })
      }

      if (!reduce) {
        section.querySelectorAll<SVGPathElement>('[data-launch-draw]').forEach((path) => {
          const card = path.closest('[data-launch-card]')
          if (!card) return
          let len = 0
          try {
            len = path.getTotalLength()
          } catch {
            return
          }
          if (!Number.isFinite(len) || len < 0.5) return
          gsap.set(path, { strokeDasharray: len, strokeDashoffset: len })
          gsap.to(path, {
            strokeDashoffset: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top 78%',
              end: 'top 38%',
              scrub: 0.55,
              invalidateOnRefresh: true,
            },
          })
        })

        section.querySelectorAll<SVGCircleElement>('[data-launch-pulse]').forEach((circle) => {
          const card = circle.closest('[data-launch-card]')
          if (!card) return
          const tw = gsap.to(circle, {
            opacity: 0.28,
            repeat: -1,
            yoyo: true,
            duration: 1.05,
            ease: 'sine.inOut',
            paused: true,
          })
          ScrollTrigger.create({
            trigger: card,
            start: 'top 82%',
            end: 'bottom 15%',
            onToggle: (self) => {
              if (self.isActive) tw.play()
              else {
                tw.pause()
                gsap.set(circle, { opacity: 0.55 })
              }
            },
          })
        })

        cards.forEach((card) => {
          const viz = card.querySelector<HTMLElement>(`.${styles.visualWrap}`)
          if (!viz) return
          gsap.fromTo(
            viz,
            { opacity: 0.35, scale: 0.97 },
            {
              opacity: 1,
              scale: 1,
              ease: 'none',
              immediateRender: false,
              scrollTrigger: {
                trigger: card,
                start: 'top 76%',
                end: 'top 42%',
                scrub: 0.7,
                invalidateOnRefresh: true,
              },
            },
          )
        })
      }

      if (trackPath && !reduce) {
        let tlen = 0
        try {
          tlen = trackPath.getTotalLength()
        } catch {
          tlen = 0
        }
        if (Number.isFinite(tlen) && tlen >= 0.5) {
          gsap.set(trackPath, {
            strokeDasharray: tlen,
            strokeDashoffset: tlen,
          })
          gsap.to(trackPath, {
            strokeDashoffset: 0,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: section.querySelector(`.${styles.phases}`) ?? section,
              start: 'top 84%',
              end: 'top 48%',
              scrub: 0.75,
              invalidateOnRefresh: true,
            },
          })
        }
      }

      flowPaths.forEach((path) => {
        if (reduce) return
        let flen = 0
        try {
          flen = path.getTotalLength()
        } catch {
          return
        }
        if (!Number.isFinite(flen) || flen < 0.5) return
        gsap.set(path, { strokeDasharray: flen, strokeDashoffset: flen })
        gsap.to(path, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            end: 'bottom 55%',
            scrub: 1,
            invalidateOnRefresh: true,
          },
        })
      })

      requestAnimationFrame(() => {
        ScrollTrigger.refresh()
      })
    }, section)

    return () => ctx.revert()
  }, [reduceMotion])

  return (
    <section ref={sectionRef} id="launch" className={styles.section} aria-labelledby="launch-heading">
      <div className={styles.gridMask} aria-hidden />

      <svg className={styles.flowLayer} viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" aria-hidden>
        <defs>
          <linearGradient id="launchFlowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
            <stop offset="40%" stopColor="#00ffc6" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          data-launch-energy
          d="M 0 420 Q 300 360 600 400 T 1200 380"
          opacity="0.7"
        />
        <path
          data-launch-energy
          d="M 0 520 Q 400 480 700 540 T 1200 500"
          opacity="0.45"
        />
      </svg>

      <svg
        className={styles.trackSvg}
        viewBox="0 0 1000 48"
        preserveAspectRatio="none"
        aria-hidden
      >
        <defs>
          <linearGradient id="launchTrackGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
            <stop offset="20%" stopColor="#3b82f6" stopOpacity="0.45" />
            <stop offset="50%" stopColor="#00ffc6" stopOpacity="0.55" />
            <stop offset="80%" stopColor="#8b5cf6" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path data-launch-track d="M 20 28 Q 180 8 320 28 T 620 28 T 980 24" />
      </svg>

      <div className={styles.inner}>
        <header className={styles.header}>
          <p className={styles.eyebrow} data-launch-eyebrow>
            Rollout
          </p>
          <h2 id="launch-heading" className={styles.headline} data-launch-headline>
            {lang === 'de' ? (
              <>
                Vom Kickoff bis Live—<span>ohne Drama</span>
              </>
            ) : (
              <>
                From kickoff to live—<span>without the drama</span>
              </>
            )}
          </h2>
          <p className={styles.lede} data-launch-lede>
            {lang === 'de'
              ? 'Lesen Sie die Phasen visuell—und gehen Sie mit Ihrem Team dann tiefer, wenn Sie bereit sind.'
              : 'Read the phases visually—then dive deeper with your team when you&apos;re ready.'}
          </p>
        </header>

        <div className={styles.phases}>
          <span className={styles.mobileRail} aria-hidden />
          {phases.map((p, i) => {
            const Visual = p.Visual
            return (
              <article
                key={p.n}
                className={styles.card}
                data-launch-card
                aria-label={p.label}
              >
                <div className={styles.cardHead}>
                  <span className={styles.phaseNum}>{p.n}</span>
                  <span className={styles.phaseHint}>{p.hint}</span>
                </div>
                <div className={styles.visualWrap} data-launch-visual>
                  <Visual uid={i} lang={lang} theme={theme} />
                </div>
                <h3 className={styles.title}>{p.title}</h3>
                <p className={styles.tagline}>{p.tag}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
