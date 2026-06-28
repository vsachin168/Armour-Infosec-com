'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useTheme } from './ThemeProvider'
import { BusinessAddress } from './BusinessAddress'
import { businessEmail, businessPhone, telUrl } from '@/lib/businessInfo'

const footerLinks = {
  services: [
    { href: '/services/penetration-testing/', label: 'Penetration Testing' },
    { href: '/services/vulnerability-assessment/', label: 'Vulnerability Assessment' },
    { href: '/services/penetration-testing/network-penetration-testing/', label: 'Network Security' },
    { href: '/services/penetration-testing/web-application-penetration-testing/', label: 'Web Application Security' },
    { href: '/services/digital-forensics-incident-response/', label: 'Digital Forensics' },
  ],
  training: [
    { href: '/training/ai-ml-penetration-testing/', label: 'AI/ML Penetration Testing' },
    { href: '/training/ethical-hacking/', label: 'Certified Ethical Hacking & Penetration Testing' },
    { href: '/training/web-application-security/', label: 'Advanced Web Application Security Testing' },
    { href: '/training/mobile-application-penetration-testing/', label: 'Mobile Application Penetration Testing' },
  ],
  company: [
    { href: '/about/', label: 'About Us' },
    { href: '/contact/', label: 'Contact' },
    { href: '/faq/', label: 'FAQs' },
    { href: '/sitemap/', label: 'Sitemap' },
  ],
}

const FOOTER_LINK_CLASS = 'block text-sm leading-snug text-gray-500 dark:text-gray-400 hover:text-accent focus-visible:text-accent transition-colors underline decoration-transparent decoration-2 underline-offset-4 hover:decoration-accent/60'

const SOCIAL_LINKS = [
  {
    name: 'X',
    href: 'https://x.com/ArmourInfosec',
    hoverClass: 'hover:text-[#1d9bf0] hover:border-[#1d9bf0]/60 hover:shadow-[0_0_18px_rgba(29,155,240,0.25)]',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/armourinfosec/',
    hoverClass: 'hover:text-[#E4405F] hover:border-[#E4405F]/60 hover:shadow-[0_0_18px_rgba(228,64,95,0.25)]',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 01-1.38-.9 3.7 3.7 0 01-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63a5.86 5.86 0 00-2.13 1.38A5.86 5.86 0 00.63 4.14C.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.31.79.73 1.46 1.38 2.13.67.65 1.34 1.07 2.13 1.38.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.86 5.86 0 002.13-1.38c.65-.67 1.07-1.34 1.38-2.13.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.86 5.86 0 00-1.38-2.13A5.86 5.86 0 0019.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 100 12.32 6.16 6.16 0 000-12.32zm0 10.16a4 4 0 110-8 4 4 0 010 8zm6.4-11.85a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/company/armourinfosec',
    hoverClass: 'hover:text-[#0A66C2] hover:border-[#0A66C2]/60 hover:shadow-[0_0_18px_rgba(10,102,194,0.25)]',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05a3.74 3.74 0 013.37-1.85c3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 11.01-4.12 2.06 2.06 0 010 4.12zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.99 0 1.78-.77 1.78-1.72V1.72C24 .77 23.21 0 22.22 0z" />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    href: 'https://www.youtube.com/c/TheHackersWorld',
    hoverClass: 'hover:text-[#FF0033] hover:border-[#FF0033]/60 hover:shadow-[0_0_18px_rgba(255,0,51,0.25)]',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M23.5 6.2a3 3 0 00-2.12-2.12C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.38.48A3 3 0 00.5 6.2 31.5 31.5 0 000 12a31.5 31.5 0 00.5 5.8 3 3 0 002.12 2.12C4.5 20.4 12 20.4 12 20.4s7.5 0 9.38-.48a3 3 0 002.12-2.12A31.5 31.5 0 0024 12a31.5 31.5 0 00-.5-5.8zM9.6 15.6V8.4l6.24 3.6L9.6 15.6z" />
      </svg>
    ),
  },
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/armourinfosec',
    hoverClass: 'hover:text-[#1877F2] hover:border-[#1877F2]/60 hover:shadow-[0_0_18px_rgba(24,119,242,0.25)]',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M22 12a10 10 0 10-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.51 1.49-3.9 3.78-3.9 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.89h-2.33v6.99A10 10 0 0022 12z" />
      </svg>
    ),
  },
] as const

export function Footer() {
  const { resolvedTheme } = useTheme()

  return (
    <footer className="bg-gray-50 dark:bg-cyber-dark relative overflow-hidden transition-colors duration-300" role="contentinfo">
      <div className="absolute top-0 left-0 right-0 cyber-divider z-10" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <Image
                src={resolvedTheme === 'dark'
                  ? '/logo/armour-infosec-red-white.png'
                  : '/logo/armour-infosec-red-black.png'}
                alt="Armour Infosec"
                width={170}
                height={26}
                className="h-7 w-auto object-contain"
              />
            </Link>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4">
              Enterprise-grade cybersecurity consulting, penetration testing, and professional training. Securing digital assets since inception.
            </p>
            <div className="font-mono text-xs text-gray-400 dark:text-cyber-muted">
              status: <span className="text-green-600 dark:text-green-400">operational</span>
            </div>

            {/* Follow Us */}
            <div className="mt-8">
              <h3 className="font-mono text-sm font-semibold text-accent uppercase tracking-wider mb-4">
                Follow Us
              </h3>
              <ul className="flex items-center gap-2.5" aria-label="Social media links">
                {SOCIAL_LINKS.map((social) => (
                  <li key={social.name}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Armour Infosec on ${social.name} (opens in a new tab)`}
                      className={`inline-flex items-center justify-center w-9 h-9 rounded-lg bg-white/70 dark:bg-white/[0.04] border border-gray-200 dark:border-cyber-border text-gray-500 dark:text-gray-400 transition-all duration-300 ${social.hoverClass}`}
                    >
                      {social.icon}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Services */}
          <nav aria-label="Services navigation">
            <h3 className="font-mono text-sm font-semibold text-accent uppercase tracking-wider mb-4">
              Services
            </h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={FOOTER_LINK_CLASS}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Training */}
          <nav aria-label="Training navigation">
            <h3 className="font-mono text-sm font-semibold text-accent uppercase tracking-wider mb-4">
              Training
            </h3>
            <ul className="space-y-3">
              {footerLinks.training.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={FOOTER_LINK_CLASS}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company */}
          <div>
            <nav aria-label="Company navigation">
              <h3 className="font-mono text-sm font-semibold text-accent uppercase tracking-wider mb-4">
                Company
              </h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={FOOTER_LINK_CLASS}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-6 space-y-3">
              <BusinessAddress />
              <a
                href={telUrl}
                aria-label={`Call ${businessPhone.display}`}
                className="block text-sm text-accent underline decoration-transparent decoration-2 underline-offset-4 hover:decoration-accent/60 transition-colors"
              >
                {businessPhone.display}
              </a>
              <a
                href={`mailto:${businessEmail}`}
                aria-label={`Email ${businessEmail}`}
                className="block text-sm text-accent break-all underline decoration-transparent decoration-2 underline-offset-4 hover:decoration-accent/60 transition-colors"
              >
                {businessEmail}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 relative flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="absolute top-0 left-0 right-0 cyber-divider" />
          <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">
            &copy; {new Date().getFullYear()} Armour Infosec. All rights reserved.
          </p>
          <nav aria-label="Legal" className="flex items-center gap-4 text-xs">
            <Link
              href="/terms/"
              className="text-gray-500 dark:text-gray-400 hover:text-accent transition-colors underline decoration-transparent decoration-2 underline-offset-4 hover:decoration-accent/60"
            >
              Terms of Service
            </Link>
            <span aria-hidden="true" className="text-gray-300 dark:text-gray-700">·</span>
            <Link
              href="/privacy-policy/"
              className="text-gray-500 dark:text-gray-400 hover:text-accent transition-colors underline decoration-transparent decoration-2 underline-offset-4 hover:decoration-accent/60"
            >
              Privacy Policy
            </Link>
          </nav>
          <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 font-mono">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Systems Secure
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
