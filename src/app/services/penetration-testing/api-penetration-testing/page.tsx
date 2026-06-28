import type { Metadata } from 'next'
import { ServicePageTemplate } from '@/components/ServicePageTemplate'
import { servicesData } from '@/data/services'

const data = servicesData['api-penetration-testing']

export const metadata: Metadata = {
  title: 'API Penetration Testing',
  description: data.description,
}

export default function ApiPenetrationTestingPage() {
  return <ServicePageTemplate data={data} />
}
