'use client'

import Link from 'next/link'
import { PageHero } from '@/components/ui/PageHero'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { GlowCard } from '@/components/ui/GlowCard'
import { CTASection } from '@/components/ui/CTASection'
import { Brain, Globe, Code, Smartphone, Network, Cloud, ArrowRight } from 'lucide-react'

const subServices = [
  {
    icon: <Brain className="w-6 h-6" />,
    title: 'AI/ML Penetration Testing',
    description: 'Adversarial attacks against ML models, LLM prompt-injection, training-data poisoning, and AI supply-chain risk — aligned to OWASP LLM and ML Top 10.',
    href: '/services/penetration-testing/ai-ml-penetration-testing/',
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: 'Web Application Penetration Testing',
    description: 'OWASP Top 10, business-logic flaws, authentication and session attacks, SSRF, XXE, and full web-stack exploitation by hand and at scale.',
    href: '/services/penetration-testing/web-application-penetration-testing/',
  },
  {
    icon: <Code className="w-6 h-6" />,
    title: 'API Penetration Testing',
    description: 'REST, GraphQL, gRPC, and SOAP testing against the OWASP API Security Top 10 — BOLA, BFLA, mass assignment, JWT flaws, rate-limit bypass.',
    href: '/services/penetration-testing/api-penetration-testing/',
  },
  {
    icon: <Smartphone className="w-6 h-6" />,
    title: 'Mobile Application Penetration Testing',
    description: 'iOS and Android testing against OWASP MASVS / MASTG — static, dynamic, reverse engineering, pinning bypass, and runtime manipulation.',
    href: '/services/penetration-testing/mobile-application-penetration-testing/',
  },
  {
    icon: <Network className="w-6 h-6" />,
    title: 'Internal & External Network Penetration Testing',
    description: 'Perimeter and internal network testing — relay attacks, AD-aware lateral movement, segmentation review, and assumed-breach scenarios.',
    href: '/services/penetration-testing/network-penetration-testing/',
  },
  {
    icon: <Cloud className="w-6 h-6" />,
    title: 'Cloud Penetration Testing',
    description: 'AWS, Azure, and GCP attack-surface review — IAM misconfiguration, privilege escalation, exposed services, and cloud-native exploitation paths.',
    href: '/services/penetration-testing/cloud-penetration-testing/',
  },
]

export default function PenetrationTestingHubPage() {
  return (
    <div>
      <PageHero
        tag="Penetration Testing"
        title="Real-World Attack"
        highlight="Simulation"
        description="Specialised penetration testing across every layer of the modern attack surface — from AI/ML models to cloud infrastructure. Each engagement follows PTES, OWASP, and NIST methodology with full manual depth."
        breadcrumbs={[
          { label: 'Services', href: '/services/' },
          { label: 'Penetration Testing' },
        ]}
      />

      <section className="py-24 bg-cyber-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12">
            <span className="font-mono text-xs text-accent uppercase tracking-widest">// Choose Your Engagement</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">Six Specialised Pentest Disciplines</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-3 max-w-2xl">
              Each pentest type is scoped, executed, and reported by a practitioner team with deep expertise in that specific attack surface.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subServices.map((service, i) => (
              <GlowCard key={service.title} delay={i * 0.05}>
                <Link href={service.href} className="block group h-full flex flex-col">
                  <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-accent/10 border border-accent/20 text-accent mb-4 group-hover:bg-accent/20 transition-colors">
                    {service.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-accent transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4 flex-1">
                    {service.description}
                  </p>
                  <span className="inline-flex items-center text-accent text-sm font-mono group-hover:translate-x-1 transition-transform">
                    Explore <ArrowRight className="w-4 h-4 ml-1" />
                  </span>
                </Link>
              </GlowCard>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Need a Scoping Call?"
        description="Tell us about your environment and threat model. We&apos;ll recommend the right combination of tests and timelines."
        primaryLabel="Request Assessment"
        primaryHref="/contact/"
        secondaryLabel="View All Services"
        secondaryHref="/services/"
      />
    </div>
  )
}
