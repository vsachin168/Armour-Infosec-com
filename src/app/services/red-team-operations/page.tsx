import type { Metadata } from 'next'
import { ServicePageTemplate } from '@/components/ServicePageTemplate'
import { servicesData } from '@/data/services'

const data = servicesData['red-team-operations']

export const metadata: Metadata = {
  title: 'Red Team Operations',
  description: data.description,
}

export default function RedTeamPage() {
  return <ServicePageTemplate data={data} />
}
