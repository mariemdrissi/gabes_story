'use client'

import { useRef, useEffect } from 'react'
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

  // Deep dark ocean with slight blue tint
  const oceanGrad = ctx.createLinearGradient(0, 0, 0, h)
  oceanGrad.addColorStop(0, '#060612')
  oceanGrad.addColorStop(0.5, '#080818')
  oceanGrad.addColorStop(1, '#060612')
  ctx.fillStyle = oceanGrad
  ctx.fillRect(0, 0, w, h)

  // Subtle ocean grid for depth
  ctx.strokeStyle = 'rgba(80, 60, 120, 0.05)'
  ctx.lineWidth = 0.5
  for (let x = 0; x < w; x += 64) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke()
  }
  for (let y = 0; y < h; y += 64) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke()
  }

  // Land colors
  const land = '#7a2a2a'
  const landMid = '#8a3535'
  const landLight = '#9a4545'
  const landGreen = '#2d5a2d'

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

  function drawCoastline(points: number[][]) {
    ctx.strokeStyle = 'rgba(239, 68, 68, 0.3)'
    ctx.lineWidth = 1.8
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
    ctx.stroke()
  }

  function drawRegion(points: number[][], fillColor: string) {
    drawLand(points, fillColor)
    drawCoastline(points)
  }

  // Africa
  drawRegion([[1060,280],[1085,255],[1110,265],[1130,255],[1150,275],[1165,310],[1175,360],[1185,410],[1180,460],[1170,510],[1155,555],[1130,585],[1110,600],[1090,590],[1070,560],[1050,510],[1035,460],[1025,410],[1020,360],[1030,320],[1040,295]], land)
  // North Africa
  drawRegion([[960,270],[980,260],[1020,265],[1060,280],[1100,275],[1140,270],[1170,280],[1200,290],[1170,300],[1130,295],[1090,290],[1050,295],[1010,290],[980,285],[960,280]], landLight)
  // Tunisia — BRIGHT
  const tunisiaPts = [[1080,268],[1095,258],[1110,262],[1115,272],[1105,280],[1090,282],[1078,278]]
  drawRegion(tunisiaPts, '#dd3838')

  // Tunisia glow
  const tCX = tunisiaPts.reduce((s, p) => s + p[0], 0) / tunisiaPts.length
  const tCY = tunisiaPts.reduce((s, p) => s + p[1], 0) / tunisiaPts.length
  const tGlow = ctx.createRadialGradient(tCX, tCY, 5, tCX, tCY, 40)
  tGlow.addColorStop(0, 'rgba(239, 68, 68, 0.5)')
  tGlow.addColorStop(1, 'rgba(239, 68, 68, 0)')
  ctx.fillStyle = tGlow
  ctx.fillRect(tCX - 50, tCY - 50, 100, 100)

  // Europe
  drawRegion([[1010,175],[1030,165],[1055,155],[1080,160],[1105,170],[1120,190],[1115,215],[1100,235],[1080,248],[1055,252],[1035,245],[1020,230],[1005,210],[1000,190]], landGreen)
  // Iberian Peninsula
  drawRegion([[960,205],[985,195],[1010,200],[1010,225],[1000,242],[980,250],[958,242],[950,220]], landMid)
  // Italy
  drawRegion([[1042,205],[1052,192],[1062,200],[1065,225],[1058,250],[1048,258],[1038,248],[1035,228]], landGreen)
  // UK
  drawRegion([[985,155],[1000,148],[1010,158],[1008,178],[998,185],[985,178]], landGreen)
  // Scandinavia
  drawRegion([[1020,110],[1040,100],[1065,108],[1075,130],[1070,155],[1055,165],[1035,160],[1020,140]], landGreen)
  // Middle East
  drawRegion([[1160,235],[1195,225],[1235,240],[1255,270],[1245,305],[1225,335],[1200,340],[1180,320],[1165,290],[1155,260]], landMid)
  // South America
  drawRegion([[590,375],[625,350],[660,360],[675,400],[685,450],[680,510],[665,570],[645,620],[625,650],[600,640],[585,590],[575,520],[570,455],[580,400]], landGreen)
  // North America
  drawRegion([[390,175],[430,155],[490,140],[555,155],[600,185],[625,230],[620,280],[600,320],[570,345],[540,350],[510,340],[480,320],[450,295],[420,265],[400,230],[390,200]], landGreen)
  // Central America
  drawRegion([[490,335],[510,325],[530,335],[535,355],[520,370],[500,375],[485,365],[480,345]], landMid)
  // Greenland
  drawRegion([[635,90],[675,72],[720,80],[730,115],[715,145],[675,148],[640,130]], landMid)
  // Asia
  drawRegion([[1140,135],[1200,115],[1280,100],[1370,105],[1460,120],[1530,150],[1570,185],[1580,225],[1560,265],[1520,290],[1470,300],[1420,295],[1370,275],[1330,255],[1290,240],[1250,228],[1210,218],[1175,198],[1148,175],[1138,155]], landMid)
  // India
  drawRegion([[1280,295],[1310,275],[1345,290],[1350,340],[1335,390],[1310,415],[1290,400],[1275,355],[1270,320]], landGreen)
  // SE Asia
  drawRegion([[1380,290],[1410,280],[1440,295],[1445,330],[1430,360],[1405,365],[1385,345],[1375,315]], landGreen)
  // China
  drawRegion([[1420,200],[1460,185],[1510,195],[1540,220],[1545,260],[1520,285],[1480,290],[1440,280],[1420,255],[1410,225]], landMid)
  // Japan
  drawRegion([[1560,200],[1570,190],[1580,200],[1578,230],[1568,245],[1558,235],[1555,215]], landGreen)
  // Australia
  drawRegion([[1535,465],[1575,445],[1630,455],[1665,485],[1668,525],[1650,558],[1610,570],[1565,555],[1540,520],[1530,490]], landMid)

  // Noise grain
  const imageData = ctx.getImageData(0, 0, w, h)
  const d = imageData.data
  for (let i = 0; i < d.length; i += 4) {
    const noise = (Math.random() - 0.5) * 4
    d[i] = Math.max(0, Math.min(255, d[i] + noise))
    d[i + 1] = Math.max(0, Math.min(255, d[i + 1] + noise))
    d[i + 2] = Math.max(0, Math.min(255, d[i + 2] + noise))
  }
  ctx.putImageData(imageData, 0, 0)

  // Gabès marker
  const gabesX = ((GABES_LNG + 180) / 360) * w
  const gabesY = ((90 - GABES_LAT) / 180) * h

  // Large glow
  const glow = ctx.createRadialGradient(gabesX, gabesY, 4, gabesX, gabesY, 70)
  glow.addColorStop(0, 'rgba(239, 68, 68, 0.9)')
  glow.addColorStop(0.15, 'rgba(239, 68, 68, 0.5)')
  glow.addColorStop(0.4, 'rgba(220, 38, 38, 0.2)')
  glow.addColorStop(1, 'rgba(220, 38, 38, 0)')
  ctx.fillStyle = glow
  ctx.beginPath()
  ctx.arc(gabesX, gabesY, 70, 0, Math.PI * 2)
  ctx.fill()

  // Red dot
  ctx.fillStyle = '#ef4444'
  ctx.beginPath()
  ctx.arc(gabesX, gabesY, 10, 0, Math.PI * 2)
  ctx.fill()

  // White center
  ctx.fillStyle = '#ffffff'
  ctx.beginPath()
  ctx.arc(gabesX, gabesY, 4, 0, Math.PI * 2)
  ctx.fill()

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

/* ──────────────────────────────────────────── */
/*  Emissive Texture (Gabes glow)               */
/* ──────────────────────────────────────────── */

function createEmissiveTexture(): THREE.CanvasTexture {
  const w = 2048, h = 1024
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')!

  ctx.fillStyle = '#000000'
  ctx.fillRect(0, 0, w, h)

  const gabesX = ((GABES_LNG + 180) / 360) * w
  const gabesY = ((90 - GABES_LAT) / 180) * h

  const glow = ctx.createRadialGradient(gabesX, gabesY, 4, gabesX, gabesY, 80)
  glow.addColorStop(0, 'rgba(239, 68, 68, 0.7)')
  glow.addColorStop(0.3, 'rgba(239, 68, 68, 0.2)')
  glow.addColorStop(1, 'rgba(239, 68, 68, 0)')
  ctx.fillStyle = glow
  ctx.beginPath()
  ctx.arc(gabesX, gabesY, 80, 0, Math.PI * 2)
  ctx.fill()

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

/* ──────────────────────────────────────────── */
/*  Main Globe Component (Vanilla Three.js)      */
/* ──────────────────────────────────────────── */

export default function GlobeScene({ isInView }: { isInView: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<{
    renderer: THREE.WebGLRenderer
    scene: THREE.Scene
    camera: THREE.PerspectiveCamera
    globe: THREE.Mesh
    atmosphere: THREE.Mesh
    animPhase: 'spin' | 'rotate' | 'zoom'
    animProgress: number
    zoomLevel: number
    startTime: number
    frameId: number
  } | null>(null)

  // Initialize Three.js scene
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const width = container.clientWidth
    const height = container.clientHeight

    if (width === 0 || height === 0) return

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)

    // Scene
    const scene = new THREE.Scene()

    // Camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100)
    camera.position.set(0, 0.5, 6)

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.4)
    scene.add(ambient)

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.0)
    dirLight.position.set(5, 3, 5)
    scene.add(dirLight)

    const fillLight = new THREE.DirectionalLight(0x4444ff, 0.15)
    fillLight.position.set(-3, -1, -3)
    scene.add(fillLight)

    const pointLight = new THREE.PointLight(0xff2222, 0.3, 10)
    pointLight.position.set(0, 2, 4)
    scene.add(pointLight)

    // Globe
    const earthTexture = createEarthTexture()
    const emissiveTexture = createEmissiveTexture()
    const globeGeo = new THREE.SphereGeometry(2, 64, 64)
    const globeMat = new THREE.MeshStandardMaterial({
      map: earthTexture,
      emissiveMap: emissiveTexture,
      emissive: new THREE.Color('#ff4444'),
      emissiveIntensity: 0.5,
      roughness: 0.75,
      metalness: 0.05,
    })
    const globe = new THREE.Mesh(globeGeo, globeMat)
    globe.rotation.set(0.15, -0.5, 0)
    scene.add(globe)

    // Atmosphere
    const atmoGeo = new THREE.SphereGeometry(2, 64, 64)
    const atmoMat = new THREE.MeshBasicMaterial({
      color: 0x3a0808,
      transparent: true,
      opacity: 0.15,
      side: THREE.BackSide,
    })
    const atmosphere = new THREE.Mesh(atmoGeo, atmoMat)
    atmosphere.scale.setScalar(2.1)
    scene.add(atmosphere)

    // Stars
    const starsGeo = new THREE.BufferGeometry()
    const starCount = 800
    const starPositions = new Float32Array(starCount * 3)
    for (let i = 0; i < starCount; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 12 + Math.random() * 8
      starPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      starPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      starPositions[i * 3 + 2] = r * Math.cos(phi)
    }
    starsGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3))
    const starsMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.05,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.5,
    })
    const stars = new THREE.Points(starsGeo, starsMat)
    scene.add(stars)

    // Store refs
    sceneRef.current = {
      renderer,
      scene,
      camera,
      globe,
      atmosphere,
      animPhase: 'spin',
      animProgress: 0,
      zoomLevel: 0,
      startTime: Date.now(),
      frameId: 0,
    }

    // Handle resize
    const handleResize = () => {
      const w = container.clientWidth
      const h = container.clientHeight
      if (w === 0 || h === 0) return
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      const s = sceneRef.current
      if (s) {
        cancelAnimationFrame(s.frameId)
        s.renderer.dispose()
        if (container.contains(s.renderer.domElement)) {
          container.removeChild(s.renderer.domElement)
        }
      }
      sceneRef.current = null
    }
  }, [])

  // Animation loop
  useEffect(() => {
    const s = sceneRef.current
    if (!s) return

    const targetRotY = -(GABES_LNG * Math.PI) / 180 + Math.PI * 0.5
    const targetRotX = (GABES_LAT * Math.PI) / 180 * 0.35
    const startRotY = -0.5
    const startRotX = 0.15

    let lastTime = performance.now()

    const animate = (time: number) => {
      const delta = Math.min((time - lastTime) / 1000, 0.1)
      lastTime = time

      const elapsed = (Date.now() - s.startTime) / 1000

      if (isInView) {
        // Phase transitions
        if (elapsed < 1.5) {
          s.animPhase = 'spin'
        } else if (elapsed < 5.5) {
          s.animPhase = 'rotate'
          s.animProgress = Math.min(1, (elapsed - 1.5) / 4.0)
        } else {
          s.animPhase = 'zoom'
          s.animProgress = 1
          s.zoomLevel = Math.min(1, (elapsed - 5.5) / 2.0)
        }
      }

      // Globe rotation
      if (s.animPhase === 'spin') {
        s.globe.rotation.y += delta * 0.15
      } else {
        const lerpSpeed = delta * 1.8
        const destY = startRotY + (targetRotY - startRotY) * s.animProgress
        const destX = startRotX + (targetRotX - startRotX) * s.animProgress
        s.globe.rotation.y += (destY - s.globe.rotation.y) * lerpSpeed
        s.globe.rotation.x += (destX - s.globe.rotation.x) * lerpSpeed
      }

      // Camera zoom
      const targetZ = 6 - s.zoomLevel * 2.5
      s.camera.position.z += (targetZ - s.camera.position.z) * delta * 0.8

      s.renderer.render(s.scene, s.camera)
      s.frameId = requestAnimationFrame(animate)
    }

    s.frameId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(s.frameId)
    }
  }, [isInView])

  // Calculate label visibility from animation phase
  const elapsed = sceneRef.current ? (Date.now() - sceneRef.current.startTime) / 1000 : 0
  const showLabel = isInView && elapsed > 6.7
  const labelOpacity = showLabel ? Math.min(1, (elapsed - 6.7) * 1.5) : 0

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', position: 'relative' }}>
      {/* Gabès label */}
      {labelOpacity > 0 && (
        <div style={{
          position: 'absolute',
          bottom: '26%',
          right: '16%',
          zIndex: 10,
          pointerEvents: 'none',
          opacity: labelOpacity,
          transition: 'opacity 0.3s ease',
        }}>
          <div style={{
            color: '#ef4444',
            fontSize: '12px',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            fontWeight: 700,
            textShadow: '0 0 14px rgba(239,68,68,0.6), 0 0 35px rgba(239,68,68,0.2)',
            whiteSpace: 'nowrap',
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
