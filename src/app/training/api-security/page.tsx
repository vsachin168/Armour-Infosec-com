import type { Metadata } from 'next'
import { TrainingPageTemplate } from '@/components/TrainingPageTemplate'
import { trainingData } from '@/data/training'

const data = trainingData['api-security']

export const metadata: Metadata = {
  title: 'API Security & Advanced API Exploitation Training',
  description: 'Master API security testing, REST/SOAP/GraphQL exploitation, JWT attacks, BOLA, BFLA, SSRF, injection attacks, and OWASP API Security Top 10 with hands-on labs.',
  keywords: ['API security', 'API penetration testing', 'REST API', 'GraphQL', 'SOAP', 'JWT', 'BOLA', 'OWASP API Top 10', 'API exploitation', 'bug bounty', 'authorization bypass', 'SSRF'],
}

export default function APISecurityTrainingPage() {
  return <TrainingPageTemplate data={data} />
}
