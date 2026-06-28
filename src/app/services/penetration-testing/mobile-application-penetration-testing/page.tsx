import type { Metadata } from 'next'
import { ServicePageTemplate } from '@/components/ServicePageTemplate'
import { servicesData } from '@/data/services'

const data = servicesData['mobile-application-penetration-testing']

export const metadata: Metadata = {
  title: 'Mobile Application Penetration Testing',
  description: data.description,
}

export default function MobileApplicationPenetrationTestingPage() {
  return <ServicePageTemplate data={data} />
}
