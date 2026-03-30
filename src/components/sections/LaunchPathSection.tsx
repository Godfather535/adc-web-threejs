import { useLayoutEffect, useRef, type ReactElement } from 'react'
import { gsap, ScrollTrigger } from '../../lib/gsap'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import styles from './LaunchPathSection.module.css'

type VisualProps = { uid: number }

function VisualDiscover({ uid }: VisualProps) {
  const p = `lv${uid}`
  return (
    <svg className={styles.visual} viewBox="0 0 260 118" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <defs>
        <linearGradient id={`${p}-stroke`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.25" />
          <stop offset="50%" stopColor="#00ffc6" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.35" />
        </linearGradient>
      </defs>
      <rect x="12" y="10" width="236" height="98" rx="8" fill="rgba(0,0,0,0.2)" stroke="rgba(255,255,255,0.06)" />
      <circle cx="130" cy="58" r="22" fill="rgba(0,255,198,0.08)" stroke="rgba(0,255,198,0.35)" strokeWidth="1" />
      <text x="130" y="56" textAnchor="middle" fill="rgba(255,255,255,0.75)" fontSize="8" fontWeight="700">
        SCOPE
      </text>
      <text x="130" y="66" textAnchor="middle" fill="rgba(0,255,198,0.5)" fontSize="5.5" fontWeight="600">
        NO BUILD YET
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
      <text x="52" y="29" textAnchor="middle" fill="rgba(255,255,255,0.55)">
        EMR
      </text>
      <rect x="190" y="18" width="36" height="18" rx="4" fill="rgba(139,92,246,0.1)" stroke="rgba(167,139,250,0.4)" />
      <text x="208" y="29" textAnchor="middle" fill="rgba(255,255,255,0.55)">
        HRIS
      </text>
      <rect x="34" y="78" width="40" height="18" rx="4" fill="rgba(0,255,198,0.08)" stroke="rgba(0,255,198,0.3)" />
      <text x="54" y="89" textAnchor="middle" fill="rgba(255,255,255,0.5)">
        POLICY
      </text>
      <rect x="186" y="78" width="44" height="18" rx="4" fill="rgba(59,130,246,0.1)" stroke="rgba(96,165,250,0.35)" />
      <text x="208" y="89" textAnchor="middle" fill="rgba(255,255,255,0.5)">
        KPIs
      </text>
      <circle data-launch-pulse cx="130" cy="58" r="3" fill="#00ffc6" opacity="0.55" />
    </svg>
  )
}

function VisualIntegrate({ uid }: VisualProps) {
  const p = `lv${uid}`
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
      <text x="36" y="58" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="8" fontWeight="700">
        ADC
      </text>
      <text x="36" y="70" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="5.5">
        CONTROL
      </text>
      <rect x="104" y="42" width="56" height="36" rx="5" fill="rgba(0,0,0,0.25)" stroke="rgba(255,255,255,0.12)" />
      <text x="132" y="58" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="6">
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
      <text x="224" y="84" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="5.5">
        IAM / KEYS
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
      <text x="130" y="28" textAnchor="middle" fill="rgba(255,255,255,0.32)" fontSize="5.5" fontWeight="600">
        SIGNED · IDEMPOTENT · HMAC
      </text>
      <circle data-launch-pulse cx="132" cy="60" r="2.5" fill="#60a5fa" opacity="0.6" />
    </svg>
  )
}

function VisualPilot({ uid }: VisualProps) {
  const p = `lv${uid}`
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
      <text x="130" y="22" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="5.5" fontWeight="600">
        FEEDBACK LOOP
      </text>
      <circle cx="130" cy="70" r="8" fill="rgba(0,255,198,0.12)" stroke="rgba(0,255,198,0.4)" />
      <text x="130" y="72" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="6" fontWeight="700">
        PILOT
      </text>
      <circle cx="88" cy="48" r="4" fill="rgba(59,130,246,0.35)" stroke="rgba(96,165,250,0.6)" />
      <circle cx="172" cy="48" r="4" fill="rgba(139,92,246,0.35)" stroke="rgba(167,139,250,0.55)" />
      <circle cx="88" cy="92" r="4" fill="rgba(0,255,198,0.2)" stroke="rgba(0,255,198,0.45)" />
      <circle cx="172" cy="92" r="4" fill="rgba(59,130,246,0.25)" stroke="rgba(96,165,250,0.5)" />
      <text x="88" y="41" textAnchor="middle" fill="rgba(255,255,255,0.38)" fontSize="5">
        W1
      </text>
      <text x="172" y="41" textAnchor="middle" fill="rgba(255,255,255,0.38)" fontSize="5">
        W2
      </text>
      <text x="88" y="105" textAnchor="middle" fill="rgba(255,255,255,0.38)" fontSize="5">
        W3
      </text>
      <text x="172" y="105" textAnchor="middle" fill="rgba(255,255,255,0.38)" fontSize="5">
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

function VisualScale({ uid }: VisualProps) {
  const p = `lv${uid}`
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
      <text x="130" y="18" textAnchor="middle" fill="rgba(255,255,255,0.32)" fontSize="5.5" fontWeight="600">
        DEMAND · ROSTER · LATENCY
      </text>
      <line x1="32" y1="88" x2="228" y2="88" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
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
        stroke="rgba(248, 250, 252, 0.45)"
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
      />
      <text x="210" y="48" textAnchor="end" fill="rgba(0,255,198,0.55)" fontSize="5.5" fontWeight="700">
        SLO
      </text>
      <g>
        <rect x="14" y="96" width="52" height="16" rx="3" fill="rgba(59,130,246,0.08)" stroke="rgba(59,130,246,0.25)" />
        <text x="40" y="106" textAnchor="middle" fill="rgba(255,255,255,0.42)" fontSize="5.5">
          + SITE
        </text>
        <rect x="194" y="96" width="52" height="16" rx="3" fill="rgba(0,255,198,0.06)" stroke="rgba(0,255,198,0.28)" />
        <text x="220" y="106" textAnchor="middle" fill="rgba(255,255,255,0.42)" fontSize="5.5">
          SAME STACK
        </text>
      </g>
      <circle data-launch-pulse cx="168" cy="42" r="2.5" fill="#fff" opacity="0.35" />
    </svg>
  )
}

const phases: readonly {
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

export function LaunchPathSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const reduceMotion = usePrefersReducedMotion()

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
            From kickoff to live—<span>without the drama</span>
          </h2>
          <p className={styles.lede} data-launch-lede>
            Read the phases visually—then dive deeper with your team when you&apos;re ready.
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
                  <Visual uid={i} />
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
