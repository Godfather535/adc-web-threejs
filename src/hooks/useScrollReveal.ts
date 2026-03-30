import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'

export type ScrollRevealResult = {
  ref: React.RefObject<HTMLElement | null>
}

/**
 * Scrubs hero section opacity (and optional blur) as the user scrolls through it.
 */
export function useScrollReveal(): ScrollRevealResult {
  const ref = useRef<HTMLElement | null>(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      gsap.to(el, {
        opacity: reduce ? 0.94 : 0,
        filter: reduce ? 'blur(0px)' : 'blur(6px)',
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          invalidateOnRefresh: true,
        },
      })
    }, el)

    return () => ctx.revert()
  }, [])

  return { ref }
}
