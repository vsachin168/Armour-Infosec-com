'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { PageHero } from '@/components/ui/PageHero'
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection'
import { GlowCard } from '@/components/ui/GlowCard'
import { CTASection } from '@/components/ui/CTASection'
import { trainingData } from '@/data/training'
import { formatDurationShort } from '@/components/TrainingPageTemplate'
import { Clock, ArrowRight, BookOpen, Users, Award, Monitor, Shield, Code, Wifi, Server, Smartphone, Brain, Terminal as TerminalIcon, Globe, ChevronRight, Target, Download } from 'lucide-react'

type RoadmapPhase = {
  num: string
  title: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  duration: string
  description: string
  icon: React.ReactNode
  levelStyle: string
  courses: { slug: string; label: string }[]
}

const ROADMAP_PHASES: RoadmapPhase[] = [
  {
    num: '01',
    title: 'Foundations',
    level: 'Beginner',
    duration: '6–8 Months',
    description: 'Build the systems, scripting, and web-stack base every offensive security practitioner needs.',
    icon: <BookOpen className="w-5 h-5" />,
    levelStyle: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400',
    courses: [
      { slug: 'windows-infrastructure', label: 'Enterprise Windows Infrastructure Security' },
      { slug: 'linux-administration', label: 'Linux Administration & Server Hardening' },
      { slug: 'php-development', label: 'Secure PHP Development' },
      { slug: 'wordpress-administration', label: 'Secure WordPress Administration' },
      { slug: 'python-security', label: 'Python for Security Professionals' },
    ],
  },
  {
    num: '02',
    title: 'Core Offensive Security',
    level: 'Intermediate',
    duration: '10–12 Months',
    description: 'Move into hands-on pentest tradecraft across web, API, mobile, and wireless attack surfaces.',
    icon: <Shield className="w-5 h-5" />,
    levelStyle: 'bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400',
    courses: [
      { slug: 'ethical-hacking', label: 'Certified Ethical Hacking & Penetration Testing' },
      { slug: 'web-application-security', label: 'Advanced Web Application Security Testing' },
      { slug: 'api-security', label: 'API Security & Advanced API Exploitation' },
      { slug: 'mobile-application-penetration-testing', label: 'Mobile Application Penetration Testing' },
      { slug: 'wireless-security', label: 'Wireless Security & WiFi Penetration Testing' },
    ],
  },
  {
    num: '03',
    title: 'Advanced Enterprise Attacks',
    level: 'Advanced',
    duration: '3–4 Months',
    description: 'Specialise in enterprise-scale targets — Active Directory compromise and AI/ML system attacks.',
    icon: <Target className="w-5 h-5" />,
    levelStyle: 'bg-accent/15 border-accent/40 text-accent',
    courses: [
      { slug: 'active-directory-security', label: 'Active Directory Security & Enterprise Attacks' },
      { slug: 'ai-ml-penetration-testing', label: 'AI/ML Penetration Testing' },
    ],
  },
]

type ToolCategory = {
  eyebrow: string
  title: string
  icon: React.ReactNode
  tools: string[]
}

const TOOL_CATEGORIES: ToolCategory[] = [
  {
    eyebrow: '// Offensive',
    title: 'Offensive Security',
    icon: <Shield className="w-4 h-4" />,
    tools: [
      'Nmap', 'Metasploit', 'Wireshark', 'Aircrack-ng',
      'Hydra', 'sqlmap', 'ffuf', 'Gobuster', 'Responder',
      'Impacket', 'BloodHound', 'Mimikatz', 'John the Ripper', 'Hashcat',
    ],
  },
  {
    eyebrow: '// Web / API',
    title: 'Web & API Testing',
    icon: <Globe className="w-4 h-4" />,
    tools: ['Burp Suite', 'Postman', 'OWASP ZAP', 'JWT Toolkit', 'Dirsearch'],
  },
  {
    eyebrow: '// Automation',
    title: 'Development & Automation',
    icon: <TerminalIcon className="w-4 h-4" />,
    tools: ['Python', 'Bash', 'PowerShell', 'Git', 'Docker'],
  },
  {
    eyebrow: '// Enterprise',
    title: 'Cloud / DevOps / Enterprise',
    icon: <Server className="w-4 h-4" />,
    tools: ['Active Directory', 'Linux Servers', 'Windows Server', 'VMware', 'Kali Linux'],
  },
]

const courses: { key: string; href: string; icon: React.ReactNode; isNew?: boolean }[] = [
  { key: 'ai-ml-penetration-testing', href: '/training/ai-ml-penetration-testing/', icon: <Brain className="w-5 h-5" /> },
  { key: 'ethical-hacking', href: '/training/ethical-hacking/', icon: <Shield className="w-5 h-5" /> },
  { key: 'web-application-security', href: '/training/web-application-security/', icon: <Globe className="w-5 h-5" /> },
  { key: 'api-security', href: '/training/api-security/', icon: <Code className="w-5 h-5" /> },
  { key: 'mobile-application-penetration-testing', href: '/training/mobile-application-penetration-testing/', icon: <Smartphone className="w-5 h-5" /> },
  { key: 'active-directory-security', href: '/training/active-directory-security/', icon: <Server className="w-5 h-5" /> },
  { key: 'wireless-security', href: '/training/wireless-security/', icon: <Wifi className="w-5 h-5" /> },
  { key: 'python-security', href: '/training/python-security/', icon: <TerminalIcon className="w-5 h-5" /> },
  { key: 'linux-administration', href: '/training/linux-administration/', icon: <TerminalIcon className="w-5 h-5" /> },
  { key: 'windows-infrastructure', href: '/training/windows-infrastructure/', icon: <Monitor className="w-5 h-5" /> },
  { key: 'wordpress-administration', href: '/training/wordpress-administration/', icon: <Globe className="w-5 h-5" /> },
  { key: 'php-development', href: '/training/php-development/', icon: <Code className="w-5 h-5" /> },
]

const inr = (n: number) => '₹' + n.toLocaleString('en-IN')
const TOTAL_FEE = Object.values(trainingData).reduce(
  (sum, d) => sum + Number(d.price.replace(/[^0-9]/g, '')),
  0
)
const BUNDLE_FEE = 55000
const BUNDLE_SAVINGS = TOTAL_FEE - BUNDLE_FEE
// Limited-time bundle offer — edit this date to reset the 30-day window (IST end-of-day).
const OFFER_END = new Date('2026-08-15T23:59:59+05:30').getTime()

function BundleCountdown() {
  const [remaining, setRemaining] = useState<number | null>(null)

  useEffect(() => {
    const tick = () => setRemaining(OFFER_END - Date.now())
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  // Avoid hydration mismatch: render nothing until the client clock is read.
  if (remaining === null) return null
  if (remaining <= 0) return null

  const s = Math.floor(remaining / 1000)
  const units = [
    { label: 'Days', value: Math.floor(s / 86400) },
    { label: 'Hours', value: Math.floor((s % 86400) / 3600) },
    { label: 'Mins', value: Math.floor((s % 3600) / 60) },
    { label: 'Secs', value: s % 60 },
  ]

  return (
    <div className="mb-8">
      <p className="font-mono text-xs uppercase tracking-widest text-accent mb-3">
        Limited-time offer ends in
      </p>
      <div className="flex items-center justify-center gap-3 sm:gap-4">
        {units.map((u) => (
          <div
            key={u.label}
            className="min-w-[64px] rounded-lg border border-accent/30 bg-cyber-dark/60 px-3 py-2"
          >
            <p className="text-2xl sm:text-3xl font-bold font-mono text-gray-900 dark:text-white tabular-nums">
              {String(u.value).padStart(2, '0')}
            </p>
            <p className="text-[10px] uppercase tracking-widest text-gray-500 dark:text-gray-400 font-mono">
              {u.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function TrainingPage() {
  const roadmapRef = useRef<HTMLElement | null>(null)
  const toolsRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const root = toolsRef.current
    if (!root) return

    const chips = root.querySelectorAll<HTMLElement>('.tool-chip')
    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) {
      chips.forEach((el) => el.classList.add('visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement
            window.setTimeout(() => el.classList.add('visible'), index * 50)
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.1 }
    )
    chips.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const root = roadmapRef.current
    if (!root) return

    const cards = root.querySelectorAll<HTMLElement>('.roadmap-card')
    const lines = root.querySelectorAll<HTMLElement>('.timeline-line, .timeline-line-y')
    const nodes = root.querySelectorAll<HTMLElement>('.timeline-node')

    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) {
      cards.forEach((el) => el.classList.add('visible'))
      lines.forEach((el) => el.classList.add('visible'))
      nodes.forEach((el) => el.classList.add('visible'))
      return
    }

    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement
            window.setTimeout(() => {
              el.classList.add('visible')
            }, index * 180)
            cardObserver.unobserve(el)
          }
        })
      },
      { threshold: 0.15 }
    )

    const lineObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            lineObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 }
    )

    cards.forEach((el) => cardObserver.observe(el))
    lines.forEach((el) => lineObserver.observe(el))
    nodes.forEach((el) => lineObserver.observe(el))

    return () => {
      cardObserver.disconnect()
      lineObserver.disconnect()
    }
  }, [])

  return (
    <div>
      <PageHero
        tag="Training Programs"
        title="Ethical Hacking & Cyber Security Training in"
        highlight="Indore"
        description="Hands-on, lab-based cyber security courses at our Indore training centre — taught by industry practitioners. From ethical hacking fundamentals to advanced exploitation techniques, including our 18-month Certified Information Security Expert program."
        breadcrumbs={[{ label: 'Training' }]}
      />

      {/* Program Info */}
      <section className="py-8 bg-cyber-dark relative transition-colors duration-300">
        <div className="absolute top-0 left-0 right-0 cyber-divider" />
        <div className="absolute bottom-0 left-0 right-0 cyber-divider" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-accent" />
                <span className="text-sm text-gray-600 dark:text-gray-300 font-mono">Catalogue: <span className="text-accent">{Object.values(trainingData).reduce((sum, d) => sum + d.duration.months, 0)} Months</span></span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-accent" />
                <span className="text-sm text-gray-600 dark:text-gray-300 font-mono">Courses: <span className="text-accent">{Object.keys(trainingData).length} Programs</span></span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="hidden lg:inline text-sm text-gray-500 dark:text-gray-400 font-mono">
                Certified Information Security Expert Program
              </span>
              <a
                href="/Course-Brochure.pdf"
                download
                aria-label="Download Armour Infosec course brochure (PDF)"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent/10 border border-accent/40 text-accent text-sm font-mono hover:bg-accent/15 hover:border-accent hover:shadow-[0_0_18px_var(--color-accent-glow)] transition-all"
              >
                <Download className="w-4 h-4" aria-hidden="true" />
                Download Brochure
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/20 to-slate-100 dark:from-[#050816] dark:via-[#071120] dark:to-[#02040a] transition-colors duration-300">
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[120px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12">
            <span className="font-mono text-xs text-accent uppercase tracking-widest">// Course Catalog</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">All Training Programs</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-3 max-w-2xl">
              Industry-relevant courses with hands-on lab environments. Each course can be taken independently or as part of the complete CISE program.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, i) => {
              const data = trainingData[course.key]
              return (
                <GlowCard key={course.key} delay={i * 0.06}>
                  <Link href={course.href} className="relative block group h-full flex flex-col">
                    {course.isNew && (
                      <span className="absolute -top-3 -right-3 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-accent text-white shadow-md shadow-accent/30 z-10">
                        New
                      </span>
                    )}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-accent/10 border border-accent/30 rounded text-accent text-xs font-mono">
                          {data.level}
                        </span>
                        <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-cyber-border rounded text-gray-500 dark:text-gray-400 text-xs font-mono flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {formatDurationShort(data.duration)}
                        </span>
                      </div>
                      <div className="w-8 h-8 flex items-center justify-center rounded bg-accent/10 border border-accent/20 text-accent">
                        {course.icon}
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-accent transition-colors leading-tight">
                      {data.title} {data.highlight}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed flex-1 mb-4">
                      {data.description}
                    </p>

                    <div className="relative pt-4 mt-auto">
                      <div className="absolute top-0 left-0 right-0 cyber-divider" />
                      <div className="flex items-center justify-between">
                        <div className="flex items-baseline gap-2">
                          <span className="text-accent text-base font-bold font-mono">{data.price}</span>
                          <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">· {data.modules.length} modules</span>
                        </div>
                        <span className="inline-flex items-center text-accent text-sm font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                          View Curriculum <ArrowRight className="w-4 h-4 ml-1" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </GlowCard>
              )
            })}
          </div>
        </div>
      </section>

      {/* Complete Program Bundle */}
      <section className="py-16 bg-cyber-dark relative transition-colors duration-300">
        <div className="absolute top-0 left-0 right-0 cyber-divider" />
        <div className="absolute bottom-0 left-0 right-0 cyber-divider" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-accent/30 bg-accent/5 p-8 sm:p-10 text-center">
            <span className="font-mono text-xs text-accent uppercase tracking-widest">// All-in-One</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mt-2 mb-2">
              Complete Program Bundle
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8">
              Enrol in all {Object.keys(trainingData).length} courses together and save.
            </p>
            <BundleCountdown />
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 mb-8">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-mono mb-1">Total Value</p>
                <p className="text-xl sm:text-2xl font-medium text-gray-400 dark:text-gray-500 line-through">{inr(TOTAL_FEE)}</p>
              </div>
              <div>
                <p className="text-xs text-accent font-mono mb-1">Bundle Fee</p>
                <p className="text-3xl sm:text-4xl font-bold text-accent">{inr(BUNDLE_FEE)}</p>
              </div>
              <div className="inline-flex items-center rounded-full border border-accent/40 bg-accent/10 px-4 py-2">
                <span className="text-accent font-bold font-mono text-sm">Save {inr(BUNDLE_SAVINGS)}</span>
              </div>
            </div>
            <Link
              href="/contact/"
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 font-semibold text-white hover:bg-accent-dim transition-all"
            >
              Enrol in Complete Program <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Learning Roadmap */}
      <section ref={roadmapRef} className="py-24 relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/20 to-slate-100 dark:from-[#050816] dark:via-[#071120] dark:to-[#02040a] transition-colors duration-300">
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <span className="font-mono text-xs text-accent uppercase tracking-widest">// Structured Roadmap</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mt-2">Your Learning Path</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-3 max-w-2xl mx-auto leading-relaxed">
              From zero to job-ready penetration tester — in three structured phases.
            </p>
          </AnimatedSection>

          <div className="relative">
            {/* Desktop connector — scaleX draw-in via .timeline-line + continuous sweep via .roadmap-line.
                Positioned along the top edge of the card row with z-10 so it sits above the
                cards (the grid creates a stacking context and would otherwise occlude the line). */}
            <div
              aria-hidden="true"
              className="hidden lg:block absolute -top-px left-[8%] right-[8%] h-px roadmap-line timeline-line z-10"
            />
            {/* Three glowing phase-junction nodes — pop in then pulse via .timeline-node.visible.
                Centered on the card row's top edge (12px nodes, -top-1.5 = -6px). */}
            <div aria-hidden="true" className="hidden lg:block absolute -top-1.5 left-[calc(16.66%-6px)] w-3 h-3 rounded-full bg-accent timeline-node z-10" />
            <div aria-hidden="true" className="hidden lg:block absolute -top-1.5 left-[calc(50%-6px)] w-3 h-3 rounded-full bg-accent timeline-node z-10" />
            <div aria-hidden="true" className="hidden lg:block absolute -top-1.5 left-[calc(83.33%-6px)] w-3 h-3 rounded-full bg-accent timeline-node z-10" />

            <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
              {ROADMAP_PHASES.map((phase) => (
                <article key={phase.num} className="roadmap-card surface-card surface-card-hover elevation-2 h-full flex flex-col p-6 sm:p-7">
                    <header className="flex items-start justify-between gap-4 mb-5">
                      <div>
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider border ${phase.levelStyle}`}>
                          <span className="w-1.5 h-1.5 rounded-full bg-current" aria-hidden="true" />
                          {phase.level}
                        </span>
                      </div>
                      <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-accent/10 border border-accent/20 text-accent shrink-0">
                        {phase.icon}
                      </div>
                    </header>

                    <div className="font-mono text-5xl sm:text-6xl font-bold gradient-text leading-none tabular-nums mb-3 phase-number-glow">
                      {phase.num}
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      Phase {phase.num} — {phase.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4">
                      {phase.description}
                    </p>

                    <div className="flex items-center gap-2 mb-5 text-xs font-mono text-accent uppercase tracking-wider">
                      <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Est. Progression: {phase.duration}</span>
                    </div>

                    <div className="relative pt-4 mt-auto">
                      <div className="absolute top-0 left-0 right-0 cyber-divider" aria-hidden="true" />
                      <ul className="space-y-1 mt-3">
                        {phase.courses.map((course) => (
                          <li key={course.slug}>
                            <Link
                              href={`/training/${course.slug}/`}
                              className="group flex items-center gap-2 px-2 py-1.5 -mx-2 rounded-md text-sm text-gray-700 dark:text-gray-300 hover:text-accent hover:bg-accent/5 dark:hover:bg-white/[0.04] transition-colors"
                            >
                              <ChevronRight className="w-3.5 h-3.5 shrink-0 text-accent/60 group-hover:text-accent group-hover:translate-x-0.5 transition-all" aria-hidden="true" />
                              <span className="leading-snug">{course.label}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
              ))}
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/training/roadmap/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-white font-semibold hover:shadow-[0_0_24px_var(--color-accent-glow)] hover:-translate-y-0.5 transition-all"
            >
              Explore the interactive roadmap
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Hacker's Arsenal — tools showcase */}
      <section ref={toolsRef} className="py-24 relative overflow-hidden bg-white dark:bg-[#050816] transition-colors duration-300">
        <div className="absolute bottom-1/4 left-1/3 w-[300px] h-[300px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <span className="font-mono text-xs text-accent uppercase tracking-widest">// Hacker&apos;s Arsenal</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mt-2">Tools You&apos;ll Master</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-3 max-w-2xl mx-auto leading-relaxed">
              Industry-standard offensive tools — learned from the ground up, not just clicked through.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/30 text-accent text-xs font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" aria-hidden="true" />
              Hands-on Labs Included
            </div>
          </AnimatedSection>

          <div className="space-y-10">
            {TOOL_CATEGORIES.map((cat) => (
              <div key={cat.title}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-accent/10 border border-accent/20 text-accent shrink-0">
                    {cat.icon}
                  </div>
                  <div className="min-w-0">
                    <span className="font-mono text-[10px] text-accent uppercase tracking-widest">{cat.eyebrow}</span>
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white leading-tight">{cat.title}</h3>
                  </div>
                  <div aria-hidden="true" className="hidden sm:block flex-1 h-px bg-gradient-to-r from-accent/20 to-transparent ml-2" />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5">
                  {cat.tools.map((tool) => (
                    <div
                      key={tool}
                      className="tool-chip group flex items-center gap-2 px-3 py-2.5 rounded-lg bg-white/70 dark:bg-white/[0.03] border border-gray-200 dark:border-cyber-border text-gray-700 dark:text-gray-300 backdrop-blur-sm"
                    >
                      <span className="font-mono text-xs text-accent/60 group-hover:text-accent transition-colors" aria-hidden="true">{'>'}</span>
                      <span className="text-sm font-medium truncate">{tool}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Train With Us */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-b from-white to-slate-50 dark:from-[#0a0e17] dark:to-[#060911] transition-colors duration-300">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <span className="font-mono text-xs text-accent uppercase tracking-widest">// Why Choose Us</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">Practical, Hands-On Learning</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-3 max-w-xl mx-auto">Industry-leading training methodology with real-world lab environments.</p>
          </AnimatedSection>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Monitor className="w-8 h-8" />, title: 'Lab Access', desc: 'Dedicated virtual lab environments with 24/7 access for hands-on practice and skill development.' },
              { icon: <Users className="w-8 h-8" />, title: 'Expert Instructors', desc: 'Learn from active security practitioners with real-world penetration testing and consulting experience.' },
              { icon: <Award className="w-8 h-8" />, title: 'Certifications', desc: 'Preparation for OSCP+, CEH, CRTP, eWPT, and other industry-recognized security certifications.' },
              { icon: <BookOpen className="w-8 h-8" />, title: 'Job Assistance', desc: 'Career guidance, resume review, interview prep, and placement support for course graduates.' },
            ].map((item) => (
              <StaggerItem key={item.title}>
                <div className="group text-center p-6 rounded-xl bg-white/60 dark:bg-white/[0.03] border border-gray-200/60 dark:border-cyber-border backdrop-blur-md shadow-sm hover:border-accent/40 dark:hover:border-accent/30 hover:bg-white/80 dark:hover:bg-white/[0.07] hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                  <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-xl bg-accent/10 border border-accent/20 text-accent group-hover:bg-accent/15 transition-colors">
                    {item.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-accent transition-colors">{item.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <CTASection
        title="Ready to Start Your Security Journey?"
        description="Enroll in our 18-month CISE program or take individual courses. Corporate training packages available."
        primaryLabel="Enroll Now"
        primaryHref="/contact/"
        secondaryLabel="Corporate Training"
        secondaryHref="/contact/"
      />
    </div>
  )
}
