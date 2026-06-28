import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Sitemap',
  description:
    'Browse every page on armourinfosec.com — penetration testing services, training programmes, and company information.',
  alternates: { canonical: '/sitemap/' },
}

type SitemapLink = { label: string; href: string }

const HOME_LINK: SitemapLink = { label: 'Home', href: '/' }

const PENTEST_LINKS: SitemapLink[] = [
  { label: 'Penetration Testing (overview)', href: '/services/penetration-testing/' },
  { label: 'AI/ML Penetration Testing', href: '/services/penetration-testing/ai-ml-penetration-testing/' },
  { label: 'Web Application Security', href: '/services/penetration-testing/web-application-penetration-testing/' },
  { label: 'API Penetration Testing', href: '/services/penetration-testing/api-penetration-testing/' },
  { label: 'Mobile Application Penetration Testing', href: '/services/penetration-testing/mobile-application-penetration-testing/' },
  { label: 'Network Security', href: '/services/penetration-testing/network-penetration-testing/' },
  { label: 'Cloud Security', href: '/services/penetration-testing/cloud-penetration-testing/' },
]

const OTHER_SERVICE_LINKS: SitemapLink[] = [
  { label: 'Services (overview)', href: '/services/' },
  { label: 'Red Team Operations', href: '/services/red-team-operations/' },
  { label: 'Vulnerability Assessment', href: '/services/vulnerability-assessment/' },
  { label: 'Digital Forensics & Incident Response', href: '/services/digital-forensics-incident-response/' },
  { label: 'Incident Response', href: '/services/incident-response/' },
  { label: 'Security Auditing', href: '/services/security-auditing/' },
  { label: 'Active Directory Security', href: '/services/active-directory-security/' },
]

const TRAINING_LINKS: SitemapLink[] = [
  { label: 'Training (overview)', href: '/training/' },
  { label: 'AI/ML Penetration Testing', href: '/training/ai-ml-penetration-testing/' },
  { label: 'Certified Ethical Hacking & Penetration Testing', href: '/training/ethical-hacking/' },
  { label: 'Advanced Web Application Security Testing', href: '/training/web-application-security/' },
  { label: 'API Security & Advanced API Exploitation', href: '/training/api-security/' },
  { label: 'Mobile Application Penetration Testing', href: '/training/mobile-application-penetration-testing/' },
  { label: 'Active Directory Security & Enterprise Attacks', href: '/training/active-directory-security/' },
  { label: 'Wireless Security & WiFi Penetration Testing', href: '/training/wireless-security/' },
  { label: 'Python for Security Professionals', href: '/training/python-security/' },
  { label: 'Linux Administration & Server Hardening', href: '/training/linux-administration/' },
  { label: 'Enterprise Windows Infrastructure Security', href: '/training/windows-infrastructure/' },
  { label: 'Secure WordPress Administration', href: '/training/wordpress-administration/' },
  { label: 'Secure PHP Development', href: '/training/php-development/' },
]

const COMPANY_LINKS: SitemapLink[] = [
  { label: 'About', href: '/about/' },
  { label: 'Contact', href: '/contact/' },
  { label: 'FAQ', href: '/faq/' },
]

const LEGAL_LINKS: SitemapLink[] = [
  { label: 'Privacy Policy', href: '/privacy-policy/' },
  { label: 'Terms of Service', href: '/terms/' },
]

function LinkList({ links, ariaLabel }: { links: SitemapLink[]; ariaLabel: string }) {
  return (
    <ul aria-label={ariaLabel} className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className="group flex items-center gap-2 -mx-2 px-2 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-accent hover:bg-accent/5 dark:hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-colors"
          >
            <ChevronRight
              className="w-3.5 h-3.5 text-accent/60 group-hover:text-accent group-hover:translate-x-0.5 transition-all shrink-0"
              aria-hidden="true"
            />
            <span className="leading-snug">{link.label}</span>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default function SitemapPage() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="py-16 sm:py-20 relative overflow-hidden bg-gradient-to-b from-slate-50 to-white dark:from-[#050816] dark:to-[#0a0e17]">
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block font-mono text-xs text-accent uppercase tracking-widest mb-4">
            // Site Index
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Sitemap
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Every page on armourinfosec.com, grouped by section. Looking for the SEO XML?{' '}
            <Link href="/sitemap.xml" className="text-accent hover:underline">
              View /sitemap.xml
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 sm:py-20 relative overflow-hidden bg-white dark:bg-[#0a0e17] transition-colors duration-300">
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Home */}
            <article className="p-6 sm:p-7 rounded-2xl bg-white/70 dark:bg-white/[0.03] border border-gray-200/60 dark:border-cyber-border backdrop-blur-sm">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Home</h2>
              <LinkList ariaLabel="Home" links={[HOME_LINK]} />
            </article>

            {/* Company */}
            <article className="p-6 sm:p-7 rounded-2xl bg-white/70 dark:bg-white/[0.03] border border-gray-200/60 dark:border-cyber-border backdrop-blur-sm">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Company</h2>
              <LinkList ariaLabel="Company pages" links={COMPANY_LINKS} />
            </article>

            {/* Services — spans full width on lg */}
            <article className="lg:col-span-2 p-6 sm:p-7 rounded-2xl bg-white/70 dark:bg-white/[0.03] border border-gray-200/60 dark:border-cyber-border backdrop-blur-sm">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Services</h2>
              <h3 className="font-mono text-xs text-accent uppercase tracking-widest mb-3">
                // Penetration Testing
              </h3>
              <LinkList ariaLabel="Penetration testing services" links={PENTEST_LINKS} />
              <h3 className="font-mono text-xs text-accent uppercase tracking-widest mb-3 mt-6">
                // Other Services
              </h3>
              <LinkList ariaLabel="Other security services" links={OTHER_SERVICE_LINKS} />
            </article>

            {/* Training — spans full width on lg */}
            <article className="lg:col-span-2 p-6 sm:p-7 rounded-2xl bg-white/70 dark:bg-white/[0.03] border border-gray-200/60 dark:border-cyber-border backdrop-blur-sm">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Training</h2>
              <LinkList ariaLabel="Training programmes" links={TRAINING_LINKS} />
            </article>

            {/* Legal */}
            <article className="lg:col-span-2 p-6 sm:p-7 rounded-2xl bg-white/70 dark:bg-white/[0.03] border border-gray-200/60 dark:border-cyber-border backdrop-blur-sm">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Legal</h2>
              <LinkList ariaLabel="Legal pages" links={LEGAL_LINKS} />
            </article>
          </div>
        </div>
      </section>
    </div>
  )
}
