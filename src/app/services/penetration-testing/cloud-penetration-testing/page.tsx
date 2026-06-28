import type { Metadata } from 'next'
import { ServicePageTemplate } from '@/components/ServicePageTemplate'
import { servicesData } from '@/data/services'

const data = servicesData['cloud-penetration-testing']

export const metadata: Metadata = {
  title: 'Cloud Penetration Testing',
  description: data.description,
}

export default function CloudPenetrationTestingPage() {
  return <ServicePageTemplate data={data} />
}
