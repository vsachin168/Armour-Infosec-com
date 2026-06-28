import type { Metadata } from 'next'
import { TrainingPageTemplate } from '@/components/TrainingPageTemplate'
import { trainingData } from '@/data/training'

const data = trainingData['web-application-security']

export const metadata: Metadata = {
  title: 'Advanced Web Application Security Testing Training',
  description: 'Master web application security testing, SQL injection, XSS, SSRF, XXE, authentication attacks, session management, file inclusion, OWASP Top 10, and advanced web exploitation with hands-on labs.',
  keywords: ['web application security', 'penetration testing', 'SQL injection', 'XSS', 'SSRF', 'XXE', 'Burp Suite', 'OWASP', 'bug bounty', 'web exploitation', 'authentication bypass', 'eWPT'],
}

export default function WebAppSecurityTrainingPage() {
  return <TrainingPageTemplate data={data} />
}
