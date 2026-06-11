'use client'

import { useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence, useInView } from 'framer-motion'

// Dynamic import to avoid SSR issues with Three.js
const GlobeScene = dynamic(() => import('@/components/globe'), {
  ssr: false,
  loading: () => (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        width: 50,
        height: 50,
        border: '2px solid rgba(239,68,68,0.3)',
        borderTopColor: '#ef4444',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
      }} />
    </div>
  ),
})

export default function Home() {
  const [showLoader, setShowLoader] = useState(true)

  return (
    <main className="bg-[#050508] text-white overflow-x-hidden">
      <AnimatePresence mode="wait">
        {showLoader ? (
          <LoadingScreen key="loader" onComplete={() => setShowLoader(false)} />
        ) : (
          <motion.div key="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
            <HeroSection />
            <WhereIsGabes />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}

/* ──────────────────────────────────────────── */
/*  LOADING SCREEN                              */
/* ──────────────────────────────────────────── */

function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 800)
    const t2 = setTimeout(() => setPhase(2), 3200)
    const t3 = setTimeout(() => onComplete(), 4200)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0a0a]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="absolute inset-0"
        animate={phase >= 1 ? {
          background: [
            'radial-gradient(ellipse 40% 40% at 50% 45%, rgba(200,30,30,0.06) 0%, transparent 70%)',
            'radial-gradient(ellipse 45% 45% at 50% 45%, rgba(200,30,30,0.10) 0%, transparent 70%)',
            'radial-gradient(ellipse 40% 40% at 50% 45%, rgba(200,30,30,0.06) 0%, transparent 70%)',
          ],
        } : {}}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: phase === 2 ? 0 : 1, scale: phase === 2 ? 1.05 : 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="w-40 h-40 md:w-52 md:h-52 relative">
          <img src="/images/logo.jpg" alt="Stop Pollution" className="w-full h-full object-contain rounded-full" />
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: phase === 2 ? 0 : 1, y: phase === 0 ? 15 : 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-8 text-center"
      >
        <p className="text-white/50 text-xs tracking-[0.4em] uppercase font-medium">Stop Pollution</p>
        <p className="text-white/30 text-xs tracking-[0.3em] mt-1" dir="rtl">قف التلوث</p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === 2 ? 0 : 0.5 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-10 w-32 h-px bg-white/10 rounded-full overflow-hidden"
      >
        <motion.div
          className="h-full bg-red-600 rounded-full"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 2.8, delay: 0.3, ease: 'easeInOut' }}
        />
      </motion.div>
    </motion.div>
  )
}

/* ──────────────────────────────────────────── */
/*  HERO SECTION (CORKBOARD LANDING)            */
/* ──────────────────────────────────────────── */

function HeroSection() {
  const [loaded, setLoaded] = useState(false)
  const [hoveredPhoto, setHoveredPhoto] = useState<number | null>(null)
  const ref = useRef(null)

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 200)
    return () => clearTimeout(timer)
  }, [])

  const photos = [
    { src: '/images/factory-smoke.png', alt: 'The factory', rotation: -7, x: 2, y: 3, pinX: 18, pinY: 8, z: 7 },
    { src: '/images/polluted-coast.png', alt: 'The poisoned coast', rotation: 5, x: 35, y: 0, pinX: 52, pinY: 6, z: 6 },
    { src: '/images/oasis-before.png', alt: 'What was lost', rotation: -3, x: 62, y: 5, pinX: 78, pinY: 10, z: 5 },
    { src: '/images/hospital.png', alt: 'The suffering', rotation: 6, x: 10, y: 44, pinX: 26, pinY: 48, z: 4 },
    { src: '/images/protests.png', alt: 'The resistance', rotation: -5, x: 45, y: 40, pinX: 62, pinY: 45, z: 3 },
  ]

  const stringConnections = [[0,1],[1,2],[0,3],[1,4],[3,4]]

  const notes = [
    { text: '5M tons/yr', x: 30, y: 30, rotation: 3, color: 'rgba(255,235,150,0.9)', z: 8 },
    { text: 'Since 1972', x: 72, y: 32, rotation: -2, color: 'rgba(255,200,150,0.9)', z: 8 },
    { text: '120+ hospitalized', x: 38, y: 62, rotation: 2, color: 'rgba(255,180,180,0.9)', z: 8 },
  ]

  return (
    <section ref={ref} className="relative h-screen overflow-hidden flex items-center">
      {/* Background */}
      <div className="absolute inset-0 bg-[#1a1a1a]">
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 48px,rgba(255,255,255,0.02) 48px,rgba(255,255,255,0.02) 50px),repeating-linear-gradient(90deg,transparent,transparent 98px,rgba(255,255,255,0.02) 98px,rgba(255,255,255,0.02) 100px)' }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 55% 55% at 68% 48%, rgba(255,200,100,0.10) 0%, rgba(255,150,50,0.04) 35%, transparent 70%)' }} />
      </div>

      {/* Left side: Typography */}
      <div className="relative z-10 w-full md:w-[50%] pl-8 md:pl-16 lg:pl-24 pr-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 20 }} transition={{ duration: 0.8, delay: 0.5 }}>
          <span className="inline-block text-white/60 text-sm md:text-base tracking-[0.3em] uppercase font-medium mb-3">Story</span>
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 40 }} transition={{ duration: 0.8, delay: 0.8 }} className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black leading-[0.9] tracking-tight text-white">Gabes Is</motion.h1>
        <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 40 }} transition={{ duration: 0.8, delay: 1.0 }} className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black leading-[0.9] tracking-tight text-red-600">Suffocating</motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 20 }} transition={{ duration: 0.8, delay: 1.3 }} className="text-gray-400 text-sm md:text-base lg:text-lg mt-6 max-w-md leading-relaxed">For 53 years, a city has been poisoned. No one came to help. This is the story the world forgot.</motion.p>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: loaded ? 1 : 0 }} transition={{ duration: 1, delay: 2 }} className="mt-10 flex items-center gap-3">
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1"><div className="w-1 h-2 bg-red-500 rounded-full" /></motion.div>
          <span className="text-white/25 text-xs tracking-widest uppercase">Scroll</span>
        </motion.div>
      </div>

      {/* Right side: Corkboard */}
      <div className="hidden md:block absolute right-0 top-0 w-[58%] lg:w-[55%] h-full">
        <div className="absolute rounded-md overflow-hidden shadow-2xl shadow-black/60" style={{ top: '6%', right: '4%', width: '88%', height: '82%', border: '8px solid #3d2b1a', boxShadow: 'inset 0 0 30px rgba(0,0,0,0.3), 0 0 40px rgba(0,0,0,0.5)' }}>
          <img src="/images/cork-board.png" alt="" className="absolute inset-0 w-full h-full object-cover" style={{ filter: 'brightness(0.7) contrast(1.1) saturate(0.8)' }} />
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 20%, rgba(255,220,150,0.10) 0%, transparent 70%)' }} />
        </div>

        <motion.svg initial={{ opacity: 0 }} animate={{ opacity: loaded ? 1 : 0 }} transition={{ duration: 1, delay: 2.5 }} className="absolute pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ top: '6%', right: '4%', width: '88%', height: '82%', zIndex: 2 }}>
          {stringConnections.map(([from, to], i) => {
            const p1 = photos[from], p2 = photos[to]
            return <path key={i} d={`M ${p1.pinX} ${p1.pinY} Q ${(p1.pinX+p2.pinX)/2+(i%2===0?2:-2)} ${(p1.pinY+p2.pinY)/2+3} ${p2.pinX} ${p2.pinY}`} fill="none" stroke="#cc2222" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
          })}
        </motion.svg>

        {notes.map((note, i) => (
          <motion.div key={`note-${i}`} initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: loaded ? 1 : 0, scale: loaded ? 1 : 0.7 }} transition={{ duration: 0.5, delay: 2.0 + i * 0.1 }} className="absolute" style={{ left: `${note.x}%`, top: `${note.y}%`, zIndex: note.z, transform: `rotate(${note.rotation}deg)` }}>
            <div className="px-3 py-1.5" style={{ backgroundColor: note.color, boxShadow: '2px 2px 6px rgba(0,0,0,0.3)' }}><p className="text-[10px] font-bold text-gray-800 whitespace-nowrap">{note.text}</p></div>
            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full" style={{ background: 'radial-gradient(circle at 35% 35%, #666, #222)', boxShadow: '0 1px 2px rgba(0,0,0,0.5)' }} />
          </motion.div>
        ))}

        {photos.map((photo, i) => (
          <motion.div key={i} initial={{ opacity: 0, scale: 0.7, rotate: 0 }} animate={{ opacity: loaded ? 1 : 0, scale: loaded ? (hoveredPhoto === i ? 1.06 : 1) : 0.7, rotate: loaded ? photo.rotation : 0 }} transition={{ duration: 0.6, delay: 1.2 + i * 0.15, scale: { duration: 0.3 } }} onMouseEnter={() => setHoveredPhoto(i)} onMouseLeave={() => setHoveredPhoto(null)} className="absolute cursor-pointer" style={{ left: `${photo.x}%`, top: `${photo.y}%`, zIndex: photo.z, width: '32%' }}>
            <div className="bg-[#f5f0e8] p-1.5 pb-5" style={{ boxShadow: '3px 3px 10px rgba(0,0,0,0.5)' }}>
              <div className="relative overflow-hidden aspect-[4/3]">
                <img src={photo.src} alt={photo.alt} className="w-full h-full object-cover" style={{ filter: hoveredPhoto === i ? 'sepia(20%) contrast(1.05) brightness(0.9)' : 'sepia(35%) contrast(0.9) brightness(0.8)', transition: 'filter 0.3s ease' }} />
              </div>
              <p className="text-[8px] text-[#6b5a42] font-medium tracking-wide text-center mt-1 truncate">{photo.alt}</p>
            </div>
            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 z-10">
              <div className="w-4 h-4 rounded-full" style={{ background: 'radial-gradient(circle at 35% 35%, #e04040, #8b1a1a)', boxShadow: '0 2px 4px rgba(0,0,0,0.5)' }} />
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: loaded ? 1 : 0, x: 0 }} transition={{ duration: 0.8, delay: 2.2 }} className="absolute bottom-8 right-8 md:right-16 z-20 text-right">
        <p className="text-white/50 text-lg md:text-xl italic font-light">who will save them?</p>
      </motion.div>
    </section>
  )
}

/* ──────────────────────────────────────────── */
/*  WHERE IS GABÈS?                             */
/* ──────────────────────────────────────────── */

function WhereIsGabes() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="relative h-screen overflow-hidden bg-[#050508] flex items-center">
      {/* Starfield background */}
      <div className="absolute inset-0" style={{
        backgroundImage: 'radial-gradient(1px 1px at 8% 15%, rgba(255,255,255,0.15), transparent), radial-gradient(1px 1px at 22% 65%, rgba(255,255,255,0.12), transparent), radial-gradient(1px 1px at 45% 25%, rgba(255,255,255,0.18), transparent), radial-gradient(1px 1px at 60% 80%, rgba(255,255,255,0.10), transparent), radial-gradient(1px 1px at 78% 35%, rgba(255,255,255,0.14), transparent), radial-gradient(1.5px 1.5px at 15% 85%, rgba(255,255,255,0.08), transparent), radial-gradient(1px 1px at 88% 70%, rgba(255,255,255,0.12), transparent), radial-gradient(1px 1px at 35% 45%, rgba(255,255,255,0.10), transparent), radial-gradient(1px 1px at 55% 10%, rgba(255,255,255,0.16), transparent), radial-gradient(1px 1px at 70% 55%, rgba(255,255,255,0.08), transparent), radial-gradient(1px 1px at 92% 20%, rgba(255,255,255,0.10), transparent), radial-gradient(1px 1px at 5% 50%, rgba(255,255,255,0.12), transparent)'
      }} />

      {/* Left side: Text content */}
      <div className="relative z-10 w-full md:w-[42%] pl-8 md:pl-16 lg:pl-24 pr-4 md:pr-0">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="inline-block text-red-500 text-xs tracking-[0.35em] uppercase font-bold mb-4"
        >
          Locate the Crisis
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-5xl md:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tight text-white"
        >
          Where is<br /><span className="text-red-600">Gabès</span>?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-gray-400 text-sm md:text-base leading-relaxed mt-6 max-w-sm"
        >
          Gabès is a coastal city in southeastern Tunisia on the Gulf of Gabès — where the Sahara Desert meets the Mediterranean Sea.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="mt-6 flex items-center gap-2"
        >
          <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
          <span className="text-white/30 text-[10px] tracking-[0.2em] uppercase">33.8863° N, 10.1028° E</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="mt-8 w-12 h-px bg-white/10"
        />

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.6 }}
          className="text-gray-500 text-xs leading-relaxed mt-4 max-w-xs"
        >
          Once known for its rare coastal oasis, Gabès now sits at the epicenter of an environmental catastrophe that has gone unchecked for over five decades.
        </motion.p>
      </div>

      {/* Right side: 3D Globe */}
      <div className="absolute right-0 top-0 w-[55%] lg:w-[58%] h-full">
        <GlobeScene />
      </div>
    </section>
  )
}
