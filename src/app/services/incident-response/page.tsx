import type { Metadata } from 'next'
import { ServicePageTemplate } from '@/components/ServicePageTemplate'
import { servicesData } from '@/data/services'

const data = servicesData['incident-response']

export const metadata: Metadata = {
  title: 'Incident Response Services',
  description: data.description,
}

export default function IncidentResponsePage() {
  return <ServicePageTemplate data={data} />
}
