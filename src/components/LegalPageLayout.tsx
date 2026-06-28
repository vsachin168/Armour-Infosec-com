import type { ReactNode } from 'react'
import { Button } from '@/components/Button'

export interface LegalSection {
  id: string
  heading: string
  body: ReactNode
}

interface LegalPageLayoutProps {
  tag: string
  title: string
  description: string
  lastUpdated: string
  sections: LegalSection[]
}

export function LegalPageLayout({ tag, title, description, lastUpdated, sections }: LegalPageLayoutProps) {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="hero-glow py-20 relative overflow-hidden transition-colors duration-300 bg-gradient-to-b from-slate-50 to-white dark:from-[#050816] dark:to-[#0a0e17]">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block font-mono text-xs text-accent uppercase tracking-widest mb-4">
            {tag}
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-5 leading-tight">
            {title}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed mb-6">
            {description}
          </p>
          <p className="font-mono text-xs text-slate-500 dark:text-slate-500">
            Last updated: {lastUpdated}
          </p>
        </div>
      </section>

      {/* Content + sticky TOC */}
      <section className="py-16 relative overflow-hidden bg-gradient-to-b from-white to-slate-50 dark:from-[#0a0e17] dark:to-[#060911] transition-colors duration-300">
        <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-accent/3 dark:bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[240px_minmax(0,1fr)] gap-10 lg:gap-16">
            {/* Sticky TOC */}
            <aside className="hidden lg:block">
              <nav className="sticky top-24" aria-label="On this page">
                <h2 className="font-mono text-xs text-accent uppercase tracking-widest mb-4">
                  // On This Page
                </h2>
                <ul className="space-y-1">
                  {sections.map((s) => (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        className="block py-1.5 pl-3 -ml-px text-sm text-slate-600 dark:text-slate-400 hover:text-accent border-l-2 border-transparent hover:border-accent transition-colors leading-snug"
                      >
                        {s.heading}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>

            {/* Content */}
            <article className="surface-card elevation-1 p-6 sm:p-10 max-w-none">
              {sections.map((s, i) => (
                <section
                  key={s.id}
                  id={s.id}
                  className={`scroll-mt-28 ${i > 0 ? 'mt-12 pt-12 border-t border-slate-200 dark:border-slate-800/60' : ''}`}
                >
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-5 flex items-baseline gap-3">
                    <span className="font-mono text-base text-accent tabular-nums">
                      {String(i + 1).padStart(2, '0')}.
                    </span>
                    <span>{s.heading}</span>
                  </h2>
                  <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-[15px]">
                    {s.body}
                  </div>
                </section>
              ))}
            </article>
          </div>
        </div>
      </section>

      {/* Contact prompt */}
      <section className="py-16 relative overflow-hidden bg-gradient-to-b from-slate-50 to-white dark:from-[#060911] dark:to-[#0a0e17] transition-colors duration-300">
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
            Questions about this document?
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
            Reach our team for clarifications, data-subject requests, or any concern related to your use of Armour Infosec services.
          </p>
          <Button href="/contact/" variant="secondary" size="lg">
            Contact Us
          </Button>
        </div>
      </section>
    </div>
  )
}
