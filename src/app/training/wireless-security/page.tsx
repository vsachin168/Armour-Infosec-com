import type { Metadata } from 'next'
import { TrainingPageTemplate } from '@/components/TrainingPageTemplate'
import { trainingData } from '@/data/training'

const data = trainingData['wireless-security']

export const metadata: Metadata = {
  title: 'Wireless Security & WiFi Penetration Testing Training',
  description: 'Master Wi-Fi attacks, WPA/WPA2 exploitation, WEP cracking, wireless reconnaissance, deauthentication attacks, MITM attacks, evil twin, and wireless penetration testing with hands-on labs.',
  keywords: ['wireless security', 'WiFi hacking', 'WPA cracking', 'WEP attack', 'Aircrack-ng', 'wireless pentesting', 'deauthentication', 'evil twin', 'OSWP', 'packet injection', 'wireless MITM'],
}

export default function WirelessSecurityTrainingPage() {
  return <TrainingPageTemplate data={data} />
}
