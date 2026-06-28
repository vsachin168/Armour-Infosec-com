import { businessAddress } from '@/lib/businessInfo'

interface BusinessAddressProps {
  className?: string
  variant?: 'stacked' | 'inline'
}

export function BusinessAddress({ className = 'text-sm text-gray-500 dark:text-gray-400', variant = 'stacked' }: BusinessAddressProps) {
  const { street, area, cityStatePin } = businessAddress

  if (variant === 'inline') {
    return (
      <address className={`not-italic leading-relaxed ${className}`}>
        {street}, {area}, {cityStatePin}
      </address>
    )
  }

  return (
    <address className={`not-italic leading-relaxed space-y-0.5 ${className}`}>
      <div>{street}</div>
      <div>{area}</div>
      <div>{cityStatePin}</div>
    </address>
  )
}
