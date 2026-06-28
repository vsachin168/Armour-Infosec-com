/**
 * Curated cybersecurity learning path — the tier grouping, ordering,
 * per-course colour and which side of the spine each course sits on.
 *
 * This is curation, not raw course content: every other fact (modules,
 * level, module count, route) is pulled from `trainingData` by `key`.
 * Shared by the interactive page (`CybersecurityRoadmap`) and the
 * print PDF generator (`scripts/build-roadmap-pdf.ts`) so both stay in sync.
 */

export type RoadmapCourse = {
  key?: string // trainingData key — pulls modules/level/route
  name: string
  color: string
  side?: 'left' | 'right'
  // literal overrides (used by the CISE capstone, which has no trainingData entry)
  modules?: string[]
  level?: string
  href?: string
}

export type RoadmapTier = {
  id: string
  label: string
  accent: string // solid colour for modal / PDF theming
  pill: string // gradient for the tier pill background (web only)
  core?: boolean // single centred node (Core Offensive Security)
  courses: RoadmapCourse[]
}

export const ROADMAP_TIERS: RoadmapTier[] = [
  {
    id: '01',
    label: 'Foundation',
    accent: '#16a34a',
    pill: 'linear-gradient(135deg,#16a34a,#0d9488)',
    courses: [
      { key: 'windows-infrastructure', name: 'Enterprise Windows Infrastructure Security', color: '#2563eb', side: 'left' },
      { key: 'linux-administration', name: 'Linux Administration & Server Hardening', color: '#16a34a', side: 'right' },
      { key: 'php-development', name: 'Secure PHP Development', color: '#7c3aed', side: 'left' },
      { key: 'wordpress-administration', name: 'Secure WordPress Administration', color: '#0d9488', side: 'right' },
      { key: 'python-security', name: 'Python for Security Professionals', color: '#d97706', side: 'left' },
    ],
  },
  {
    id: '02',
    label: 'Core Offensive Security',
    accent: '#2563eb',
    pill: 'linear-gradient(135deg,#2563eb,#2f6bff)',
    core: true,
    courses: [
      { key: 'ethical-hacking', name: 'Certified Ethical Hacking & Penetration Testing', color: 'var(--color-accent)' },
    ],
  },
  {
    id: '03',
    label: 'Specializations',
    accent: '#7c3aed',
    pill: 'linear-gradient(135deg,#7c3aed,#c026d3)',
    courses: [
      { key: 'wireless-security', name: 'Wireless Security & WiFi Pentesting', color: '#0891b2', side: 'left' },
      { key: 'active-directory-security', name: 'Active Directory Security & Enterprise Attacks', color: '#4338ca', side: 'right' },
      { key: 'web-application-security', name: 'Advanced Web Application Security', color: '#e11d48', side: 'left' },
      { key: 'api-security', name: 'API Security & Advanced Exploitation', color: '#ea580c', side: 'right' },
      { key: 'mobile-application-penetration-testing', name: 'Mobile Application Penetration Testing', color: '#c026d3', side: 'left' },
      { key: 'ai-ml-penetration-testing', name: 'AI/ML Penetration Testing', color: '#059669', side: 'right' },
    ],
  },
]

export const ROADMAP_CAPSTONE: RoadmapCourse = {
  name: 'Certified Information Security Expert',
  color: 'var(--color-accent)',
  level: '18 months · all tracks',
  href: '/training/',
  modules: ['All Foundation tracks', 'Core Offensive Security', 'All Specialization tracks', 'Capstone Project & Final Exam'],
}
