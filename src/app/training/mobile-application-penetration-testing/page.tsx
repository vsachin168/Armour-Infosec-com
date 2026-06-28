import type { Metadata } from 'next'
import { TrainingPageTemplate } from '@/components/TrainingPageTemplate'
import { trainingData } from '@/data/training'

const data = trainingData['mobile-application-penetration-testing']

export const metadata: Metadata = {
  title: 'Mobile Application Penetration Testing Training',
  description: data.description,
  keywords: [
    'mobile application penetration testing training',
    'iOS pentest training',
    'Android pentest training',
    'OWASP MASVS',
    'OWASP MASTG',
    'mobile security training indore',
  ],
}

export default function MobileApplicationPenetrationTestingTrainingPage() {
  return <TrainingPageTemplate data={data} />
}
