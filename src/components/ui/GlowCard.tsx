'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface GlowCardProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function GlowCard({ children, className = '', delay = 0 }: GlowCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={`surface-card surface-card-hover p-6 ${className}`}
    >
      {children}
    </motion.div>
  )
}
