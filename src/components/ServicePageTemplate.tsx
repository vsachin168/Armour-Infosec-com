'use client'

import { usePathname } from 'next/navigation'
import { PageHero } from '@/components/ui/PageHero'
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection'
import { MethodologyStep } from '@/components/ui/MethodologyStep'
import { GlowCard } from '@/components/ui/GlowCard'
import { FAQ } from '@/components/ui/FAQ'
import { CTASection } from '@/components/ui/CTASection'
import { Terminal } from '@/components/Terminal'
import { LifecycleWheel } from '@/components/ui/LifecycleWheel'
import { businessName, businessUrl } from '@/lib/businessInfo'
import { Shield, Target, FileText, Building2, CheckCircle2 } from 'lucide-react'

export interface ServicePageData {
  slug: string
  tag: string
  title: string
  highlight: string
  description: string
  overview: string
  methodology: { title: string; description: string }[]
  lifecycle: { title: string; description: string }[]
  tools: string[]
  deliverables: string[]
  industries: string[]
  benefits: { title: string; description: string }[]
  faqs: { question: string; answer: string }[]
}

export function ServicePageTemplate({ data }: { data: ServicePageData }) {
  const pathname = usePathname() || '/services/'
  const normalisedPath = pathname.endsWith('/') ? pathname : `${pathname}/`
  const serviceUrl = `${businessUrl}${normalisedPath}`
  const fullTitle = `${data.title} ${data.highlight}`.trim()

  // Build breadcrumb hierarchy from the actual URL segments so nested routes
  // (e.g. /services/penetration-testing/web-application-penetration-testing/)
  // resolve to three crumbs instead of two.
  const segments = normalisedPath.split('/').filter(Boolean) // ['services', 'penetration-testing', 'web-app-...']
  const crumbs: { name: string; item: string }[] = [
    { name: 'Home', item: `${businessUrl}/` },
  ]
  let runningPath = ''
  segments.forEach((seg, i) => {
    runningPath += `/${seg}`
    const isLast = i === segments.length - 1
    crumbs.push({
      name: isLast
        ? fullTitle
        : seg
            .split('-')
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(' '),
      item: `${businessUrl}${runningPath}/`,
    })
  })

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: fullTitle,
    description: data.description,
    url: serviceUrl,
    serviceType: data.tag,
    provider: {
      '@type': 'Organization',
      '@id': `${businessUrl}/#organization`,
      name: businessName,
      url: businessUrl,
    },
    areaServed: [
      { '@type': 'City', name: 'Indore' },
      { '@type': 'AdministrativeArea', name: 'Madhya Pradesh' },
      { '@type': 'Country', name: 'India' },
    ],
    offers: {
      '@type': 'Offer',
      url: `${businessUrl}/contact/`,
      availability: 'https://schema.org/InStock',
    },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: c.item,
    })),
  }

  const faqSchema = data.faqs && data.faqs.length > 0
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: data.faqs.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: { '@type': 'Answer', text: f.answer },
        })),
      }
    : null

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <PageHero
        tag={data.tag}
        title={data.title}
        highlight={data.highlight}
        description={data.description}
        breadcrumbs={[
          { label: 'Services', href: '/services/' },
          { label: data.title + ' ' + data.highlight },
        ]}
      />

      {/* Overview */}
      <section className="py-20 bg-cyber-dark transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <span className="font-mono text-xs text-accent uppercase tracking-widest">// Overview</span>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-2 mb-6">Service Overview</h2>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-lg">{data.overview}</p>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <Terminal title={`${data.slug}--scan`}>
                <div className="space-y-2 text-xs sm:text-sm">
                  <p><span className="text-accent">$</span> armour --module {data.slug}</p>
                  <p className="text-gray-500 dark:text-gray-400">[*] Loading {data.tag} module...</p>
                  <p className="text-gray-500 dark:text-gray-400">[*] {data.tools.length} tools available</p>
                  <p className="text-yellow-600 dark:text-yellow-400">[!] {data.methodology.length}-phase methodology loaded</p>
                  <p className="text-green-600 dark:text-green-400">[+] Ready for engagement</p>
                  <p className="text-green-600 dark:text-green-400">[+] Deliverables: {data.deliverables.length} items</p>
                  <p><span className="text-accent">$</span> <span className="animate-terminal-blink">_</span></p>
                </div>
              </Terminal>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="py-20 bg-cyber-darker transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <span className="font-mono text-xs text-accent uppercase tracking-widest">// Methodology</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-2 mb-12">Our Approach</h2>
          </AnimatedSection>
          <div className="grid lg:grid-cols-2 gap-x-16">
            <div>
              {data.methodology.slice(0, Math.ceil(data.methodology.length / 2)).map((step, i) => (
                <MethodologyStep
                  key={i}
                  number={i + 1}
                  title={step.title}
                  description={step.description}
                  delay={i * 0.1}
                />
              ))}
            </div>
            <div>
              {data.methodology.slice(Math.ceil(data.methodology.length / 2)).map((step, i) => (
                <MethodologyStep
                  key={i}
                  number={i + Math.ceil(data.methodology.length / 2) + 1}
                  title={step.title}
                  description={step.description}
                  delay={i * 0.1}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tools & Technologies */}
      <section className="py-20 bg-cyber-dark transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <span className="font-mono text-xs text-accent uppercase tracking-widest">// Arsenal</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-2 mb-8">Tools & Technologies</h2>
          </AnimatedSection>
          <StaggerContainer className="flex flex-wrap gap-3">
            {data.tools.map((tool) => (
              <StaggerItem key={tool}>
                <span className="inline-flex items-center px-4 py-2 bg-white dark:bg-cyber-card border border-gray-200 dark:border-cyber-border rounded-lg text-sm text-gray-700 dark:text-gray-300 font-mono hover:border-accent/40 hover:text-accent transition-all cursor-default">
                  {tool}
                </span>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Assessment Lifecycle */}
      <section className="py-16 sm:py-24 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <LifecycleWheel phases={data.lifecycle} />
        </div>
      </section>

      {/* Deliverables & Industries */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-b from-slate-50 to-white dark:from-[#060911] dark:to-[#0a0e17] transition-colors duration-300">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent/3 dark:bg-accent/5 rounded-full blur-[120px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <AnimatedSection>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-accent/10 border border-accent/20">
                  <FileText className="w-5 h-5 text-accent" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Deliverables</h2>
              </div>
              <ul className="space-y-3">
                {data.deliverables.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent/5 transition-colors">
                    <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                    <span className="text-gray-600 dark:text-gray-300 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-accent/10 border border-accent/20">
                  <Building2 className="w-5 h-5 text-accent" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Industries Served</h2>
              </div>
              <StaggerContainer className="grid grid-cols-2 gap-3">
                {data.industries.map((industry) => (
                  <StaggerItem key={industry}>
                    <div className="surface-card surface-card-hover group p-4 text-sm text-gray-700 dark:text-gray-200 text-center font-medium transition-all duration-300">
                      {industry}
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-cyber-darker transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="flex items-center gap-3 mb-8">
              <Shield className="w-6 h-6 text-accent" />
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Key Benefits</h2>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.benefits.map((benefit, i) => (
              <GlowCard key={i} delay={i * 0.1}>
                <h3 className="text-gray-900 dark:text-white font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{benefit.description}</p>
              </GlowCard>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/20 to-slate-100 dark:from-[#050816] dark:via-[#071120] dark:to-[#02040a] transition-colors duration-300">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[150px]" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <span className="font-mono text-xs text-accent uppercase tracking-widest">// FAQ</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">Frequently Asked Questions</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-3 max-w-xl mx-auto">Common questions about our services, methodology, and engagement process.</p>
          </AnimatedSection>
          <FAQ items={data.faqs} />
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Ready to Get Started?"
        description="Contact our team to discuss your security requirements and receive a customized proposal."
        primaryLabel="Request Assessment"
        primaryHref="/contact/"
        secondaryLabel="View All Services"
        secondaryHref="/services/"
      />
    </div>
  )
}
