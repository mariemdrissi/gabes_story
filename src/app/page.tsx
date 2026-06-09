'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion'
import { ReadingProgress } from '@/components/story/reading-progress'
import { ChapterNav } from '@/components/story/chapter-nav'
import { ScrollReveal } from '@/components/story/scroll-animations'
import { PollutionStats, HealthImpactChart, Timeline } from '@/components/story/interactive-data'
import { VoicesSection } from '@/components/story/voices'

export default function Home() {
  return (
    <main className="bg-black text-white overflow-x-hidden">
      <ReadingProgress />
      <ChapterNav />
      
      {/* ===== HERO ===== */}
      <HeroSection />
      
      {/* ===== CHAPTER 1: THE OASIS ===== */}
      <OasisSection />
      
      {/* ===== CHAPTER 2: THE ARRIVAL ===== */}
      <ArrivalSection />
      
      {/* ===== CHAPTER 3: THE POISON ===== */}
      <PoisonSection />
      
      {/* ===== CHAPTER 4: THE PEOPLE ===== */}
      <PeopleSection />
      
      {/* ===== CHAPTER 5: THE SILENCE ===== */}
      <SilenceSection />
      
      {/* ===== CHAPTER 6: THE UPRISING ===== */}
      <UprisingSection />
      
      {/* ===== CHAPTER 7: THE FIGHT ===== */}
      <FightSection />
      
      {/* ===== FOOTER ===== */}
      <StoryFooter />
    </main>
  )
}

/* ──────────────────────────────────────────── */
/*  HERO SECTION                                */
/* ──────────────────────────────────────────── */

function HeroSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1])
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, -100])

  return (
    <section id="hero" ref={ref} className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <motion.div style={{ scale }} className="absolute inset-0">
        <img
          src="/images/factory-smoke.png"
          alt="Chemical factory smoke billowing over Gabes"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
      </motion.div>

      {/* Content */}
      <motion.div style={{ opacity, y: textY }} className="relative z-10 text-center px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <span className="inline-block text-orange-400 text-sm md:text-base font-mono tracking-[0.3em] uppercase mb-4">
            Tunisia &middot; North Africa
          </span>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6"
        >
          <span className="bg-gradient-to-r from-orange-400 via-red-400 to-red-600 bg-clip-text text-transparent">
            Gabes Is
          </span>
          <br />
          <span className="text-white">Suffocating</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed"
        >
          For 53 years, a city has been slowly poisoned. No one came to help. 
          This is the story the world forgot — until the people refused to stay silent.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="flex flex-col items-center gap-4"
        >
          <span className="text-gray-500 text-sm">Scroll to begin the story</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-6 h-10 rounded-full border-2 border-gray-500 flex items-start justify-center p-1"
          >
            <motion.div className="w-1.5 h-3 bg-orange-400 rounded-full" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}

/* ──────────────────────────────────────────── */
/*  CHAPTER 1: THE OASIS                       */
/* ──────────────────────────────────────────── */

function OasisSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const imgY = useTransform(scrollYProgress, [0, 1], [0, -80])

  return (
    <section id="oasis" ref={ref} className="relative py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-emerald-400" />
            <span className="text-emerald-400 text-sm font-mono tracking-widest uppercase">Chapter One</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
            The Oasis <span className="text-emerald-400">That Was</span>
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div>
            <ScrollReveal delay={0.2}>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                Before the smokestacks, before the poison, there was an oasis. Gabes was one of the few coastal oases in the entire Mediterranean — a place where the desert met the sea in an improbable explosion of green. Date palms stretched to the horizon, freshwater springs bubbled from the earth, and the Gulf of Gabes teemed with life.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.4}>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                For centuries, this unique ecosystem sustained a community. Fishermen pulled abundant catches from pristine waters. Farmers grew pomegranates, figs, and olives in the fertile soil. Children swam in the gulf. Families gathered in the shade of ancient palms. The oasis was not just a place — it was an identity, a way of life, a promise that the next generation would inherit something beautiful.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.6}>
              <p className="text-lg text-gray-400 leading-relaxed italic">
                &ldquo;My grandfather used to say: The oasis is God&rsquo;s gift to Gabes. We are its guardians.&rdquo;
              </p>
              <p className="text-sm text-gray-500 mt-2">— Elderly resident of Gabes</p>
            </ScrollReveal>
          </div>
          
          <motion.div style={{ y: imgY }} className="rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="/images/oasis-before.png"
              alt="The beautiful oasis of Gabes before industrial pollution"
              className="w-full h-auto object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ──────────────────────────────────────────── */
/*  CHAPTER 2: THE ARRIVAL                     */
/* ──────────────────────────────────────────── */

function ArrivalSection() {
  return (
    <section id="arrival" className="relative py-24 md:py-32 bg-gradient-to-b from-black via-gray-950 to-black">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-amber-400" />
            <span className="text-amber-400 text-sm font-mono tracking-widest uppercase">Chapter Two</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
            The Arrival of <span className="text-amber-400">Industry</span>
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-5 gap-8 md:gap-12">
          <div className="md:col-span-3">
            <ScrollReveal delay={0.2}>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                In 1972, everything changed. The Tunisian government, eager to capitalize on the country&rsquo;s vast phosphate reserves, established the Tunisian Chemical Group (GCT) complex right in the heart of Gabes. The location was chosen for its coastal access — perfect for dumping waste into the sea — and its proximity to phosphate mines in the interior.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.4}>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                No environmental impact assessment was conducted. No community consultation took place. No safeguards were built into the design. The complex was simply dropped into a city of over 150,000 people as if they were invisible, as if their health, their children&rsquo;s futures, and their ancient oasis simply did not matter. The promise was jobs and development. The reality was something far darker.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.6}>
              <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-6 mt-6">
                <p className="text-amber-300 font-semibold mb-2">The Deal That Doomed Gabes</p>
                <p className="text-gray-400 text-sm leading-relaxed">
                  The GCT complex was established without any environmental safeguards. It was built in the center of a residential area, next to one of the world&rsquo;s last coastal oases. The government prioritized phosphate exports — Tunisia is the world&rsquo;s fifth-largest phosphate producer — over the health and environment of its own citizens. The people of Gabes were sacrificed on the altar of economic development.
                </p>
              </div>
            </ScrollReveal>
          </div>

          <div className="md:col-span-2">
            <ScrollReveal delay={0.3} direction="right">
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10 space-y-6">
                <div>
                  <span className="text-amber-400 text-3xl font-black">1972</span>
                  <p className="text-gray-400 text-sm mt-1">GCT Complex Established</p>
                </div>
                <div className="w-full h-px bg-white/10" />
                <div>
                  <span className="text-amber-400 text-3xl font-black">0</span>
                  <p className="text-gray-400 text-sm mt-1">Environmental Assessments Conducted</p>
                </div>
                <div className="w-full h-px bg-white/10" />
                <div>
                  <span className="text-amber-400 text-3xl font-black">0</span>
                  <p className="text-gray-400 text-sm mt-1">Community Consultations Held</p>
                </div>
                <div className="w-full h-px bg-white/10" />
                <div>
                  <span className="text-amber-400 text-3xl font-black">150K+</span>
                  <p className="text-gray-400 text-sm mt-1">People Directly Affected</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ──────────────────────────────────────────── */
/*  CHAPTER 3: THE POISON                      */
/* ──────────────────────────────────────────── */

function PoisonSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const imgY = useTransform(scrollYProgress, [0, 1], [0, -80])

  return (
    <section id="poison" ref={ref} className="relative py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-red-500" />
            <span className="text-red-500 text-sm font-mono tracking-widest uppercase">Chapter Three</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
            The <span className="text-red-500">Poison</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mb-8">
            Every day, the GCT complex releases a cocktail of toxic substances into the air, water, and soil of Gabes. The numbers are staggering — but behind each statistic is a human being, a family, a life forever altered by industrial negligence and government indifference.
          </p>
        </ScrollReveal>

        {/* Interactive Stats */}
        <PollutionStats />

        {/* Coast image with parallax */}
        <motion.div style={{ y: imgY }} className="mt-16 rounded-2xl overflow-hidden shadow-2xl">
          <img
            src="/images/polluted-coast.png"
            alt="Polluted coastline of Gabes showing chemical waste"
            className="w-full h-auto object-cover"
          />
        </motion.div>

        {/* Health Impact Chart */}
        <div className="mt-16">
          <ScrollReveal>
            <h3 className="text-2xl font-bold text-white mb-8">What the Poison Does to People</h3>
          </ScrollReveal>
          <HealthImpactChart />
        </div>
      </div>
    </section>
  )
}

/* ──────────────────────────────────────────── */
/*  CHAPTER 4: THE PEOPLE                      */
/* ──────────────────────────────────────────── */

function PeopleSection() {
  return (
    <section id="people" className="relative py-24 md:py-32 bg-gradient-to-b from-black via-gray-950 to-black">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-purple-400" />
            <span className="text-purple-400 text-sm font-mono tracking-widest uppercase">Chapter Four</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
            The <span className="text-purple-400">People</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mb-12">
            Behind the statistics are real people — mothers watching their children struggle to breathe, fishermen who can no longer fish, doctors who see the damage every day but feel powerless against the system. These are their voices. Listen to them.
          </p>
        </ScrollReveal>

        <VoicesSection />

        {/* Hospital image */}
        <ScrollReveal delay={0.2}>
          <div className="mt-16 rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="/images/hospital.png"
              alt="Hospital treating patients affected by pollution in Gabes"
              className="w-full h-auto object-cover"
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

/* ──────────────────────────────────────────── */
/*  CHAPTER 5: THE SILENCE                     */
/* ──────────────────────────────────────────── */

function SilenceSection() {
  const [revealedItems, setRevealedItems] = useState<Set<number>>(new Set())

  const brokenPromises = [
    {
      year: '2011',
      promise: 'Post-revolution government promises to address pollution',
      reality: 'A committee is formed. It meets once. Nothing changes.',
    },
    {
      year: '2015',
      promise: 'Ministry of Environment announces a "clean-up plan"',
      reality: 'The plan exists only on paper. No budget is allocated. The factory continues operating unchanged.',
    },
    {
      year: '2019',
      promise: 'Government promises to relocate the factory',
      reality: 'A feasibility study is commissioned. The study concludes relocation is "too expensive." The factory stays.',
    },
    {
      year: '2023',
      promise: 'New minister pledges "immediate action" on Gabes pollution',
      reality: 'The minister visits Gabes once for a photo opportunity. No policy changes follow. Emissions continue to rise.',
    },
    {
      year: '2025',
      promise: 'After mass hospitalizations, government promises emergency measures',
      reality: 'Another committee is formed. Another study is promised. The people of Gabes have heard this before — many times.',
    },
  ]

  const toggleReveal = (i: number) => {
    setRevealedItems(prev => {
      const next = new Set(prev)
      if (next.has(i)) {
        next.delete(i)
      } else {
        next.add(i)
      }
      return next
    })
  }

  return (
    <section id="silence" className="relative py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-gray-400" />
            <span className="text-gray-400 text-sm font-mono tracking-widest uppercase">Chapter Five</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
            The <span className="text-gray-400">Silence</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mb-12">
            For decades, the response from every level of government has been the same: promises, committees, studies — and then silence. The people of Gabes have been told to wait, to be patient, to understand the economic importance of the factory. But patience has a limit when your children cannot breathe.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <h3 className="text-2xl font-bold text-white mb-8">A Pattern of Broken Promises</h3>
          <p className="text-sm text-gray-500 mb-6">Click each card to reveal what actually happened</p>
        </ScrollReveal>

        <div className="space-y-4">
          {brokenPromises.map((item, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <button
                onClick={() => toggleReveal(i)}
                className="w-full text-left group"
              >
                <div className={`rounded-2xl p-6 border transition-all duration-500 ${
                  revealedItems.has(i)
                    ? 'bg-gray-500/10 border-gray-400/30'
                    : 'bg-white/5 border-white/10 hover:bg-white/8'
                }`}>
                  <div className="flex items-start gap-4">
                    <span className="text-gray-400 font-mono text-sm font-bold shrink-0 mt-1">{item.year}</span>
                    <div className="flex-1">
                      <p className="text-gray-200 font-medium">{item.promise}</p>
                      <AnimatePresence>
                        {revealedItems.has(i) && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="mt-3 pt-3 border-t border-white/10">
                              <div className="flex items-start gap-2">
                                <span className="text-red-400 shrink-0 mt-0.5">&#x2717;</span>
                                <p className="text-red-300/80 text-sm leading-relaxed">{item.reality}</p>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    <motion.div
                      animate={{ rotate: revealedItems.has(i) ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-gray-500 shrink-0 mt-1"
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    </motion.div>
                  </div>
                </div>
              </button>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.5}>
          <div className="mt-12 bg-gray-500/5 border border-gray-500/20 rounded-2xl p-8 text-center">
            <p className="text-gray-300 text-lg leading-relaxed italic">
              &ldquo;They keep telling us to wait. Wait for the study. Wait for the committee. Wait for the budget. 
              But how long can you wait when the air you breathe is killing you?&rdquo;
            </p>
            <p className="text-gray-500 text-sm mt-4">— Gabes resident, October 2025</p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

/* ──────────────────────────────────────────── */
/*  CHAPTER 6: THE UPRISING                    */
/* ──────────────────────────────────────────── */

function UprisingSection() {
  return (
    <section id="uprising" className="relative py-24 md:py-32 bg-gradient-to-b from-black via-orange-950/20 to-black">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-orange-400" />
            <span className="text-orange-400 text-sm font-mono tracking-widest uppercase">Chapter Six</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
            The <span className="text-orange-400">Uprising</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mb-8">
            In the autumn of 2025, something broke. Not the factory — that had been broken for decades. What broke was the silence. After 53 years of breathing poison and receiving nothing but empty promises, the people of Gabes rose up. What followed was the largest environmental protest in Tunisia&rsquo;s history.
          </p>
        </ScrollReveal>

        {/* Timeline */}
        <Timeline />

        {/* Protests image */}
        <ScrollReveal>
          <div className="mt-16 rounded-2xl overflow-hidden shadow-2xl relative">
            <img
              src="/images/protests.png"
              alt="Community gathering in Gabes demanding change"
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <p className="text-2xl md:text-3xl font-black text-white">
                &ldquo;We Want to Breathe!&rdquo;
              </p>
              <p className="text-orange-300 mt-2">— The rallying cry of Gabes, October 2025</p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

/* ──────────────────────────────────────────── */
/*  CHAPTER 7: THE FIGHT CONTINUES             */
/* ──────────────────────────────────────────── */

function FightSection() {
  const [signed, setSigned] = useState(false)

  return (
    <section id="fight" className="relative py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-orange-400" />
            <span className="text-orange-400 text-sm font-mono tracking-widest uppercase">Chapter Seven</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
            The Fight <span className="text-orange-400">Continues</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mb-8">
            The protests of 2025 brought international attention to Gabes. Tunisia was forced to seek Chinese expertise to rehabilitate the chemical complex. But &ldquo;rehabilitation&rdquo; is not the same as &ldquo;closure.&rdquo; The government talks about modernizing the plant, making it cleaner — but the people of Gabes have heard these promises before. What they demand is complete dismantlement. What they deserve is clean air, clean water, and the return of their oasis.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.4}>
          <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mb-12">
            The environmental uprising in Gabes has toppled the idea that protecting the environment is a luxury afforded only to the rich. For the people of Gabes, this is not about politics or ideology — it is about survival. It is about the right to breathe. It is about the right of children to grow up without asthma, without cancer, without the constant fear that the air they breathe today might send them to the hospital tomorrow. The fight is far from over. But it has only just begun.
          </p>
        </ScrollReveal>

        {/* Call to Action */}
        <ScrollReveal delay={0.3}>
          <div className="bg-gradient-to-br from-orange-500/10 via-red-500/5 to-transparent rounded-3xl p-8 md:p-12 border border-orange-500/20">
            <div className="max-w-2xl mx-auto text-center">
              <h3 className="text-3xl md:text-4xl font-black text-white mb-4">
                Stand With Gabes
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                The people of Gabes are still fighting for their right to breathe. You can help by sharing their story, supporting environmental organizations working in Tunisia, and demanding accountability from the industries and governments that allow this to continue.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => setSigned(true)}
                  className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-500 ${
                    signed
                      ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                      : 'bg-orange-500 text-white hover:bg-orange-600 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50'
                  }`}
                >
                  {signed ? 'Thank You for Standing With Gabes' : 'I Stand With Gabes'}
                </button>
              </div>

              <AnimatePresence>
                {signed && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-6 text-emerald-400"
                  >
                    <p className="text-sm">Share this story to amplify the voices of Gabes.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </ScrollReveal>

        {/* Sources */}
        <ScrollReveal delay={0.4}>
          <div className="mt-16">
            <h3 className="text-xl font-bold text-white mb-6">Sources & Further Reading</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { name: 'Al Jazeera: Dozens hospitalised in Tunisia\'s Gabes', url: 'https://www.aljazeera.com/news/2025/10/14/dozens-hospitalised-in-tunisias-gabes-amid-environmental-crisis' },
                { name: 'Nawaat: Gabes rises up against cancerous Chemical Group', url: 'https://nawaat.org/2025/10/29/gabes-rises-up-against-cancerous-chemical-group' },
                { name: 'MERIP: We Want to Breathe — Dispatch from Gabes', url: 'https://www.merip.org/2025/11/we-want-to-breathe-dispatch-from-gabes-tunisia' },
                { name: 'Inkyfada: For the Gabes Chemical Group, a population is sacrificed', url: 'https://inkyfada.com/en/2019/11/12/pollution-gabes-lutte-gct-2' },
                { name: 'Coda Story: Industrial pollution destroying a Tunisian coastal community', url: 'https://www.codastory.com/waronscience/pollution-in-tunisia' },
                { name: 'Legal Agenda: The Gabes Chemical Complex — A Monster Destroying Lives', url: 'https://english.legal-agenda.com/the-gabes-chemical-complex-a-monster-destroying-lives-and-poisoning-children' },
              ].map((source, i) => (
                <a
                  key={i}
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-orange-500/30 transition-all"
                >
                  <svg className="w-4 h-4 text-gray-500 group-hover:text-orange-400 shrink-0 mt-0.5" viewBox="0 0 16 16" fill="none">
                    <path d="M4 12L12 4M12 4H6M12 4v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-sm text-gray-400 group-hover:text-gray-200 transition-colors">{source.name}</span>
                </a>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

/* ──────────────────────────────────────────── */
/*  FOOTER                                      */
/* ──────────────────────────────────────────── */

function StoryFooter() {
  return (
    <footer className="py-12 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <p className="text-gray-600 text-sm">
          This interactive story was created to amplify the voices of Gabes, Tunisia.
        </p>
        <p className="text-gray-700 text-xs mt-2">
          The environmental crisis in Gabes is ongoing. Every voice matters.
        </p>
      </div>
    </footer>
  )
}
