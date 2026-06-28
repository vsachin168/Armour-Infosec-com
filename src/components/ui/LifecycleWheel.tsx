'use client'

import { useState } from 'react'

export interface LifecyclePhase {
  title: string
  description: string
}

/** Per-phase colour, keyed by index (violet, pink, blue, amber, red, green). */
const PALETTE = ['#7c3aed', '#ec4899', '#2f6bff', '#f59e0b', '#ef4444', '#22c55e']

const R = 84
const CIRC = 2 * Math.PI * R

export function LifecycleWheel({ phases }: { phases: LifecyclePhase[] }) {
  const [active, setActive] = useState(0)
  const n = phases.length
  if (n === 0) return null

  const color = (i: number) => PALETTE[i % PALETTE.length]
  const cur = color(active)
  const segLen = CIRC / n - 6
  const go = (i: number) => setActive(((i % n) + n) % n)

  const rad = (i: number) => ((-90 + i * (360 / n)) * Math.PI) / 180
  const nodePos = (i: number) => ({
    left: 50 + 42 * Math.cos(rad(i)),
    top: 50 + 42 * Math.sin(rad(i)),
  })
  const labelClass = (i: number) => {
    const a = -90 + i * (360 / n)
    if (a === -90) return 'left-1/2 -translate-x-1/2 -top-6'
    if (a === 90) return 'left-1/2 -translate-x-1/2 -bottom-6'
    return Math.cos(rad(i)) < 0
      ? 'right-[3.2rem] top-1/2 -translate-y-1/2'
      : 'left-[3.2rem] top-1/2 -translate-y-1/2'
  }

  const phase = phases[active]
  const num = `PHASE ${String(active + 1).padStart(2, '0')} / ${String(n).padStart(2, '0')}`

  return (
    <div style={{ ['--cur' as string]: cur }}>
      <p className="font-mono text-xs uppercase tracking-widest mb-1.5" style={{ color: cur }}>
        // the process
      </p>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
        Our Assessment Lifecycle
      </h2>
      <p className="text-gray-500 dark:text-gray-400 max-w-xl mt-2 mb-10">
        Six phases, end to end — from first recon to verified remediation.
      </p>

      <div className="grid lg:grid-cols-[minmax(0,440px)_1fr] gap-10 lg:gap-12 items-center">
        {/* ---------- Desktop wheel (hidden on small screens) ---------- */}
        <div className="relative mx-auto hidden md:block" style={{ width: 420, height: 420 }}>
          <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" style={{ transform: 'rotate(-90deg)' }}>
            {phases.map((_, i) => (
              <circle
                key={i}
                cx={100}
                cy={100}
                r={R}
                fill="none"
                strokeLinecap="butt"
                className={`cursor-pointer transition-[stroke,stroke-width] duration-300 ${
                  i === active ? '' : 'stroke-gray-200 dark:stroke-slate-700'
                }`}
                stroke={i === active ? color(i) : undefined}
                strokeWidth={i === active ? 11 : 7}
                strokeDasharray={`${segLen} ${CIRC - segLen}`}
                strokeDashoffset={-(i * (CIRC / n) + 3)}
                onClick={() => go(i)}
              />
            ))}
          </svg>

          {phases.map((p, i) => {
            const pos = nodePos(i)
            const isActive = i === active
            return (
              <button
                key={i}
                type="button"
                onClick={() => go(i)}
                aria-label={`Phase ${i + 1}: ${p.title}`}
                aria-current={isActive ? 'step' : undefined}
                className={`absolute flex items-center justify-center w-[46px] h-[46px] rounded-full font-bold text-[15px] transition-all duration-200 -translate-x-1/2 -translate-y-1/2 ${
                  isActive
                    ? 'text-white'
                    : 'bg-white dark:bg-cyber-card text-gray-500 dark:text-gray-300 border-2 border-gray-200 dark:border-cyber-border'
                }`}
                style={{
                  left: `${pos.left}%`,
                  top: `${pos.top}%`,
                  background: isActive ? color(i) : undefined,
                  border: isActive ? `2px solid ${color(i)}` : undefined,
                  boxShadow: isActive ? `0 0 0 5px ${color(i)}33, 0 6px 18px -4px ${color(i)}` : undefined,
                  transform: `translate(-50%,-50%) scale(${isActive ? 1.12 : 1})`,
                }}
              >
                {i + 1}
                <span
                  className={`absolute text-[11px] font-bold uppercase tracking-wide whitespace-nowrap ${labelClass(i)} ${
                    isActive ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-slate-500'
                  }`}
                >
                  {p.title}
                </span>
              </button>
            )
          })}

          {phases.map((_, i) => {
            const ca = ((-90 + (i + 0.5) * (360 / n)) * Math.PI) / 180
            const cx = 50 + 42 * Math.cos(ca)
            const cy = 50 + 42 * Math.sin(ca)
            const isActive = i === active
            return (
              <span
                key={i}
                aria-hidden="true"
                className={`absolute font-bold text-[15px] leading-none pointer-events-none transition-colors duration-300 ${
                  isActive ? '' : 'text-gray-300 dark:text-slate-600'
                }`}
                style={{
                  left: `${cx}%`,
                  top: `${cy}%`,
                  transform: `translate(-50%,-50%) rotate(${(i + 0.5) * (360 / n)}deg)`,
                  color: isActive ? color(i) : undefined,
                }}
              >
                ❯
              </span>
            )
          })}
        </div>

        {/* ---------- Mobile fallback (hidden on md+) ---------- */}
        <div className="md:hidden">
          <div className="flex justify-between mb-3">
            {phases.map((p, i) => {
              const isActive = i === active
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Phase ${i + 1}: ${p.title}`}
                  aria-current={isActive ? 'step' : undefined}
                  className={`flex items-center justify-center w-9 h-9 rounded-full font-bold text-[13px] transition-all ${
                    isActive
                      ? 'text-white'
                      : 'bg-white dark:bg-cyber-card text-gray-500 dark:text-gray-300 border-2 border-gray-200 dark:border-cyber-border'
                  }`}
                  style={{
                    background: isActive ? color(i) : undefined,
                    border: isActive ? `2px solid ${color(i)}` : undefined,
                  }}
                >
                  {i + 1}
                </button>
              )
            })}
          </div>
          <div className="h-1.5 rounded-full bg-gray-200 dark:bg-slate-700 overflow-hidden mb-4">
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{ width: `${((active + 1) / n) * 100}%`, background: cur }}
            />
          </div>
        </div>

        {/* ---------- Detail panel ---------- */}
        <div className="min-h-[230px]">
          <div className="font-mono text-xs font-bold tracking-widest text-gray-400 dark:text-slate-500">{num}</div>
          <h3 className="text-2xl font-extrabold uppercase mt-1.5 mb-3.5 tracking-tight" style={{ color: cur }}>
            {phase.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-[15px] leading-relaxed">{phase.description}</p>
          <div className="flex gap-3.5 mt-6">
            <button
              type="button"
              onClick={() => go(active - 1)}
              aria-label="Previous phase"
              className="flex items-center justify-center w-11 h-11 rounded-full border border-gray-300 dark:border-cyber-border text-gray-600 dark:text-gray-300 text-lg transition-colors hover:border-accent hover:text-accent"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => go(active + 1)}
              aria-label="Next phase"
              className="flex items-center justify-center w-11 h-11 rounded-full text-lg text-white transition-colors"
              style={{ background: cur }}
            >
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
