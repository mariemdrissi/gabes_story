'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
}

export function ScrollReveal({ children, className = '', delay = 0, direction = 'up' }: ScrollRevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const directionMap = {
    up: { y: 60, x: 0 },
    down: { y: -60, x: 0 },
    left: { x: 60, y: 0 },
    right: { x: -60, y: 0 },
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...directionMap[direction] }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function ParallaxImage({ src, alt, speed = 0.3, className = '' }: { src: string; alt: string; speed?: number; className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: '-200px' })

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        animate={isInView ? { y: -speed * 100 } : {}}
        transition={{ duration: 0, ease: 'linear' }}
        className="w-full h-[120%] -mt-[10%]"
      >
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      </motion.div>
    </div>
  )
}

export function AnimatedCounter({ end, duration = 2, suffix = '', prefix = '' }: { end: number; duration?: number; suffix?: string; prefix?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
    >
      {prefix}
      <motion.span
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
      >
        {isInView ? (
          <CounterInner end={end} duration={duration} />
        ) : (
          '0'
        )}
      </motion.span>
      {suffix}
    </motion.span>
  )
}

function CounterInner({ end, duration }: { end: number; duration: number }) {
  const nodeRef = useRef<HTMLSpanElement>(null)

  return (
    <motion.span
      ref={nodeRef}
      animate={{ opacity: 1 }}
    >
      <motion.span
        initial={{ innerText: 0 }}
        animate={{ innerText: end }}
        transition={{ duration, ease: 'easeOut' }}
        // @ts-expect-error framer-motion custom prop
        onUpdate={(latest: any) => {
          if (nodeRef.current) {
            const val = typeof latest === 'number' ? latest : end
            nodeRef.current.textContent = Math.round(val).toLocaleString()
          }
        }}
      />
    </motion.span>
  )
}
