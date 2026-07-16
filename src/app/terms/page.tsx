import type { Metadata } from 'next'
import Link from 'next/link'
import { LegalPageLayout, type LegalSection } from '@/components/LegalPageLayout'
import { businessEmail, businessAddress } from '@/lib/businessInfo'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'Terms governing the use of Armour Infosec training, consulting, assessments, and website services.',
  alternates: { canonical: '/terms/' },
}

const SECTIONS: LegalSection[] = [
  {
    id: 'acceptance',
    heading: 'Acceptance of Terms',
    body: (
      <>
        <p>
          By accessing the Armour Infosec website at <strong>armourinfosec.com</strong> or by enrolling in any course, requesting an assessment, or otherwise engaging our services, you agree to be bound by these Terms of Service. If you do not accept these terms in full, please discontinue use of the website and services.
        </p>
        <p>
          We may update these terms from time to time. Material changes will be reflected by an updated &ldquo;Last updated&rdquo; date. Continued use of the services after such changes constitutes acceptance of the revised terms.
        </p>
      </>
    ),
  },
  {
    id: 'services',
    heading: 'Services Overview',
    body: (
      <>
        <p>
          Armour Infosec provides cybersecurity consulting, penetration testing, vulnerability assessment, red team operations, security training, and related advisory services. Specific engagements are governed by a separate Statement of Work (SOW) or course enrolment agreement that takes precedence over these Terms where there is a conflict.
        </p>
        <p>
          Availability of any specific service, course, or batch is subject to change. We reserve the right to modify or discontinue any service with reasonable notice.
        </p>
      </>
    ),
  },
  {
    id: 'training',
    heading: 'Training & Course Usage',
    body: (
      <>
        <p>
          Course materials, recordings, lab environments, and supplemental content are provided for the personal use of the enrolled student. Sharing credentials, redistributing material, or providing access to non-enrolled individuals is prohibited and may result in immediate termination of access without refund.
        </p>
        <p>
          Lab environments are sandboxed for offensive-security learning. Students must <strong>not</strong> use the labs, the techniques learned, or any tooling we provide to test, scan, or attack systems they do not own or have explicit written authorisation to test. Doing so may constitute a violation of local and international computer-misuse law.
        </p>
      </>
    ),
  },
  {
    id: 'intellectual-property',
    heading: 'Intellectual Property',
    body: (
      <>
        <p>
          All website content, course curriculum, lab images, methodology documents, reports, branding, and trademarks are the intellectual property of Armour Infosec or its licensors. You are granted a limited, non-exclusive, non-transferable licence to use this material solely for the purpose for which it was provided.
        </p>
        <p>
          No portion of our materials may be copied, modified, distributed, sold, or used to create derivative works without prior written consent.
        </p>
      </>
    ),
  },
  {
    id: 'user-responsibilities',
    heading: 'User Responsibilities',
    body: (
      <>
        <p>You agree to:</p>
        <ul className="list-disc pl-6 space-y-1.5">
          <li>Provide accurate and current information during registration and engagement scoping.</li>
          <li>Keep your account credentials confidential and notify us promptly of any suspected unauthorised access.</li>
          <li>Use the services only for lawful purposes and in compliance with applicable laws and regulations.</li>
          <li>Not interfere with, disrupt, or attempt to gain unauthorised access to our systems, networks, or other users&rsquo; data.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'limitation-of-liability',
    heading: 'Limitation of Liability',
    body: (
      <>
        <p>
          To the maximum extent permitted by law, Armour Infosec shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or business interruption, arising out of or in connection with your use of the services.
        </p>
        <p>
          Our aggregate liability for any direct damages will not exceed the fees paid by you for the specific service giving rise to the claim during the twelve (12) months preceding the event.
        </p>
      </>
    ),
  },
  {
    id: 'third-party',
    heading: 'Third-Party Services',
    body: (
      <>
        <p>
          The website and services may rely on third-party providers for hosting, payment processing, email delivery, analytics, and similar functions. Your interaction with those providers is governed by their respective terms and privacy policies. We are not responsible for the practices of any third party.
        </p>
      </>
    ),
  },
  {
    id: 'payments',
    heading: 'Payment & Refund Policy',
    body: (
      <>
        <p>
          Course fees, consulting rates, and assessment pricing are communicated prior to enrolment or engagement. Fees are payable per the schedule in your enrolment confirmation or SOW. Failure to pay may result in suspension of access.
        </p>
        <p>
          Refund eligibility is determined by course type and engagement stage. For training, a partial refund may be available within fourteen (14) days of enrolment if no more than 20% of the curriculum has been accessed. Consulting and assessment engagements are non-refundable once the engagement has commenced, except as expressly agreed in writing.
        </p>
        <p>
          If a refund is approved, the amount will be credited within 7-14 working business days.
        </p>
        <p>
          Enrolment is also subject to our{' '}
          <Link href="/academic-policy/" className="text-accent hover:underline">
            Academic Policy
          </Link>
          . Dismissal or termination for academic misconduct or a breach of that policy forfeits any eligibility for a refund.
        </p>
      </>
    ),
  },
  {
    id: 'acceptable-use',
    heading: 'Security & Acceptable Use',
    body: (
      <>
        <p>
          You may not attempt to compromise, reverse-engineer, or otherwise interfere with the security of the Armour Infosec website, lab platform, or supporting infrastructure unless you have been engaged by us under a written authorisation to do so.
        </p>
        <p>
          Any responsible security disclosure should be sent to{' '}
          <a href={`mailto:${businessEmail}`} className="text-accent hover:underline">
            {businessEmail}
          </a>{' '}with sufficient information for us to validate and remediate the issue. We will acknowledge receipt within a reasonable timeframe.
        </p>
      </>
    ),
  },
  {
    id: 'termination',
    heading: 'Account Termination',
    body: (
      <>
        <p>
          We may suspend or terminate your access to any service, with or without notice, for breach of these Terms, fraudulent or unlawful activity, or any action that puts our infrastructure, other users, or our reputation at risk. Termination does not relieve you of any payment obligations already incurred.
        </p>
        <p>
          Sections covering intellectual property, limitation of liability, and dispute resolution survive termination.
        </p>
      </>
    ),
  },
  {
    id: 'disclaimer',
    heading: 'Disclaimer',
    body: (
      <>
        <p>
          The services are provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis. While Armour Infosec follows industry best practices and ISO 9001:2015 aligned processes, we do not warrant that any assessment will identify every vulnerability, that any course will guarantee employment or certification, or that the services will be uninterrupted or error-free.
        </p>
        <p>
          Findings and recommendations are produced in good faith based on the information available at the time of engagement.
        </p>
      </>
    ),
  },
  {
    id: 'contact',
    heading: 'Contact Information',
    body: (
      <>
        <p>For questions about these Terms of Service, please contact us:</p>
        <ul className="space-y-1.5">
          <li>
            Email:{' '}
            <a href={`mailto:${businessEmail}`} className="text-accent hover:underline">
              {businessEmail}
            </a>
          </li>
          <li>Address: {businessAddress.full}</li>
          <li>
            Or use the <Link href="/contact/" className="text-accent hover:underline">contact form</Link>.
          </li>
        </ul>
      </>
    ),
  },
]

export default function TermsOfServicePage() {
  return (
    <LegalPageLayout
      tag="// Legal"
      title="Terms of Service"
      description="Terms governing the use of Armour Infosec training, consulting, assessments, and website services."
      lastUpdated="17 May 2026"
      sections={SECTIONS}
    />
  )
}
