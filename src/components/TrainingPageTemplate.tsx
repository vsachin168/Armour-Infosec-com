'use client'

import { PageHero } from '@/components/ui/PageHero'
import { AnimatedSection, StaggerContainer, StaggerItem, SlideInLeft, SlideInRight } from '@/components/ui/AnimatedSection'
import { GlowCard } from '@/components/ui/GlowCard'
import { FAQ } from '@/components/ui/FAQ'
import { CTASection } from '@/components/ui/CTASection'
import { Terminal } from '@/components/Terminal'
import { trainingData } from '@/data/training'
import { businessName, businessUrl } from '@/lib/businessInfo'
import { Clock, BarChart3, BookOpen, Award, Monitor, Users, CheckCircle2, Quote } from 'lucide-react'

export interface CourseDuration {
  months: number
  weeks: number
  hoursPerDay: number
  totalHours: number
}

export interface TrainingPageData {
  slug: string
  tag: string
  title: string
  highlight: string
  description: string
  overview: string
  duration: CourseDuration
  level: string
  prerequisites: string[]
  modules: { title: string; topics: string[] }[]
  outcomes: string[]
  labEnvironment: string[]
  certPrep: string[]
  instructor: { name: string; title: string; bio: string; certs: string[] }
  testimonials: { name: string; role: string; text: string }[]
  faqs: { question: string; answer: string }[]
}

export function formatDuration(d: CourseDuration): string {
  const months = d.months === 1 ? '1 Month' : `${d.months} Months`
  const weeks = d.weeks === 1 ? '1 Week' : `${d.weeks} Weeks`
  return `${months} / ${weeks} / ${d.totalHours} Hours`
}

export function formatDurationShort(d: CourseDuration): string {
  return d.months === 1 ? '1 Month' : `${d.months} Months`
}

export function TrainingPageTemplate({ data }: { data: TrainingPageData }) {
  const fullTitle = `${data.title} ${data.highlight}`.trim()
  // The live route, syllabus PDF filename, sitemap entry, and QR URL all key off
  // the trainingData map key — NOT data.slug, which is a short cosmetic code shown
  // in the terminal (e.g. 'ceh-pt'). Recover the map key so JSON-LD URLs resolve.
  const routeSlug = Object.keys(trainingData).find((k) => trainingData[k].slug === data.slug) ?? data.slug
  const courseUrl = `${businessUrl}/training/${routeSlug}/`

  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: fullTitle,
    description: data.description,
    url: courseUrl,
    educationalLevel: data.level,
    inLanguage: 'en',
    provider: {
      '@type': 'Organization',
      '@id': `${businessUrl}/#organization`,
      name: businessName,
      sameAs: businessUrl,
      url: businessUrl,
    },
    hasCourseInstance: [
      {
        '@type': 'CourseInstance',
        courseMode: 'Online',
        courseWorkload: `PT${data.duration.totalHours}H`,
        location: { '@type': 'VirtualLocation', url: courseUrl },
      },
      {
        '@type': 'CourseInstance',
        courseMode: 'Onsite',
        courseWorkload: `PT${data.duration.totalHours}H`,
        location: {
          '@type': 'Place',
          name: 'Armour Infosec — Indore Training Centre',
          address: 'Sudama Nagar, Indore, Madhya Pradesh, India',
        },
      },
    ],
    offers: {
      '@type': 'Offer',
      category: 'Cyber Security Training',
      url: `${businessUrl}/contact/`,
      availability: 'https://schema.org/InStock',
    },
  }

  const faqSchema = data.faqs && data.faqs.length > 0
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: data.faqs.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.answer,
          },
        })),
      }
    : null

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${businessUrl}/` },
      { '@type': 'ListItem', position: 2, name: 'Training', item: `${businessUrl}/training/` },
      { '@type': 'ListItem', position: 3, name: fullTitle, item: courseUrl },
    ],
  }

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
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
          { label: 'Training', href: '/training/' },
          { label: data.title + ' ' + data.highlight },
        ]}
      />

      {/* Quick Info Bar */}
      <section className="py-6 bg-cyber-dark relative transition-colors duration-300">
        <div className="absolute top-0 left-0 right-0 cyber-divider" />
        <div className="absolute bottom-0 left-0 right-0 cyber-divider" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-accent" />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">Duration</p>
                <p className="text-sm text-gray-900 dark:text-white font-medium">{formatDuration(data.duration)}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <BarChart3 className="w-5 h-5 text-accent" />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">Level</p>
                <p className="text-sm text-gray-900 dark:text-white font-medium">{data.level}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <BookOpen className="w-5 h-5 text-accent" />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">Modules</p>
                <p className="text-sm text-gray-900 dark:text-white font-medium">{data.modules.length} Modules</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Monitor className="w-5 h-5 text-accent" />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">Format</p>
                <p className="text-sm text-gray-900 dark:text-white font-medium">Hands-on Labs</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-20 bg-cyber-darker transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <SlideInLeft>
              <span className="font-mono text-xs text-accent uppercase tracking-widest">// Course Overview</span>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-2 mb-6">What You&apos;ll Learn</h2>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-lg mb-6">{data.overview}</p>
              <div>
                <p className="text-sm font-mono text-accent mb-3">// Prerequisites</p>
                <ul className="space-y-2">
                  {data.prerequisites.map((prereq, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-600 dark:text-gray-300 text-sm">
                      <span className="text-accent mt-0.5">-</span> {prereq}
                    </li>
                  ))}
                </ul>
              </div>
            </SlideInLeft>
            <SlideInRight>
              <Terminal title={`${data.slug}--syllabus`}>
                <div className="space-y-2 text-xs sm:text-sm">
                  <p><span className="text-accent">$</span> armour --training {data.slug} --info</p>
                  <p className="text-gray-500 dark:text-gray-400">[*] Course: {data.title} {data.highlight}</p>
                  <p className="text-gray-500 dark:text-gray-400">[*] Duration: {formatDuration(data.duration)}</p>
                  <p className="text-gray-500 dark:text-gray-400">[*] Level: {data.level}</p>
                  <p className="text-yellow-600 dark:text-yellow-400">[!] {data.modules.length} modules | {data.modules.reduce((acc, m) => acc + m.topics.length, 0)} topics</p>
                  <p className="text-green-600 dark:text-green-400">[+] Lab environment: READY</p>
                  <p className="text-green-600 dark:text-green-400">[+] Certification prep: INCLUDED</p>
                  <p><span className="text-accent">$</span> <span className="animate-terminal-blink">_</span></p>
                </div>
              </Terminal>
            </SlideInRight>
          </div>
        </div>
      </section>

      {/* Syllabus */}
      <section className="py-20 bg-cyber-dark transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <span className="font-mono text-xs text-accent uppercase tracking-widest">// Syllabus</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-2 mb-12">Complete Course Modules</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.modules.map((module, i) => (
              <GlowCard key={i} delay={i * 0.08}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-8 rounded bg-accent/10 border border-accent/30 flex items-center justify-center font-mono text-accent text-xs font-bold">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-gray-900 dark:text-white font-semibold">{module.title}</h3>
                </div>
                <ul className="space-y-1.5">
                  {module.topics.map((topic, j) => (
                    <li key={j} className="flex items-start gap-2 text-gray-500 dark:text-gray-400 text-sm">
                      <span className="text-accent/60 mt-0.5 text-xs">{'>'}</span> {topic}
                    </li>
                  ))}
                </ul>
              </GlowCard>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Outcomes */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-b from-slate-50 to-white dark:from-[#060911] dark:to-[#0a0e17] transition-colors duration-300">
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-accent/3 dark:bg-accent/5 rounded-full blur-[120px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <AnimatedSection>
              <span className="font-mono text-xs text-accent uppercase tracking-widest">// Outcomes</span>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-2 mb-8">Learning Outcomes</h2>
              <ul className="space-y-3">
                {data.outcomes.map((outcome, i) => (
                  <li key={i} className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent/5 transition-colors">
                    <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                    <span className="text-gray-600 dark:text-gray-300">{outcome}</span>
                  </li>
                ))}
              </ul>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <span className="font-mono text-xs text-accent uppercase tracking-widest">// Lab Environment</span>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-2 mb-8">Hands-On Labs</h2>
              <ul className="space-y-3 mb-8">
                {data.labEnvironment.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent/5 transition-colors">
                    <Monitor className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                    <span className="text-gray-600 dark:text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="surface-card p-5 transition-colors duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-accent/10 border border-accent/20">
                    <Award className="w-4 h-4 text-accent" />
                  </div>
                  <h3 className="text-gray-900 dark:text-white font-semibold">Certification Preparation</h3>
                </div>
                <ul className="space-y-2">
                  {data.certPrep.map((cert, i) => {
                    const isOscpPlus = cert.startsWith('OSCP+')
                    return (
                      <li key={i} className="text-gray-600 dark:text-gray-300 text-sm flex items-start gap-2">
                        <span className="text-accent font-mono text-xs mt-0.5">+</span>
                        <span className="min-w-0">
                          <span className={isOscpPlus ? 'font-semibold text-gray-900 dark:text-white' : ''}>{cert}</span>
                          {isOscpPlus && (
                            <span className="block font-mono text-[10px] uppercase tracking-wider text-accent/80 mt-0.5">
                              Advanced Offensive Security Certification
                            </span>
                          )}
                        </span>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Row 1: Training Mode + Instructor (responsive two-column) */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-b from-white to-slate-50 dark:from-[#0a0e17] dark:to-cyber-dark transition-colors duration-300">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[120px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Left: Training Mode */}
            <AnimatedSection className="h-full">
              <div className="h-full flex flex-col">
                <span className="font-mono text-xs text-accent uppercase tracking-widest">// Training Mode</span>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-2 mb-3">Training Mode</h2>
                <p className="text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
                  One unified programme delivered in two parallel modes — same curriculum, same trainers, same certification.
                </p>
                <ul className="grid grid-cols-1 gap-3 flex-1">
                  {[
                    'Online Live Classes (Instructor-led)',
                    'On-Premise Classroom Training (Indore Centre)',
                    'Both modes run concurrently',
                    'Students can choose either mode',
                    'Same curriculum for both formats',
                    'Same certification for both tracks',
                  ].map((item) => (
                    <li
                      key={item}
                      className="surface-card surface-card-hover flex items-start gap-3 p-4 transition-all duration-300"
                    >
                      <span className="mt-0.5 w-6 h-6 flex items-center justify-center rounded-md bg-accent/10 border border-accent/25 text-accent shrink-0">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span className="text-sm sm:text-base text-gray-700 dark:text-gray-200 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>

            {/* Right: Instructor */}
            <AnimatedSection delay={0.1} className="h-full">
              <div className="h-full flex flex-col">
                <span className="font-mono text-xs text-accent uppercase tracking-widest">// Instructor</span>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-2 mb-6">Meet Your Instructor</h2>
                <div className="surface-card flex-1 p-6 transition-all duration-300">
                  <div className="flex flex-col sm:flex-row items-start gap-5 h-full">
                    <div className="w-16 h-16 rounded-xl bg-accent/10 border border-accent/25 flex items-center justify-center shrink-0">
                      <Users className="w-8 h-8 text-accent" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{data.instructor.name}</h3>
                      <p className="text-accent text-sm font-mono mb-3">{data.instructor.title}</p>
                      <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4">{data.instructor.bio}</p>
                      <div className="flex flex-wrap gap-2">
                        {data.instructor.certs.map((cert) => {
                          const isOscpPlus = cert.startsWith('OSCP+')
                          return (
                            <span
                              key={cert}
                              title={isOscpPlus ? 'Advanced Offensive Security Certification' : undefined}
                              className={
                                isOscpPlus
                                  ? 'px-2.5 py-1 bg-accent/15 border border-accent/40 ring-1 ring-accent/20 rounded-md text-xs text-accent font-mono font-semibold'
                                  : 'px-2.5 py-1 bg-accent/10 border border-accent/20 rounded-md text-xs text-accent font-mono'
                              }
                            >
                              {cert}
                            </span>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Row 2: Testimonials + FAQ (responsive two-column) */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/20 to-slate-100 dark:from-[#050816] dark:via-[#071120] dark:to-[#02040a] transition-colors duration-300">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[150px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Left: Testimonials */}
            <AnimatedSection className="h-full">
              <div className="h-full flex flex-col">
                <span className="font-mono text-xs text-accent uppercase tracking-widest">// Testimonials</span>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-2 mb-6">What Students Say</h2>
                <StaggerContainer className="grid grid-cols-1 gap-4 flex-1">
                  {data.testimonials.map((testimonial, i) => (
                    <StaggerItem key={i}>
                      <div className="surface-card surface-card-hover group p-6 h-full flex flex-col transition-all duration-300">
                        <Quote className="w-6 h-6 text-accent/40 mb-3" />
                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed flex-1 italic">&ldquo;{testimonial.text}&rdquo;</p>
                        <div className="mt-4 pt-4 relative">
                          <div className="absolute top-0 left-0 right-0 cyber-divider" />
                          <p className="text-gray-900 dark:text-white text-sm font-medium">{testimonial.name}</p>
                          <p className="text-gray-500 dark:text-gray-400 text-xs">{testimonial.role}</p>
                        </div>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            </AnimatedSection>

            {/* Right: FAQ */}
            <AnimatedSection delay={0.1} className="h-full">
              <div className="h-full flex flex-col">
                <span className="font-mono text-xs text-accent uppercase tracking-widest">// FAQ</span>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-2 mb-3">Frequently Asked Questions</h2>
                <p className="text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
                  Common questions about the course, enrollment, and certification.
                </p>
                <div className="flex-1">
                  <FAQ items={data.faqs} />
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Ready to Enroll?"
        description="Secure your spot in the next batch. Limited seats available for hands-on lab access."
        primaryLabel="Enroll Now"
        primaryHref="/contact/"
        secondaryLabel="Download Syllabus"
        secondaryHref={`/syllabus/${routeSlug}.pdf`}
        secondaryDownload
      />
    </div>
  )
}
