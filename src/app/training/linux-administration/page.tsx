import type { Metadata } from 'next'
import { TrainingPageTemplate } from '@/components/TrainingPageTemplate'
import { trainingData } from '@/data/training'

const data = trainingData['linux-administration']

export const metadata: Metadata = {
  title: 'Linux Administration & Server Hardening Training',
  description: 'Master Linux server administration, enterprise networking, Apache web hosting, DNS, DHCP, Samba, NFS, VPN, proxy servers, security hardening, monitoring, and infrastructure management with hands-on labs.',
  keywords: ['Linux Server', 'Linux Administration', 'Apache', 'DNS', 'DHCP', 'Samba', 'NFS', 'Squid Proxy', 'IPTables', 'SSH', 'server hardening', 'enterprise networking'],
}

export default function LinuxAdminTrainingPage() {
  return <TrainingPageTemplate data={data} />
}
