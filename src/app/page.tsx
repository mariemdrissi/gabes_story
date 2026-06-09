'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Home() {
  return (
    <main className="bg-[#1a1a1a] text-white overflow-x-hidden min-h-screen">
      <HeroSection />
    </main>
  )
}

/* ──────────────────────────────────────────── */
/*  HERO SECTION — Reference Design Style       */
/* ──────────────────────────────────────────── */

function HeroSection() {
  const [loaded, setLoaded] = useState(false)
  const [hoveredPhoto, setHoveredPhoto] = useState<number | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 200)
    return () => clearTimeout(timer)
  }, [])

  const photos = [
    {
      src: '/images/factory-smoke.png',
      alt: 'Chemical factory smoke over Gabes',
      rotation: -6,
      tapeRotation: 2,
      x: '0%',
      y: '0%',
      z: 7,
    },
    {
      src: '/images/polluted-coast.png',
      alt: 'Polluted coastline of Gabes',
      rotation: 4,
      tapeRotation: -3,
      x: '28%',
      y: '-5%',
      z: 6,
    },
    {
      src: '/images/oasis-before.png',
      alt: 'The oasis of Gabes before pollution',
      rotation: -2,
      tapeRotation: 1,
      x: '52%',
      y: '2%',
      z: 5,
    },
    {
      src: '/images/hospital.png',
      alt: 'Hospital treating pollution victims',
      rotation: 7,
      tapeRotation: -1,
      x: '12%',
      y: '38%',
      z: 4,
    },
    {
      src: '/images/protests.png',
      alt: 'Community demanding change',
      rotation: -4,
      tapeRotation: 3,
      x: '42%',
      y: '35%',
      z: 3,
    },
  ]

  return (
    <section className="relative w-full h-screen overflow-hidden flex items-center">
      {/* Dark textured background */}
      <div className="absolute inset-0 bg-[#1a1a1a]">
        {/* Brick/wall texture pattern */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                0deg,
                transparent,
                transparent 48px,
                rgba(255,255,255,0.02) 48px,
                rgba(255,255,255,0.02) 50px
              ),
              repeating-linear-gradient(
                90deg,
                transparent,
                transparent 98px,
                rgba(255,255,255,0.02) 98px,
                rgba(255,255,255,0.02) 100px
              )
            `,
          }}
        />
        {/* Spotlight / light cone effect */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 60% 50% at 65% 50%, rgba(255,200,100,0.08) 0%, rgba(255,150,50,0.03) 30%, transparent 70%)',
          }}
        />
        {/* Secondary subtle warm glow */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 40% 60% at 62% 48%, rgba(255,100,0,0.04) 0%, transparent 60%)',
          }}
        />
      </div>

      {/* Top-left logo / label */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="absolute top-6 left-8 z-20"
      >
        <span className="text-[11px] tracking-[0.35em] uppercase text-white/40 font-medium">
          Tunisia &middot; North Africa
        </span>
      </motion.div>

      {/* Bottom-left label */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ duration: 1, delay: 1.8 }}
        className="absolute bottom-8 left-8 z-20"
      >
        <span className="text-[11px] tracking-[0.35em] uppercase text-white/30 font-medium">
          An Interactive Story
        </span>
      </motion.div>

      {/* Left side: Dramatic typography */}
      <div className="relative z-10 w-full md:w-[55%] pl-8 md:pl-16 lg:pl-24 pr-4">
        {/* "Story" label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <span className="inline-block text-white/60 text-sm md:text-base tracking-[0.3em] uppercase font-medium mb-3">
            Story
          </span>
        </motion.div>

        {/* "Gabes Is" */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 40 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black leading-[0.9] tracking-tight text-white"
        >
          Gabes Is
        </motion.h1>

        {/* "Suffocating" — the RED key word */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 40 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black leading-[0.9] tracking-tight text-red-600"
        >
          Suffocating
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="text-gray-400 text-sm md:text-base lg:text-lg mt-6 max-w-md leading-relaxed"
        >
          For 53 years, a city has been poisoned. No one came to help.
          This is the story the world forgot.
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: loaded ? 1 : 0 }}
          transition={{ duration: 1, delay: 2 }}
          className="mt-10 flex items-center gap-3"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1"
          >
            <div className="w-1 h-2 bg-red-500 rounded-full" />
          </motion.div>
          <span className="text-white/25 text-xs tracking-widest uppercase">Scroll</span>
        </motion.div>
      </div>

      {/* Right side: Photo board with overlapping photos */}
      <div className="hidden md:block absolute right-0 top-0 w-[55%] lg:w-[50%] h-full z-5">
        {/* Cork board background shape */}
        <div
          className="absolute rounded-sm"
          style={{
            top: '8%',
            right: '5%',
            width: '80%',
            height: '75%',
            background: 'linear-gradient(135deg, rgba(180,140,90,0.06) 0%, rgba(120,80,40,0.04) 100%)',
            border: '1px solid rgba(180,140,90,0.08)',
          }}
        />

        {/* Overlapping polaroid-style photos */}
        {photos.map((photo, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
            animate={{
              opacity: loaded ? 1 : 0,
              scale: loaded ? (hoveredPhoto === i ? 1.08 : 1) : 0.8,
              rotate: loaded ? photo.rotation : 0,
            }}
            transition={{
              duration: 0.6,
              delay: 1.2 + i * 0.15,
              scale: { duration: 0.3 },
            }}
            onMouseEnter={() => setHoveredPhoto(i)}
            onMouseLeave={() => setHoveredPhoto(null)}
            className="absolute cursor-pointer"
            style={{
              left: photo.x,
              top: photo.y,
              zIndex: photo.z,
              width: '42%',
            }}
          >
            {/* Polaroid frame */}
            <div className="bg-[#f5f0e8] p-1.5 pb-6 shadow-xl shadow-black/40"
              style={{ 
                transform: `rotate(${photo.rotation}deg)`,
              }}
            >
              <div className="relative overflow-hidden aspect-[4/3]">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover"
                  style={{
                    filter: hoveredPhoto === i ? 'sepia(20%) contrast(1.1)' : 'sepia(40%) contrast(0.9) brightness(0.85)',
                    transition: 'filter 0.3s ease',
                  }}
                />
              </div>
              {/* Polaroid caption area */}
              <div className="pt-1 px-1">
                <p className="text-[9px] text-[#8b7355] font-medium tracking-wide text-center truncate">
                  {photo.alt}
                </p>
              </div>
            </div>

            {/* Tape/pin effect on top */}
            <div
              className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-3 rounded-sm opacity-40"
              style={{
                background: 'linear-gradient(180deg, rgba(255,255,255,0.3), rgba(200,180,150,0.2))',
                transform: `translateX(-50%) rotate(${photo.tapeRotation}deg)`,
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Bottom-right question text */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: loaded ? 1 : 0, x: loaded ? 0 : 20 }}
        transition={{ duration: 0.8, delay: 2.2 }}
        className="absolute bottom-8 right-8 md:right-16 z-20 text-right"
      >
        <p className="text-white/50 text-lg md:text-xl italic font-light">
          who will save them?
        </p>
      </motion.div>
    </section>
  )
}
