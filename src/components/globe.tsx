'use client'

import { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Sphere, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

/* ──────────────────────────────────────────── */
/*  Earth texture — procedural dark globe       */
/* ──────────────────────────────────────────── */

function createEarthTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 2048
  canvas.height = 1024
  const ctx = canvas.getContext('2d')!

  // Ocean — pure black
  ctx.fillStyle = '#000000'
  ctx.fillRect(0, 0, 2048, 1024)

  // Land — dark grey (#2a2a2a) with rough continent shapes
  ctx.fillStyle = '#2a2a2a'

  // Simplified continent outlines using equirectangular-ish coordinates
  // Africa
  drawContinent(ctx, [
    [1060, 280], [1080, 260], [1100, 270], [1120, 260], [1140, 280],
    [1160, 320], [1170, 370], [1180, 420], [1170, 470], [1160, 520],
    [1140, 560], [1120, 590], [1100, 600], [1080, 580], [1060, 550],
    [1040, 500], [1030, 450], [1020, 400], [1030, 350], [1040, 310],
  ])

  // Europe
  drawContinent(ctx, [
    [1020, 180], [1040, 170], [1060, 160], [1080, 170], [1100, 180],
    [1110, 200], [1100, 220], [1080, 240], [1060, 250], [1040, 240],
    [1020, 230], [1010, 210], [1010, 190],
  ])

  // Iberian Peninsula
  drawContinent(ctx, [
    [970, 210], [990, 200], [1010, 210], [1000, 240], [980, 250], [960, 240], [960, 220],
  ])

  // Italy
  drawContinent(ctx, [
    [1040, 210], [1050, 200], [1060, 210], [1060, 240], [1050, 260], [1040, 250], [1035, 230],
  ])

  // Middle East
  drawContinent(ctx, [
    [1160, 240], [1200, 230], [1240, 250], [1260, 280], [1240, 310],
    [1220, 340], [1200, 340], [1180, 320], [1160, 290], [1150, 260],
  ])

  // South America
  drawContinent(ctx, [
    [600, 380], [630, 360], [660, 370], [670, 410], [680, 460],
    [670, 520], [650, 580], [630, 620], [610, 640], [590, 620],
    [580, 560], [570, 500], [580, 440], [590, 400],
  ])

  // North America
  drawContinent(ctx, [
    [400, 180], [440, 160], [500, 150], [560, 170], [600, 200],
    [620, 250], [610, 300], [580, 330], [550, 340], [520, 330],
    [490, 310], [460, 290], [430, 260], [410, 230], [400, 200],
  ])

  // Greenland
  drawContinent(ctx, [
    [640, 100], [680, 80], [720, 90], [730, 120], [710, 150], [670, 150], [640, 130],
  ])

  // Asia (large mass)
  drawContinent(ctx, [
    [1140, 140], [1200, 120], [1280, 110], [1360, 120], [1440, 140],
    [1500, 170], [1540, 200], [1560, 240], [1540, 280], [1500, 300],
    [1460, 310], [1420, 300], [1380, 280], [1340, 260], [1300, 240],
    [1260, 230], [1220, 220], [1180, 200], [1150, 180], [1140, 160],
  ])

  // India
  drawContinent(ctx, [
    [1280, 300], [1310, 280], [1340, 300], [1340, 350], [1320, 400],
    [1300, 410], [1280, 390], [1270, 350], [1270, 320],
  ])

  // Australia
  drawContinent(ctx, [
    [1540, 470], [1580, 450], [1630, 460], [1660, 490], [1660, 530],
    [1640, 560], [1600, 570], [1560, 550], [1540, 520], [1530, 490],
  ])

  // Add subtle noise/grain texture for realism
  const imageData = ctx.getImageData(0, 0, 2048, 1024)
  for (let i = 0; i < imageData.data.length; i += 4) {
    const noise = (Math.random() - 0.5) * 8
    imageData.data[i] = Math.max(0, Math.min(255, imageData.data[i] + noise))
    imageData.data[i + 1] = Math.max(0, Math.min(255, imageData.data[i + 1] + noise))
    imageData.data[i + 2] = Math.max(0, Math.min(255, imageData.data[i + 2] + noise))
  }
  ctx.putImageData(imageData, 0, 0)

  // Draw Tunisia/Gabes highlight — small red dot
  ctx.fillStyle = '#dc2626'
  ctx.beginPath()
  ctx.arc(1090, 295, 8, 0, Math.PI * 2)
  ctx.fill()

  // Red glow around Gabes
  const gradient = ctx.createRadialGradient(1090, 295, 8, 1090, 295, 40)
  gradient.addColorStop(0, 'rgba(220, 38, 38, 0.4)')
  gradient.addColorStop(1, 'rgba(220, 38, 38, 0)')
  ctx.fillStyle = gradient
  ctx.beginPath()
  ctx.arc(1090, 295, 40, 0, Math.PI * 2)
  ctx.fill()

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

function drawContinent(ctx: CanvasRenderingContext2D, points: number[][]) {
  ctx.beginPath()
  ctx.moveTo(points[0][0], points[0][1])
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1]
    const curr = points[i]
    const cpx = (prev[0] + curr[0]) / 2
    const cpy = (prev[1] + curr[1]) / 2
    ctx.quadraticCurveTo(prev[0], prev[1], cpx, cpy)
  }
  ctx.closePath()
  ctx.fill()
}

/* ──────────────────────────────────────────── */
/*  Globe mesh                                  */
/* ──────────────────────────────────────────── */

function Globe({ phase }: { phase: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const texture = useMemo(() => createEarthTexture(), [])

  // Gabès lat/lng → rotation to face camera
  // Latitude: 33.8863° N, Longitude: 10.1028° E
  const gabesRotation: [number, number, number] = [
    -(33.8863 * Math.PI) / 180, // tilt to face Tunisia toward camera
    (10.1028 * Math.PI) / 180 + Math.PI / 2, // rotate longitude
    0,
  ]

  // Starting rotation (full globe view, Africa roughly visible)
  const startRotation: [number, number, number] = [
    -0.2,
    0.5,
    0,
  ]

  useFrame((_, delta) => {
    if (!meshRef.current) return

    // Phase 0: Slow spin
    if (phase === 0) {
      meshRef.current.rotation.y += delta * 0.15
    }
    // Phase 1: Stop spinning, lerp to face Gabès
    else if (phase === 1) {
      meshRef.current.rotation.x += (gabesRotation[0] - meshRef.current.rotation.x) * delta * 0.8
      meshRef.current.rotation.y += (gabesRotation[1] - meshRef.current.rotation.y) * delta * 0.8
      meshRef.current.rotation.z += (gabesRotation[2] - meshRef.current.rotation.z) * delta * 0.8
    }
    // Phase 2: Hold position, very gentle drift
    else {
      meshRef.current.rotation.y += delta * 0.01
    }
  })

  return (
    <mesh ref={meshRef} rotation={startRotation}>
      <sphereGeometry args={[2, 64, 64]} />
      <meshStandardMaterial
        map={texture}
        roughness={0.9}
        metalness={0.1}
      />
    </mesh>
  )
}

/* ──────────────────────────────────────────── */
/*  Camera controller                           */
/* ──────────────────────────────────────────── */

function CameraRig({ phase }: { phase: number }) {
  const { camera } = useThree()
  const targetZ = phase >= 2 ? 4 : 6.5

  useFrame((_, delta) => {
    camera.position.z += (targetZ - camera.position.z) * delta * 0.5
  })

  return null
}

/* ──────────────────────────────────────────── */
/*  Atmosphere glow                             */
/* ──────────────────────────────────────────── */

function Atmosphere() {
  return (
    <mesh scale={[2.08, 2.08, 2.08]}>
      <sphereGeometry args={[2, 64, 64]} />
      <meshBasicMaterial
        color="#1a1a2e"
        transparent
        opacity={0.08}
        side={THREE.BackSide}
      />
    </mesh>
  )
}

/* ──────────────────────────────────────────── */
/*  Main component                              */
/* ──────────────────────────────────────────── */

export default function GlobeScene() {
  const [phase, setPhase] = useState(0) // 0=spinning, 1=rotating to Gabès, 2=zoomed in

  useEffect(() => {
    // Phase progression: spin → rotate to Gabès → zoom in
    const t1 = setTimeout(() => setPhase(1), 3000)  // After 3s, start rotating to Gabès
    const t2 = setTimeout(() => setPhase(2), 6000)  // After 6s, zoom in
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  return (
    <Canvas
      camera={{ position: [0, 0, 6.5], fov: 45 }}
      style={{ background: 'transparent' }}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 3, 5]} intensity={0.8} />
      <directionalLight position={[-3, -2, -4]} intensity={0.15} />

      <Globe phase={phase} />
      <Atmosphere />
      <CameraRig phase={phase} />
    </Canvas>
  )
}
