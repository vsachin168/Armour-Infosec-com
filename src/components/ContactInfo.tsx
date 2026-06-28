import { BusinessAddress } from './BusinessAddress'
import {
  businessEmail,
  businessPhone,
  mailtoUrl,
  telUrl,
  whatsappUrl,
} from '@/lib/businessInfo'

const cardClass =
  'flex items-start gap-4 p-4 rounded-xl bg-white/60 dark:bg-white/[0.03] border border-gray-200/60 dark:border-cyber-border backdrop-blur-sm hover:border-accent/30 dark:hover:border-accent/30 transition-all duration-300'
const iconWrap =
  'w-10 h-10 flex items-center justify-center rounded-lg bg-accent/10 border border-accent/20 text-accent shrink-0'
const label = 'text-sm font-mono text-gray-500 dark:text-gray-400 mb-1'
const value = 'text-gray-900 dark:text-white hover:text-accent transition-colors break-words'

export function ContactInfo() {
  return (
    <div className="space-y-4">
      <div className={cardClass}>
        <div className={iconWrap}>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h2.28a2 2 0 011.95 1.55l.7 3.03a2 2 0 01-.5 1.88L7.91 11.1a16 16 0 005 5l1.64-1.52a2 2 0 011.88-.5l3.03.7A2 2 0 0121 16.72V19a2 2 0 01-2 2h-1C9.72 21 3 14.28 3 6V5z" />
          </svg>
        </div>
        <div className="min-w-0">
          <p className={label}>Phone</p>
          <a href={telUrl} className={value}>{businessPhone.display}</a>
        </div>
      </div>

      <div className={cardClass}>
        <div className={iconWrap}>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.5 3.5A11.5 11.5 0 003.6 19.1L2 22l3-1.5A11.5 11.5 0 1020.5 3.5zM12 20.3a8.3 8.3 0 01-4.2-1.2l-.3-.2-2.5.7.7-2.4-.2-.3A8.3 8.3 0 1112 20.3zm4.8-6.2c-.3-.1-1.6-.8-1.8-.9-.2-.1-.4-.1-.6.1-.2.3-.7.9-.8 1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.4-.5c.1-.2.2-.3.3-.5 0-.2 0-.4 0-.5l-.7-1.8c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2.1 3.2 5.1 4.5 1.8.7 2.4.8 3.2.7.5 0 1.6-.6 1.8-1.3.2-.6.2-1.2.2-1.3-.1-.1-.3-.2-.5-.3z" />
          </svg>
        </div>
        <div className="min-w-0">
          <p className={label}>WhatsApp</p>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={value}>
            Message us on WhatsApp
          </a>
        </div>
      </div>

      <div className={cardClass}>
        <div className={iconWrap}>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <div className="min-w-0">
          <p className={label}>Email</p>
          <a href={mailtoUrl} className={value}>{businessEmail}</a>
        </div>
      </div>

      <div className={cardClass}>
        <div className={iconWrap}>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <div className="min-w-0">
          <p className={label}>Office Address</p>
          <BusinessAddress className="text-gray-900 dark:text-white text-sm" />
        </div>
      </div>

      <div className={cardClass}>
        <div className={iconWrap}>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="min-w-0">
          <p className={label}>Response Time</p>
          <p className="text-gray-900 dark:text-white">Within 24 hours</p>
        </div>
      </div>
    </div>
  )
}
