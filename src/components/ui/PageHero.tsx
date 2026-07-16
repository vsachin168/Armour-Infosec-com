'use client'

import { motion } from 'framer-motion'
import { Breadcrumb } from './Breadcrumb'
import { CyberAmbient } from './CyberAmbient'

interface PageHeroProps {
  tag: string
  title: string
  highlight: string
  description: string
  breadcrumbs: { label: string; href?: string }[]
  price?: string
}

export function PageHero({ tag, title, highlight, description, breadcrumbs, price }: PageHeroProps) {
  return (
    <section className="relative pt-32 pb-20 bg-cyber-darker overflow-hidden transition-colors duration-300">
      <div className="absolute inset-0 bg-gradient-to-b from-cyber-darker via-cyber-darker/95 to-cyber-dark" />
      <CyberAmbient />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={breadcrumbs} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-8 max-w-4xl"
        >
          <span className="inline-block font-mono text-xs text-accent uppercase tracking-widest mb-4">
            {tag}
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            {title} <span className="gradient-text">{highlight}</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-500 dark:text-gray-400 max-w-3xl leading-relaxed">
            {description}
          </p>
          {price && (
            <div className="mt-8 inline-flex items-baseline gap-3 rounded-lg border border-accent/30 bg-accent/10 px-5 py-3">
              <span className="font-mono text-xs uppercase tracking-widest text-accent">Course Fee</span>
              <span className="text-2xl sm:text-3xl font-bold text-accent">{price}</span>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
