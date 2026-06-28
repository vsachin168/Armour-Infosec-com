import type { Metadata } from 'next'
import { TrainingPageTemplate } from '@/components/TrainingPageTemplate'
import { trainingData } from '@/data/training'

const data = trainingData['active-directory-security']

export const metadata: Metadata = {
  title: 'Active Directory Security & Enterprise Attacks Training',
  description: 'Master Active Directory enumeration, Kerberos attacks, LDAP reconnaissance, credential dumping, Pass-the-Hash, Pass-the-Ticket, privilege escalation, and enterprise post-exploitation techniques.',
  keywords: ['Active Directory', 'Kerberos', 'Kerberoasting', 'LDAP', 'Pass-the-Hash', 'BloodHound', 'Mimikatz', 'privilege escalation', 'red team', 'enterprise pentesting', 'CRTP', 'domain admin'],
}

export default function ADSecurityTrainingPage() {
  return <TrainingPageTemplate data={data} />
}
