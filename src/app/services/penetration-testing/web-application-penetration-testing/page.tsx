import type { Metadata } from 'next'
import { ServicePageTemplate } from '@/components/ServicePageTemplate'
import { servicesData } from '@/data/services'

const data = servicesData['web-application-penetration-testing']

export const metadata: Metadata = {
  title: 'Web Application Penetration Testing',
  description: data.description,
}

export default function WebApplicationPenetrationTestingPage() {
  return <ServicePageTemplate data={data} />
}
