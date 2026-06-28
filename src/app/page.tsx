import type { Metadata } from 'next'
import { Terminal } from '@/components/Terminal'
import { SectionHeading } from '@/components/SectionHeading'
import { ServiceCard } from '@/components/ServiceCard'
import { CourseCard } from '@/components/CourseCard'
import { StatsSection } from '@/components/StatsSection'
import { Button } from '@/components/Button'
import { CyberAmbient } from '@/components/ui/CyberAmbient'

export const metadata: Metadata = {
  title: 'Cyber Security Training & Penetration Testing in Indore',
  description:
    'Armour Infosec — hands-on ethical hacking training, OSCP+ certification prep, web/API/mobile penetration testing, and enterprise security consulting in Indore.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Armour Infosec — Cyber Security Training & Penetration Testing in Indore',
    description:
      'Hands-on offensive-security training and penetration testing services. 10,000+ students trained, 5,000+ assessments completed, 15+ years of practitioner-led tradecraft.',
    url: '/',
  },
}

const courses = [
  {
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
    title: 'AI/ML Penetration Testing',
    level: 'Advanced' as const,
    description: 'Adversarial ML, LLM prompt injection, model extraction, training-data poisoning — aligned to OWASP LLM Top 10 and OWASP ML Top 10.',
    cert: 'OWASP LLM',
    href: '/training/ai-ml-penetration-testing/',
  },
  {
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>,
    title: 'Certified Ethical Hacking & Penetration Testing',
    level: 'Beginner' as const,
    description: 'Kali Linux, network attacks, exploitation, privilege escalation, and the full red-team methodology — 16 modules of hands-on offensive security.',
    cert: 'OSCP+',
    href: '/training/ethical-hacking/',
  },
  {
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>,
    title: 'Advanced Web Application Security Testing',
    level: 'Advanced' as const,
    description: 'OWASP Top 10, SQL injection, XSS, SSRF, XXE, authentication attacks, and modern web exploitation across 17 deep-dive modules.',
    cert: 'OSWE',
    href: '/training/web-application-security/',
  },
  {
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
    title: 'API Security & Advanced API Exploitation',
    level: 'Intermediate' as const,
    description: 'REST, GraphQL, SOAP, JWT, BOLA/BFLA, and the OWASP API Security Top 10 — 22 modules covering every API attack vector.',
    cert: 'BSCP',
    href: '/training/api-security/',
  },
  {
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>,
    title: 'Mobile Application Penetration Testing',
    level: 'Advanced' as const,
    description: 'iOS and Android testing against OWASP MASVS / MASTG — static, dynamic, reverse engineering, pinning bypass, and runtime manipulation.',
    cert: 'GMOB',
    href: '/training/mobile-application-penetration-testing/',
  },
  {
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12V7a2 2 0 012-2h10a2 2 0 012 2v5M5 12l-2 4v3a1 1 0 001 1h16a1 1 0 001-1v-3l-2-4M5 12h14" /></svg>,
    title: 'Active Directory Security & Enterprise Attacks',
    level: 'Advanced' as const,
    description: 'Kerberos attacks, credential dumping, relay attacks, BloodHound, and full enterprise AD compromise across 13 lab-driven modules.',
    cert: 'CRTP',
    href: '/training/active-directory-security/',
  },
  {
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.566 14.587-5.566 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" /></svg>,
    title: 'Wireless Security & WiFi Penetration Testing',
    level: 'Intermediate' as const,
    description: 'WEP/WPA/WPA2/WPA3 attacks, evil twin, handshake capture, KARMA, and full wireless penetration testing with real radio gear.',
    cert: 'OSWP',
    href: '/training/wireless-security/',
  },
  {
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
    title: 'Python for Security Professionals',
    level: 'Beginner' as const,
    description: 'Build custom recon, exploitation, and automation tooling. Socket programming, scripting, and security-focused Python from zero.',
    cert: 'PCAP',
    href: '/training/python-security/',
  },
  {
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3M13 15h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
    title: 'Linux Administration & Server Hardening',
    level: 'Beginner' as const,
    description: 'Enterprise Linux deployment, Apache, Samba, IPTables, SSH hardening, and security-focused server administration.',
    cert: 'RHCSA',
    href: '/training/linux-administration/',
  },
  {
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
    title: 'Enterprise Windows Infrastructure Security',
    level: 'Beginner' as const,
    description: 'Windows Server, Active Directory, Group Policy, PowerShell, virtualization, and secure deployment of enterprise services.',
    cert: 'MCSE',
    href: '/training/windows-infrastructure/',
  },
  {
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>,
    title: 'Secure WordPress Administration',
    level: 'Beginner' as const,
    description: 'Professional WordPress administration with security hardening, plugin and theme management, and CMS attack defense.',
    cert: 'CMS Sec',
    href: '/training/wordpress-administration/',
  },
  {
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>,
    title: 'Secure PHP Development',
    level: 'Beginner' as const,
    description: 'PHP fundamentals with security from day one — prepared statements, SQL injection prevention, XSS defense, and OWASP secure coding.',
    cert: 'Zend PHP',
    href: '/training/php-development/',
  },
]

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
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12a9 9 0 1018 0 9 9 0 00-18 0zm9-9v18M3 12h18" /></svg>,
    title: 'Red Team Operations',
    description: 'Full-scope adversary simulation testing people, processes, and technology under realistic threat conditions.',
    href: '/services/red-team-operations/',
  },
  {
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
    title: 'Vulnerability Assessment',
    description: 'Systematic identification and classification of security weaknesses across your infrastructure and applications.',
    href: '/services/vulnerability-assessment/',
  },
  {
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
    title: 'Digital Forensics & Incident Response',
    description: 'Forensic investigation, evidence collection, and root-cause analysis to contain and learn from breaches.',
    href: '/services/digital-forensics-incident-response/',
  },
  {
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
    title: 'Incident Response',
    description: 'Rapid containment, eradication, and recovery support when security incidents threaten your operations.',
    href: '/services/incident-response/',
  },
  {
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
    title: 'Security Auditing',
    description: 'Compliance and posture audits against ISO 27001, SOC 2, PCI DSS, and other regulatory frameworks.',
    href: '/services/security-auditing/',
  },
  {
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12V7a2 2 0 012-2h10a2 2 0 012 2v5M5 12l-2 4v3a1 1 0 001 1h16a1 1 0 001-1v-3l-2-4M5 12h14" /></svg>,
    title: 'Active Directory Security',
    description: 'Assessment and hardening of AD environments to prevent domain compromise and lateral movement.',
    href: '/services/active-directory-security/',
  },
]

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
        {/* Base gradient — sits beneath all animated layers */}
        <div className="absolute inset-0 bg-gradient-to-b from-cyber-darker via-cyber-darker/95 to-cyber-dark" />
        <CyberAmbient />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="mb-6">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-mono">
              <span className="w-2 h-2 bg-accent rounded-full cyber-pulse-soft" />
              Securing Digital Assets
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Build Real-World <span className="gradient-text">Cybersecurity Skills.</span>
            <br />
            Defend Against Real Threats.
          </h1>

          <p className="text-lg sm:text-xl text-gray-500 dark:text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed">
            Hands-on cyber security training and real-world penetration testing —
            run by certified practitioners out of Indore, across India.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/services/" variant="primary" size="lg">
              Explore Services
            </Button>
            <Button href="/training/" variant="secondary" size="lg">
              View Training
            </Button>
          </div>
        </div>
      </section>

      {/* Stats / Achievements Section */}
      <section className="py-20 relative overflow-hidden bg-white dark:bg-cyber-dark transition-colors duration-300">
        <div className="absolute top-0 left-0 right-0 cyber-divider" />
        <div className="absolute bottom-0 left-0 right-0 cyber-divider" />
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] bg-[radial-gradient(circle_at_1px_1px,_currentColor_1px,_transparent_0)] [background-size:24px_24px] text-gray-900 dark:text-gray-600 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent/3 dark:bg-accent/8 rounded-full blur-[120px] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            <span
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/70 dark:bg-white/[0.04] border border-accent/30 dark:border-accent/25 backdrop-blur-sm shadow-sm"
              aria-label="ISO 9001:2015 Certified Organization"
            >
              <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-mono text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">
                ISO 9001:2015
              </span>
              <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                Certified Organization
              </span>
            </span>
          </div>
          <StatsSection />
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/20 to-slate-100 dark:from-[#050816] dark:via-[#071120] dark:to-[#02040a] transition-colors duration-300" id="services">
        <div className="absolute top-0 left-1/3 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[120px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            tag="What We Do"
            title="What We Deliver"
            description="Six engagement types — all run by the same team that delivers the assessments and explains the findings to your engineers."
          />
          {/* Featured: Penetration Testing parent with 6 sub-types */}
          <div className="surface-card surface-card-hover group p-6 sm:p-8 rounded-2xl transition-all duration-300 mb-6">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              <div className="flex-1 min-w-0">
                <div className="flex items-center flex-wrap gap-3 mb-3">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider bg-accent/15 border border-accent/30 text-accent">
                    Featured
                  </span>
                  <span className="w-11 h-11 flex items-center justify-center rounded-lg bg-accent/10 border border-accent/25 text-accent group-hover:bg-accent/20 transition-colors">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                  </span>
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    Penetration Testing
                  </h3>
                </div>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-4 max-w-2xl">
                  Real-world attack simulation across every layer of your stack — from AI models to cloud infrastructure. Choose a specialised pentest below.
                </p>
                <a
                  href="/services/penetration-testing/"
                  className="inline-flex items-center text-accent text-sm font-mono hover:translate-x-1 transition-transform"
                >
                  Explore Penetration Testing
                  <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </a>
              </div>
              <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2 lg:max-w-md shrink-0 lg:pt-1">
                {pentestSubTypes.map((sub) => (
                  <li key={sub.label}>
                    <a
                      href={sub.href}
                      className="block px-3 py-2 rounded-lg bg-white/80 dark:bg-white/[0.05] border border-gray-200/70 dark:border-cyber-border text-xs font-mono text-gray-700 dark:text-gray-300 hover:border-accent/50 hover:bg-accent/5 dark:hover:bg-white/[0.08] hover:text-accent transition-all duration-200"
                    >
                      {sub.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button href="/services/" variant="secondary">
              View All Services
            </Button>
          </div>
        </div>
      </section>

      {/* Training Programs */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-br from-white via-slate-50 to-slate-100 dark:from-[#0a0e17] dark:via-[#071120] dark:to-[#050816] transition-colors duration-300" id="training">
        <div className="absolute bottom-0 left-1/3 w-[300px] h-[300px] bg-accent/5 dark:bg-accent/10 rounded-full blur-[100px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            tag="Training Programs"
            title="Hands-On Cyber Security Courses"
            description="Lab-driven training led by practising penetration testers — from fundamentals to enterprise-grade offensive security."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <CourseCard key={course.title} {...course} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button href="/training/" variant="secondary">
              View All Training Programs
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-b from-white to-slate-50 dark:from-[#0a0e17] dark:to-[#060911] transition-colors duration-300">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeading
                tag="Why Armour Infosec"
                title="Why Teams Pick Us"
                description="Certified, hands-on, and consistent — the same practitioners scope, test, and walk your engineers through every finding."
                align="left"
              />
              <ul className="space-y-3">
                {[
                  'Certified security professionals (OSCP+, CEH, CISSP)',
                  'Real-world attack simulation methodology',
                  'Comprehensive remediation guidance',
                  'Ongoing security posture monitoring',
                  'Compliance-ready reporting (ISO 27001, SOC 2)',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent/5 transition-colors">
                    <span className="text-accent mt-0.5 font-mono text-sm">[+]</span>
                    <span className="text-gray-600 dark:text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Button href="/about/" variant="secondary">
                  Learn More About Us
                </Button>
              </div>
            </div>

            <div>
              <Terminal title="methodology.sh">
                <div className="space-y-3 text-left text-xs sm:text-sm">
                  <p className="text-gray-500 dark:text-gray-400"># Armour Infosec Assessment Process</p>
                  <p><span className="text-accent">phase_1</span>=<span className="text-yellow-600 dark:text-yellow-300">&quot;Reconnaissance&quot;</span></p>
                  <p><span className="text-accent">phase_2</span>=<span className="text-yellow-600 dark:text-yellow-300">&quot;Vulnerability Analysis&quot;</span></p>
                  <p><span className="text-accent">phase_3</span>=<span className="text-yellow-600 dark:text-yellow-300">&quot;Exploitation&quot;</span></p>
                  <p><span className="text-accent">phase_4</span>=<span className="text-yellow-600 dark:text-yellow-300">&quot;Post-Exploitation&quot;</span></p>
                  <p><span className="text-accent">phase_5</span>=<span className="text-yellow-600 dark:text-yellow-300">&quot;Reporting & Remediation&quot;</span></p>
                  <p className="pt-2"><span className="text-gray-500 dark:text-gray-400"># Delivering actionable insights</span></p>
                  <p><span className="text-blue-600 dark:text-blue-400">echo</span> <span className="text-yellow-600 dark:text-yellow-300">&quot;Assessment complete. Stay secure.&quot;</span></p>
                </div>
              </Terminal>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden transition-colors duration-300 bg-gradient-to-br from-slate-100 to-white dark:from-[#050816] dark:to-[#02040a]">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Secure Your Infrastructure?
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Identify the threats before attackers do. A scoped assessment from a
            certified team — most engagements returned within two weeks.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/contact/" variant="primary" size="lg">
              Schedule Assessment
            </Button>
            <Button href="/services/" variant="ghost" size="lg">
              View All Services
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
