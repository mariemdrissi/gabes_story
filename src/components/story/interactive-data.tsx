'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

export function PollutionStats() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [hoveredStat, setHoveredStat] = useState<number | null>(null)

  const stats = [
    {
      value: 5,
      suffix: 'M',
      label: 'Tons of Phosphogypsum Dumped Yearly',
      detail: 'Every single year, the chemical complex pours approximately 5 million tons of untreated phosphogypsum waste directly into the Mediterranean Sea. This radioactive and toxic byproduct of phosphate processing has been accumulating since 1972, transforming what was once pristine coastline into a dead zone where marine life cannot survive.',
      icon: '🏭',
    },
    {
      value: 120,
      suffix: '+',
      label: 'People Hospitalized in Single Surge',
      detail: 'In September 2025 alone, more than 120 residents were rushed to hospitals with severe respiratory problems. Children, the elderly, and those with pre-existing conditions were the worst affected. Doctors reported a surge in asthma attacks, chronic bronchitis, and mysterious skin conditions that they directly linked to the toxic emissions from the GCT plant.',
      icon: '🏥',
    },
    {
      value: 10,
      suffix: 'M',
      unit: 'TND',
      label: 'Annual Healthcare Cost from Pollution',
      detail: 'The Tunisian healthcare system bears an estimated 10 million dinars per year in costs directly attributable to phosphate-induced pollution. This figure represents hospitalizations, treatments, medications, and lost productivity. Yet the government has spent a fraction of this on actual environmental remediation or factory upgrades.',
      icon: '💰',
    },
    {
      value: 53,
      suffix: '',
      label: 'Years of Continuous Poisoning',
      detail: 'Since 1972, when the Tunisian Chemical Group was established in the heart of Gabes without any environmental safeguards, the city has endured over five decades of systematic pollution. Generation after generation has grown up breathing toxic air, drinking contaminated water, and watching their oasis die — while authorities looked away.',
      icon: '📅',
    },
  ]

  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: i * 0.15 }}
          onMouseEnter={() => setHoveredStat(i)}
          onMouseLeave={() => setHoveredStat(null)}
          className="relative group cursor-pointer"
        >
          <div className={`rounded-2xl p-6 border transition-all duration-500 ${
            hoveredStat === i
              ? 'bg-orange-500/10 border-orange-500/40 shadow-lg shadow-orange-500/10'
              : 'bg-white/5 border-white/10 hover:bg-white/8'
          }`}>
            <div className="text-3xl mb-3">{stat.icon}</div>
            <div className="flex items-baseline gap-1 mb-2">
              <span className={`text-4xl md:text-5xl font-bold tabular-nums transition-colors duration-300 ${
                hoveredStat === i ? 'text-orange-400' : 'text-white'
              }`}>
                {stat.value}
              </span>
              {stat.suffix && (
                <span className={`text-2xl font-bold transition-colors duration-300 ${
                  hoveredStat === i ? 'text-orange-400' : 'text-gray-400'
                }`}>
                  {stat.suffix}
                </span>
              )}
              {stat.unit && (
                <span className="text-lg text-gray-500 ml-1">{stat.unit}</span>
              )}
            </div>
            <h3 className="text-lg font-semibold text-gray-200 mb-3">{stat.label}</h3>
            
            <motion.div
              initial={false}
              animate={{
                height: hoveredStat === i ? 'auto' : 0,
                opacity: hoveredStat === i ? 1 : 0,
              }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <p className="text-sm text-gray-400 leading-relaxed pt-2 border-t border-white/10">
                {stat.detail}
              </p>
            </motion.div>

            <div className={`text-xs mt-3 transition-all duration-300 ${
              hoveredStat === i ? 'text-orange-400' : 'text-gray-600'
            }`}>
              {hoveredStat === i ? 'Click to learn more' : 'Hover to reveal the story'}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export function HealthImpactChart() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [activeBar, setActiveBar] = useState<number | null>(null)

  const data = [
    { condition: 'Respiratory\nDiseases', value: 87, color: '#f97316' },
    { condition: 'Skin\nDisorders', value: 72, color: '#ef4444' },
    { condition: 'Cancer\nRates', value: 65, color: '#dc2626' },
    { condition: 'Eye\nIrritation', value: 78, color: '#fb923c' },
    { condition: 'Birth\nComplications', value: 54, color: '#b91c1c' },
  ]

  return (
    <div ref={ref} className="bg-white/5 rounded-2xl p-6 md:p-8 border border-white/10">
      <h3 className="text-xl font-bold text-white mb-2">Reported Health Impact Index</h3>
      <p className="text-sm text-gray-400 mb-6">Based on resident reports and medical observations — no official government study has been conducted</p>
      
      <div className="space-y-4">
        {data.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            onMouseEnter={() => setActiveBar(i)}
            onMouseLeave={() => setActiveBar(null)}
            className="group"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-gray-300 whitespace-pre-line leading-tight">{item.condition}</span>
              <span className={`text-sm font-bold tabular-nums transition-colors ${
                activeBar === i ? 'text-orange-400' : 'text-gray-400'
              }`}>{item.value}%</span>
            </div>
            <div className="h-3 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={isInView ? { width: `${item.value}%` } : { width: 0 }}
                transition={{ duration: 1.2, delay: 0.3 + i * 0.15, ease: 'easeOut' }}
                className="h-full rounded-full relative"
                style={{ backgroundColor: item.color }}
              >
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={activeBar === i ? { opacity: 0.3 } : { opacity: 0 }}
                  style={{ backgroundColor: 'white' }}
                />
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-white/10">
        <p className="text-xs text-gray-500 italic">
          The Tunisian government agreed to fund the first rigorous study of pollution and health in Gabes only after the 2025 protests. Decades of suffering went unmeasured.
        </p>
      </div>
    </div>
  )
}

export function Timeline() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [expandedItem, setExpandedItem] = useState<number | null>(null)

  const events = [
    {
      year: '1972',
      title: 'The Chemical Group Arrives',
      detail: 'The Tunisian Chemical Group (GCT) establishes a phosphate processing complex in the heart of Gabes, a city of 150,000 people. No environmental impact assessment is conducted. The plant begins operations without adequate emission controls or waste treatment systems.',
    },
    {
      year: '1980s',
      title: 'The Sea Begins to Die',
      detail: 'Phosphogypsum waste begins accumulating in the Gulf of Gabes. Fish populations decline dramatically. Local fishermen report catches falling by over 60%. The once-vibrant marine ecosystem — a source of livelihood and food for generations — starts to collapse. The coastline transforms from turquoise to murky brown.',
    },
    {
      year: '1990s',
      title: 'Health Crisis Emerges',
      detail: 'Residents begin reporting alarming rates of respiratory problems, skin conditions, and unusual cancer clusters. Children growing up near the factory develop chronic asthma at rates far exceeding national averages. The oasis — one of the few coastal oases in the world — begins dying as groundwater is contaminated.',
    },
    {
      year: '2010',
      title: 'Revolution Brings Hope',
      detail: 'The Tunisian Revolution topples the Ben Ali regime. For the first time, Gabes residents dare to speak openly about the pollution destroying their city. Environmental activism begins to emerge. People believe that democracy will finally bring accountability and change. Their hope will be short-lived.',
    },
    {
      year: '2019',
      title: 'Growing Outcry',
      detail: 'Investigative reports by Inkyfada, Nawaat, and international media expose the full scale of the environmental catastrophe. Studies confirm that the GCT complex releases 13,000 tons of sulfur dioxide annually. Radioactive waste is found in surrounding soil and water. The government acknowledges the problem but takes no concrete action.',
    },
    {
      year: 'Sep 2025',
      title: 'People Start Dying',
      detail: 'A catastrophic surge in toxic emissions sends over 120 people to hospitals in a single wave. Residents report gas clouds so thick they cannot see across the street. Schools close. Children are hospitalized. The government sends a minister who promises a committee — another committee, another study, another delay.',
    },
    {
      year: 'Oct 8, 2025',
      title: 'Gabes Rises Up',
      detail: 'Following calls from local environmental groups, the people of Gabes pour into the streets. It is the largest environmental protest in Tunisia\'s history. "We want to breathe!" becomes the rallying cry. The movement is led not by politicians but by mothers, fishermen, teachers, and young people who have had enough.',
    },
    {
      year: 'Oct 21, 2025',
      title: 'General Strike',
      detail: 'A general strike and tens of thousands of protesters bring Gabes to a complete standstill. The entire city shuts down in solidarity. The protest captures international attention. France 24, Al Jazeera, and BBC cover the story. Tunisia is forced to seek Chinese expertise to rehabilitate the chemical complex — outsourcing the solution to the very industry that caused the problem.',
    },
    {
      year: '2026',
      title: 'The Fight Continues',
      detail: 'Despite promises, real change remains elusive. The government proposes "modernization" of the plant rather than its closure. The people of Gabes continue to demand the complete dismantlement of the chemical complex. The environmental uprising has toppled the idea that protecting the environment is a luxury — it is a matter of survival. The struggle goes on.',
    },
  ]

  return (
    <div ref={ref} className="relative">
      {/* Timeline line */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-orange-500/50 via-red-500/30 to-transparent" />

      {events.map((event, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className={`relative flex items-start mb-8 ${
            i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
          } flex-row`}
        >
          {/* Dot */}
          <div className="absolute left-4 md:left-1/2 w-3 h-3 -ml-1.5 mt-2 rounded-full bg-orange-500 border-2 border-black z-10" />

          {/* Content */}
          <div className={`ml-12 md:ml-0 md:w-[45%] ${
            i % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8 md:text-left'
          }`}>
            <button
              onClick={() => setExpandedItem(expandedItem === i ? null : i)}
              className="w-full text-left group"
            >
              <span className="text-orange-400 font-mono text-sm font-bold">{event.year}</span>
              <h4 className="text-lg font-bold text-white group-hover:text-orange-300 transition-colors mt-1">
                {event.title}
              </h4>
              <motion.div
                initial={false}
                animate={{
                  height: expandedItem === i ? 'auto' : 0,
                  opacity: expandedItem === i ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <p className="text-sm text-gray-400 leading-relaxed mt-2">
                  {event.detail}
                </p>
              </motion.div>
              <span className="text-xs text-gray-600 mt-1 inline-block">
                {expandedItem === i ? 'Click to collapse' : 'Click to expand'}
              </span>
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
