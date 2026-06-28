import type { Metadata } from 'next'
import { PageHero } from '@/components/ui/PageHero'
import { FAQ } from '@/components/ui/FAQ'
import { CTASection } from '@/components/ui/CTASection'
import { SectionHeading } from '@/components/SectionHeading'
import { businessUrl } from '@/lib/businessInfo'

const META_DESCRIPTION =
  'Find answers about cybersecurity training, ethical hacking courses, penetration testing programs, certifications, admissions, fees, schedules, and corporate training at Armour Infosec.'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description: META_DESCRIPTION,
  alternates: { canonical: '/faq/' },
  openGraph: {
    title: 'Frequently Asked Questions | Armour Infosec',
    description: META_DESCRIPTION,
    url: '/faq/',
  },
  twitter: {
    title: 'Frequently Asked Questions | Armour Infosec',
    description: META_DESCRIPTION,
  },
}

type FAQItem = { question: string; answer: string }
type Category = {
  tag: string
  title: string
  description: string
  items: FAQItem[]
}

const CATEGORIES: Category[] = [
  {
    tag: 'Training Programs',
    title: 'Courses, schedule & delivery',
    description:
      'Who the programmes are designed for, how the cohorts run, and what you will learn end-to-end.',
    items: [
      {
        question: 'Who can join the training programmes?',
        answer:
          'Students, IT professionals, developers, sysadmins, and anyone moving into offensive security can join. Beginner tracks (Certified Ethical Hacking & Penetration Testing, Linux Administration, Python for Security Professionals) require no prior security background. Advanced tracks — OSWE-aligned web exploitation, AD attacks, AI/ML pentesting — assume comfort with networking, basic Linux, and the fundamentals.',
      },
      {
        question: 'Are the courses beginner friendly?',
        answer:
          'Yes. Every course is tagged Beginner, Intermediate, or Advanced and lists prerequisites on its page. The flagship Ethical Hacking programme starts from Kali Linux setup and progresses through the full red-team methodology across 16 modules, so newcomers ramp up safely.',
      },
      {
        question: 'Are classes online or offline?',
        answer:
          'Both. We run instructor-led live online cohorts on our private lab environment, and on-site sessions at the Armour Infosec training centre in Indore. Corporate workshops can be delivered at the client location on request.',
      },
      {
        question: 'Do you provide recordings?',
        answer:
          'Yes. Enrolled students get access to session recordings for the duration of the course, so missed classes can be reviewed and lab walk-throughs revisited any time.',
      },
      {
        question: 'What tools will students learn?',
        answer:
          'The core toolchain across programmes includes Kali Linux, Burp Suite, Nmap, Metasploit, BloodHound, Wireshark, Aircrack-ng, Frida, Ghidra, MobSF, mitmproxy, SQLMap, and Nuclei. Specific stacks vary by course — each training page lists the module-level tool breakdown.',
      },
    ],
  },
  {
    tag: 'Certifications & Career',
    title: 'Exam prep, certificates & placement support',
    description:
      'How our curriculum maps to industry certifications and what we do to help you land a role after the course.',
    items: [
      {
        question: 'Do the courses prepare students for CEH and OSCP+?',
        answer:
          'Yes. The Ethical Hacking & Penetration Testing programme is aligned to OSCP+ tradecraft and CEH curriculum, and was designed by certified practitioners who hold those credentials. The OSCP+ and CEH exams themselves are conducted by Offensive Security and EC-Council respectively — we focus on making you exam-ready and field-ready through hands-on labs.',
      },
      {
        question: 'Will I receive a certificate?',
        answer:
          'Yes. Students who complete a programme receive an Armour Infosec course-completion certificate. We are an ISO 9001:2015 certified organisation, and the certificate references your modules and lab work.',
      },
      {
        question: 'Do you provide interview preparation?',
        answer:
          'Yes. Mock interview rounds, resume reviews, and offensive-security technical Q&A practice are part of the post-course support for students entering the job market.',
      },
      {
        question: 'Is there job assistance?',
        answer:
          'We share openings from our partner companies and refer suitable candidates into roles where there is a fit. Placement is not guaranteed, but our alumni network and industry relationships actively help with introductions and references.',
      },
    ],
  },
  {
    tag: 'Labs & Practical Learning',
    title: 'Hands-on environments and attack simulation',
    description:
      'Every programme is lab-driven. Here is what the practical side actually looks like.',
    items: [
      {
        question: 'Are the labs hands-on?',
        answer:
          'Yes — every course is lab-driven. Theory is kept to the minimum needed to make the lab work meaningful; the bulk of your time is spent in the terminal exploiting real systems.',
      },
      {
        question: 'Do students get vulnerable lab environments?',
        answer:
          'Yes. Students get access to isolated, purpose-built vulnerable virtual machines, intentionally misconfigured web applications and APIs, a private Active Directory test forest for enterprise-attack practice, and wireless gear for the OSWP-aligned wireless track.',
      },
      {
        question: 'Are real-world attack simulations included?',
        answer:
          'Yes. Capstone exercises across the Ethical Hacking and Red Team programmes mirror real client engagements end-to-end: scoped reconnaissance, exploitation, post-exploitation, and writing up the findings into a deliverable report.',
      },
    ],
  },
  {
    tag: 'Admissions & Fees',
    title: 'Enrollment, payments & demos',
    description:
      'How to join a cohort, what the payment options look like, and how to evaluate a course before committing.',
    items: [
      {
        question: 'How do I enroll?',
        answer:
          'Visit the training page for the course you want, then reach out via the website contact form, WhatsApp, email (info@armourinfosec.com), or phone (+91 99777 47168). The admissions team confirms the fee, batch start date, and shares the enrollment link.',
      },
      {
        question: 'Are EMI / payment options available?',
        answer:
          'Yes. Flexible installment plans are available for most courses. The admissions team will walk you through the breakdown and the supported payment methods when you enquire.',
      },
      {
        question: 'Can I attend a demo session?',
        answer:
          'Yes. We run free demo classes for every flagship programme so you can evaluate the instructor, the lab format, and the curriculum depth before committing. Demo slots are scheduled on enquiry.',
      },
    ],
  },
  {
    tag: 'Corporate Training',
    title: 'Enterprise programmes & workshops',
    description:
      'Tailored security training for engineering teams, SOC analysts, and institutions.',
    items: [
      {
        question: 'Do you provide enterprise security training?',
        answer:
          'Yes. We deliver custom security training programmes for engineering teams, SOC analysts, developers, and IT staff. Topics range from secure-coding workshops to multi-week red-team operator bootcamps, with content tuned to your stack.',
      },
      {
        question: 'Can training be customised?',
        answer:
          'Fully. Curriculum, lab scenarios, attack chains, threat-model focus, and cohort duration are all tailored to your team’s stack, current capability, and target outcome. We scope the programme with your security leadership before kickoff.',
      },
      {
        question: 'Do you conduct workshops for colleges and companies?',
        answer:
          'Yes. We run 1-day to multi-week workshops at engineering colleges, enterprise offices, and conferences. Past sessions have covered ethical hacking fundamentals, web and API pentesting, Active Directory attacks, and AI/ML pentesting. Reach out via the contact form to scope a workshop.',
      },
    ],
  },
]

const ALL_FAQS: FAQItem[] = CATEGORIES.flatMap((c) => c.items)

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${businessUrl}/faq/#faq`,
  url: `${businessUrl}/faq/`,
  mainEntity: ALL_FAQS.map(({ question, answer }) => ({
    '@type': 'Question',
    name: question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: answer,
    },
  })),
}

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <PageHero
        tag="Knowledge Base"
        title="Frequently Asked"
        highlight="Questions"
        description="Everything you need to know about our cybersecurity training programmes, admissions, certifications, and hands-on labs."
        breadcrumbs={[{ label: 'FAQ' }]}
      />

      <section
        id="faq"
        className="py-20 relative overflow-hidden bg-white dark:bg-cyber-dark transition-colors duration-300"
      >
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-20">
          {CATEGORIES.map((cat) => (
            <div key={cat.tag} className="scroll-mt-24" id={cat.tag.toLowerCase().replace(/[^a-z0-9]+/g, '-')}>
              <SectionHeading
                tag={cat.tag}
                title={cat.title}
                description={cat.description}
                align="left"
              />
              <FAQ items={cat.items} />
            </div>
          ))}
        </div>
      </section>

      <CTASection
        title="Still have a question?"
        description="Reach out — our admissions team responds the same day during working hours."
        primaryLabel="Contact Us"
        primaryHref="/contact/"
        secondaryLabel="View Training Programmes"
        secondaryHref="/training/"
      />
    </>
  )
}
