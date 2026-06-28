import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ethical Hacking & Cyber Security Training in Indore',
  description:
    'Cyber security course in Indore — ethical hacking, penetration testing, web & API security, Active Directory, and more. Hands-on labs at the Armour Infosec training centre in Sudama Nagar, Indore.',
  keywords: [
    'OSCP+ certification training',
    'penetration testing certification courses',
    'ethical hacking certification training',
    'OSCP+ training in indore',
    'ethical hacking training in indore',
    'cyber security course indore',
    'penetration testing training indore',
    'best ethical hacking institute in indore',
    'CEH training indore',
    'cyber security training indore',
    'hands-on hacking labs indore',
  ],
  alternates: { canonical: '/training/' },
  openGraph: {
    title: 'Ethical Hacking & Cyber Security Training in Indore | Armour Infosec',
    description:
      'Practitioner-led ethical hacking and cyber security training in Indore with hands-on labs and placement assistance.',
    url: '/training/',
  },
}

export default function TrainingLayout({ children }: { children: React.ReactNode }) {
  return children
}
