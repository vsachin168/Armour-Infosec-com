import type { Metadata } from 'next'
import { TrainingPageTemplate } from '@/components/TrainingPageTemplate'
import { trainingData } from '@/data/training'

const data = trainingData['ethical-hacking']

export const metadata: Metadata = {
  title: 'Certified Ethical Hacking & Penetration Testing Training',
  description: 'Master ethical hacking, penetration testing, Kali Linux, Metasploit, privilege escalation, buffer overflow, network attacks, malware analysis, and offensive security with hands-on labs.',
  keywords: ['ethical hacking', 'penetration testing', 'Kali Linux', 'Metasploit', 'OSCP+', 'CEH', 'privilege escalation', 'buffer overflow', 'vulnerability assessment', 'red team', 'offensive security', 'cybersecurity training'],
}

export default function EthicalHackingTrainingPage() {
  return <TrainingPageTemplate data={data} />
}
