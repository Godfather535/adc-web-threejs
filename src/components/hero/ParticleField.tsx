import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import type { MutableRefObject } from 'react'
import type { ParallaxPointer } from '../../hooks/useMouseParallax'

const DESKTOP = 2200
const MOBILE = Math.floor(DESKTOP * 0.3)

function hash01(n: number) {
  const x = Math.sin(n * 12.9898) * 43758.5453
  return x - Math.floor(x)
}

type Props = {
  pointerRef: MutableRefObject<ParallaxPointer>
  isMobile: boolean
}

export function ParticleField({ pointerRef, isMobile }: Props) {
  const mesh = useRef<THREE.InstancedMesh>(null)
  const count = isMobile ? MOBILE : DESKTOP

  const geo = useMemo(() => new THREE.SphereGeometry(0.018, 6, 6), [])
  const mat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color('#8b5cf6'),
        transparent: true,
        opacity: 0.85,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [],
  )

  const { base, phase } = useMemo(() => {
    const b = new Float32Array(count * 3)
    const ph = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const s = i * 7.17
      b[i3] = (hash01(s) - 0.5) * 14
      b[i3 + 1] = (hash01(s + 1.1) - 0.5) * 9
      b[i3 + 2] = (hash01(s + 2.2) - 0.5) * 10
      ph[i] = hash01(s + 3.3) * Math.PI * 2
    }
    return { base: b, phase: ph }
  }, [count])

  const dummy = useMemo(() => new THREE.Object3D(), [])
  const tmp = useMemo(() => new THREE.Vector3(), [])

  useFrame((state) => {
    const m = mesh.current
    if (!m) return

    const t = state.clock.elapsedTime
    const { nx, ny } = pointerRef.current
    const repelX = nx * 4.5
    const repelY = ny * 3.2

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      let x = base[i3] + Math.sin(t * 0.12 + phase[i]) * 0.08
      let y = base[i3 + 1] + Math.cos(t * 0.09 + phase[i] * 0.7) * 0.06
      const z =
        base[i3 + 2] + Math.sin(t * 0.07 + phase[i] * 1.3) * 0.05

      tmp.set(x, y, z)
      const dx = tmp.x - repelX
      const dy = tmp.y - repelY
      const d = Math.sqrt(dx * dx + dy * dy + 0.25) + 0.01
      const f = 0.45 / d
      x += (dx / d) * f
      y += (dy / d) * f

      const layer = (i % 3) * 0.01
      dummy.position.set(x, y, z + layer)
      const s = 0.75 + (i % 5) * 0.06
      dummy.scale.setScalar(s)
      dummy.updateMatrix()
      m.setMatrixAt(i, dummy.matrix)
    }
    m.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={mesh} args={[geo, mat, count]} frustumCulled={false} />
  )
}
