'use client'

import { useRef, useEffect, useState, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

/* ──────────────────────────────────────────── */
/*  Constants                                    */
/* ──────────────────────────────────────────── */

const GABES_LAT = 33.8863
const GABES_LNG = 10.1028

/* ──────────────────────────────────────────── */
/*  Procedural Earth Texture                     */
/* ──────────────────────────────────────────── */

function createEarthTexture(): THREE.CanvasTexture {
  const w = 2048, h = 1024
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')!

  // Deep black ocean
  ctx.fillStyle = '#030308'
  ctx.fillRect(0, 0, w, h)

  const land = '#2d1212'
  const landLight = '#3a1818'

  function drawLand(points: number[][], color?: string) {
    ctx.fillStyle = color || land
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

  // Africa
  drawLand([[1060,280],[1085,255],[1110,265],[1130,255],[1150,275],[1165,310],[1175,360],[1185,410],[1180,460],[1170,510],[1155,555],[1130,585],[1110,600],[1090,590],[1070,560],[1050,510],[1035,460],[1025,410],[1020,360],[1030,320],[1040,295]])
  // North Africa
  drawLand([[960,270],[980,260],[1020,265],[1060,280],[1100,275],[1140,270],[1170,280],[1200,290],[1170,300],[1130,295],[1090,290],[1050,295],[1010,290],[980,285],[960,280]], landLight)
  // Tunisia (brighter red to stand out)
  drawLand([[1080,268],[1095,258],[1110,262],[1115,272],[1105,280],[1090,282],[1078,278]], '#452020')
  // Europe
  drawLand([[1010,175],[1030,165],[1055,155],[1080,160],[1105,170],[1120,190],[1115,215],[1100,235],[1080,248],[1055,252],[1035,245],[1020,230],[1005,210],[1000,190]])
  // Iberian Peninsula
  drawLand([[960,205],[985,195],[1010,200],[1010,225],[1000,242],[980,250],[958,242],[950,220]])
  // Italy
  drawLand([[1042,205],[1052,192],[1062,200],[1065,225],[1058,250],[1048,258],[1038,248],[1035,228]])
  // UK
  drawLand([[985,155],[1000,148],[1010,158],[1008,178],[998,185],[985,178]])
  // Scandinavia
  drawLand([[1020,110],[1040,100],[1065,108],[1075,130],[1070,155],[1055,165],[1035,160],[1020,140]])
  // Middle East
  drawLand([[1160,235],[1195,225],[1235,240],[1255,270],[1245,305],[1225,335],[1200,340],[1180,320],[1165,290],[1155,260]])
  // South America
  drawLand([[590,375],[625,350],[660,360],[675,400],[685,450],[680,510],[665,570],[645,620],[625,650],[600,640],[585,590],[575,520],[570,455],[580,400]])
  // North America
  drawLand([[390,175],[430,155],[490,140],[555,155],[600,185],[625,230],[620,280],[600,320],[570,345],[540,350],[510,340],[480,320],[450,295],[420,265],[400,230],[390,200]])
  // Central America
  drawLand([[490,335],[510,325],[530,335],[535,355],[520,370],[500,375],[485,365],[480,345]])
  // Greenland
  drawLand([[635,90],[675,72],[720,80],[730,115],[715,145],[675,148],[640,130]])
  // Asia
  drawLand([[1140,135],[1200,115],[1280,100],[1370,105],[1460,120],[1530,150],[1570,185],[1580,225],[1560,265],[1520,290],[1470,300],[1420,295],[1370,275],[1330,255],[1290,240],[1250,228],[1210,218],[1175,198],[1148,175],[1138,155]])
  // India
  drawLand([[1280,295],[1310,275],[1345,290],[1350,340],[1335,390],[1310,415],[1290,400],[1275,355],[1270,320]])
  // SE Asia
  drawLand([[1380,290],[1410,280],[1440,295],[1445,330],[1430,360],[1405,365],[1385,345],[1375,315]])
  // China
  drawLand([[1420,200],[1460,185],[1510,195],[1540,220],[1545,260],[1520,285],[1480,290],[1440,280],[1420,255],[1410,225]])
  // Japan
  drawLand([[1560,200],[1570,190],[1580,200],[1578,230],[1568,245],[1558,235],[1555,215]])
  // Australia
  drawLand([[1535,465],[1575,445],[1630,455],[1665,485],[1668,525],[1650,558],[1610,570],[1565,555],[1540,520],[1530,490]])

  // Subtle noise grain
  const imageData = ctx.getImageData(0, 0, w, h)
  const d = imageData.data
  for (let i = 0; i < d.length; i += 4) {
    const noise = (Math.random() - 0.5) * 5
    d[i] = Math.max(0, Math.min(255, d[i] + noise))
    d[i + 1] = Math.max(0, Math.min(255, d[i + 1] + noise))
    d[i + 2] = Math.max(0, Math.min(255, d[i + 2] + noise))
  }
  ctx.putImageData(imageData, 0, 0)

  // Gabès marker (equirectangular projection)
  const gabesX = ((GABES_LNG + 180) / 360) * w
  const gabesY = ((90 - GABES_LAT) / 180) * h

  // Pulsing red glow around Gabès
  const glow = ctx.createRadialGradient(gabesX, gabesY, 4, gabesX, gabesY, 55)
  glow.addColorStop(0, 'rgba(239, 68, 68, 0.7)')
  glow.addColorStop(0.3, 'rgba(220, 38, 38, 0.3)')
  glow.addColorStop(1, 'rgba(220, 38, 38, 0)')
  ctx.fillStyle = glow
  ctx.beginPath()
  ctx.arc(gabesX, gabesY, 55, 0, Math.PI * 2)
  ctx.fill()

  // Red dot
  ctx.fillStyle = '#ef4444'
  ctx.beginPath()
  ctx.arc(gabesX, gabesY, 7, 0, Math.PI * 2)
  ctx.fill()

  // White center
  ctx.fillStyle = '#ffffff'
  ctx.beginPath()
  ctx.arc(gabesX, gabesY, 2.5, 0, Math.PI * 2)
  ctx.fill()

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

/* ──────────────────────────────────────────── */
/*  Globe Mesh                                   */
/* ──────────────────────────────────────────── */

function GlobeMesh({ phase, animProgress }: { phase: 'spin' | 'rotate' | 'zoom'; animProgress: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [texture, setTexture] = useState<THREE.CanvasTexture | null>(null)

  useEffect(() => {
    try {
      const t = createEarthTexture()
      setTexture(t)
    } catch (e) {
      console.error('Failed to create earth texture:', e)
    }
  }, [])

  // Target rotation to face Gabès toward the camera
  const targetRotY = -(GABES_LNG * Math.PI) / 180 + Math.PI * 0.5
  const targetRotX = (GABES_LAT * Math.PI) / 180 * 0.35
  const startRotY = -0.5
  const startRotX = 0.15

  useFrame((_, delta) => {
    const mesh = meshRef.current
    if (!mesh) return

    if (phase === 'spin') {
      // Slow idle spin
      mesh.rotation.y += delta * 0.15
    } else {
      // Smoothly rotate to face Gabès
      const lerpSpeed = delta * 1.8
      const destY = startRotY + (targetRotY - startRotY) * animProgress
      const destX = startRotX + (targetRotX - startRotX) * animProgress
      mesh.rotation.y += (destY - mesh.rotation.y) * lerpSpeed
      mesh.rotation.x += (destX - mesh.rotation.x) * lerpSpeed
    }
  })

  return (
    <mesh ref={meshRef} rotation={[startRotX, startRotY, 0]}>
      <sphereGeometry args={[2, 64, 64]} />
      <meshStandardMaterial
        map={texture}
        color={texture ? '#ffffff' : '#111111'}
        roughness={0.85}
        metalness={0.05}
      />
    </mesh>
  )
}

/* ──────────────────────────────────────────── */
/*  Atmosphere Glow                              */
/* ──────────────────────────────────────────── */

function Atmosphere() {
  return (
    <mesh scale={[2.08, 2.08, 2.08]}>
      <sphereGeometry args={[2, 64, 64]} />
      <meshBasicMaterial color="#1a0a30" transparent opacity={0.12} side={THREE.BackSide} />
    </mesh>
  )
}

/* ──────────────────────────────────────────── */
/*  Camera Controller                            */
/* ──────────────────────────────────────────── */

function CameraController({ zoomLevel }: { zoomLevel: number }) {
  const { camera } = useThree()

  useFrame((_, delta) => {
    // Zoom from distance 6 → 3.5 as zoomLevel goes 0 → 1
    const targetZ = 6 - zoomLevel * 2.5
    camera.position.z += (targetZ - camera.position.z) * delta * 0.8
  })

  return null
}

/* ──────────────────────────────────────────── */
/*  Starfield                                    */
/* ──────────────────────────────────────────── */

function Stars() {
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    const count = 500
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 12 + Math.random() * 8
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)
    }
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return geo
  }, [])

  return (
    <points geometry={geometry}>
      <pointsMaterial color="#ffffff" size={0.04} sizeAttenuation transparent opacity={0.4} />
    </points>
  )
}

/* ──────────────────────────────────────────── */
/*  Scene Content (inside Canvas)                */
/* ──────────────────────────────────────────── */

function SceneContent({ phase, animProgress, zoomLevel }: {
  phase: 'spin' | 'rotate' | 'zoom'
  animProgress: number
  zoomLevel: number
}) {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 3, 5]} intensity={0.85} />
      <directionalLight position={[-3, -1, -3]} intensity={0.1} color="#6666ff" />
      <GlobeMesh phase={phase} animProgress={animProgress} />
      <Atmosphere />
      <CameraController zoomLevel={zoomLevel} />
      <Stars />
    </>
  )
}

/* ──────────────────────────────────────────── */
/*  Main Export — scroll-triggered animation     */
/* ──────────────────────────────────────────── */

export default function GlobeScene({ isInView }: { isInView: boolean }) {
  const [phase, setPhase] = useState<'spin' | 'rotate' | 'zoom'>('spin')
  const [animProgress, setAnimProgress] = useState(0)
  const [zoomLevel, setZoomLevel] = useState(0)

  useEffect(() => {
    if (!isInView) return

    // Phase 1: Already spinning (starts on mount)
    // Phase 2: After 1.5s of being in view, rotate to Tunisia
    const t1 = setTimeout(() => {
      setPhase('rotate')
      let progress = 0
      const rotateInterval = setInterval(() => {
        progress += 0.015
        if (progress >= 1) {
          progress = 1
          clearInterval(rotateInterval)
        }
        setAnimProgress(progress)
      }, 40)
    }, 1500)

    // Phase 3: After rotation completes (~5.5s), zoom in
    const t2 = setTimeout(() => {
      setPhase('zoom')
      let zoom = 0
      const zoomInterval = setInterval(() => {
        zoom += 0.02
        if (zoom >= 1) {
          zoom = 1
          clearInterval(zoomInterval)
        }
        setZoomLevel(zoom)
      }, 40)
    }, 5500)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [isInView])

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Canvas
        camera={{ position: [0, 0.5, 6], fov: 40 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0)
        }}
      >
        <SceneContent phase={phase} animProgress={animProgress} zoomLevel={zoomLevel} />
      </Canvas>

      {/* Gabès label — fades in after zoom starts */}
      {zoomLevel > 0.4 && (
        <div style={{
          position: 'absolute',
          bottom: '26%',
          right: '16%',
          zIndex: 10,
          pointerEvents: 'none',
          opacity: Math.min(1, (zoomLevel - 0.4) * 1.7),
          transition: 'opacity 0.3s ease',
        }}>
          <div style={{
            color: '#ef4444',
            fontSize: '12px',
            letterSpacing: '0.18em',
            textTransform: 'uppercase' as const,
            fontWeight: 700,
            textShadow: '0 0 14px rgba(239,68,68,0.6), 0 0 35px rgba(239,68,68,0.2)',
            whiteSpace: 'nowrap' as const,
          }}>
            Gabes, Tunisia
          </div>
          <div style={{
            color: 'rgba(255,255,255,0.3)',
            fontSize: '9px',
            letterSpacing: '0.1em',
            marginTop: '3px',
          }}>
            33.8863° N, 10.1028° E
          </div>
        </div>
      )}
    </div>
  )
}
