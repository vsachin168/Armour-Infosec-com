import type { Metadata } from 'next'
import { ServicePageTemplate } from '@/components/ServicePageTemplate'
import { servicesData } from '@/data/services'

const data = servicesData['digital-forensics-incident-response']

export const metadata: Metadata = {
  title: 'Digital Forensics & Incident Response',
  description: data.description,
}

export default function DigitalForensicsPage() {
  return <ServicePageTemplate data={data} />
}
