'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const voices = [
  {
    quote: "My daughter asks me every morning: 'Mama, why is the sky yellow?' I tell her it's the sunrise. But we both know it's the factory. She's six years old and she already knows what phosphogypsum smells like.",
    name: "Amina B.",
    role: "Mother of three",
    icon: "👩",
  },
  {
    quote: "I used to fish in the Gulf of Gabes with my father. Now my sons can't even swim there. The water burns your skin. The fish are gone. We've lost our sea, our livelihood, our heritage.",
    name: "Mehdi K.",
    role: "Third-generation fisherman",
    icon: "🎣",
  },
  {
    quote: "Every day in the clinic, I see children with respiratory conditions that should not exist in a city this size. The correlation is undeniable. Yet when we ask for an official health study, we are told there is no budget.",
    name: "Dr. Youssef M.",
    role: "Physician at Gabes Regional Hospital",
    icon: "⚕️",
  },
  {
    quote: "I am 23 years old and I have had asthma since I was five. My lungs are like those of a 70-year-old smoker, the doctor says. I have never smoked a day in my life. The factory was my cigarette.",
    name: "Sana T.",
    role: "University student",
    icon: "🎓",
  },
  {
    quote: "They built this factory in the middle of our oasis. Our paradise. The palm trees are dying. The water is poisoned. And they tell us: 'It brings jobs.' What good is a job if you're too sick to work?",
    name: "Hassan R.",
    role: "Retired agricultural worker",
    icon: "🌴",
  },
]

export function VoicesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [activeVoice, setActiveVoice] = useState(0)

  return (
    <div ref={ref}>
      {/* Voice selector */}
      <div className="flex flex-wrap gap-3 mb-8">
        {voices.map((voice, i) => (
          <motion.button
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.3, delay: i * 0.1 }}
            onClick={() => setActiveVoice(i)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 ${
              activeVoice === i
                ? 'bg-orange-500/20 border-orange-500/50 text-orange-300'
                : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-gray-200'
            }`}
          >
            <span className="text-lg">{voice.icon}</span>
            <span className="text-sm font-medium">{voice.name}</span>
          </motion.button>
        ))}
      </div>

      {/* Active quote */}
      <div className="relative min-h-[280px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeVoice}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-orange-500/5 to-red-500/5 rounded-3xl p-8 md:p-10 border border-orange-500/10"
          >
            <svg className="w-10 h-10 text-orange-500/30 mb-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z"/>
            </svg>
            <p className="text-lg md:text-xl text-gray-200 leading-relaxed italic mb-6">
              {voices[activeVoice].quote}
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center text-lg">
                {voices[activeVoice].icon}
              </div>
              <div>
                <div className="font-semibold text-white">{voices[activeVoice].name}</div>
                <div className="text-sm text-gray-400">{voices[activeVoice].role}</div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
