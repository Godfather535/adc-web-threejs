import { useLayoutEffect, useRef, type PointerEventHandler } from 'react'
import { gsap, ScrollTrigger } from '../../lib/gsap'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { useDemoModal } from '../../context/DemoModalContext'
import { useI18n } from '../../i18n/useI18n'
import styles from './ClosingCTASection.module.css'

export function ClosingCTASection() {
  const sectionRef = useRef<HTMLElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const demoBtnRef = useRef<HTMLButtonElement>(null)
  const magneticWrapRef = useRef<HTMLDivElement>(null)
  const { openDemoModal } = useDemoModal()
  const { t } = useI18n()
  const chips = t<readonly string[]>('cta.chips')
  const magneticX = useRef<((v: number) => void) | null>(null)
  const magneticY = useRef<((v: number) => void) | null>(null)
  const reduceMotion = usePrefersReducedMotion()

  useLayoutEffect(() => {
    const el = magneticWrapRef.current
    if (!el || reduceMotion) return
    magneticX.current = gsap.quickTo(el, 'x', { duration: 0.55, ease: 'power3.out' })
    magneticY.current = gsap.quickTo(el, 'y', { duration: 0.55, ease: 'power3.out' })
    return () => {
      gsap.set(el, { clearProps: 'transform' })
    }
  }, [reduceMotion])

  const onMagneticMove: PointerEventHandler<HTMLDivElement> = (e) => {
    if (reduceMotion) return
    const el = magneticWrapRef.current
    if (!el || !magneticX.current || !magneticY.current) return
    const r = el.getBoundingClientRect()
    const cx = r.left + r.width / 2
    const cy = r.top + r.height / 2
    magneticX.current((e.clientX - cx) * 0.32)
    magneticY.current((e.clientY - cy) * 0.32)
  }

  const onMagneticLeave: PointerEventHandler<HTMLDivElement> = () => {
    magneticX.current?.(0)
    magneticY.current?.(0)
  }

  useLayoutEffect(() => {
    const section = sectionRef.current
    const panel = panelRef.current
    if (!section || !panel) return
    const reduce = reduceMotion

    const ctx = gsap.context(() => {
      const eyebrow = panel.querySelector<HTMLElement>(`[data-cta-eyebrow]`)
      const words = panel.querySelectorAll<HTMLElement>(`[data-cta-word]`)
      const lede = panel.querySelector<HTMLElement>(`[data-cta-lede]`)
      const chipEls = panel.querySelectorAll<HTMLElement>(`[data-cta-chip]`)
      const actionEls = panel.querySelectorAll<HTMLElement>(`[data-cta-action]`)
      const orbs = section.querySelectorAll<HTMLElement>(`[data-cta-orb]`)
      const energyPaths = section.querySelectorAll<SVGPathElement>(`[data-cta-energy]`)
      const framePaths = panel.querySelectorAll<SVGPathElement>(`[data-cta-frame]`)
      const nodes = section.querySelectorAll<SVGCircleElement>(`[data-cta-node]`)
      const glow = panel.querySelector<HTMLElement>(`.${styles.panelGlow}`)

      const stBase = {
        trigger: section,
        start: 'top 78%',
        end: 'top 32%',
        invalidateOnRefresh: true,
      }

      if (!reduce && energyPaths.length) {
        energyPaths.forEach((path) => {
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
              ...stBase,
              scrub: 0.85,
            },
          })
        })
      }

      if (!reduce && framePaths.length) {
        framePaths.forEach((path, i) => {
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
              trigger: panel,
              start: `top ${78 - i * 3}%`,
              end: `top ${46 - i * 2}%`,
              scrub: 0.65,
              invalidateOnRefresh: true,
            },
          })
        })
      }

      const blurA = reduce ? {} : { filter: 'blur(12px)' }
      const blurB = reduce ? {} : { filter: 'blur(0px)' }

      const enterTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 82%',
          once: true,
          invalidateOnRefresh: true,
        },
        defaults: { ease: 'power3.out' },
      })

      enterTl.fromTo(
        panel,
        { opacity: 0, y: 44, scale: 0.94, rotateX: reduce ? 0 : -6, transformOrigin: 'center center', ...blurA },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          duration: reduce ? 0.45 : 0.88,
          ease: 'power3.out',
          ...blurB,
          immediateRender: false,
        },
      )

      if (eyebrow) {
        enterTl.fromTo(
          eyebrow,
          { opacity: 0, y: 12, letterSpacing: '0.35em' },
          { opacity: 1, y: 0, letterSpacing: '0.24em', duration: reduce ? 0.25 : 0.55, immediateRender: false },
          reduce ? 0 : '-=0.55',
        )
      }

      if (words.length) {
        enterTl.fromTo(
          words,
          { opacity: 0, y: 22, rotateX: reduce ? 0 : -12, transformOrigin: 'center bottom' },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: reduce ? 0.25 : 0.52,
            stagger: reduce ? 0 : 0.07,
            ease: 'power3.out',
            immediateRender: false,
          },
          reduce ? 0 : '-=0.45',
        )
      }

      if (lede) {
        enterTl.fromTo(
          lede,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: reduce ? 0.2 : 0.5, immediateRender: false },
          reduce ? 0 : '-=0.35',
        )
      }

      if (chipEls.length) {
        enterTl.fromTo(
          chipEls,
          { opacity: 0, y: 16, scale: 0.92 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: reduce ? 0.2 : 0.45,
            stagger: reduce ? 0 : 0.08,
            ease: 'back.out(1.2)',
            immediateRender: false,
          },
          reduce ? 0 : '-=0.32',
        )
      }

      if (actionEls.length) {
        enterTl.fromTo(
          actionEls,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: reduce ? 0.2 : 0.5, stagger: reduce ? 0 : 0.12, immediateRender: false },
          reduce ? 0 : '-=0.28',
        )
      }

      enterTl.eventCallback('onComplete', () => {
        gsap.set(panel, { clearProps: 'transform,filter' })
      })

      if (!reduce && glow) {
        gsap.fromTo(
          glow,
          { opacity: 0.15, scale: 0.85 },
          {
            opacity: 0.65,
            scale: 1,
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 75%',
              end: 'top 40%',
              scrub: 1,
              invalidateOnRefresh: true,
            },
          },
        )
      }

      if (!reduce && orbs.length) {
        const floaters: gsap.core.Tween[] = []
        orbs.forEach((orb, i) => {
          const t = gsap.to(orb, {
            x: i % 2 === 0 ? 18 : -22,
            y: i === 1 ? -16 : 14,
            duration: 2.8 + i * 0.4,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            paused: true,
          })
          floaters.push(t)
        })

        ScrollTrigger.create({
          trigger: section,
          start: 'top 85%',
          end: 'bottom 10%',
          onToggle: (self) => {
            floaters.forEach((tw) => (self.isActive ? tw.play() : tw.pause()))
          },
        })
      }

      if (!reduce && nodes.length) {
        nodes.forEach((node, i) => {
          gsap.to(node, {
            opacity: 0.25,
            scale: 1.35,
            transformOrigin: 'center',
            repeat: -1,
            yoyo: true,
            duration: 1.4 + i * 0.2,
            ease: 'sine.inOut',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              toggleActions: 'play pause resume pause',
            },
          })
        })
      }

      requestAnimationFrame(() => ScrollTrigger.refresh())
    }, section)

    return () => ctx.revert()
  }, [reduceMotion])

  return (
    <section
      ref={sectionRef}
      id="cta"
      className={styles.section}
      aria-labelledby="cta-heading"
    >
      <div className={styles.orbs} aria-hidden>
        <div className={`${styles.orb} ${styles.orb1}`} data-cta-orb />
        <div className={`${styles.orb} ${styles.orb2}`} data-cta-orb />
        <div className={`${styles.orb} ${styles.orb3}`} data-cta-orb />
      </div>

      <svg className={styles.bgSvg} viewBox="0 0 1200 400" preserveAspectRatio="xMidYMid slice" aria-hidden>
        <defs>
          <linearGradient id="ctaEnergyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
            <stop offset="35%" stopColor="#3b82f6" stopOpacity="0.45" />
            <stop offset="55%" stopColor="#00ffc6" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          data-cta-energy
          d="M 0 220 Q 280 160 520 210 T 1040 190 T 1200 230"
        />
        <path
          data-cta-energy
          d="M 0 280 Q 340 320 600 260 T 1200 300"
          opacity="0.65"
        />
        <circle data-cta-node cx="200" cy="200" r="3" />
        <circle data-cta-node cx="600" cy="180" r="2.5" />
        <circle data-cta-node cx="980" cy="240" r="2.5" />
      </svg>

      <div className={styles.inner}>
        <div ref={panelRef} className={styles.panel}>
          <div className={styles.panelGlow} aria-hidden />
          <svg className={styles.frameSvg} viewBox="0 0 400 200" preserveAspectRatio="none" aria-hidden>
            <path data-cta-frame d="M 24 32 L 24 18 Q 24 12 32 12 L 88 12" />
            <path data-cta-frame d="M 312 12 L 368 12 Q 376 12 376 18 L 376 32" />
            <path data-cta-frame d="M 376 168 L 376 182 Q 376 188 368 188 L 312 188" />
            <path data-cta-frame d="M 88 188 L 32 188 Q 24 188 24 182 L 24 168" />
          </svg>

          <div className={styles.panelInner}>
            <p className={styles.eyebrow} data-cta-eyebrow>
              {t<string>('cta.eyebrow')}
            </p>
            <h2 id="cta-heading" className={styles.headline}>
              <span className={styles.hWord} data-cta-word>
                {t<string>('cta.wordReady')}
              </span>
              <span className={styles.hWord} data-cta-word>
                {t<string>('cta.wordWhen')}
              </span>
              <span className={`${styles.hWord} ${styles.headGrad}`} data-cta-word>
                {t<string>('cta.wordYou')}
              </span>
              <span className={`${styles.hWord} ${styles.headGrad}`} data-cta-word>
                {t<string>('cta.wordAre')}
              </span>
            </h2>
            <p className={styles.lede} data-cta-lede>
              {t<string>('cta.lede')}
            </p>
            <div className={styles.chips}>
              {chips.map((c) => (
                <span key={c} className={styles.chip} data-cta-chip>
                  {c}
                </span>
              ))}
            </div>
            <div className={styles.actions}>
              <div
                ref={magneticWrapRef}
                className={styles.magneticWrap}
                onPointerMove={onMagneticMove}
                onPointerLeave={onMagneticLeave}
              >
                <button
                  ref={demoBtnRef}
                  type="button"
                  className={styles.primary}
                  data-cta-action
                  onClick={() => openDemoModal(demoBtnRef.current)}
                >
                  {t<string>('cta.requestDemo')}
                </button>
              </div>
              <a href="#footer" className={styles.link} data-cta-action>
                {t<string>('cta.getInTouch')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
