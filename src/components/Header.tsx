'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { useTheme } from './ThemeProvider'
import { ThemeToggle } from './ThemeToggle'

type NavLink = { href: string; label: string }
type NavGroup = { label?: string; href?: string; items: NavLink[] }
type NavEntry =
  | { kind: 'link'; href: string; label: string }
  | { kind: 'dropdown'; label: string; basePath: string; groups: NavGroup[] }

const nav: NavEntry[] = [
  { kind: 'link', href: '/', label: 'Home' },
  {
    kind: 'dropdown',
    label: 'Services',
    basePath: '/services',
    groups: [
      {
        label: 'Penetration Testing',
        href: '/services/penetration-testing/',
        items: [
          { href: '/services/penetration-testing/ai-ml-penetration-testing/', label: 'AI/ML Penetration Testing' },
          { href: '/services/penetration-testing/web-application-penetration-testing/', label: 'Web Application Security' },
          { href: '/services/penetration-testing/api-penetration-testing/', label: 'API Penetration Testing' },
          { href: '/services/penetration-testing/mobile-application-penetration-testing/', label: 'Mobile Application Penetration Testing' },
          { href: '/services/penetration-testing/network-penetration-testing/', label: 'Network Security' },
          { href: '/services/penetration-testing/cloud-penetration-testing/', label: 'Cloud Security' },
        ],
      },
      {
        label: 'Other Services',
        items: [
          { href: '/services/vulnerability-assessment/', label: 'Vulnerability Assessment' },
          { href: '/services/red-team-operations/', label: 'Red Team Operations' },
          { href: '/services/digital-forensics-incident-response/', label: 'Digital Forensics & Incident Response' },
          { href: '/services/incident-response/', label: 'Incident Response' },
          { href: '/services/security-auditing/', label: 'Security Auditing' },
          { href: '/services/active-directory-security/', label: 'Active Directory Security' },
        ],
      },
    ],
  },
  {
    kind: 'dropdown',
    label: 'Training',
    basePath: '/training',
    groups: [
      {
        items: [
          { href: '/training/ai-ml-penetration-testing/', label: 'AI/ML Penetration Testing' },
          { href: '/training/ethical-hacking/', label: 'Certified Ethical Hacking & Penetration Testing' },
          { href: '/training/web-application-security/', label: 'Advanced Web Application Security Testing' },
          { href: '/training/api-security/', label: 'API Security & Advanced API Exploitation' },
          { href: '/training/mobile-application-penetration-testing/', label: 'Mobile Application Penetration Testing' },
          { href: '/training/active-directory-security/', label: 'Active Directory Security & Enterprise Attacks' },
        ],
      },
      {
        items: [
          { href: '/training/wireless-security/', label: 'Wireless Security & WiFi Penetration Testing' },
          { href: '/training/python-security/', label: 'Python for Security Professionals' },
          { href: '/training/linux-administration/', label: 'Linux Administration & Server Hardening' },
          { href: '/training/windows-infrastructure/', label: 'Enterprise Windows Infrastructure Security' },
          { href: '/training/wordpress-administration/', label: 'Secure WordPress Administration' },
          { href: '/training/php-development/', label: 'Secure PHP Development' },
        ],
      },
    ],
  },
  { kind: 'link', href: '/about/', label: 'About' },
  { kind: 'link', href: '/contact/', label: 'Contact' },
]

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)
  const [desktopOpen, setDesktopOpen] = useState<string | null>(null)
  const pathname = usePathname()
  const { resolvedTheme } = useTheme()
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  // Close desktop dropdown on outside click
  useEffect(() => {
    if (!desktopOpen) return
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDesktopOpen(null)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [desktopOpen])

  // Close menus on route change
  useEffect(() => {
    setMobileOpen(false)
    setMobileExpanded(null)
    setDesktopOpen(null)
  }, [pathname])

  const isActive = (entry: NavEntry): boolean => {
    if (entry.kind === 'link') {
      if (entry.href === '/') return pathname === '/'
      return pathname.startsWith(entry.href)
    }
    return pathname.startsWith(entry.basePath)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 header-glass">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center group" aria-label="Armour Infosec Home">
            <Image
              src={resolvedTheme === 'dark'
                ? '/logo/armour-infosec-red-white.png'
                : '/logo/armour-infosec-red-black.png'}
              alt="Armour Infosec"
              width={170}
              height={26}
              priority
              className="h-7 w-auto object-contain group-hover:opacity-80 transition-opacity duration-300"
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1" ref={dropdownRef}>
            {nav.map((entry) => {
              const active = isActive(entry)
              if (entry.kind === 'link') {
                return (
                  <Link
                    key={entry.label}
                    href={entry.href}
                    className={`nav-glow relative px-3.5 py-2 text-[13px] font-medium rounded-lg transition-all duration-300 group ${
                      active
                        ? 'is-active text-accent bg-accent/8'
                        : 'text-gray-600 dark:text-gray-400 hover:text-accent dark:hover:text-accent hover:bg-accent/5'
                    }`}
                  >
                    {entry.label}
                    <span className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 h-[2px] bg-accent rounded-full transition-all duration-300 ease-out ${
                      active ? 'w-4/5' : 'w-0 group-hover:w-4/5'
                    }`} />
                  </Link>
                )
              }
              const isOpen = desktopOpen === entry.label
              return (
                <div
                  key={entry.label}
                  className="relative"
                  onMouseEnter={() => setDesktopOpen(entry.label)}
                  onMouseLeave={() => setDesktopOpen(null)}
                >
                  {/* Trigger is now a Link: clicking the label navigates to
                      the section's index page; the dropdown still opens on
                      hover via the wrapping div's onMouseEnter. */}
                  <Link
                    href={`${entry.basePath}/`}
                    aria-haspopup="menu"
                    aria-expanded={isOpen}
                    className={`nav-glow relative inline-flex items-center gap-1 px-3.5 py-2 text-[13px] font-medium rounded-lg transition-all duration-300 group ${
                      active
                        ? 'is-active text-accent bg-accent/8'
                        : 'text-gray-600 dark:text-gray-400 hover:text-accent dark:hover:text-accent hover:bg-accent/5'
                    }`}
                  >
                    {entry.label}
                    <svg className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                    <span className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 h-[2px] bg-accent rounded-full transition-all duration-300 ease-out ${
                      active ? 'w-4/5' : 'w-0 group-hover:w-4/5'
                    }`} />
                  </Link>
                  <div
                    className={`absolute right-0 top-full pt-2 z-50 transition-all duration-300 ${
                      isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-1 pointer-events-none'
                    }`}
                  >
                    <div className="w-[640px] max-w-[calc(100vw-2rem)] rounded-xl bg-white dark:bg-cyber-card border border-gray-200 dark:border-cyber-border shadow-[0_10px_30px_rgba(0,0,0,0.18)] p-6">
                      <div className="grid grid-cols-2 gap-6">
                        {entry.groups.map((group, gi) => (
                          <div key={gi}>
                            {group.label && (
                              group.href ? (
                                <Link
                                  href={group.href}
                                  className="block mb-2 text-xs font-mono font-semibold uppercase tracking-wider text-accent hover:underline"
                                >
                                  {group.label}
                                </Link>
                              ) : (
                                <p className="mb-2 text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                  {group.label}
                                </p>
                              )
                            )}
                            <ul className="space-y-0.5">
                              {group.items.map((item) => {
                                const itemActive = pathname.startsWith(item.href)
                                return (
                                  <li key={item.href}>
                                    <Link
                                      href={item.href}
                                      className={`block px-2.5 py-2 text-[13px] font-medium rounded-md transition-colors leading-snug ${
                                        itemActive
                                          ? 'text-blue-600 bg-gray-100 dark:text-accent dark:bg-accent/10'
                                          : 'text-gray-800 dark:text-slate-200 hover:text-blue-600 hover:bg-gray-100 dark:hover:text-accent dark:hover:bg-white/[0.06]'
                                      }`}
                                    >
                                      {item.label}
                                    </Link>
                                  </li>
                                )
                              })}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}

            <div className="ml-2">
              <ThemeToggle />
            </div>

            <Link
              href="/contact/"
              className="ml-3 px-4 py-2 text-[13px] font-semibold text-white bg-accent rounded-lg hover:bg-accent-dim active:scale-[0.98] transition-all duration-200"
            >
              Get Assessment
            </Link>
          </div>

          {/* Mobile controls */}
          <div className="lg:hidden flex items-center gap-1">
            <ThemeToggle />
            <button
              className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-accent hover:bg-accent/10 active:scale-95 transition-all duration-200"
              onClick={() => setMobileOpen((v) => !v)}
              aria-expanded={mobileOpen}
              aria-label="Toggle navigation menu"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="lg:hidden py-3 relative max-h-[calc(100vh-4rem)] overflow-y-auto bg-white dark:bg-cyber-darker border-t border-gray-200 dark:border-cyber-border">
            <div className="absolute top-0 left-0 right-0 cyber-divider" />
            <div className="pt-2 space-y-1">
              {nav.map((entry) => {
                const active = isActive(entry)
                if (entry.kind === 'link') {
                  return (
                    <Link
                      key={entry.label}
                      href={entry.href}
                      className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                        active
                          ? 'text-accent bg-accent/10'
                          : 'text-gray-600 dark:text-gray-300 hover:text-accent hover:bg-accent/8 active:bg-accent/15'
                      }`}
                    >
                      {entry.label}
                    </Link>
                  )
                }
                const expanded = mobileExpanded === entry.label
                return (
                  <div key={entry.label}>
                    {/* Mobile: tap the label to navigate; tap the chevron to
                        expand the accordion. Two separate hit areas in the
                        same row keep both behaviours accessible on touch. */}
                    <div className={`flex items-stretch rounded-lg transition-all duration-200 ${
                      active ? 'bg-accent/10' : 'hover:bg-accent/8'
                    }`}>
                      <Link
                        href={`${entry.basePath}/`}
                        className={`flex-1 flex items-center gap-2.5 pl-3 pr-2 py-2.5 rounded-l-lg text-sm font-medium transition-colors ${
                          active
                            ? 'text-accent'
                            : 'text-gray-600 dark:text-gray-300 hover:text-accent active:bg-accent/15'
                        }`}
                      >
                          {entry.label}
                      </Link>
                      <button
                        type="button"
                        onClick={() => setMobileExpanded(expanded ? null : entry.label)}
                        aria-expanded={expanded}
                        aria-label={`Toggle ${entry.label} submenu`}
                        className={`px-3 py-2.5 rounded-r-lg flex items-center transition-colors ${
                          active ? 'text-accent' : 'text-gray-500 dark:text-gray-400 hover:text-accent'
                        }`}
                      >
                        <svg className={`w-4 h-4 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </div>
                    <div className={`overflow-hidden transition-all duration-300 ease-out ${expanded ? 'max-h-[1200px] opacity-100' : 'max-h-0 opacity-0'}`}>
                      <div className="pl-6 pr-2 py-1 space-y-3">
                        {entry.groups.map((group, gi) => (
                          <div key={gi}>
                            {group.label && (
                              group.href ? (
                                <Link
                                  href={group.href}
                                  className="block mb-1 text-[10px] font-mono font-semibold uppercase tracking-wider text-accent"
                                >
                                  {group.label}
                                </Link>
                              ) : (
                                <p className="mb-1 text-[10px] font-mono font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                  {group.label}
                                </p>
                              )
                            )}
                            <ul className="space-y-0.5">
                              {group.items.map((item) => {
                                const itemActive = pathname.startsWith(item.href)
                                return (
                                  <li key={item.href}>
                                    <Link
                                      href={item.href}
                                      className={`block px-2.5 py-1.5 text-[13px] rounded-md transition-colors leading-snug ${
                                        itemActive
                                          ? 'text-accent bg-accent/10'
                                          : 'text-gray-700 dark:text-gray-300 hover:text-accent hover:bg-accent/5'
                                      }`}
                                    >
                                      {item.label}
                                    </Link>
                                  </li>
                                )
                              })}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              })}
              <div className="mt-3 px-3 pt-2">
                <Link
                  href="/contact/"
                  className="block w-full text-center px-4 py-2.5 text-sm font-semibold text-white bg-accent rounded-lg hover:bg-accent-dim active:scale-[0.98] transition-all duration-200"
                >
                  Get Assessment
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
