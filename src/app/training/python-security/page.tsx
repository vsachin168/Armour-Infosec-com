import type { Metadata } from 'next'
import { TrainingPageTemplate } from '@/components/TrainingPageTemplate'
import { trainingData } from '@/data/training'

const data = trainingData['python-security']

export const metadata: Metadata = {
  title: 'Python for Security Professionals Training',
  description: 'Master Python programming from fundamentals to advanced concepts for cybersecurity, ethical hacking, automation, OOP, socket programming, file handling, and security tool development.',
  keywords: ['Python', 'Python programming', 'cybersecurity', 'ethical hacking', 'automation', 'scripting', 'socket programming', 'OOP', 'security tools', 'penetration testing', 'Python for hackers'],
}

export default function PythonSecurityTrainingPage() {
  return <TrainingPageTemplate data={data} />
}
