import type { Metadata } from 'next'
import { ServicePageTemplate } from '@/components/ServicePageTemplate'
import { servicesData } from '@/data/services'

const data = servicesData['network-penetration-testing']

export const metadata: Metadata = {
  title: 'Internal & External Network Penetration Testing',
  description: data.description,
}

export default function NetworkPenetrationTestingPage() {
  return <ServicePageTemplate data={data} />
}
