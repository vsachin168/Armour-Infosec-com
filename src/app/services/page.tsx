'use client'

import Link from 'next/link'
import { PageHero } from '@/components/ui/PageHero'
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection'
import { GlowCard } from '@/components/ui/GlowCard'
import { CTASection } from '@/components/ui/CTASection'
import { Shield, Search, Target, HardDrive, Siren, ClipboardCheck, Server, ArrowRight } from 'lucide-react'

const pentestSubTypes = [
  { label: 'AI/ML', href: '/services/penetration-testing/ai-ml-penetration-testing/' },
  { label: 'Web App', href: '/services/penetration-testing/web-application-penetration-testing/' },
  { label: 'API', href: '/services/penetration-testing/api-penetration-testing/' },
  { label: 'Mobile', href: '/services/penetration-testing/mobile-application-penetration-testing/' },
  { label: 'Network', href: '/services/penetration-testing/network-penetration-testing/' },
  { label: 'Cloud', href: '/services/penetration-testing/cloud-penetration-testing/' },
]

const services = [
  {
    icon: <Search className="w-6 h-6" />,
    title: 'Vulnerability Assessment',
    description: 'Find the vulnerabilities sitting in your stack right now. Scoped scans, manual validation, CVSS-scored, and prioritised by exploit path.',
    href: '/services/vulnerability-assessment/',
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: 'Red Team Operations',
    description: 'Simulate a real attacker for two to six weeks. We target people, infrastructure, and detection blind spots — and write up exactly how far we got.',
    href: '/services/red-team-operations/',
  },
  {
    icon: <HardDrive className="w-6 h-6" />,
    title: 'Digital Forensics & Incident Response',
    description: 'Already breached, or think you might be? We collect evidence, trace the root cause, and tell you what to keep, what to rotate, and what to rebuild.',
    href: '/services/digital-forensics-incident-response/',
  },
  {
    icon: <Siren className="w-6 h-6" />,
    title: 'Incident Response',
    description: 'Active incident? Call us. Containment, eradication, and recovery — with a written timeline of every action we took.',
    href: '/services/incident-response/',
  },
  {
    icon: <ClipboardCheck className="w-6 h-6" />,
    title: 'Security Auditing',
    description: 'Going through ISO 27001, SOC 2, or PCI DSS? Pre-audit gap assessments and remediation roadmaps, run by people who&apos;ve sat both sides of the table.',
    href: '/services/security-auditing/',
  },
  {
    icon: <Server className="w-6 h-6" />,
    title: 'Active Directory Security',
    description: 'Most enterprise breaches end in Domain Admin. We test how an attacker would get there — Kerberos, ACL paths, BloodHound — and help you close those paths.',
    href: '/services/active-directory-security/',
  },
]

export default function ServicesPage() {
  return (
    <div>
      <PageHero
        tag="Our Services"
        title="Enterprise Security"
        highlight="Solutions"
        description="Penetration testing, red-team operations, forensics, and security auditing — scoped to your stack and delivered by the same team that explains the findings to your engineers."
        breadcrumbs={[{ label: 'Services' }]}
      />

      {/* Services Grid */}
      <section className="py-24 bg-cyber-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12">
            <span className="font-mono text-xs text-accent uppercase tracking-widest">// What We Offer</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">Comprehensive Security Services</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-3 max-w-2xl">
              Pick the engagement that fits — or talk to us if you&apos;re not sure where to start.
            </p>
          </AnimatedSection>

          {/* Penetration Testing — featured parent with 6 sub-types */}
          <GlowCard delay={0}>
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              <Link href="/services/penetration-testing/" className="flex-1 min-w-0 block group">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-12 h-12 flex items-center justify-center rounded-lg bg-accent/10 border border-accent/20 text-accent group-hover:bg-accent/20 transition-colors">
                    <Shield className="w-6 h-6" />
                  </span>
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white group-hover:text-accent transition-colors">
                    Penetration Testing
                  </h3>
                </div>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-4">
                  Real-world attack simulation across every layer of your stack — from infrastructure to AI models. Pick a specialised pentest below, or explore the full discipline.
                </p>
                <span className="inline-flex items-center text-accent text-sm font-mono group-hover:translate-x-1 transition-transform">
                  Explore Penetration Testing <ArrowRight className="w-4 h-4 ml-1" />
                </span>
              </Link>
              <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2 lg:max-w-md shrink-0 lg:pt-1">
                {pentestSubTypes.map((sub) => (
                  <li key={sub.label}>
                    <Link
                      href={sub.href}
                      className="block px-3 py-2 rounded-lg bg-white/70 dark:bg-white/[0.04] border border-gray-200/70 dark:border-cyber-border text-xs font-mono text-gray-700 dark:text-gray-300 hover:border-accent/40 hover:bg-accent/5 dark:hover:bg-white/[0.07] hover:text-accent transition-all duration-200"
                    >
                      {sub.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </GlowCard>

          {/* Other services */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {services.map((service, i) => (
              <GlowCard key={service.title} delay={(i + 1) * 0.05}>
                <Link href={service.href} className="block group">
                  <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-accent/10 border border-accent/20 text-accent mb-4 group-hover:bg-accent/20 transition-colors">
                    {service.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-accent transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <span className="inline-flex items-center text-accent text-sm font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                    Explore <ArrowRight className="w-4 h-4 ml-1" />
                  </span>
                </Link>
              </GlowCard>
            ))}
          </div>
        </div>
      </section>

      {/* Process Overview */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 dark:from-[#050816] dark:via-[#071120] dark:to-[#02040a]">
        {/* Background effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[150px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <span className="font-mono text-xs text-accent uppercase tracking-widest">// Our Process</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">How We Work</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-3 max-w-xl mx-auto">A proven methodology that delivers consistent, actionable results.</p>
          </AnimatedSection>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Discovery', desc: 'Understand your environment, assets, and security requirements.' },
              { step: '02', title: 'Assessment', desc: 'Thorough testing using manual and automated approaches.' },
              { step: '03', title: 'Reporting', desc: 'Actionable findings with prioritized remediation guidance.' },
              { step: '04', title: 'Support', desc: 'Ongoing assistance with remediation and re-testing.' },
            ].map((item) => (
              <StaggerItem key={item.step}>
                <div className="group text-center p-6 rounded-xl bg-white/60 dark:bg-white/[0.03] border border-gray-200/60 dark:border-cyber-border backdrop-blur-md shadow-sm hover:border-accent/40 dark:hover:border-accent/30 hover:bg-white/80 dark:hover:bg-white/[0.07] hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                  <span className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-accent/10 dark:bg-accent/15 border border-accent/20 text-3xl font-mono font-bold gradient-text mb-4">{item.step}</span>
                  <h3 className="text-gray-900 dark:text-white font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">{item.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <CTASection
        title="Not sure which engagement you need?"
        description="Tell us what you&apos;re protecting. We&apos;ll come back with a scope, a price, and a timeline — usually within 48 hours."
        primaryLabel="Request Assessment"
        primaryHref="/contact/"
        secondaryLabel="View Training"
        secondaryHref="/training/"
      />
    </div>
  )
}
