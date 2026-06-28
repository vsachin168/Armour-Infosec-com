import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ThemeProvider } from '@/components/ThemeProvider'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-mono',
  display: 'swap',
})
import {
  businessAddress,
  businessEmail,
  businessGeo,
  businessHours,
  businessName,
  businessPhone,
  businessPriceRange,
  businessUrl,
} from '@/lib/businessInfo'

const openingHoursSpecification = businessHours
  .filter((block) => block.opens && block.closes)
  .map((block) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: block.days,
    opens: block.opens,
    closes: block.closes,
  }))

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'EducationalOrganization'],
  '@id': `${businessUrl}/#organization`,
  name: businessName,
  alternateName: 'Armour Infosec — Cyber Security Training Indore',
  url: businessUrl,
  email: businessEmail,
  telephone: businessPhone.tel,
  image: `${businessUrl}/logo/Armour-Infosec.png`,
  logo: `${businessUrl}/logo/Armour-Infosec.png`,
  priceRange: businessPriceRange,
  description:
    'Armour Infosec offers ethical hacking training, penetration testing, vulnerability assessment, and cyber security consulting in Indore, Madhya Pradesh.',
  slogan: 'Built by Hackers, for Defenders.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: `${businessAddress.street}, ${businessAddress.area}`,
    addressLocality: businessAddress.city,
    addressRegion: businessAddress.state,
    postalCode: businessAddress.postalCode,
    addressCountry: businessAddress.countryCode,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: businessGeo.latitude,
    longitude: businessGeo.longitude,
  },
  openingHoursSpecification,
  areaServed: [
    { '@type': 'City', name: 'Indore' },
    { '@type': 'AdministrativeArea', name: 'Madhya Pradesh' },
    { '@type': 'Country', name: 'India' },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Cyber Security Training Programs',
    url: `${businessUrl}/training/`,
  },
  sameAs: [
    'https://x.com/ArmourInfosec',
    'https://www.instagram.com/armourinfosec/',
    'https://www.linkedin.com/company/armourinfosec',
    'https://www.youtube.com/c/TheHackersWorld',
    'https://www.facebook.com/armourinfosec',
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL(businessUrl),
  title: {
    default: 'Ethical Hacking Training in Indore | Armour Infosec',
    template: '%s | Armour Infosec',
  },
  description:
    'Armour Infosec — ethical hacking training, penetration testing, vulnerability assessment, and cyber security consulting in Indore, Madhya Pradesh.',
  keywords: [
    'OSCP+',
    'OSCP+ certification training',
    'penetration testing certification courses',
    'ethical hacking certification training',
    'ethical hacking training in indore',
    'cyber security course indore',
    'penetration testing training indore',
    'best ethical hacking institute in indore',
    'CEH',
    'cybersecurity',
    'penetration testing',
    'vulnerability assessment',
    'infosec',
    'security consulting',
  ],
  authors: [{ name: 'Armour Infosec' }],
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Armour Infosec',
    title: 'Armour Infosec - Cybersecurity Consulting & Training',
    description: 'Premium cybersecurity consulting, penetration testing, and professional training services.',
    images: [{ url: '/logo/Armour-Infosec.png', width: 512, height: 512, alt: 'Armour Infosec' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Armour Infosec - Cybersecurity Consulting & Training',
    description: 'Premium cybersecurity consulting, penetration testing, and professional training services.',
    images: ['/logo/Armour-Infosec.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var r=t==='system'?window.matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light':t||'light';var c=document.documentElement.classList;if(r==='dark')c.add('dark');else c.remove('dark')}catch(e){}})()`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <ThemeProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
