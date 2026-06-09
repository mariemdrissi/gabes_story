'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <main className="bg-[#1a1a1a] text-white overflow-x-hidden min-h-screen">
      <HeroSection />
    </main>
  )
}

/* ──────────────────────────────────────────── */
/*  HERO SECTION — Cork Board + Red Strings     */
/* ──────────────────────────────────────────── */

function HeroSection() {
  const [loaded, setLoaded] = useState(false)
  const [hoveredPhoto, setHoveredPhoto] = useState<number | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 200)
    return () => clearTimeout(timer)
  }, [])

  // Photo positions as percentages within the board area
  // pinX/pinY = where the pushpin goes (top-center of each polaroid)
  const photos = [
    {
      src: '/images/factory-smoke.png',
      alt: 'The factory',
      rotation: -7,
      x: 2,
      y: 3,
      pinX: 18,
      pinY: 8,
      z: 7,
    },
    {
      src: '/images/polluted-coast.png',
      alt: 'The poisoned coast',
      rotation: 5,
      x: 35,
      y: 0,
      pinX: 52,
      pinY: 6,
      z: 6,
    },
    {
      src: '/images/oasis-before.png',
      alt: 'What was lost',
      rotation: -3,
      x: 62,
      y: 5,
      pinX: 78,
      pinY: 10,
      z: 5,
    },
    {
      src: '/images/hospital.png',
      alt: 'The suffering',
      rotation: 6,
      x: 10,
      y: 44,
      pinX: 26,
      pinY: 48,
      z: 4,
    },
    {
      src: '/images/protests.png',
      alt: 'The resistance',
      rotation: -5,
      x: 45,
      y: 40,
      pinX: 62,
      pinY: 45,
      z: 3,
    },
  ]

  // Red string connections: [fromPhotoIndex, toPhotoIndex]
  const stringConnections = [
    [0, 1],
    [1, 2],
    [0, 3],
    [1, 4],
    [3, 4],
  ]

  // Note positions (small sticky notes / paper scraps)
  const notes = [
    {
      text: '5M tons/yr',
      x: 30,
      y: 30,
      rotation: 3,
      color: 'rgba(255,235,150,0.9)',
      z: 8,
    },
    {
      text: 'Since 1972',
      x: 72,
      y: 32,
      rotation: -2,
      color: 'rgba(255,200,150,0.9)',
      z: 8,
    },
    {
      text: '120+ hospitalized',
      x: 38,
      y: 62,
      rotation: 2,
      color: 'rgba(255,180,180,0.9)',
      z: 8,
    },
  ]

  return (
    <section className="relative w-full h-screen overflow-hidden flex items-center">
      {/* Dark wall background */}
      <div className="absolute inset-0 bg-[#1a1a1a]">
        {/* Subtle wall texture */}
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
        {/* Spotlight / light cone on the board */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 55% 55% at 68% 48%, rgba(255,200,100,0.10) 0%, rgba(255,150,50,0.04) 35%, transparent 70%)',
          }}
        />
      </div>

      {/* Top-left label */}
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
      <div className="relative z-10 w-full md:w-[50%] pl-8 md:pl-16 lg:pl-24 pr-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <span className="inline-block text-white/60 text-sm md:text-base tracking-[0.3em] uppercase font-medium mb-3">
            Story
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 40 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black leading-[0.9] tracking-tight text-white"
        >
          Gabes Is
        </motion.h1>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 40 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black leading-[0.9] tracking-tight text-red-600"
        >
          Suffocating
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="text-gray-400 text-sm md:text-base lg:text-lg mt-6 max-w-md leading-relaxed"
        >
          For 53 years, a city has been poisoned. No one came to help.
          This is the story the world forgot.
        </motion.p>

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

      {/* Right side: Cork board with photos, strings, and pushpins */}
      <div className="hidden md:block absolute right-0 top-0 w-[58%] lg:w-[55%] h-full">
        {/* Cork board */}
        <div
          className="absolute rounded-md overflow-hidden shadow-2xl shadow-black/60"
          style={{
            top: '6%',
            right: '4%',
            width: '88%',
            height: '82%',
            border: '8px solid #3d2b1a',
            boxShadow: 'inset 0 0 30px rgba(0,0,0,0.3), 0 0 40px rgba(0,0,0,0.5)',
          }}
        >
          {/* Cork texture image */}
          <img
            src="/images/cork-board.png"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: 'brightness(0.7) contrast(1.1) saturate(0.8)' }}
          />
          {/* Darkening overlay for mood */}
          <div className="absolute inset-0 bg-black/20" />
          {/* Warm overhead light gradient */}
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse 70% 50% at 50% 20%, rgba(255,220,150,0.10) 0%, transparent 70%)',
            }}
          />
        </div>

        {/* Red strings connecting photos (SVG) */}
        <motion.svg
          initial={{ opacity: 0 }}
          animate={{ opacity: loaded ? 1 : 0 }}
          transition={{ duration: 1, delay: 2.5 }}
          className="absolute pointer-events-none"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          style={{
            top: '6%',
            right: '4%',
            width: '88%',
            height: '82%',
            zIndex: 2,
          }}
        >
          {stringConnections.map(([from, to], i) => {
            const p1 = photos[from]
            const p2 = photos[to]
            // Slight curve for organic string feel
            const midX = (p1.pinX + p2.pinX) / 2 + (i % 2 === 0 ? 2 : -2)
            const midY = (p1.pinY + p2.pinY) / 2 + 3
            return (
              <path
                key={i}
                d={`M ${p1.pinX} ${p1.pinY} Q ${midX} ${midY} ${p2.pinX} ${p2.pinY}`}
                fill="none"
                stroke="#cc2222"
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity="0.7"
              />
            )
          })}
        </motion.svg>

        {/* Small sticky notes / paper scraps */}
        {notes.map((note, i) => (
          <motion.div
            key={`note-${i}`}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: loaded ? 1 : 0, scale: loaded ? 1 : 0.7 }}
            transition={{ duration: 0.5, delay: 2.0 + i * 0.1 }}
            className="absolute"
            style={{
              left: `${note.x}%`,
              top: `${note.y}%`,
              zIndex: note.z,
              transform: `rotate(${note.rotation}deg)`,
            }}
          >
            <div
              className="px-3 py-1.5 shadow-md shadow-black/30"
              style={{
                backgroundColor: note.color,
                boxShadow: '2px 2px 6px rgba(0,0,0,0.3)',
              }}
            >
              <p className="text-[10px] font-bold text-gray-800 whitespace-nowrap">{note.text}</p>
            </div>
            {/* Mini pushpin on note */}
            <div
              className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full"
              style={{
                background: 'radial-gradient(circle at 35% 35%, #666, #222)',
                boxShadow: '0 1px 2px rgba(0,0,0,0.5)',
              }}
            />
          </motion.div>
        ))}

        {/* Polaroid photos with pushpins */}
        {photos.map((photo, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.7, rotate: 0 }}
            animate={{
              opacity: loaded ? 1 : 0,
              scale: loaded ? (hoveredPhoto === i ? 1.06 : 1) : 0.7,
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
              left: `${photo.x}%`,
              top: `${photo.y}%`,
              zIndex: photo.z,
              width: '32%',
            }}
          >
            {/* Polaroid frame */}
            <div
              className="bg-[#f5f0e8] p-1.5 pb-5"
              style={{
                boxShadow: '3px 3px 10px rgba(0,0,0,0.5), -1px -1px 3px rgba(0,0,0,0.1)',
              }}
            >
              <div className="relative overflow-hidden aspect-[4/3]">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover"
                  style={{
                    filter: hoveredPhoto === i
                      ? 'sepia(20%) contrast(1.05) brightness(0.9)'
                      : 'sepia(35%) contrast(0.9) brightness(0.8)',
                    transition: 'filter 0.3s ease',
                  }}
                />
              </div>
              {/* Caption */}
              <p className="text-[8px] text-[#6b5a42] font-medium tracking-wide text-center mt-1 truncate">
                {photo.alt}
              </p>
            </div>

            {/* Pushpin */}
            <div
              className="absolute"
              style={{
                top: '-6px',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 10,
              }}
            >
              {/* Pin head */}
              <div
                className="w-4 h-4 rounded-full"
                style={{
                  background: 'radial-gradient(circle at 35% 35%, #e04040, #8b1a1a)',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.5), inset 0 -1px 2px rgba(0,0,0,0.3)',
                }}
              />
              {/* Pin point (metal part) */}
              <div
                className="mx-auto"
                style={{
                  width: '2px',
                  height: '6px',
                  background: 'linear-gradient(180deg, #999, #666)',
                  marginTop: '-1px',
                }}
              />
            </div>
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
