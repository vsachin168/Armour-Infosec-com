import type { Metadata } from 'next'
import { ServicePageTemplate } from '@/components/ServicePageTemplate'
import { servicesData } from '@/data/services'

const data = servicesData['ai-ml-penetration-testing']

export const metadata: Metadata = {
  title: 'AI/ML Penetration Testing',
  description: data.description,
}

export default function AiMlPenetrationTestingPage() {
  return <ServicePageTemplate data={data} />
}
