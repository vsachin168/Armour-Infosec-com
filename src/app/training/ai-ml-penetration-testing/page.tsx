import type { Metadata } from 'next'
import { TrainingPageTemplate } from '@/components/TrainingPageTemplate'
import { trainingData } from '@/data/training'

const data = trainingData['ai-ml-penetration-testing']

export const metadata: Metadata = {
  title: 'AI/ML Penetration Testing Training',
  description: data.description,
  keywords: [
    'AI penetration testing training',
    'LLM security training',
    'OWASP LLM Top 10',
    'adversarial machine learning',
    'AI red teaming',
    'prompt injection',
    'AI/ML pentest course indore',
  ],
}

export default function AiMlPenetrationTestingTrainingPage() {
  return <TrainingPageTemplate data={data} />
}
