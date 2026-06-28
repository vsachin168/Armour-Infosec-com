import type { Metadata } from 'next'
import { ServicePageTemplate } from '@/components/ServicePageTemplate'
import { servicesData } from '@/data/services'

const data = servicesData['security-auditing']

export const metadata: Metadata = {
  title: 'Security Auditing & Compliance',
  description: data.description,
}

export default function SecurityAuditingPage() {
  return <ServicePageTemplate data={data} />
}
