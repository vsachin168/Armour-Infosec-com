import type { Metadata } from 'next'
import { ContactForm } from '@/components/ContactForm'
import { ContactInfo } from '@/components/ContactInfo'
import { MapEmbed } from '@/components/MapEmbed'
import { OpeningHours } from '@/components/OpeningHours'
import { StickyMobileCTA } from '@/components/StickyMobileCTA'
import { Terminal } from '@/components/Terminal'
import { businessPhone, telUrl, whatsappUrl } from '@/lib/businessInfo'

export const metadata: Metadata = {
  title: 'Contact | Ethical Hacking & Cyber Security Training in Indore',
  description:
    'Contact Armour Infosec in Indore for ethical hacking training, penetration testing, vulnerability assessment, and cyber security consulting. Call, WhatsApp, or visit our Sudama Nagar centre.',
  alternates: { canonical: '/contact/' },
  openGraph: {
    title: 'Contact Armour Infosec | Indore',
    description:
      'Reach Armour Infosec for ethical hacking training and cyber security services in Indore. Call, WhatsApp, or send an enquiry.',
    url: '/contact/',
  },
}

const trustPoints = [
  {
    title: 'Certified Ethical Hacking Training',
    body: 'Curriculum aligned with industry certifications and real-world offensive security tradecraft.',
  },
  {
    title: 'Hands-on Labs',
    body: 'Practice on live targets, intentionally vulnerable apps, and isolated lab networks — not just slides.',
  },
  {
    title: 'Industry Expert Trainers',
    body: 'Learn from practitioners with active consulting and penetration testing engagements.',
  },
  {
    title: 'Placement Assistance',
    body: 'Resume reviews, interview prep, and referrals into our network of hiring partners.',
  },
  {
    title: 'Indore Training Centre',
    body: 'Walk into our Sudama Nagar campus for in-person classes, mentoring, and lab access.',
  },
]

export default function ContactPage() {
  return (
    <>
      <div className="pt-24 pb-24 md:pb-0">
        {/* Hero */}
        <section className="py-20 relative overflow-hidden transition-colors duration-300 bg-gradient-to-b from-slate-50 to-white dark:from-[#050816] dark:to-[#0a0e17]">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-block font-mono text-xs text-accent uppercase tracking-widest mb-4">
              // Contact
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Contact <span className="gradient-text">Armour Infosec</span>
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-lg max-w-3xl mx-auto mb-8">
              Looking for training, a penetration test, or security consulting? Tell us what you need — we reply within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-stretch sm:items-center max-w-md sm:max-w-none mx-auto">
              <a
                href={telUrl}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-accent text-white font-mono font-medium hover:opacity-90 hover:shadow-[0_0_25px_var(--color-accent-glow)] transition-all shadow-lg shadow-accent/20"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h2.28a2 2 0 011.95 1.55l.7 3.03a2 2 0 01-.5 1.88L7.91 11.1a16 16 0 005 5l1.64-1.52a2 2 0 011.88-.5l3.03.7A2 2 0 0121 16.72V19a2 2 0 01-2 2h-1C9.72 21 3 14.28 3 6V5z" />
                </svg>
                Call {businessPhone.display}
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#075E54] text-white font-mono font-medium hover:opacity-90 transition-all shadow-lg shadow-[#075E54]/20"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.5 3.5A11.5 11.5 0 003.6 19.1L2 22l3-1.5A11.5 11.5 0 1020.5 3.5zM12 20.3a8.3 8.3 0 01-4.2-1.2l-.3-.2-2.5.7.7-2.4-.2-.3A8.3 8.3 0 1112 20.3zm4.8-6.2c-.3-.1-1.6-.8-1.8-.9-.2-.1-.4-.1-.6.1-.2.3-.7.9-.8 1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.4-.5c.1-.2.2-.3.3-.5 0-.2 0-.4 0-.5l-.7-1.8c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2.1 3.2 5.1 4.5 1.8.7 2.4.8 3.2.7.5 0 1.6-.6 1.8-1.3.2-.6.2-1.2.2-1.3-.1-.1-.3-.2-.5-.3z" />
                </svg>
                WhatsApp Us
              </a>
            </div>
          </div>
        </section>

        {/* Form + Contact info */}
        <section className="py-20 relative overflow-hidden bg-gradient-to-br from-white via-slate-50 to-slate-100 dark:from-[#0a0e17] dark:via-[#071120] dark:to-[#050816] transition-colors duration-300">
          <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-accent/3 dark:bg-accent/5 rounded-full blur-[100px]" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
              <div className="p-6 sm:p-8 rounded-2xl bg-white/70 dark:bg-white/[0.03] border border-gray-200/60 dark:border-cyber-border backdrop-blur-md shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Send us a message</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                  Briefly describe your project. We&apos;ll get back with next steps within 24 hours.
                </p>
                <ContactForm />
              </div>

              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Get in Touch</h2>
                  <ContactInfo />
                </div>
                <Terminal title="contact --help">
                  <div className="space-y-2 text-xs sm:text-sm">
                    <p className="text-gray-500 dark:text-gray-400"># Secure communication channels</p>
                    <p><span className="text-accent">$</span> echo &quot;We respond within 24 hours&quot;</p>
                    <p><span className="text-accent">$</span> echo &quot;NDA available upon request&quot;</p>
                    <p><span className="text-accent">$</span> echo &quot;Encrypted email: PGP available&quot;</p>
                    <p className="pt-2 text-gray-500 dark:text-gray-400"># For urgent security incidents:</p>
                    <p><span className="text-accent">$</span> priority: <span className="text-red-500 dark:text-red-400">CRITICAL</span></p>
                    <p className="text-yellow-600 dark:text-yellow-400">[!] Contact immediately for incident response</p>
                  </div>
                </Terminal>
              </div>
            </div>
          </div>
        </section>

        {/* Map */}
        <section className="py-20 relative overflow-hidden bg-white dark:bg-[#050816] transition-colors duration-300">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="inline-block font-mono text-xs text-accent uppercase tracking-widest mb-3">
                // Visit Us
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">
                Our Indore Training Centre
              </h2>
              <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                Walk into our Sudama Nagar campus for in-person training, lab sessions, and consulting meetings.
              </p>
            </div>
            <MapEmbed />
          </div>
        </section>

        {/* Opening hours */}
        <section className="py-20 relative overflow-hidden bg-gradient-to-br from-white via-slate-50 to-slate-100 dark:from-[#0a0e17] dark:via-[#071120] dark:to-[#050816] transition-colors duration-300">
          <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-accent/3 dark:bg-accent/5 rounded-full blur-[100px]" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="inline-block font-mono text-xs text-accent uppercase tracking-widest mb-3">
                // Schedule
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">
                Opening Hours
              </h2>
              <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                Reach us by phone, WhatsApp, or visit our Indore centre during the hours below.
              </p>
            </div>
            <OpeningHours />
          </div>
        </section>

        {/* Why choose */}
        <section className="py-20 relative overflow-hidden bg-gradient-to-b from-slate-50 to-white dark:from-[#0a0e17] dark:to-[#050816] transition-colors duration-300">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="inline-block font-mono text-xs text-accent uppercase tracking-widest mb-3">
                // Why Us
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">
                Why Choose Armour Infosec
              </h2>
              <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                A practitioner-led training and consulting firm based in Indore.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {trustPoints.map((point) => (
                <div
                  key={point.title}
                  className="p-6 rounded-2xl bg-white/70 dark:bg-white/[0.03] border border-gray-200/60 dark:border-cyber-border backdrop-blur-sm hover:border-accent/30 transition-all duration-300"
                >
                  <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-accent/10 border border-accent/20 text-accent mb-4">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{point.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{point.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      <StickyMobileCTA />
    </>
  )
}
