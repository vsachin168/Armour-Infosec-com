'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/Button'

interface CTASectionProps {
  title: string
  description: string
  primaryLabel: string
  primaryHref: string
  secondaryLabel?: string
  secondaryHref?: string
  /** Render the secondary CTA as a file download instead of a navigation link. */
  secondaryDownload?: boolean
}

export function CTASection({ title, description, primaryLabel, primaryHref, secondaryLabel, secondaryHref, secondaryDownload }: CTASectionProps) {
  return (
    <section className="py-24 bg-cyber-darker relative overflow-hidden transition-colors duration-300 hero-glow">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">{title}</h2>
        <p className="text-gray-500 dark:text-gray-400 text-lg mb-8 max-w-2xl mx-auto">{description}</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button href={primaryHref} variant="primary" size="lg">
            {primaryLabel}
          </Button>
          {secondaryLabel && secondaryHref && (
            <Button href={secondaryHref} variant="secondary" size="lg" download={secondaryDownload}>
              {secondaryLabel}
            </Button>
          )}
        </div>
      </motion.div>
    </section>
  )
}
