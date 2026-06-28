export const businessAddress = {
  street: '674, Sudama Dwar, Narendra Tiwari Marg',
  area: 'Sudama Nagar',
  city: 'Indore',
  state: 'Madhya Pradesh',
  postalCode: '452009',
  country: 'India',
  countryCode: 'IN',
  cityStatePin: 'Indore, Madhya Pradesh 452009',
  full: '674, Sudama Dwar, Narendra Tiwari Marg, Sudama Nagar, Indore, Madhya Pradesh 452009',
} as const

export const businessEmail = 'info@armourinfosec.com'

export const businessPhone = {
  display: '+91 99777 47168',
  tel: '+919977747168',
  whatsapp: '919977747168',
} as const

export const businessName = 'Armour Infosec'
export const businessUrl = 'https://www.armourinfosec.com'

export const businessGeo = {
  latitude: 22.693208,
  longitude: 75.834395,
} as const

export const businessPriceRange = '₹₹'

export type HoursBlock = {
  /** Schema.org dayOfWeek names, in order, that share these hours. Empty means closed. */
  days: ReadonlyArray<
    'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday'
  >
  /** Human label, e.g. "Monday – Friday" */
  label: string
  /** Display string, e.g. "10:00 AM – 8:00 PM" or "Closed" */
  display: string
  /** 24h opening time (HH:mm). Omit for a closed block. */
  opens?: string
  /** 24h closing time (HH:mm). Omit for a closed block. */
  closes?: string
}

export const businessHours: ReadonlyArray<HoursBlock> = [
  {
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    label: 'Monday – Friday',
    display: '10:00 AM – 8:00 PM',
    opens: '10:00',
    closes: '20:00',
  },
  {
    days: ['Saturday'],
    label: 'Saturday',
    display: '11:00 AM – 4:00 PM',
    opens: '11:00',
    closes: '16:00',
  },
  {
    days: ['Sunday'],
    label: 'Sunday',
    display: 'Closed',
  },
]

export const visitingHours: ReadonlyArray<{ label: string; display: string }> = [
  { label: 'Monday – Saturday', display: '1:00 PM – 4:00 PM' },
  { label: 'Monday – Saturday', display: '7:00 PM – 8:00 PM' },
]

export const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(businessAddress.full)}`
export const googleMapsEmbedUrl =
  'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7361.8837287272445!2d75.834395!3d22.693208!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fd3e546df71d%3A0xfd80269b1f95bb63!2sEthical%20Hacking%20Training%20Institute%20in%20Indore%20-%20Armour%20Infosec!5e0!3m2!1sen!2sus!4v1778995980631!5m2!1sen!2sus'
export const whatsappUrl = `https://wa.me/${businessPhone.whatsapp}`
export const telUrl = `tel:${businessPhone.tel}`
export const mailtoUrl = `mailto:${businessEmail}`
