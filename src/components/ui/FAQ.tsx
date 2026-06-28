'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, HelpCircle } from 'lucide-react'

interface FAQItem {
  question: string
  answer: string
}

interface FAQProps {
  items: FAQItem[]
}

export function FAQ({ items }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const isOpen = openIndex === i
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.3 }}
            className={`rounded-xl overflow-hidden backdrop-blur-md transition-all duration-300 border ${
              isOpen
                ? 'bg-white/80 dark:bg-white/[0.06] border-accent/30 dark:border-accent/30 shadow-md'
                : 'bg-white/50 dark:bg-white/[0.02] border-gray-200/60 dark:border-white/[0.06] hover:border-accent/20 dark:hover:border-accent/30 hover:bg-white/70 dark:hover:bg-white/[0.04]'
            }`}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full flex items-center gap-3 p-5 text-left transition-colors"
              aria-expanded={isOpen}
            >
              <span className={`flex items-center justify-center w-7 h-7 rounded-lg shrink-0 transition-all duration-300 ${
                isOpen
                  ? 'bg-accent/15 text-accent'
                  : 'bg-gray-100 dark:bg-white/[0.05] text-gray-500 dark:text-gray-400'
              }`}>
                <HelpCircle className="w-3.5 h-3.5" />
              </span>
              <span className={`font-medium pr-4 transition-colors duration-200 ${
                isOpen ? 'text-accent' : 'text-gray-900 dark:text-white'
              }`}>
                {item.question}
              </span>
              <ChevronDown
                className={`w-4 h-4 text-accent shrink-0 ml-auto transition-transform duration-300 ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                >
                  <div className="px-5 pb-5 pl-[3.75rem] text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )
      })}
    </div>
  )
}
