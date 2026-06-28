import type { Metadata } from 'next'
import { ServicePageTemplate } from '@/components/ServicePageTemplate'
import { servicesData } from '@/data/services'

const data = servicesData['active-directory-security']

export const metadata: Metadata = {
  title: 'Active Directory Security Assessment',
  description: data.description,
}

export default function ActiveDirectorySecurityPage() {
  return <ServicePageTemplate data={data} />
}
