import type { Metadata } from 'next'
import { Download } from 'lucide-react'
import { PageHero } from '@/components/ui/PageHero'
import { CTASection } from '@/components/ui/CTASection'
import { CybersecurityRoadmap } from '@/components/ui/CybersecurityRoadmap'
import { trainingData } from '@/data/training'
import { businessUrl as SITE_URL } from '@/lib/businessInfo'

export const metadata: Metadata = {
  title: 'Cybersecurity Roadmap — Guided Learning Path | Armour Infosec',
  description:
    'An interactive cybersecurity learning roadmap from Armour Infosec, Indore — start at the fundamentals (Windows, Linux, Python, web) and progress through ethical hacking and advanced specializations toward the CISE expert program. Explore the full module path of every course.',
  keywords: [
    'cybersecurity roadmap',
    'ethical hacking learning path',
    'penetration testing course roadmap',
    'cybersecurity course path Indore',
    'CISE program',
    'how to become a penetration tester',
    'cyber security training roadmap India',
  ],
  alternates: { canonical: `${SITE_URL}/training/roadmap/` },
}

const COURSE_COUNT = Object.keys(trainingData).length
const MODULE_COUNT = Object.values(trainingData).reduce((n, d) => n + d.modules.length, 0)

// ItemList JSON-LD for the curated learning path
const itemListJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Armour Infosec Cybersecurity Learning Roadmap',
  description:
    'A guided progression through every Armour Infosec cybersecurity course, from fundamentals to advanced specializations.',
  numberOfItems: COURSE_COUNT,
  itemListElement: Object.entries(trainingData).map(([key, d], i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: d.tag,
    url: `${SITE_URL}/training/${key}/`,
  })),
}

export default function CybersecurityRoadmapPage() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      <PageHero
        tag="// learning path"
        title="Your Cybersecurity"
        highlight="Roadmap"
        description={`One guided path through all ${COURSE_COUNT} Armour Infosec courses and ${MODULE_COUNT} modules — start at the fundamentals and work toward the CISE expert program. Click any course or tier to explore its full module roadmap.`}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Training', href: '/training/' },
          { label: 'Roadmap' },
        ]}
      />

      <section className="py-20 sm:py-24 relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/20 to-slate-100 dark:from-[#050816] dark:via-[#071120] dark:to-[#02040a] transition-colors duration-300">
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center mb-12">
            <a
              href="/Cybersecurity-Roadmap.pdf"
              download
              aria-label="Download the cybersecurity roadmap as a printable PDF"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-white font-semibold hover:shadow-[0_0_24px_var(--color-accent-glow)] hover:-translate-y-0.5 transition-all"
            >
              <Download className="w-4 h-4" />
              Download Roadmap (PDF)
            </a>
          </div>
          <CybersecurityRoadmap />
        </div>
      </section>

      <CTASection
        title="Not sure where to start?"
        description="Talk to our team and we'll map the right path for your goals — from your first foundation course to the full CISE program."
        primaryLabel="Talk to an Advisor"
        primaryHref="/contact/"
        secondaryLabel="Download Brochure"
        secondaryHref="/Course-Brochure.pdf"
        secondaryDownload
      />
    </div>
  )
}
