import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../../lib/gsap'
import { useMagneticButton } from '../../hooks/useMagneticButton'
import styles from './Hero.module.css'

const ease = 'power2.out'

function PlayGlyph() {
  return (
    <svg viewBox="0 0 12 14" aria-hidden>
      <path d="M0 0v14l12-7L0 0z" />
    </svg>
  )
}

export function HeroContent() {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const kickerPulseRef = useRef<HTMLSpanElement | null>(null)
  const playIconRef = useRef<HTMLSpanElement | null>(null)

  const {
    wrapRef: primaryWrapRef,
    onPointerMove: onPrimaryMove,
    onPointerLeave: onPrimaryLeave,
  } = useMagneticButton(0.32)
  const {
    wrapRef: secondaryWrapRef,
    onPointerMove: onSecondaryMove,
    onPointerLeave: onSecondaryLeave,
  } = useMagneticButton(0.22)

  useLayoutEffect(() => {
    const root = rootRef.current
    const hero = root?.closest('#hero')
    if (!root || !hero) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      const kicker = root.querySelector('[data-kicker]')
      const kickerLine = root.querySelector('[data-kicker-line]')
      const words = root.querySelectorAll('[data-hero-word]')
      const sub = root.querySelector('[data-sub]')
      const actions = root.querySelector('[data-actions]')

      const fromBlur = reduce ? {} : { filter: 'blur(12px)' }
      const toBlur = reduce ? {} : { filter: 'blur(0px)' }
      const wordFromBlur = reduce ? {} : { filter: 'blur(8px)' }
      const wordToBlur = reduce ? {} : { filter: 'blur(0px)' }

      const tl = gsap.timeline({ defaults: { ease } })

      if (kicker) {
        tl.fromTo(
          kicker,
          { opacity: 0, y: 28, ...fromBlur },
          { opacity: 1, y: 0, ...toBlur, duration: reduce ? 0.28 : 0.58 },
          0.1,
        )
      }
      if (kickerLine && !reduce) {
        tl.fromTo(
          kickerLine,
          { scaleX: 0 },
          { scaleX: 1, transformOrigin: 'left center', duration: 0.75 },
          0.35,
        )
      }
      if (words.length) {
        tl.fromTo(
          words,
          {
            opacity: 0,
            y: reduce ? 0 : 20,
            ...wordFromBlur,
          },
          {
            opacity: 1,
            y: 0,
            ...wordToBlur,
            duration: reduce ? 0.22 : 0.52,
            stagger: reduce ? 0.02 : 0.035,
          },
          0.12,
        )
      }
      if (sub) {
        tl.fromTo(
          sub,
          { opacity: 0, y: reduce ? 0 : 22, ...fromBlur },
          { opacity: 1, y: 0, ...toBlur, duration: reduce ? 0.28 : 0.58 },
          reduce ? 0.2 : 0.28,
        )
      }
      if (actions) {
        tl.fromTo(
          actions,
          { opacity: 0, y: reduce ? 0 : 20, ...fromBlur },
          { opacity: 1, y: 0, ...toBlur, duration: reduce ? 0.28 : 0.58 },
          reduce ? 0.26 : 0.36,
        )
      }

      if (!reduce) {
        gsap.to(root, {
          y: -10,
          ease: 'none',
          scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })
      }
    }, root)

    return () => ctx.revert()
  }, [])

  useLayoutEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const pulse = kickerPulseRef.current
    const play = playIconRef.current
    if (reduce) return

    const ctx = gsap.context(() => {
      if (pulse) {
        gsap.to(pulse, {
          scale: 1.2,
          opacity: 0.75,
          duration: 1.1,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
      }
      if (play) {
        gsap.to(play, {
          scale: 1.06,
          duration: 1.2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <div ref={rootRef} className={styles.contentColumn} data-hero-content>
      <div className={styles.kicker} data-kicker>
        <span ref={kickerPulseRef} className={styles.kickerPulse} aria-hidden />
        <span className={styles.kickerText}>ADC</span>
        <span className={styles.kickerLine} data-kicker-line aria-hidden />
      </div>

      <h1 className={styles.headline}>
        <span data-hero-word>The </span>
        <span data-hero-word>platform </span>
        <span data-hero-word>for </span>
        <span data-hero-word>the </span>
        <span className={styles.gradientWord} data-hero-word>
          competitive sport
        </span>
        <span data-hero-word> of </span>
        <span className={styles.gradientWord} data-hero-word>
          tomorrow
        </span>
        <span data-hero-word>.</span>
      </h1>

      <p className={styles.subtext} data-sub>
        Optimize athlete development with data-driven insight, secure communication, and
        decentralized infrastructure—built for organizations that cannot compromise on trust.
      </p>

      <div className={styles.actions} data-actions>
        <div
          ref={primaryWrapRef}
          className={styles.magneticWrap}
          onPointerMove={onPrimaryMove}
          onPointerLeave={onPrimaryLeave}
        >
          <button type="button" className={styles.primary}>
            Get started
          </button>
        </div>
        <div
          ref={secondaryWrapRef}
          className={styles.magneticWrap}
          onPointerMove={onSecondaryMove}
          onPointerLeave={onSecondaryLeave}
        >
          <button type="button" className={styles.secondary}>
            <span className={styles.secondaryInner}>
              <span ref={playIconRef} className={styles.playIcon}>
                <PlayGlyph />
              </span>
              Watch demo
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}
