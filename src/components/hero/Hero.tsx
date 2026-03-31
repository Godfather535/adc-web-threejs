import { lazy, Suspense, useLayoutEffect } from 'react'
import { gsap } from '../../lib/gsap'
import { useMouseParallax } from '../../hooks/useMouseParallax'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { useIsMobile } from '../../hooks/useIsMobile'
import { HeroCanvasFallback } from './HeroCanvasFallback'
import { HeroContent } from './HeroContent'
import { HeroErrorBoundary } from './HeroErrorBoundary'
import { useTheme } from '../../context/ThemeContext'
import styles from './Hero.module.css'

const HeroScene = lazy(() => import('./HeroScene'))

const ease = 'power2.out'

export function Hero() {
  const pointerRef = useMouseParallax()
  const isMobile = useIsMobile()
  const { ref: heroRef } = useScrollReveal()
  const { theme } = useTheme()

  useLayoutEffect(() => {
    const hero = heroRef.current
    if (!hero) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      const scene = hero.querySelector('[data-hero-scene]')
      const viewport = hero.querySelector('[data-hero-viewport]')
      const corners = hero.querySelectorAll('[data-hero-corner]')
      const label = hero.querySelector('[data-hero-viewport-label]')

      if (scene) {
        gsap.fromTo(
          scene,
          { opacity: 0, x: 36, scale: 0.96 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: reduce ? 0.25 : 0.9,
            delay: reduce ? 0 : 0.18,
            ease,
          },
        )
      }

      if (viewport && !reduce) {
        gsap.to(viewport, {
          y: -5,
          duration: 4.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
      }

      if (corners.length) {
        corners.forEach((corner, i) => {
          gsap.fromTo(
            corner,
            { opacity: 0, scale: 0.85 },
            {
              opacity: 1,
              scale: 1,
              duration: reduce ? 0.15 : 0.45,
              delay: reduce ? 0 : 0.55 + i * 0.07,
              ease,
            },
          )
        })
      }

      if (label) {
        gsap.fromTo(
          label,
          { opacity: 0, y: -6 },
          {
            opacity: 1,
            y: 0,
            duration: reduce ? 0.2 : 0.5,
            delay: reduce ? 0 : 0.85,
            ease,
          },
        )
      }

      /* Scroll-scrubbed parallax on the preview column while hero is on screen */
      if (scene && !reduce) {
        gsap.fromTo(
          scene,
          { y: 0 },
          {
            y: -18,
            ease: 'none',
            scrollTrigger: {
              trigger: hero,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
          },
        )
      }
    }, hero)

    return () => ctx.revert()
  }, [heroRef])

  return (
    <HeroErrorBoundary>
      <section
        id="hero"
        ref={heroRef}
        className={styles.hero}
        aria-label="ADC hero"
      >
        <div className={styles.meshGrid} aria-hidden />
        <div className={styles.overlays} aria-hidden>
          <div className={styles.noise} />
          <div className={styles.scanlines} />
          <div className={styles.gradientLines} />
          <div className={styles.gradientLines2} />
        </div>
        <div className={styles.grid}>
          <div className={styles.contentShell}>
            <HeroContent />
          </div>
          <div className={styles.sceneColumn} data-hero-scene>
            <div className={styles.viewportFrame} data-hero-viewport>
              <span
                className={`${styles.corner} ${styles.cornerTl}`}
                aria-hidden
                data-hero-corner
              />
              <span
                className={`${styles.corner} ${styles.cornerTr}`}
                aria-hidden
                data-hero-corner
              />
              <span
                className={`${styles.corner} ${styles.cornerBl}`}
                aria-hidden
                data-hero-corner
              />
              <span
                className={`${styles.corner} ${styles.cornerBr}`}
                aria-hidden
                data-hero-corner
              />
              <span className={styles.viewportLabel} data-hero-viewport-label>
                Dashboard preview
              </span>
              <div className={styles.viewportInner}>
                <div className={styles.canvasWrap}>
                  <Suspense fallback={<HeroCanvasFallback />}>
                    <HeroScene pointerRef={pointerRef} isMobile={isMobile} theme={theme} />
                  </Suspense>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </HeroErrorBoundary>
  )
}
