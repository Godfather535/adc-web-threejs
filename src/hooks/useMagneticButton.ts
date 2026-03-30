import { useLayoutEffect, useRef, type PointerEventHandler } from 'react'
import { gsap } from '../lib/gsap'

const DEFAULT_STRENGTH = 0.35

/**
 * Applies magnetic pull to a wrap element (translate x/y). Place around the button.
 */
export function useMagneticButton(strength = DEFAULT_STRENGTH) {
  const wrapRef = useRef<HTMLDivElement | null>(null)
  const qx = useRef<((v: number) => void) | null>(null)
  const qy = useRef<((v: number) => void) | null>(null)

  useLayoutEffect(() => {
    const el = wrapRef.current
    if (!el) return
    qx.current = gsap.quickTo(el, 'x', { duration: 0.55, ease: 'power3.out' })
    qy.current = gsap.quickTo(el, 'y', { duration: 0.55, ease: 'power3.out' })
    return () => {
      gsap.set(el, { clearProps: 'transform' })
    }
  }, [])

  const onPointerMove: PointerEventHandler<HTMLDivElement> = (e) => {
    const el = wrapRef.current
    if (!el || !qx.current || !qy.current) return
    const r = el.getBoundingClientRect()
    const cx = r.left + r.width / 2
    const cy = r.top + r.height / 2
    qx.current((e.clientX - cx) * strength)
    qy.current((e.clientY - cy) * strength)
  }

  const onPointerLeave: PointerEventHandler<HTMLDivElement> = () => {
    qx.current?.(0)
    qy.current?.(0)
  }

  return {
    wrapRef,
    onPointerMove,
    onPointerLeave,
  }
}
