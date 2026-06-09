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
          <ScrollStory key="story" />
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
/*  MAIN SCROLL STORY                           */
/* ──────────────────────────────────────────── */

function ScrollStory() {
  const containerRef = useRef(null)

  return (
    <div ref={containerRef}>
      {/* Section 1: Hero (corkboard) */}
      <HeroSection />

      {/* Section 2: Hero fades → Globe appears */}
      <HeroToGlobeTransition />

      {/* Section 3: Globe zooms to Africa + Location card */}
      <GlobeZoomAfrica />

      {/* Section 4: Second dive to Gulf of Gabes */}
      <GulfDive />

      {/* Section 5: Polaroid flies in + Oasis showcase */}
      <OasisShowcase />

      {/* Section 6: Corrosion + Toxic overlay + Data counter */}
      <ToxicReveal />
    </div>
  )
}

/* ──────────────────────────────────────────── */
/*  SECTION 1: HERO (CORKBOARD)                 */
/* ──────────────────────────────────────────── */

function HeroSection() {
  const [loaded, setLoaded] = useState(false)
  const [hoveredPhoto, setHoveredPhoto] = useState<number | null>(null)
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const heroY = useTransform(scrollYProgress, [0, 0.6], [0, -80])
  const boardX = useTransform(scrollYProgress, [0, 0.6], [0, 100])
  const boardScale = useTransform(scrollYProgress, [0, 0.6], [1, 0.9])

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

      {/* Everything fades on scroll */}
      <motion.div style={{ opacity: heroOpacity, y: heroY }} className="relative z-10 w-full md:w-[50%] pl-8 md:pl-16 lg:pl-24 pr-4">
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
      </motion.div>

      {/* Corkboard slides away on scroll */}
      <motion.div style={{ opacity: heroOpacity, x: boardX, scale: boardScale }} className="hidden md:block absolute right-0 top-0 w-[58%] lg:w-[55%] h-full">
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
      </motion.div>

      <motion.div style={{ opacity: heroOpacity }} initial={{ opacity: 0, x: 20 }} animate={{ opacity: loaded ? 1 : 0, x: 0 }} transition={{ duration: 0.8, delay: 2.2 }} className="absolute bottom-8 right-8 md:right-16 z-20 text-right">
        <p className="text-white/50 text-lg md:text-xl italic font-light">who will save them?</p>
      </motion.div>
    </section>
  )
}

/* ──────────────────────────────────────────── */
/*  SECTION 2: HERO → GLOBE TRANSITION          */
/* ──────────────────────────────────────────── */

function HeroToGlobeTransition() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })

  const globeOpacity = useTransform(scrollYProgress, [0.1, 0.4], [0, 1])
  const globeScale = useTransform(scrollYProgress, [0.1, 0.5], [0.6, 1])
  const bgFade = useTransform(scrollYProgress, [0, 0.3], [0, 1])

  return (
    <section ref={ref} className="relative h-[150vh]">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Background: transitions from dark wall to deep space */}
        <motion.div className="absolute inset-0" style={{ opacity: bgFade, background: 'radial-gradient(ellipse at center, #050520 0%, #020210 40%, #000005 100%)' }} />

        {/* Stars */}
        <motion.div className="absolute inset-0" style={{ opacity: useTransform(scrollYProgress, [0.2, 0.5], [0, 1]) }}>
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(1px 1px at 10% 20%, rgba(255,255,255,0.4), transparent), radial-gradient(1px 1px at 30% 70%, rgba(255,255,255,0.3), transparent), radial-gradient(1px 1px at 50% 40%, rgba(255,255,255,0.5), transparent), radial-gradient(1px 1px at 70% 80%, rgba(255,255,255,0.3), transparent), radial-gradient(1px 1px at 90% 30%, rgba(255,255,255,0.4), transparent), radial-gradient(2px 2px at 15% 60%, rgba(255,255,255,0.2), transparent), radial-gradient(2px 2px at 85% 15%, rgba(255,255,255,0.2), transparent), radial-gradient(1px 1px at 40% 90%, rgba(255,255,255,0.3), transparent), radial-gradient(1px 1px at 60% 10%, rgba(255,255,255,0.4), transparent), radial-gradient(1px 1px at 80% 55%, rgba(255,255,255,0.3), transparent)' }} />
        </motion.div>

        {/* Globe from space */}
        <motion.div style={{ opacity: globeOpacity, scale: globeScale }} className="relative z-10">
          <div className="relative w-[60vw] max-w-[700px] aspect-square">
            <img src="/images/globe-space.png" alt="Earth from space" className="w-full h-full object-contain" />
            {/* Atmosphere glow */}
            <div className="absolute inset-0 rounded-full" style={{ boxShadow: '0 0 80px rgba(100,150,255,0.15), 0 0 120px rgba(80,120,255,0.08)' }} />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ──────────────────────────────────────────── */
/*  SECTION 3: GLOBE ZOOM TO AFRICA             */
/* ──────────────────────────────────────────── */

function GlobeZoomAfrica() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })

  const spaceOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const africaOpacity = useTransform(scrollYProgress, [0.2, 0.5], [0, 1])
  const africaScale = useTransform(scrollYProgress, [0.2, 0.6], [1.2, 1])
  const cardX = useTransform(scrollYProgress, [0.4, 0.6], [-100, 0])
  const cardOpacity = useTransform(scrollYProgress, [0.4, 0.55], [0, 1])

  return (
    <section ref={ref} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        {/* Deep space background */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, #050520 0%, #020210 40%, #000005 100%)' }} />
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(1px 1px at 10% 20%, rgba(255,255,255,0.3), transparent), radial-gradient(1px 1px at 30% 70%, rgba(255,255,255,0.2), transparent), radial-gradient(1px 1px at 50% 40%, rgba(255,255,255,0.4), transparent), radial-gradient(1px 1px at 70% 80%, rgba(255,255,255,0.2), transparent), radial-gradient(1px 1px at 90% 30%, rgba(255,255,255,0.3), transparent)' }} />

        {/* Globe (fading out as we zoom) */}
        <motion.div style={{ opacity: spaceOpacity }} className="absolute inset-0 flex items-center justify-center">
          <div className="w-[60vw] max-w-[700px] aspect-square">
            <img src="/images/globe-space.png" alt="Earth" className="w-full h-full object-contain" />
          </div>
        </motion.div>

        {/* Africa zoom (fading in) */}
        <motion.div style={{ opacity: africaOpacity, scale: africaScale }} className="absolute inset-0 flex items-center justify-center">
          <div className="w-[85vw] max-w-[1000px]">
            <img src="/images/globe-africa.png" alt="North Africa" className="w-full h-auto object-contain rounded-lg" />
            {/* Tunisia highlight pulse */}
            <motion.div
              className="absolute"
              style={{ top: '38%', left: '48%', width: '8%', height: '12%' }}
              animate={{
                boxShadow: ['0 0 20px rgba(255,50,50,0.3), 0 0 40px rgba(255,50,50,0.1)', '0 0 30px rgba(255,50,50,0.5), 0 0 60px rgba(255,50,50,0.2)', '0 0 20px rgba(255,50,50,0.3), 0 0 40px rgba(255,50,50,0.1)'],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>

        {/* Location text card */}
        <motion.div style={{ opacity: cardOpacity, x: cardX }} className="absolute left-6 md:left-16 lg:left-24 top-1/2 -translate-y-1/2 z-20 max-w-sm">
          <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8">
            <span className="text-red-500 text-xs tracking-[0.3em] uppercase font-bold">Location Identified</span>
            <h2 className="text-3xl md:text-4xl font-black text-white mt-3 leading-tight">Tunisia</h2>
            <p className="text-gray-400 text-sm md:text-base mt-3 leading-relaxed">
              A country on the Mediterranean coast of North Africa. Known for its ancient ruins, vast Sahara, and once-pristine coastline. But there is a place here where the sea turns toxic.
            </p>
            <div className="mt-4 flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-red-400 text-xs tracking-wider">34.4313&deg; N, 10.1839&deg; E</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ──────────────────────────────────────────── */
/*  SECTION 4: SECOND DIVE TO GULF OF GABES     */
/* ──────────────────────────────────────────── */

function GulfDive() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })

  const africaOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0])
  const gulfOpacity = useTransform(scrollYProgress, [0.2, 0.45], [0, 1])
  const gulfScale = useTransform(scrollYProgress, [0.2, 0.5], [1.3, 1])
  const labelOpacity = useTransform(scrollYProgress, [0.45, 0.6], [0, 1])
  const labelY = useTransform(scrollYProgress, [0.45, 0.6], [30, 0])

  return (
    <section ref={ref} className="relative h-[180vh]">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, #050520 0%, #020210 40%, #000005 100%)' }} />

        {/* Africa view fading out */}
        <motion.div style={{ opacity: africaOpacity }} className="absolute inset-0 flex items-center justify-center">
          <div className="w-[85vw] max-w-[1000px]">
            <img src="/images/globe-africa.png" alt="North Africa" className="w-full h-auto object-contain rounded-lg" />
          </div>
        </motion.div>

        {/* Gulf of Gabes close-up */}
        <motion.div style={{ opacity: gulfOpacity, scale: gulfScale }} className="absolute inset-0 flex items-center justify-center">
          <div className="w-[95vw] max-w-[1200px]">
            <img src="/images/globe-gabes.png" alt="Gulf of Gabes" className="w-full h-auto object-contain rounded-lg" />

            {/* Red highlight on Gulf of Gabes */}
            <motion.div
              className="absolute"
              style={{ top: '35%', left: '35%', width: '30%', height: '35%', borderRadius: '50%' }}
              animate={{
                boxShadow: ['0 0 40px rgba(255,30,30,0.3), inset 0 0 30px rgba(255,30,30,0.1)', '0 0 60px rgba(255,30,30,0.5), inset 0 0 40px rgba(255,30,30,0.15)', '0 0 40px rgba(255,30,30,0.3), inset 0 0 30px rgba(255,30,30,0.1)'],
              }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>

        {/* Gulf of Gabes label */}
        <motion.div style={{ opacity: labelOpacity, y: labelY }} className="absolute bottom-16 md:bottom-24 left-1/2 -translate-x-1/2 z-20 text-center">
          <span className="text-red-500 text-xs tracking-[0.3em] uppercase font-bold">Target Locked</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mt-2">Gulf of Gabes</h2>
          <p className="text-gray-400 text-sm md:text-base mt-3 max-w-lg mx-auto leading-relaxed">
            The distinctive crescent curve of the Tunisian coastline. An ancient maritime oasis where the desert meets the sea. This is where the crime is happening.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

/* ──────────────────────────────────────────── */
/*  SECTION 5: POLAROID FLY-IN + OASIS          */
/* ──────────────────────────────────────────── */

function OasisShowcase() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })

  const mapOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])
  const polaroidY = useTransform(scrollYProgress, [0.1, 0.35], [200, 0])
  const polaroidScale = useTransform(scrollYProgress, [0.1, 0.35], [0.3, 1])
  const polaroidOpacity = useTransform(scrollYProgress, [0.1, 0.25], [0, 1])
  const textX = useTransform(scrollYProgress, [0.3, 0.5], [-80, 0])
  const textOpacity = useTransform(scrollYProgress, [0.3, 0.45], [0, 1])

  return (
    <section ref={ref} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Dark background */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #0a1a0a 0%, #050508 50%, #0a0a15 100%)' }} />

        {/* Map fading out (frozen) */}
        <motion.div style={{ opacity: mapOpacity }} className="absolute inset-0 flex items-center justify-center">
          <div className="w-[95vw] max-w-[1200px]">
            <img src="/images/globe-gabes.png" alt="Gulf of Gabes" className="w-full h-auto object-contain rounded-lg" style={{ filter: 'brightness(0.5) grayscale(0.3)' }} />
          </div>
        </motion.div>

        {/* Polaroid flying in and expanding */}
        <motion.div style={{ opacity: polaroidOpacity, y: polaroidY, scale: polaroidScale }} className="absolute inset-0 flex items-center justify-center z-10">
          <div className="w-[70vw] max-w-[800px]">
            {/* Polaroid frame */}
            <div className="bg-[#f5f0e8] p-3 md:p-5 pb-12 md:pb-16 shadow-2xl shadow-black/60" style={{ transform: 'rotate(-1deg)' }}>
              <div className="relative overflow-hidden aspect-[4/3]">
                <img src="/images/oasis-before.png" alt="The oasis of Gabes" className="w-full h-full object-cover" style={{ filter: 'sepia(15%) brightness(1.05)' }} />
                {/* Beautiful green glow overlay */}
                <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 60%, rgba(100,200,80,0.08) 0%, transparent 60%)' }} />
              </div>
              <p className="text-[#6b5a42] text-sm md:text-base font-medium tracking-wide text-center mt-2 italic">&ldquo;Where the desert meets the sea&rdquo;</p>
            </div>
            {/* Pushpin on polaroid */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-10">
              <div className="w-5 h-5 rounded-full" style={{ background: 'radial-gradient(circle at 35% 35%, #e04040, #8b1a1a)', boxShadow: '0 2px 6px rgba(0,0,0,0.6)' }} />
            </div>
          </div>
        </motion.div>

        {/* Emotional text on the left */}
        <motion.div style={{ opacity: textOpacity, x: textX }} className="absolute left-6 md:left-16 lg:left-24 top-1/2 -translate-y-1/2 z-20 max-w-md">
          <span className="text-emerald-400 text-xs tracking-[0.3em] uppercase font-bold">What Was Lost</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mt-3 leading-tight">
            A Paradise <br /><span className="text-emerald-400">Poisoned</span>
          </h2>
          <p className="text-gray-300 text-sm md:text-base mt-4 leading-relaxed">
            Gabes was one of the rare coastal oases on Earth — a place where ancient palm groves met the Mediterranean in an impossible embrace of green and blue. For centuries, its freshwater springs nourished date palms, pomegranates, and fig orchards. Fishermen pulled abundant catches from pristine turquoise waters.
          </p>
          <p className="text-gray-400 text-sm md:text-base mt-3 leading-relaxed italic">
            This was paradise. This is what they are killing.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

/* ──────────────────────────────────────────── */
/*  SECTION 6: CORROSION + TOXIC OVERLAY         */
/* ──────────────────────────────────────────── */

function ToxicReveal() {
  const ref = useRef(null)
  const [count, setCount] = useState(0)
  const isInView = useInView(ref, { once: true, margin: '-200px' })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })

  // Corrosion mask: starts full (image visible), corrodes away
  const maskSize = useTransform(scrollYProgress, [0.15, 0.45], [100, 0])
  const toxicOpacity = useTransform(scrollYProgress, [0.25, 0.5], [0, 1])
  const counterOpacity = useTransform(scrollYProgress, [0.35, 0.5], [0, 1])
  const textOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1])
  const textX = useTransform(scrollYProgress, [0.3, 0.5], [80, 0])

  // Counter animation
  useEffect(() => {
    if (!isInView) return
    let start = 0
    const end = 5000000
    const duration = 3000
    const startTime = Date.now()
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // ease out cubic
      setCount(Math.floor(eased * end))
      if (progress >= 1) clearInterval(timer)
    }, 16)
    return () => clearInterval(timer)
  }, [isInView])

  return (
    <section ref={ref} className="relative h-[250vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Dark toxic background */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #1a0a00 0%, #050508 40%, #0a0505 100%)' }} />

        {/* Oasis image corroding away using clip-path */}
        <motion.div className="absolute inset-0 flex items-center justify-center" style={{ clipPath: useTransform(maskSize, v => `inset(${100 - v}% ${100 - v}% ${100 - v}% ${100 - v}% round 8px)`) }}>
          <div className="w-[70vw] max-w-[800px]">
            <div className="bg-[#f5f0e8] p-3 md:p-5 pb-12 md:pb-16 shadow-2xl shadow-black/60" style={{ transform: 'rotate(-1deg)' }}>
              <div className="relative overflow-hidden aspect-[4/3]">
                <img src="/images/oasis-before.png" alt="The oasis" className="w-full h-full object-cover" style={{ filter: 'sepia(15%) brightness(1.05)' }} />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Toxic GIS overlay revealed underneath */}
        <motion.div style={{ opacity: toxicOpacity }} className="absolute inset-0 flex items-center justify-center">
          <div className="w-[95vw] max-w-[1200px] relative">
            <img src="/images/globe-gabes.png" alt="Gulf of Gabes" className="w-full h-auto object-contain rounded-lg" style={{ filter: 'brightness(0.6) hue-rotate(10deg)' }} />

            {/* Toxic polygon glow over coastline */}
            <div className="absolute" style={{ top: '30%', left: '30%', width: '35%', height: '40%' }}>
              <motion.div
                className="w-full h-full"
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(255,100,0,0.25) 0%, rgba(200,50,0,0.15) 30%, rgba(150,0,0,0.08) 50%, transparent 70%)',
                  borderRadius: '40% 60% 50% 50%',
                }}
                animate={{
                  opacity: [0.7, 1, 0.7],
                  scale: [1, 1.02, 1],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>

            {/* Red lines bleeding into water */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
              {/* Toxic discharge lines */}
              {[30, 38, 46, 54, 62].map((x, i) => (
                <motion.line
                  key={i}
                  x1={x + 5}
                  y1={42 + i * 2}
                  x2={x + 5}
                  y2={55 + i * 3}
                  stroke="#ff2222"
                  strokeWidth="0.3"
                  opacity="0.6"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: i * 0.3, ease: 'easeOut' }}
                />
              ))}
              {/* Spreading contamination circles */}
              {[42, 48, 55].map((y, i) => (
                <motion.circle
                  key={`c${i}`}
                  cx={52 + i * 3}
                  cy={y}
                  r={3 + i * 2}
                  fill="none"
                  stroke="rgba(255,50,50,0.2)"
                  strokeWidth="0.2"
                  animate={{
                    r: [3 + i * 2, 6 + i * 2, 3 + i * 2],
                    opacity: [0.3, 0.1, 0.3],
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
                />
              ))}
            </svg>

            {/* "GCT Complex" label */}
            <motion.div
              className="absolute"
              style={{ top: '38%', left: '42%' }}
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <span className="text-red-400 text-xs md:text-sm font-bold tracking-wider">GCT CHEMICAL COMPLEX</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Data counter */}
        <motion.div style={{ opacity: counterOpacity }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 text-center pointer-events-none">
          <div className="text-red-500 text-xs tracking-[0.3em] uppercase font-bold mb-2">Annual Phosphogypsum Discharge</div>
          <div className="text-5xl md:text-7xl lg:text-8xl font-black text-white tabular-nums">
            {count.toLocaleString()}
          </div>
          <div className="text-red-400 text-xl md:text-2xl font-bold mt-1">tons / year</div>
        </motion.div>

        {/* Factual text on the right */}
        <motion.div style={{ opacity: textOpacity, x: textX }} className="absolute right-6 md:right-16 lg:right-24 top-1/2 -translate-y-1/2 z-20 max-w-md">
          <span className="text-red-500 text-xs tracking-[0.3em] uppercase font-bold">The Poison</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mt-3 leading-tight">
            This Paradise <br /><span className="text-red-500">Is Being Killed</span>
          </h2>
          <p className="text-gray-300 text-sm md:text-base mt-4 leading-relaxed">
            Every single year, the GCT chemical complex dumps 5 million tons of untreated phosphogypsum waste directly into the Mediterranean. The water burns your skin. The fish are gone. The cancer rates are among the highest in Tunisia.
          </p>
          <p className="text-gray-400 text-sm md:text-base mt-3 leading-relaxed">
            And no one has been held accountable. Not once. Not in 53 years.
          </p>
          <div className="mt-5 flex items-center gap-3">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-red-400 text-xs tracking-wider">ACTIVE THREAT — ONGOING SINCE 1972</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
