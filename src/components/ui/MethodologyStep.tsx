'use client'

import { motion } from 'framer-motion'

interface MethodologyStepProps {
  number: number
  title: string
  description: string
  delay?: number
}

export function MethodologyStep({ number, title, description, delay = 0 }: MethodologyStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="flex gap-4 group"
    >
      <div className="shrink-0">
        <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/30 flex items-center justify-center font-mono text-accent text-sm font-bold group-hover:bg-accent/20 group-hover:border-accent/50 transition-all">
          {String(number).padStart(2, '0')}
        </div>
        {/* connector line */}
        <div className="w-px h-full bg-gradient-to-b from-accent/30 to-transparent mx-auto mt-2" />
      </div>
      <div className="pb-8">
        <h3 className="text-gray-900 dark:text-white font-semibold mb-1 group-hover:text-accent transition-colors">
          {title}
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{description}</p>
      </div>
    </motion.div>
  )
}
