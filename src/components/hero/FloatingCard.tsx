import {
  Edges,
  MeshTransmissionMaterial,
  RoundedBox,
} from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

type Props = { isMobile: boolean }

const W = 1024
const H = 640

function buildDashboardTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = W
  canvas.height = H
  const ctx = canvas.getContext('2d')
  if (!ctx) return new THREE.Texture()

  ctx.fillStyle = '#0a1224'
  ctx.fillRect(0, 0, W, H)

  const pad = 36
  const gw = W - pad * 2
  const gh = H - pad * 2
  const g = ctx.createLinearGradient(pad, pad, pad + gw, pad + gh)
  g.addColorStop(0, 'rgba(15, 35, 72, 0.95)')
  g.addColorStop(0.5, 'rgba(12, 22, 48, 0.98)')
  g.addColorStop(1, 'rgba(20, 28, 58, 0.95)')
  ctx.fillStyle = g
  ctx.fillRect(pad, pad, gw, gh)

  ctx.strokeStyle = 'rgba(0, 255, 198, 0.55)'
  ctx.lineWidth = 2
  ctx.strokeRect(pad, pad, gw, gh)

  ctx.shadowColor = 'rgba(59, 130, 246, 0.6)'
  ctx.shadowBlur = 18
  ctx.font = '700 42px system-ui,sans-serif'
  ctx.fillStyle = '#e8f0ff'
  ctx.fillText('PERFORMANCE', pad + 8, pad + 52)
  ctx.shadowBlur = 0

  ctx.font = '600 20px system-ui,sans-serif'
  ctx.fillStyle = '#00ffc6'
  ctx.fillText('LIVE · ELITE', pad + 8, pad + 86)

  ctx.font = '500 15px system-ui,sans-serif'
  ctx.fillStyle = 'rgba(255,255,255,0.55)'
  ctx.fillText('Session · Pro telemetry', pad + 8, pad + 118)

  const metrics = [
    { label: 'LOAD', val: '94.2', unit: '', color: '#60a5fa' },
    { label: 'HRV', val: '62', unit: 'ms', color: '#a78bfa' },
    { label: 'POWER', val: '412', unit: 'W', color: '#34d399' },
    { label: 'SPD', val: '9.4', unit: 'm/s', color: '#f472b6' },
  ]
  const mw = (gw - 32) / 4
  metrics.forEach((m, i) => {
    const x = pad + 16 + i * mw
    const y = pad + 138
    ctx.fillStyle = 'rgba(255,255,255,0.45)'
    ctx.font = '600 13px system-ui,sans-serif'
    ctx.fillText(m.label, x, y)
    ctx.fillStyle = m.color
    ctx.font = '700 34px system-ui,sans-serif'
    ctx.fillText(m.val + m.unit, x, y + 42)
  })

  const bx = pad + 16
  const by = pad + 248
  const bw = gw - 32
  const bh = 120
  ctx.fillStyle = 'rgba(255,255,255,0.06)'
  ctx.fillRect(bx, by, bw, bh)
  ctx.strokeStyle = 'rgba(59,130,246,0.45)'
  ctx.strokeRect(bx, by, bw, bh)

  const bars = [0.78, 0.52, 0.91, 0.58, 0.67, 0.84]
  const bwBar = (bw - 48) / bars.length
  bars.forEach((bhRel, i) => {
    const x = bx + 20 + i * bwBar
    const barH = bhRel * (bh - 28)
    const y0 = by + bh - 14 - barH
    const gBar = ctx.createLinearGradient(x, y0, x, by + bh - 14)
    gBar.addColorStop(0, '#3b82f6')
    gBar.addColorStop(1, '#8b5cf6')
    ctx.fillStyle = gBar
    ctx.fillRect(x, y0, bwBar - 10, barH)
    ctx.strokeStyle = 'rgba(0,255,198,0.5)'
    ctx.lineWidth = 1
    ctx.strokeRect(x, y0, bwBar - 10, barH)
  })

  ctx.fillStyle = 'rgba(255,255,255,0.5)'
  ctx.font = '500 13px system-ui,sans-serif'
  ctx.fillText('LOAD · RECOVERY · POWER · SPEED · AGILITY · REPEAT', bx + 8, by + bh + 22)

  ctx.strokeStyle = 'rgba(0,255,198,0.7)'
  ctx.lineWidth = 2
  ctx.beginPath()
  const lx = bx + 8
  const ly = pad + 410
  const lw = bw - 16
  for (let i = 0; i <= 24; i++) {
    const t = i / 24
    const px = lx + t * lw
    const py = ly + Math.sin(t * Math.PI * 3 + 0.5) * 22 + Math.cos(t * 8) * 6
    if (i === 0) ctx.moveTo(px, py)
    else ctx.lineTo(px, py)
  }
  ctx.stroke()

  ctx.fillStyle = 'rgba(59,130,246,0.25)'
  ctx.beginPath()
  ctx.moveTo(lx, ly + 40)
  for (let i = 0; i <= 24; i++) {
    const t = i / 24
    const px = lx + t * lw
    const py = ly + Math.sin(t * Math.PI * 3 + 0.5) * 22 + Math.cos(t * 8) * 6
    ctx.lineTo(px, py)
  }
  ctx.lineTo(lx + lw, ly + 40)
  ctx.lineTo(lx, ly + 40)
  ctx.fill()

  ctx.fillStyle = '#e8f0ff'
  ctx.font = '600 14px system-ui,sans-serif'
  ctx.fillText('Velocity curve (live)', bx + 8, ly - 12)

  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.needsUpdate = true
  tex.anisotropy = 8
  tex.minFilter = THREE.LinearFilter
  tex.magFilter = THREE.LinearFilter
  return tex
}

export function FloatingCard({ isMobile }: Props) {
  const group = useRef<THREE.Group>(null)

  const map = useMemo(() => buildDashboardTexture(), [])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    const g = group.current
    if (g) {
      g.position.y = Math.sin(t * 0.35) * 0.06
      g.rotation.x = Math.sin(t * 0.22) * 0.04
      g.rotation.y = Math.cos(t * 0.18) * 0.06
    }
  })

  const glassMat = isMobile ? (
    <meshPhysicalMaterial
      color="#eaf2ff"
      metalness={0.08}
      roughness={0.28}
      transmission={0.45}
      thickness={0.35}
      transparent
      opacity={0.9}
      envMapIntensity={0.45}
      clearcoat={0.35}
      clearcoatRoughness={0.25}
      ior={1.45}
    />
  ) : (
    <MeshTransmissionMaterial
      backside
      backsideThickness={0.28}
      samples={6}
      resolution={512}
      transmission={0.72}
      thickness={0.35}
      roughness={0.18}
      chromaticAberration={0.02}
      anisotropicBlur={0.05}
      distortion={0.08}
      distortionScale={0.15}
      temporalDistortion={0.015}
      color="#c5d8ff"
      metalness={0.04}
      ior={1.48}
    />
  )

  return (
    <group ref={group} position={[0.1, 0.35, 0]}>
      <mesh position={[0, 0, -0.16]} renderOrder={0}>
        <planeGeometry args={[2.35, 1.45]} />
        <meshBasicMaterial
          map={map}
          transparent
          opacity={0.55}
          toneMapped={false}
          depthWrite={false}
        />
      </mesh>

      <RoundedBox
        args={[2.45, 1.55, 0.12]}
        radius={0.08}
        smoothness={4}
        castShadow
        renderOrder={0}
      >
        {glassMat}
        <Edges color="#00ffc6" threshold={18} scale={1.005} renderOrder={2} />
      </RoundedBox>

      <mesh position={[0, 0, 0.068]} renderOrder={2}>
        <planeGeometry args={[2.28, 1.38]} />
        <meshBasicMaterial
          map={map}
          transparent
          opacity={1}
          toneMapped={false}
          depthTest
          depthWrite
        />
      </mesh>
    </group>
  )
}
