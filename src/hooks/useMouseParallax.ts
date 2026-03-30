import { useEffect, useRef } from 'react'

export type ParallaxPointer = {
  nx: number
  ny: number
}

/**
 * Smooths window pointer to [-1, 1] for R3F useFrame (no React re-renders per frame).
 */
export function useMouseParallax() {
  const target = useRef({ nx: 0, ny: 0 })
  const current = useRef<ParallaxPointer>({ nx: 0, ny: 0 })

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const w = window.innerWidth || 1
      const h = window.innerHeight || 1
      target.current.nx = (e.clientX / w) * 2 - 1
      target.current.ny = -((e.clientY / h) * 2 - 1)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  useEffect(() => {
    let raf = 0
    const smooth = 0.075
    const loop = () => {
      current.current.nx += (target.current.nx - current.current.nx) * smooth
      current.current.ny += (target.current.ny - current.current.ny) * smooth
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [])

  return current
}
