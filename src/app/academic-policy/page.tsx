import type { Metadata } from 'next'
import { LegalPageLayout, type LegalSection } from '@/components/LegalPageLayout'

export const metadata: Metadata = {
  title: 'Academic Policy',
  description:
    'Standards of academic integrity, examination conduct, AI use, lab authorisation, and certification integrity expected of every Armour Infosec learner.',
  alternates: { canonical: '/academic-policy/' },
}

const SECTIONS: LegalSection[] = [
  {
    id: 'purpose',
    heading: 'Purpose',
    body: (
      <>
        <p>
          Armour Infosec is committed to developing highly skilled cybersecurity professionals through practical,
          hands-on learning. Our training philosophy emphasises independent problem solving, critical thinking,
          ethical conduct, and professional responsibility.
        </p>
        <p>
          This Academic Policy defines the standards of behaviour expected from every learner participating in Armour
          Infosec courses, laboratories, assessments, certifications, and related learning activities.
        </p>
        <p>
          Failure to comply with this policy may result in disciplinary action, including suspension or permanent
          removal from the training platform.
        </p>
      </>
    ),
  },
  {
    id: 'academic-integrity',
    heading: 'Academic Integrity',
    body: (
      <>
        <p>
          Learners are expected to complete all coursework, laboratories, practical exercises, and assessments using
          their own knowledge, research, and effort.
        </p>
        <p>
          Independent learning is an essential part of cybersecurity education. While collaboration may be permitted in
          designated environments, every assessment intended to measure individual competency must be completed
          independently.
        </p>
        <p>
          Academic dishonesty undermines both the learning experience and the value of Armour Infosec certifications.
        </p>
      </>
    ),
  },
  {
    id: 'learner-responsibilities',
    heading: 'Learner Responsibilities',
    body: (
      <>
        <p>All learners must:</p>
        <ul className="list-disc pl-6 space-y-1.5">
          <li>Complete assessments honestly and independently.</li>
          <li>Follow all course and examination instructions.</li>
          <li>Protect their account credentials and authentication methods.</li>
          <li>Maintain the confidentiality of course content where required.</li>
          <li>Report suspected security issues affecting the platform responsibly.</li>
          <li>Use only authorised software, tools, and resources during assessments.</li>
          <li>Respect other learners, instructors, and the learning environment.</li>
          <li>Comply with all applicable laws and regulations.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'authorized-learning-resources',
    heading: 'Authorized Learning Resources',
    body: (
      <>
        <p>Unless otherwise specified, learners may use publicly available documentation and references while studying.</p>
        <p>Examples include:</p>
        <ul className="list-disc pl-6 space-y-1.5">
          <li>Official vendor documentation</li>
          <li>RFCs</li>
          <li>Security standards</li>
          <li>Programming language documentation</li>
          <li>Public CVE databases</li>
          <li>Public OWASP documentation</li>
          <li>Public MITRE ATT&amp;CK documentation</li>
        </ul>
        <p>Resources that disclose assessment answers or protected course material are prohibited.</p>
      </>
    ),
  },
  {
    id: 'artificial-intelligence',
    heading: 'Artificial Intelligence (AI)',
    body: (
      <>
        <p>Artificial intelligence tools can be valuable learning aids when used responsibly.</p>
        <p>Unless explicitly prohibited by a course or assessment, learners may use AI tools to:</p>
        <ul className="list-disc pl-6 space-y-1.5">
          <li>Understand cybersecurity concepts</li>
          <li>Learn programming languages</li>
          <li>Explain protocols and technologies</li>
          <li>Improve technical writing</li>
          <li>Generate practice examples</li>
          <li>Review documentation</li>
          <li>Learn defensive techniques</li>
        </ul>
        <p>Learners must not use AI systems to:</p>
        <ul className="list-disc pl-6 space-y-1.5">
          <li>Generate answers for graded assessments.</li>
          <li>Solve practical examinations on their behalf.</li>
          <li>Bypass learning objectives.</li>
          <li>Produce or request confidential assessment solutions.</li>
          <li>Generate plagiarism or copied submissions.</li>
          <li>Circumvent examination restrictions.</li>
        </ul>
        <p>Course-specific examination rules always take precedence over this policy.</p>
      </>
    ),
  },
  {
    id: 'practical-laboratories',
    heading: 'Practical Laboratories',
    body: (
      <>
        <p>Learners may perform offensive security activities only within:</p>
        <ul className="list-disc pl-6 space-y-1.5">
          <li>Armour Infosec laboratory environments</li>
          <li>Authorised practice targets</li>
          <li>Personal lab environments</li>
          <li>Systems for which they have explicit written authorisation</li>
        </ul>
        <p>Learners must never target:</p>
        <ul className="list-disc pl-6 space-y-1.5">
          <li>Public systems without authorisation</li>
          <li>Production environments</li>
          <li>Third-party infrastructure</li>
          <li>Other learners&apos; environments</li>
        </ul>
      </>
    ),
  },
  {
    id: 'examination-rules',
    heading: 'Examination Rules',
    body: (
      <>
        <p>During examinations, learners must:</p>
        <ul className="list-disc pl-6 space-y-1.5">
          <li>Complete the assessment independently.</li>
          <li>Follow all published examination procedures.</li>
          <li>Use only permitted resources.</li>
          <li>Maintain examination confidentiality.</li>
          <li>Submit original work.</li>
        </ul>
        <p>Unless explicitly permitted, learners must not:</p>
        <ul className="list-disc pl-6 space-y-1.5">
          <li>Receive assistance from another person.</li>
          <li>Provide assistance to another candidate.</li>
          <li>Share assessment questions.</li>
          <li>Share examination reports.</li>
          <li>Share proof-of-concept exploits.</li>
          <li>Share flags, credentials, solutions, or walkthroughs.</li>
          <li>Record or livestream examination content.</li>
          <li>Attempt to interfere with the examination infrastructure.</li>
        </ul>
        <p>Remote examinations may require additional proctoring requirements.</p>
      </>
    ),
  },
  {
    id: 'confidential-information',
    heading: 'Confidential Information',
    body: (
      <>
        <p>The following information must not be publicly disclosed unless explicitly authorised:</p>
        <ul className="list-disc pl-6 space-y-1.5">
          <li>Assessment content</li>
          <li>Practical examination scenarios</li>
          <li>Examination reports</li>
          <li>Walkthroughs</li>
          <li>Flags</li>
          <li>Credentials</li>
          <li>Private lab machines</li>
          <li>Internal documentation</li>
          <li>Instructor-only materials</li>
          <li>Proprietary training content</li>
        </ul>
        <p>Unauthorised distribution of protected content is strictly prohibited.</p>
      </>
    ),
  },
  {
    id: 'responsible-disclosure',
    heading: 'Responsible Disclosure',
    body: (
      <>
        <p>
          If a learner discovers a security vulnerability affecting Armour Infosec infrastructure, they must:
        </p>
        <ol className="list-decimal pl-6 space-y-1.5">
          <li>Report the issue promptly through the designated reporting process.</li>
          <li>Avoid unnecessary exploitation.</li>
          <li>Refrain from publicly disclosing the issue until authorised.</li>
          <li>Cooperate with Armour Infosec during remediation.</li>
        </ol>
        <p>Responsible disclosure will never be penalised when conducted in good faith.</p>
      </>
    ),
  },
  {
    id: 'acceptable-use',
    heading: 'Acceptable Use',
    body: (
      <>
        <p>Learners must not use Armour Infosec resources to:</p>
        <ul className="list-disc pl-6 space-y-1.5">
          <li>Launch attacks against unauthorised systems.</li>
          <li>Distribute malware.</li>
          <li>Perform illegal activities.</li>
          <li>Conduct phishing campaigns.</li>
          <li>Abuse cloud resources.</li>
          <li>Harass or threaten others.</li>
          <li>Circumvent platform security controls.</li>
          <li>Disrupt platform availability.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'intellectual-property',
    heading: 'Intellectual Property',
    body: (
      <>
        <p>All Armour Infosec course materials, including but not limited to:</p>
        <ul className="list-disc pl-6 space-y-1.5">
          <li>Videos</li>
          <li>Slides</li>
          <li>Documentation</li>
          <li>Laboratory content</li>
          <li>Assessments</li>
          <li>Source code</li>
          <li>Images</li>
          <li>Diagrams</li>
          <li>Scripts</li>
          <li>Exercises</li>
        </ul>
        <p>remain the intellectual property of Armour Infosec unless otherwise stated.</p>
        <p>
          Learners may not reproduce, redistribute, publish, sell, or commercially exploit course materials without
          written permission.
        </p>
      </>
    ),
  },
  {
    id: 'certification-integrity',
    heading: 'Certification Integrity',
    body: (
      <>
        <p>Certification holders must:</p>
        <ul className="list-disc pl-6 space-y-1.5">
          <li>Represent their certifications accurately.</li>
          <li>Use certification titles appropriately.</li>
          <li>Avoid misleading claims regarding certification scope.</li>
          <li>Maintain professional and ethical conduct.</li>
          <li>Comply with all certification requirements.</li>
        </ul>
        <p>
          Armour Infosec reserves the right to suspend or revoke certifications obtained through academic misconduct or
          ethical violations.
        </p>
      </>
    ),
  },
  {
    id: 'academic-misconduct',
    heading: 'Academic Misconduct',
    body: (
      <>
        <p>Examples of misconduct include, but are not limited to:</p>
        <ul className="list-disc pl-6 space-y-1.5">
          <li>Plagiarism</li>
          <li>Impersonation</li>
          <li>Cheating</li>
          <li>Unauthorised collaboration</li>
          <li>Sharing assessment solutions</li>
          <li>Using leaked examination materials</li>
          <li>Submitting another person&apos;s work</li>
          <li>Unauthorised access to examination systems</li>
          <li>Tampering with assessment infrastructure</li>
          <li>Circumventing platform restrictions</li>
          <li>Falsifying reports or evidence</li>
        </ul>
      </>
    ),
  },
  {
    id: 'enforcement',
    heading: 'Enforcement',
    body: (
      <>
        <p>Violations may result in one or more of the following actions:</p>
        <ul className="list-disc pl-6 space-y-1.5">
          <li>Warning</li>
          <li>Assessment invalidation</li>
          <li>Course failure</li>
          <li>Temporary account suspension</li>
          <li>Permanent account suspension</li>
          <li>Certification suspension</li>
          <li>Certification revocation</li>
          <li>Removal from future training programs</li>
          <li>Legal action where applicable</li>
        </ul>
        <p>Disciplinary actions are determined based on the severity, intent, and impact of the violation.</p>
      </>
    ),
  },
  {
    id: 'ethical-conduct',
    heading: 'Ethical Conduct',
    body: (
      <>
        <p>Learners are expected to uphold the highest standards of professionalism and ethics.</p>
        <p>
          Knowledge acquired through Armour Infosec training must be used only for lawful, authorised, and responsible
          purposes. Any misuse of acquired skills to facilitate illegal activity, unauthorised access, or harm to
          individuals or organisations is strictly prohibited.
        </p>
      </>
    ),
  },
  {
    id: 'policy-updates',
    heading: 'Policy Updates',
    body: (
      <>
        <p>
          Armour Infosec reserves the right to modify this Academic Policy at any time. Updated versions become effective
          upon publication. Continued participation in Armour Infosec courses, laboratories, or certification programs
          constitutes acceptance of the latest version of this policy.
        </p>
      </>
    ),
  },
  {
    id: 'contact',
    heading: 'Contact',
    body: (
      <p>
        Questions regarding this Academic Policy should be directed to the Armour Infosec Academic and Certification Team
        through the official support channels.
      </p>
    ),
  },
]

export default function AcademicPolicyPage() {
  return (
    <LegalPageLayout
      tag="// Academic"
      title="Academic Policy"
      description="Standards of academic integrity, examination conduct, AI use, lab authorisation, and certification integrity expected of every Armour Infosec learner."
      lastUpdated="16 July 2026"
      sections={SECTIONS}
    />
  )
}
