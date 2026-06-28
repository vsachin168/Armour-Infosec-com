import { telUrl, whatsappUrl, businessPhone } from '@/lib/businessInfo'

export function StickyMobileCTA() {
  return (
    <div
      className="md:hidden fixed bottom-0 inset-x-0 z-40 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2 bg-gradient-to-t from-white via-white/95 to-white/0 dark:from-cyber-darker dark:via-cyber-darker/95 dark:to-cyber-darker/0"
      role="region"
      aria-label="Quick contact"
    >
      <div className="flex gap-2.5">
        <a
          href={telUrl}
          aria-label={`Call ${businessPhone.display}`}
          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-accent text-white font-semibold text-sm elevation-2 active:scale-[0.98] transition-transform"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h2.28a2 2 0 011.95 1.55l.7 3.03a2 2 0 01-.5 1.88L7.91 11.1a16 16 0 005 5l1.64-1.52a2 2 0 011.88-.5l3.03.7A2 2 0 0121 16.72V19a2 2 0 01-2 2h-1C9.72 21 3 14.28 3 6V5z" />
          </svg>
          Call Now
        </a>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#075E54] text-white font-semibold text-sm shadow-lg shadow-[#075E54]/30 active:scale-[0.98] transition-transform"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.5 3.5A11.5 11.5 0 003.6 19.1L2 22l3-1.5A11.5 11.5 0 1020.5 3.5zM12 20.3a8.3 8.3 0 01-4.2-1.2l-.3-.2-2.5.7.7-2.4-.2-.3A8.3 8.3 0 1112 20.3zm4.8-6.2c-.3-.1-1.6-.8-1.8-.9-.2-.1-.4-.1-.6.1-.2.3-.7.9-.8 1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.4-.5c.1-.2.2-.3.3-.5 0-.2 0-.4 0-.5l-.7-1.8c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2.1 3.2 5.1 4.5 1.8.7 2.4.8 3.2.7.5 0 1.6-.6 1.8-1.3.2-.6.2-1.2.2-1.3-.1-.1-.3-.2-.5-.3z" />
          </svg>
          WhatsApp
        </a>
      </div>
    </div>
  )
}
