'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

export interface Stat {
  value: number
  /** Optional suffix appended to the animated number, e.g. "+" or "k". */
  suffix?: string
  label: string
  icon: ReactNode
}

const defaultStats: Stat[] = [
  {
    value: 5000,
    suffix: '+',
    label: 'Security Assessments',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    value: 10000,
    suffix: '+',
    label: 'Students Trained',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      </svg>
    ),
  },
  {
    value: 500,
    suffix: '+',
    label: 'Enterprise Clients',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    value: 15,
    suffix: '+',
    label: 'Years Industry Experience',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
]

const DURATION_MS = 1600

function formatNumber(n: number): string {
  return n.toLocaleString('en-IN')
}

function useCountUp(target: number, start: boolean): number {
  const [value, setValue] = useState(0)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    if (!start) return
    const startTime = performance.now()
    const tick = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / DURATION_MS, 1)
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(target * eased))
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick)
      }
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [target, start])

  return value
}

function StatCard({ stat, inView }: { stat: Stat; inView: boolean }) {
  const value = useCountUp(stat.value, inView)
  return (
    <div
      className="surface-card surface-card-hover group relative flex flex-col items-center text-center p-6 sm:p-7 rounded-2xl hover:scale-[1.03] transition-all duration-300 ease-out"
    >
      <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-accent/10 border border-accent/25 text-accent mb-4 group-hover:bg-accent/20 group-hover:scale-110 transition-all duration-300">
        {stat.icon}
      </div>
      <div className="text-3xl sm:text-4xl lg:text-5xl font-bold gradient-text font-mono mb-2 tabular-nums tracking-tight">
        {formatNumber(value)}
        {stat.suffix && <span aria-hidden="true">{stat.suffix}</span>}
      </div>
      <div className="text-sm sm:text-base text-gray-600 dark:text-gray-400 font-medium">
        {stat.label}
      </div>
      <span className="sr-only">
        {formatNumber(stat.value)}{stat.suffix} {stat.label}
      </span>
    </div>
  )
}

interface StatsSectionProps {
  /** Custom stats; defaults to the canonical company stats. */
  stats?: Stat[]
  /** Accessible label for the grid. */
  ariaLabel?: string
}

export function StatsSection({ stats = defaultStats, ariaLabel = 'Company achievements' }: StatsSectionProps = {}) {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = sectionRef.current
    if (!node) return
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true)
            obs.disconnect()
            break
          }
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px' },
    )
    obs.observe(node)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={sectionRef}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
      role="list"
      aria-label={ariaLabel}
    >
      {stats.map((stat) => (
        <div key={stat.label} role="listitem">
          <StatCard stat={stat} inView={inView} />
        </div>
      ))}
    </div>
  )
}
