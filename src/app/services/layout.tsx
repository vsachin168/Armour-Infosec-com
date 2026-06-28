import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Penetration Testing & Cyber Security Services',
  description:
    'Armour Infosec delivers penetration testing, vulnerability assessment, red-team operations, security auditing, and incident response for enterprises across India.',
  alternates: { canonical: '/services/' },
  openGraph: {
    title: 'Penetration Testing & Cyber Security Services | Armour Infosec',
    description:
      'Enterprise penetration testing, vulnerability assessment, red-team, audit, and DFIR services delivered by practitioners with 15+ years of offensive-security experience.',
    url: '/services/',
  },
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children
}
