import type { Metadata } from 'next'
import { TrainingPageTemplate } from '@/components/TrainingPageTemplate'
import { trainingData } from '@/data/training'

const data = trainingData['php-development']

export const metadata: Metadata = {
  title: 'Secure PHP Development Training',
  description: 'Learn PHP programming from fundamentals to dynamic web application development with MySQL integration, CRUD applications, form handling, sessions, file operations, and secure coding practices.',
  keywords: ['PHP', 'PHP programming', 'MySQL', 'CRUD', 'web development', 'SQL injection prevention', 'prepared statements', 'secure coding', 'sessions', 'form handling', 'backend development'],
}

export default function PHPDevelopmentTrainingPage() {
  return <TrainingPageTemplate data={data} />
}
