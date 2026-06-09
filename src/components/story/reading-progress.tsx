'use client'

import { motion, useScroll } from 'framer-motion'

export function ReadingProgress() {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 z-50 origin-left"
      style={{
        scaleX: scrollYProgress,
        background: 'linear-gradient(90deg, #f97316, #ef4444, #dc2626)',
      }}
    />
  )
}
