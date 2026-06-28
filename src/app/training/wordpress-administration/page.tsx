import type { Metadata } from 'next'
import { TrainingPageTemplate } from '@/components/TrainingPageTemplate'
import { trainingData } from '@/data/training'

const data = trainingData['wordpress-administration']

export const metadata: Metadata = {
  title: 'Secure WordPress Administration Training',
  description: 'Learn to build, customize, manage, and secure professional WordPress websites with themes, plugins, user roles, media management, CSS customization, and security best practices.',
  keywords: ['WordPress', 'WordPress Administration', 'CMS', 'website management', 'WordPress security', 'themes', 'plugins', 'user roles', 'content management', 'web administration'],
}

export default function WordPressTrainingPage() {
  return <TrainingPageTemplate data={data} />
}
