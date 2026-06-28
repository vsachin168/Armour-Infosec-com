import type { Metadata } from 'next'
import { SectionHeading } from '@/components/SectionHeading'
import { Terminal } from '@/components/Terminal'
import { Button } from '@/components/Button'
import { StatsSection, type Stat } from '@/components/StatsSection'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Armour Infosec — enterprise-grade cybersecurity services, offensive security training, and real-world penetration testing expertise.',
}

const TRUST_BADGES = [
  { label: 'ISO 9001:2015 Certified' },
  { label: 'Offensive Security Focused' },
  { label: 'Hands-on Training Labs' },
  { label: 'Enterprise Security Services' },
]

const WHAT_WE_DO = [
  {
    title: 'Offensive Security',
    description: 'Real-world adversary simulation across pentest, red team, and exploit research engagements.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
  },
  {
    title: 'Enterprise Security Services',
    description: 'VAPT, audits, secure architecture reviews, and compliance readiness for regulated industries.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: 'Security Training',
    description: 'Hands-on labs and instructor-led cohorts aligned to OSCP+, CEH, and modern attack methodology.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      </svg>
    ),
  },
  {
    title: 'Infrastructure Hardening',
    description: 'Active Directory, cloud, network, and endpoint hardening across the enterprise attack surface.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12V7a2 2 0 012-2h10a2 2 0 012 2v5M5 12l-2 4v3a1 1 0 001 1h16a1 1 0 001-1v-3l-2-4M5 12h14" />
      </svg>
    ),
  },
]

const ABOUT_STATS: Stat[] = [
  {
    value: 5000,
    suffix: '+',
    label: 'Assessments Completed',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    value: 500,
    suffix: '+',
    label: 'Enterprise Clients',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    value: 15,
    suffix: '+',
    label: 'Years Experience',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    value: 10000,
    suffix: '+',
    label: 'Students Trained',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      </svg>
    ),
  },
]

const TRAINING_HIGHLIGHTS = [
  'Hands-on, lab-based learning',
  'OSCP+ / CEH curriculum alignment',
  'Real-world attack methodology',
  'Instructor-led live + on-premise',
]

const SERVICES_HIGHLIGHTS = [
  'Vulnerability Assessment & Penetration Testing',
  'Web Application Security',
  'API Security & Exploitation',
  'Active Directory Security',
  'Red Team Operations',
]

const CERTIFICATIONS = ['ISO 9001:2015', 'OSCP+', 'CEH', 'OWASP-aligned', 'NIST AI RMF']

const METHODOLOGY = [
  { step: '01', title: 'Reconnaissance', desc: 'Passive and active OSINT, attack-surface mapping, and target profiling.' },
  { step: '02', title: 'Enumeration', desc: 'Service, version, and misconfiguration discovery across in-scope assets.' },
  { step: '03', title: 'Exploitation', desc: 'Validated exploitation, privilege escalation, and chained attack paths.' },
  { step: '04', title: 'Validation', desc: 'Impact assessment, post-exploitation verification, and false-positive review.' },
  { step: '05', title: 'Reporting', desc: 'Executive summary plus technical findings with proof of exploit and CVSS.' },
  { step: '06', title: 'Remediation', desc: 'Prioritised fix guidance, retest verification, and ongoing advisory support.' },
]

const TESTIMONIALS = [
  { quote: 'Best ethical hacking course in Indore. The Metasploit and advanced exploitation modules gave me skills I use in every engagement.', name: 'Vikram K.', role: 'Penetration Tester' },
  { quote: 'After this course, I found my first critical vulnerability within weeks. The systematic testing methodology is what makes the difference.', name: 'Pooja M.', role: 'Bug Bounty Hunter' },
  { quote: 'The Kerberos attack modules are incredibly detailed. I immediately found new attack paths in client environments I was missing before.', name: 'Ankit R.', role: 'Senior Pentester' },
  { quote: 'Went from helpdesk to server admin after this course. The virtualized labs build real confidence for production environments.', name: 'Manish P.', role: 'IT Support Engineer' },
  { quote: 'Excellent hands-on approach. The lab environment is production-grade and the instructors explain complex exploitation concepts clearly.', name: 'Priya S.', role: 'IT Professional' },
  { quote: 'Comprehensive and practical course. I now build and secure every WordPress site properly from day one.', name: 'Sakshi M.', role: 'Freelance Developer' },
]

export default function AboutPage() {
  return (
    <div className="pt-24">
      {/* HERO */}
      <section className="hero-glow py-20 relative overflow-hidden transition-colors duration-300 bg-gradient-to-b from-slate-50 to-white dark:from-[#050816] dark:to-[#0a0e17]">
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block font-mono text-xs text-accent uppercase tracking-widest mb-4">
            // About Armour Infosec
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Security is Our <span className="gradient-text">Mission.</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-3xl mx-auto mb-8 leading-relaxed">
            We break into systems so attackers don&apos;t. A team of certified offensive-security practitioners running real assessments — and teaching the same craft to the next generation.
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-2.5" aria-label="Company credentials">
            {TRUST_BADGES.map((badge) => (
              <li key={badge.label}>
                <span
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/70 dark:bg-white/[0.04] border border-accent/25 dark:border-cyber-border backdrop-blur-sm text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium"
                  role="img"
                  aria-label={badge.label}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" aria-hidden="true" />
                  {badge.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* COMPANY OVERVIEW */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-b from-white to-slate-50 dark:from-[#0a0e17] dark:to-[#060911] transition-colors duration-300">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <SectionHeading tag="Our Story" title="Built by Hackers, for Defenders" align="left" />
              <div className="space-y-4 text-slate-600 dark:text-slate-400 leading-relaxed">
                <p>
                  Armour Infosec was founded by security practitioners who understood a fundamental truth:
                  the best defence is built by those who understand offence. Our team consists of certified
                  ethical hackers, penetration testers, and security researchers with deep expertise in
                  identifying and remediating real-world vulnerabilities.
                </p>
                <p>
                  Based in Indore, India, we serve clients across industries — from startups to enterprises —
                  providing comprehensive security assessments, consulting services, and hands-on training
                  programmes that build practical security skills.
                </p>
                <p>
                  Our approach combines automated tooling with manual expert testing, ensuring thorough
                  coverage and actionable results. We don&apos;t just find vulnerabilities — we close them with you,
                  retest the fixes, and leave your team able to spot the same patterns earlier next time.
                </p>
              </div>
            </div>
            <div>
              <Terminal title="about.json">
                <pre className="text-xs sm:text-sm">
{`{
  "company": "Armour Infosec",
  "focus": "Cybersecurity & Training",
  "specialization": [
    "Penetration Testing",
    "Web Security",
    "API Security",
    "AD Security",
    "Enterprise Hardening"
  ],
  "location": "Indore, India",
  "certification": "ISO 9001:2015",
  "status": "operational"
}`}
                </pre>
              </Terminal>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/20 to-slate-100 dark:from-[#050816] dark:via-[#071120] dark:to-[#02040a] transition-colors duration-300">
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[120px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            tag="What We Do"
            title="Four Pillars of Practice"
            description="From offensive engagements to defensive hardening, every service is delivered by a practitioner team."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHAT_WE_DO.map((item) => (
              <article key={item.title} className="surface-card surface-card-hover elevation-2 p-6 h-full">
                <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-accent/10 border border-accent/20 text-accent mb-4">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="hero-glow py-20 relative overflow-hidden bg-gradient-to-b from-white to-slate-50 dark:from-[#0a0e17] dark:to-[#060911] transition-colors duration-300">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-accent/4 dark:bg-accent/8 rounded-full blur-[140px] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block font-mono text-xs text-accent uppercase tracking-widest mb-4">
              // Why Choose Us
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-5 leading-tight">
              Adversary-Tested. <span className="gradient-text">Enterprise-Ready.</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
              Every course is taught by working practitioners. Every assessment is delivered by the same people who run the labs. No outsourced delivery, no theoretical workshops, no &ldquo;enterprise framework alignment&rdquo; — just real attacks, and the methodology to test for them.
            </p>
          </div>
          <StatsSection stats={ABOUT_STATS} ariaLabel="Armour Infosec at a glance" />
        </div>
      </section>

      {/* TRAINING + SERVICES */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/20 to-slate-100 dark:from-[#050816] dark:via-[#071120] dark:to-[#02040a] transition-colors duration-300">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            tag="Capabilities"
            title="Training and Enterprise Services"
            description="One team, two parallel disciplines — same practitioners run the assessments and teach the courses."
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            <article className="surface-card surface-card-hover elevation-2 p-8 h-full flex flex-col">
              <span className="font-mono text-xs text-accent uppercase tracking-widest">// Training</span>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-2 mb-4">Hands-On Cyber Security Courses</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-5">
                Practitioner-led training across 12 courses, hybrid online + on-premise, with full lab access.
              </p>
              <ul className="space-y-3 flex-1">
                {TRAINING_HIGHLIGHTS.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                    <span className="mt-0.5 w-5 h-5 flex items-center justify-center rounded-md bg-accent/10 border border-accent/25 text-accent shrink-0" aria-hidden="true">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <Button href="/training/" variant="secondary">Explore Training</Button>
              </div>
            </article>
            <article className="surface-card surface-card-hover elevation-2 p-8 h-full flex flex-col">
              <span className="font-mono text-xs text-accent uppercase tracking-widest">// Services</span>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-2 mb-4">Enterprise Security Services</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-5">
                Offensive engagements scoped against your environment — from web apps and APIs to full red team operations.
              </p>
              <ul className="space-y-3 flex-1">
                {SERVICES_HIGHLIGHTS.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                    <span className="mt-0.5 w-5 h-5 flex items-center justify-center rounded-md bg-accent/10 border border-accent/25 text-accent shrink-0" aria-hidden="true">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <Button href="/services/" variant="secondary">Explore Services</Button>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS & STANDARDS */}
      <section className="py-16 relative overflow-hidden bg-gradient-to-b from-white to-slate-50 dark:from-[#0a0e17] dark:to-[#060911] transition-colors duration-300">
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block font-mono text-xs text-accent uppercase tracking-widest mb-3">
            // Certifications
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-3">
            Certifications &amp; Standards
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
            Our work aligns with established industry frameworks and recognised offensive-security certifications.
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-3">
            {CERTIFICATIONS.map((cert) => (
              <li key={cert}>
                <span className="accent-pill">{cert}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* METHODOLOGY */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/20 to-slate-100 dark:from-[#050816] dark:via-[#071120] dark:to-[#02040a] transition-colors duration-300">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            tag="Methodology"
            title="Our Assessment Process"
            description="A repeatable six-step framework applied to every engagement, from scoping to remediation."
          />
          <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {METHODOLOGY.map((m) => (
              <li key={m.step} className="surface-card elevation-1 p-6">
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="font-mono text-2xl font-bold gradient-text">{m.step}</span>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{m.title}</h3>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{m.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-b from-white to-slate-50 dark:from-[#0a0e17] dark:to-[#060911] transition-colors duration-300">
        <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-accent/3 dark:bg-accent/5 rounded-full blur-[100px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            tag="Testimonials"
            title="What Our Students Say"
            description="Stories from learners and professionals who trained with Armour Infosec."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <figure key={t.name} className="surface-card surface-card-hover elevation-2 p-6 h-full flex flex-col">
                <svg className="w-6 h-6 text-accent/40 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z" />
                </svg>
                <blockquote className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed flex-1 italic">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-4 pt-4 relative">
                  <div className="absolute top-0 left-0 right-0 cyber-divider" />
                  <p className="text-slate-900 dark:text-white text-sm font-medium">{t.name}</p>
                  <p className="text-slate-500 dark:text-slate-500 text-xs">{t.role}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-b from-slate-100 to-white dark:from-[#0a0e17] dark:to-[#060911] transition-colors duration-300">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[150px]" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Bring us in early — before the gaps are exploited.
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
            Whether you need an enterprise assessment or want to build your team&apos;s offensive-security skills — we&apos;re ready to help.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/contact/" variant="primary" size="lg">
              Request Assessment
            </Button>
            <Button href="/training/" variant="secondary" size="lg">
              Explore Training
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
