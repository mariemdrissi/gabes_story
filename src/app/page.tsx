'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion'

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
    <section ref={ref} className="relative h-screen overflow-hidden">
      {/* Full-screen dark silhouette map */}
      <div className="absolute inset-0">
        <img
          src="/images/map-silhouette.png"
          alt="Mediterranean region"
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.55) contrast(1.2) saturate(0.3)' }}
        />
        {/* Vignette overlay for depth */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, transparent 30%, rgba(5,5,8,0.7) 100%)' }} />
      </div>

      {/* Red pin on Tunisia/Gabès */}
      <motion.div
        initial={{ opacity: 0, scale: 0, y: -30 }}
        animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.5, type: 'spring', stiffness: 180, damping: 12 }}
        className="absolute z-20"
        style={{ top: '36%', left: '47%' }}
      >
        <div className="relative flex flex-col items-center">
          {/* Pin head */}
          <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-red-600 border-2 border-white shadow-lg shadow-red-600/50 flex items-center justify-center">
            <div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-white" />
          </div>
          {/* Pin stem */}
          <div className="w-[2px] h-5 bg-white/80 -mt-px" />
          {/* Pulse ring */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 rounded-full border-2 border-red-500/30"
            animate={{ scale: [1, 2], opacity: [0.5, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut' }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 rounded-full border border-red-500/20"
            animate={{ scale: [1, 2.5], opacity: [0.3, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut', delay: 0.8 }}
          />
        </div>
      </motion.div>

      {/* Small text at the bottom */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 1.0 }}
        className="absolute bottom-10 md:bottom-16 left-0 right-0 z-20 text-center px-6"
      >
        <p className="text-white/50 text-xs md:text-sm lg:text-base leading-relaxed max-w-xl mx-auto">
          Gabès is a coastal city in southeastern Tunisia on the Gulf of Gabès — where the Sahara Desert meets the Mediterranean Sea.
        </p>
      </motion.div>
    </section>
  )
}
