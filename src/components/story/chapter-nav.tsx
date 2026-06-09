'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const chapters = [
  { id: 'hero', label: 'Prologue' },
  { id: 'oasis', label: 'The Oasis' },
  { id: 'arrival', label: 'The Arrival' },
  { id: 'poison', label: 'The Poison' },
  { id: 'people', label: 'The People' },
  { id: 'silence', label: 'The Silence' },
  { id: 'uprising', label: 'The Uprising' },
  { id: 'fight', label: 'The Fight' },
]

export function ChapterNav() {
  const [activeChapter, setActiveChapter] = useState(0)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 3
      for (let i = chapters.length - 1; i >= 0; i--) {
        const el = document.getElementById(chapters[i].id)
        if (el && el.offsetTop <= scrollPos) {
          setActiveChapter(i)
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToChapter = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      setIsOpen(false)
    }
  }

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm border border-orange-500/30 flex items-center justify-center text-orange-400 hover:bg-black/80 transition-all"
        aria-label="Chapter navigation"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="absolute right-12 top-1/2 -translate-y-1/2 bg-black/90 backdrop-blur-md rounded-xl border border-orange-500/20 p-3 min-w-[160px]"
          >
            {chapters.map((ch, i) => (
              <button
                key={ch.id}
                onClick={() => scrollToChapter(ch.id)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex items-center gap-2 ${
                  i === activeChapter
                    ? 'text-orange-400 bg-orange-500/10'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${
                  i === activeChapter ? 'bg-orange-400' : i < activeChapter ? 'bg-gray-500' : 'bg-gray-700'
                }`} />
                <span className="text-xs font-medium">{ch.label}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dot indicators */}
      <div className="absolute right-12 top-1/2 -translate-y-1/2 flex flex-col gap-2">
        {chapters.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToChapter(chapters[i].id)}
            className={`w-1.5 rounded-full transition-all duration-500 ${
              i === activeChapter
                ? 'h-6 bg-orange-400'
                : i < activeChapter
                ? 'h-1.5 bg-gray-500'
                : 'h-1.5 bg-gray-700'
            }`}
            aria-label={`Go to ${chapters[i].label}`}
          />
        ))}
      </div>
    </div>
  )
}
