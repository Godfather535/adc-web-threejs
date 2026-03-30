import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../../lib/gsap'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import styles from './StakeholdersSection.module.css'

const pillars = [
  {
    title: 'Athletes',
    copy: 'Transparency and control over personal data—with clear consent and access paths.',
    icon: '◇',
    tone: 'cellAthletes' as const,
  },
  {
    title: 'Coaches',
    copy: 'Data-driven planning and review loops that stay tied to the real training week.',
    icon: '◆',
    tone: 'cellCoaches' as const,
  },
  {
    title: 'Management',
    copy: 'Strategic visibility across squads, risk, and investment without operational drag.',
    icon: '▣',
    tone: 'cellManagement' as const,
  },
  {
    title: 'Federations',
    copy: 'Cross-organizational standards and collaboration without duplicating infrastructure.',
    icon: '◈',
    tone: 'cellFederations' as const,
  },
] as const

const ecoPills = ['4 stakeholders', 'One athlete graph', 'Shared trust layer'] as const

const easeNone = 'none'

/** Inline SVG scene: training floor + load signal (no external assets). */
function EcoTrainingArt() {
  return (
    <svg
      className={styles.photoArtSvg}
      viewBox="0 0 320 400"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        <linearGradient id="ecoT_line" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
          <stop offset="35%" stopColor="#3b82f6" stopOpacity="0.85" />
          <stop offset="65%" stopColor="#00ffc6" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="ecoT_glow" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ecoT_floor" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#00ffc6" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#0a1528" stopOpacity="0" />
        </linearGradient>
      </defs>
      <ellipse cx="160" cy="118" rx="120" ry="72" fill="url(#ecoT_glow)" />
      <path
        d="M 0 310 Q 160 240 320 310 L 320 400 L 0 400 Z"
        fill="url(#ecoT_floor)"
        opacity="0.9"
      />
      <g
        fill="none"
        stroke="rgba(255,255,255,0.12)"
        strokeWidth="0.75"
        opacity="0.85"
      >
        <path d="M 40 320 L 160 175 L 280 320" />
        <line x1="160" y1="175" x2="160" y2="335" />
        <line x1="100" y1="320" x2="160" y2="210" />
        <line x1="220" y1="320" x2="160" y2="210" />
      </g>
      <g opacity="0.9">
        <rect x="72" y="268" width="10" height="48" rx="2" fill="rgba(59,130,246,0.35)" />
        <rect x="92" y="248" width="10" height="68" rx="2" fill="rgba(0,255,198,0.4)" />
        <rect x="112" y="258" width="10" height="58" rx="2" fill="rgba(59,130,246,0.38)" />
        <rect x="132" y="232" width="10" height="84" rx="2" fill="rgba(139,92,246,0.35)" />
        <rect x="152" y="242" width="10" height="74" rx="2" fill="rgba(0,255,198,0.32)" />
        <rect x="172" y="255" width="10" height="61" rx="2" fill="rgba(59,130,246,0.3)" />
        <rect x="192" y="238" width="10" height="78" rx="2" fill="rgba(139,92,246,0.32)" />
        <rect x="212" y="250" width="10" height="66" rx="2" fill="rgba(0,255,198,0.28)" />
        <rect x="232" y="262" width="10" height="54" rx="2" fill="rgba(59,130,246,0.28)" />
      </g>
      <path
        d="M 24 168 L 52 188 L 78 152 L 104 172 L 132 128 L 158 148 L 186 118 L 212 138 L 240 108 L 268 128 L 296 98"
        fill="none"
        stroke="url(#ecoT_line)"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={styles.trainingPulse}
      />
      <g fill="rgba(255,255,255,0.35)">
        <circle cx="132" cy="128" r="3.5" />
        <circle cx="186" cy="118" r="3.5" />
        <circle cx="240" cy="108" r="3.5" />
      </g>
      <text
        x="160"
        y="52"
        textAnchor="middle"
        fill="rgba(255,255,255,0.18)"
        fontSize="11"
        fontFamily="system-ui, sans-serif"
        letterSpacing="0.35em"
      >
        SESSION LOAD
      </text>
    </svg>
  )
}

/** Inline SVG scene: org graph + policy cards. */
function EcoGovernanceArt() {
  return (
    <svg
      className={styles.photoArtSvg}
      viewBox="0 0 320 400"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        <linearGradient id="ecoG_edge" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00ffc6" stopOpacity="0.15" />
          <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.2" />
        </linearGradient>
        <linearGradient id="ecoG_node" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(0,255,198,0.25)" />
          <stop offset="100%" stopColor="rgba(59,130,246,0.2)" />
        </linearGradient>
      </defs>
      <g opacity="0.35" stroke="rgba(255,255,255,0.15)" strokeWidth="0.6">
        <line x1="32" y1="96" x2="288" y2="96" />
        <line x1="32" y1="132" x2="288" y2="132" />
        <line x1="32" y1="168" x2="200" y2="168" />
      </g>
      <g>
        <rect
          x="188"
          y="44"
          width="92"
          height="56"
          rx="8"
          fill="rgba(0,0,0,0.35)"
          stroke="rgba(255,255,255,0.12)"
        />
        <rect x="200" y="58" width="48" height="5" rx="2" fill="rgba(255,255,255,0.2)" />
        <rect x="200" y="70" width="68" height="4" rx="2" fill="rgba(255,255,255,0.1)" />
        <rect x="200" y="80" width="52" height="4" rx="2" fill="rgba(255,255,255,0.08)" />
        <rect
          x="188"
          y="112"
          width="92"
          height="48"
          rx="8"
          fill="rgba(0,0,0,0.28)"
          stroke="rgba(0,255,198,0.15)"
        />
        <rect x="200" y="126" width="40" height="5" rx="2" fill="rgba(0,255,198,0.35)" />
        <rect x="200" y="138" width="64" height="4" rx="2" fill="rgba(255,255,255,0.08)" />
      </g>
      <g fill="none" stroke="url(#ecoG_edge)" strokeWidth="1.2" strokeLinecap="round">
        <path d="M 160 220 L 160 178" />
        <path d="M 160 178 L 96 132" />
        <path d="M 160 178 L 224 132" />
        <path d="M 96 132 L 64 88" />
        <path d="M 96 132 L 96 72" />
        <path d="M 224 132 L 256 88" />
        <path d="M 224 132 L 256 72" />
        <path d="M 160 220 L 104 278" />
        <path d="M 160 220 L 216 278" />
      </g>
      <circle cx="160" cy="232" r="14" fill="url(#ecoG_node)" stroke="rgba(0,255,198,0.45)" strokeWidth="1.2" />
      <circle cx="96" cy="124" r="10" fill="rgba(59,130,246,0.25)" stroke="rgba(59,130,246,0.45)" />
      <circle cx="224" cy="124" r="10" fill="rgba(139,92,246,0.22)" stroke="rgba(139,92,246,0.45)" />
      <circle cx="64" cy="72" r="7" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.2)" />
      <circle cx="96" cy="58" r="7" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.2)" />
      <circle cx="256" cy="72" r="7" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.2)" />
      <circle cx="256" cy="58" r="7" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.2)" />
      <circle cx="104" cy="286" r="9" fill="rgba(0,255,198,0.12)" stroke="rgba(0,255,198,0.35)" />
      <circle cx="216" cy="286" r="9" fill="rgba(59,130,246,0.12)" stroke="rgba(59,130,246,0.35)" />
      <path
        d="M 148 48 L 160 58 L 172 48 L 168 72 L 152 72 Z"
        fill="none"
        stroke="rgba(0,255,198,0.35)"
        strokeWidth="1"
        opacity="0.8"
      />
      <text
        x="160"
        y="348"
        textAnchor="middle"
        fill="rgba(255,255,255,0.16)"
        fontSize="10"
        fontFamily="system-ui, sans-serif"
        letterSpacing="0.28em"
      >
        CONSENT · POLICY · AUDIT
      </text>
    </svg>
  )
}

export function StakeholdersSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const reduceMotion = usePrefersReducedMotion()

  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const reduce = reduceMotion

    const ctx = gsap.context(() => {
      const copyCol = section.querySelector<HTMLElement>(`.${styles.copyCol}`)
      const visualCol = section.querySelector<HTMLElement>(`.${styles.visualCol}`)
      const rule = section.querySelector<HTMLElement>(`[data-eco-rule]`)
      const eyebrow = section.querySelector<HTMLElement>(`[data-eco-eyebrow]`)
      const headline = section.querySelector<HTMLElement>(`[data-eco-headline]`)
      const lede = section.querySelector<HTMLElement>(`[data-eco-lede]`)
      const pills = section.querySelectorAll<HTMLElement>(`[data-eco-pill]`)
      const cells = section.querySelectorAll<HTMLElement>(`[data-eco-cell]`)
      const photoA = section.querySelector<HTMLElement>(`[data-eco-photo="a"]`)
      const photoB = section.querySelector<HTMLElement>(`[data-eco-photo="b"]`)
      const orbitPaths = section.querySelectorAll<SVGPathElement>(`[data-eco-orbit]`)

      const blurFrom = reduce ? {} : { filter: 'blur(10px)' }
      const blurTo = reduce ? {} : { filter: 'blur(0px)' }

      const copyTrigger = {
        trigger: copyCol ?? section,
        start: 'top 88%',
        end: 'top 34%',
        scrub: 1,
      }

      if (rule) {
        gsap.fromTo(
          rule,
          { scaleY: 0, opacity: 0, transformOrigin: 'top center' },
          {
            scaleY: 1,
            opacity: 1,
            ease: easeNone,
            scrollTrigger: copyTrigger,
          },
        )
      }

      if (eyebrow) {
        gsap.fromTo(
          eyebrow,
          { opacity: 0, x: -12, ...blurFrom },
          { opacity: 1, x: 0, ...blurTo, ease: easeNone, scrollTrigger: copyTrigger },
        )
      }

      if (headline) {
        gsap.fromTo(
          headline,
          { opacity: 0, y: 22, ...blurFrom },
          { opacity: 1, y: 0, ...blurTo, ease: easeNone, scrollTrigger: copyTrigger },
        )
      }

      if (lede) {
        gsap.fromTo(
          lede,
          { opacity: 0, y: 18, ...blurFrom },
          { opacity: 1, y: 0, ...blurTo, ease: easeNone, scrollTrigger: copyTrigger },
        )
      }

      if (pills.length) {
        gsap.fromTo(
          pills,
          { opacity: 0, y: 12, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.05,
            ease: easeNone,
            scrollTrigger: copyTrigger,
          },
        )
      }

      if (cells.length) {
        gsap.fromTo(
          cells,
          { opacity: 0, y: 22, x: reduce ? 0 : -8, ...blurFrom },
          {
            opacity: 1,
            y: 0,
            x: 0,
            ...blurTo,
            stagger: 0.07,
            ease: easeNone,
            scrollTrigger: {
              trigger: copyCol ?? section,
              start: 'top 84%',
              end: 'top 28%',
              scrub: 1,
            },
          },
        )
      }

      if (visualCol) {
        gsap.fromTo(
          visualCol,
          { opacity: 0, x: reduce ? 0 : 28 },
          {
            opacity: 1,
            x: 0,
            ease: easeNone,
            scrollTrigger: {
              trigger: visualCol,
              start: 'top 90%',
              end: 'top 38%',
              scrub: 1,
            },
          },
        )
      }

      if (photoA && !reduce) {
        gsap.fromTo(
          photoA,
          { y: 36 },
          {
            y: -10,
            ease: easeNone,
            scrollTrigger: {
              trigger: visualCol ?? section,
              start: 'top 85%',
              end: 'bottom 55%',
              scrub: 1,
            },
          },
        )
      }

      if (photoB && !reduce) {
        gsap.fromTo(
          photoB,
          { y: -20 },
          {
            y: 14,
            ease: easeNone,
            scrollTrigger: {
              trigger: visualCol ?? section,
              start: 'top 85%',
              end: 'bottom 55%',
              scrub: 1,
            },
          },
        )
      }

      if (orbitPaths.length && !reduce && visualCol) {
        const orbitTl = gsap.timeline({
          scrollTrigger: {
            trigger: visualCol,
            start: 'top 88%',
            end: 'top 36%',
            scrub: 1,
          },
        })
        orbitPaths.forEach((path, i) => {
          const len = path.getTotalLength()
          gsap.set(path, { strokeDasharray: len, strokeDashoffset: len, opacity: 0.35 })
          orbitTl.to(
            path,
            { strokeDashoffset: 0, opacity: 0.88, duration: 1, ease: easeNone },
            i * 0.18,
          )
        })
      }
    }, section)

    return () => ctx.revert()
  }, [reduceMotion])

  return (
    <section
      ref={sectionRef}
      id="solutions"
      className={styles.section}
      aria-labelledby="solutions-heading"
    >
      <div className={styles.mesh} aria-hidden />
      <div className={styles.inner}>
        <div className={styles.copyCol}>
          <div className={styles.copyTop}>
            <span className={styles.accentRule} data-eco-rule aria-hidden />
            <p className={styles.eyebrow} data-eco-eyebrow>
              Ecosystem
            </p>
          </div>
          <h2 id="solutions-heading" className={styles.headline} data-eco-headline>
            An ecosystem for <span className={styles.headlineEm}>everyone</span> involved
          </h2>
          <p className={styles.lede} data-eco-lede>
            ADC connects the pillars of modern competitive sport—so athletes, coaches, leadership,
            and governing bodies share one trustworthy layer instead of parallel silos.
          </p>
          <div className={styles.pillRow}>
            {ecoPills.map((label) => (
              <span key={label} className={styles.pill} data-eco-pill>
                {label}
              </span>
            ))}
          </div>
          <div className={styles.grid2}>
            {pillars.map((p) => (
              <div
                key={p.title}
                className={`${styles.cell} ${styles[p.tone]}`}
                data-eco-cell
              >
                <div className={styles.cellIcon} aria-hidden>
                  {p.icon}
                </div>
                <h3 className={styles.cellTitle}>{p.title}</h3>
                <p className={styles.cellCopy}>{p.copy}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.visualCol}>
          <svg
            className={styles.visualSvg}
            viewBox="0 0 400 280"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden
          >
            <defs>
              <linearGradient id="ecoOrbitGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
                <stop offset="42%" stopColor="#00ffc6" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              data-eco-orbit
              d="M -20 210 Q 120 30 220 100 T 420 60"
            />
            <path
              data-eco-orbit
              d="M 40 260 Q 200 140 320 40"
            />
          </svg>

          <div className={`${styles.photo} ${styles.photoA}`} data-eco-photo="a">
            <div className={styles.photoArt} aria-hidden>
              <EcoTrainingArt />
            </div>
            <div className={styles.photoVignette} aria-hidden />
            <div className={styles.photoGrain} aria-hidden />
            <div className={styles.photoInner}>
              <span className={styles.photoTag}>Live ops</span>
              <span className={styles.photoLabel}>Training floor</span>
            </div>
          </div>
          <div className={`${styles.photo} ${styles.photoB}`} data-eco-photo="b">
            <div className={styles.photoArt} aria-hidden>
              <EcoGovernanceArt />
            </div>
            <div className={styles.photoVignette} aria-hidden />
            <div className={styles.photoGrain} aria-hidden />
            <div className={styles.photoInner}>
              <span className={styles.photoTag}>Governance</span>
              <span className={styles.photoLabel}>Staff &amp; strategy</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
