import { Environment, PerspectiveCamera } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Bloom, EffectComposer, Vignette } from '@react-three/postprocessing'
import { Suspense, useRef } from 'react'
import * as THREE from 'three'
import type { MutableRefObject } from 'react'
import type { ParallaxPointer } from '../../hooks/useMouseParallax'
import { EnergyLines } from './EnergyLines'
import { FloatingCard } from './FloatingCard'
import { GridFloor } from './GridFloor'
import { ParticleField } from './ParticleField'

type Props = {
  pointerRef: MutableRefObject<ParallaxPointer>
  isMobile: boolean
  theme: 'dark' | 'light'
}

function SceneTicker() {
  const { invalidate } = useThree()
  useFrame(() => invalidate())
  return null
}

function CameraRig() {
  useFrame((state) => {
    const t = state.clock.elapsedTime
    const cam = state.camera
    cam.position.x = Math.sin(t * 0.1) * 0.12
    cam.position.y = 0.62 + Math.sin(t * 0.07) * 0.035
    cam.position.z = 5.15 + Math.cos(t * 0.09) * 0.07
    cam.lookAt(0, 0.25, 0)
  })
  return null
}

function FloatingRings() {
  const a = useRef<THREE.Mesh>(null)
  const b = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (a.current) {
      a.current.rotation.x = t * 0.14
      a.current.rotation.z = t * 0.08
    }
    if (b.current) {
      b.current.rotation.y = -t * 0.11
    }
  })
  return (
    <group position={[0.2, 0.5, -0.8]}>
      <mesh ref={a}>
        <torusGeometry args={[1.05, 0.012, 12, 80]} />
        <meshBasicMaterial
          color="#3b82f6"
          transparent
          opacity={0.35}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <mesh ref={b} rotation={[1.1, 0.4, 0]}>
        <torusGeometry args={[1.35, 0.01, 10, 64]} />
        <meshBasicMaterial
          color="#8b5cf6"
          transparent
          opacity={0.22}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  )
}

function LightBeams() {
  return (
    <group>
      <mesh
        position={[2.2, 1.8, -2.4]}
        rotation={[Math.PI * 0.45, 0.2, 0.35]}
      >
        <coneGeometry args={[0.35, 2.8, 12, 1, true]} />
        <meshBasicMaterial
          color="#3b82f6"
          transparent
          opacity={0.07}
          depthWrite={false}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <mesh
        position={[-2.4, 1.2, -1.8]}
        rotation={[Math.PI * 0.35, -0.5, -0.2]}
      >
        <coneGeometry args={[0.28, 2.2, 12, 1, true]} />
        <meshBasicMaterial
          color="#00ffc6"
          transparent
          opacity={0.06}
          depthWrite={false}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  )
}

function SceneContent({ pointerRef, isMobile, theme }: Props) {
  const parallax = useRef<THREE.Group>(null)
  const isLight = theme === 'light'

  useFrame(() => {
    const g = parallax.current
    if (!g) return
    const { nx, ny } = pointerRef.current
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, nx * 0.14, 0.06)
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, ny * 0.1, 0.06)
  })

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0.62, 5.15]} fov={42} />
      <CameraRig />
      <SceneTicker />
      <color attach="background" args={[isLight ? '#0b1220' : '#070b14']} />

      <ambientLight intensity={isLight ? 0.4 : 0.35} />
      <directionalLight
        position={[-4, 3.5, 2]}
        intensity={isLight ? 0.78 : 0.85}
        color={isLight ? '#7c3aed' : '#8b5cf6'}
      />
      <pointLight position={[4, 2, 3]} intensity={isLight ? 0.56 : 0.6} color="#3b82f6" />
      <spotLight
        position={[0, 5, 2]}
        angle={0.35}
        penumbra={0.6}
        intensity={isLight ? 0.95 : 1.1}
        color={isLight ? '#ffffff' : '#ffffff'}
        castShadow={false}
      />

      <SweepLight />

      {!isMobile && (
        <Environment preset="city" environmentIntensity={0.55} />
      )}

      <group ref={parallax}>
        <ParticleField
          key={isMobile ? 'm' : 'd'}
          pointerRef={pointerRef}
          isMobile={isMobile}
        />
        <EnergyLines />
        {!isMobile && <GridFloor />}
        <FloatingRings />
        <LightBeams />
        <Suspense fallback={null}>
          <FloatingCard isMobile={isMobile} />
        </Suspense>
      </group>

      {!isMobile && (
        <EffectComposer multisampling={0}>
          <Bloom
            luminanceThreshold={isLight ? 0.27 : 0.25}
            mipmapBlur
            intensity={isLight ? 0.72 : 0.85}
            radius={0.45}
          />
          <Vignette eskil={false} offset={0.12} darkness={isLight ? 0.36 : 0.45} />
        </EffectComposer>
      )}
    </>
  )
}

function SweepLight() {
  const ref = useRef<THREE.PointLight>(null)
  useFrame((state) => {
    const t = state.clock.elapsedTime
    const L = ref.current
    if (L) {
      L.position.x = Math.sin(t * 0.45) * 4.2
      L.position.z = Math.cos(t * 0.38) * 2.8 - 1
      L.intensity = 0.55 + Math.sin(t * 1.2) * 0.25
    }
  })
  return (
    <pointLight
      ref={ref}
      position={[2, 1.2, 1]}
      distance={14}
      decay={2}
      color="#00ffc6"
      intensity={0.65}
    />
  )
}

export default function HeroScene({ pointerRef, isMobile, theme }: Props) {
  return (
    <Canvas
      gl={{
        alpha: false,
        antialias: true,
        powerPreference: 'high-performance',
        stencil: false,
        depth: true,
      }}
      dpr={[1, 2]}
      frameloop="demand"
      style={{ width: '100%', height: '100%', display: 'block' }}
    >
      <Suspense fallback={null}>
        <SceneContent pointerRef={pointerRef} isMobile={isMobile} theme={theme} />
      </Suspense>
    </Canvas>
  )
}
