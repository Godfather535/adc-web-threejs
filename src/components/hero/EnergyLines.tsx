import { Line } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

const ACCENT = '#00ffc6'

export function EnergyLines() {
  const g1 = useRef<THREE.Group>(null)
  const g2 = useRef<THREE.Group>(null)

  const p1 = useMemo(
    () => [
      new THREE.Vector3(-5, -1, -4),
      new THREE.Vector3(-2, 0.5, -2),
      new THREE.Vector3(1, -0.2, 0),
      new THREE.Vector3(4, 1.2, 2),
    ],
    [],
  )
  const p2 = useMemo(
    () => [
      new THREE.Vector3(-4.2, 0.8, -3),
      new THREE.Vector3(-1, -0.4, -1),
      new THREE.Vector3(2, 0.6, 1),
      new THREE.Vector3(5, -0.5, 3),
    ],
    [],
  )
  const p3 = useMemo(
    () => [
      new THREE.Vector3(-3, -1.5, -2),
      new THREE.Vector3(0, 0.2, 0),
      new THREE.Vector3(3, 1, 2),
    ],
    [],
  )

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (g1.current) g1.current.rotation.z = Math.sin(t * 0.15) * 0.04
    if (g2.current) g2.current.rotation.z = Math.cos(t * 0.12) * 0.035
  })

  return (
    <group>
      <group ref={g1}>
        <Line
          points={p1}
          color={ACCENT}
          lineWidth={1.2}
          transparent
          opacity={0.45}
          depthWrite={false}
        />
      </group>
      <group ref={g2}>
        <Line
          points={p2}
          color={ACCENT}
          lineWidth={0.9}
          transparent
          opacity={0.32}
          depthWrite={false}
        />
      </group>
      <Line
        points={p3}
        color="#3b82f6"
        lineWidth={0.8}
        transparent
        opacity={0.22}
        depthWrite={false}
      />
    </group>
  )
}
