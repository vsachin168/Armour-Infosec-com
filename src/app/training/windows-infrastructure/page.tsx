import type { Metadata } from 'next'
import { TrainingPageTemplate } from '@/components/TrainingPageTemplate'
import { trainingData } from '@/data/training'

const data = trainingData['windows-infrastructure']

export const metadata: Metadata = {
  title: 'Enterprise Windows Infrastructure Security Training',
  description: 'Master enterprise networking, Windows Server administration, Active Directory, DNS, DHCP, IIS, VPN, DFS, Group Policy, and infrastructure security with hands-on labs.',
  keywords: ['Windows Server', 'Active Directory', 'DHCP', 'DNS', 'IIS', 'Group Policy', 'VPN', 'enterprise networking', 'server administration'],
}

export default function WindowsInfraTrainingPage() {
  return <TrainingPageTemplate data={data} />
}
