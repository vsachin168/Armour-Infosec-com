import type { MetadataRoute } from 'next'
import { trainingData } from '@/data/training'
import { businessUrl } from '@/lib/businessInfo'

type Freq = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'

// Service routes live as their own folders under /services/ rather than being
// derived from servicesData's `slug` field — slugs there are short keys, the
// URLs are the long human-readable paths. Listed explicitly to avoid drift.
const SERVICE_ROUTES = [
  '/services/',
  '/services/penetration-testing/',
  '/services/penetration-testing/web-application-penetration-testing/',
  '/services/penetration-testing/network-penetration-testing/',
  '/services/penetration-testing/api-penetration-testing/',
  '/services/penetration-testing/mobile-application-penetration-testing/',
  '/services/penetration-testing/cloud-penetration-testing/',
  '/services/penetration-testing/ai-ml-penetration-testing/',
  '/services/active-directory-security/',
  '/services/vulnerability-assessment/',
  '/services/red-team-operations/',
  '/services/security-auditing/',
  '/services/incident-response/',
  '/services/digital-forensics-incident-response/',
] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const entry = (path: string, priority: number, changeFrequency: Freq) => ({
    url: `${businessUrl}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  })

  return [
    entry('/', 1.0, 'weekly'),
    entry('/training/', 0.9, 'weekly'),
    entry('/training/roadmap/', 0.8, 'monthly'),
    entry('/services/', 0.9, 'weekly'),
    entry('/about/', 0.7, 'monthly'),
    entry('/contact/', 0.8, 'monthly'),
    entry('/faq/', 0.6, 'monthly'),

    ...Object.keys(trainingData).map((slug) =>
      entry(`/training/${slug}/`, 0.85, 'monthly'),
    ),

    ...SERVICE_ROUTES.filter((p) => p !== '/services/').map((p) =>
      entry(p, 0.75, 'monthly'),
    ),

    entry('/terms/', 0.3, 'yearly'),
    entry('/privacy-policy/', 0.3, 'yearly'),
    entry('/sitemap/', 0.2, 'monthly'),
  ]
}
