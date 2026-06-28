import Image from 'next/image'

interface BrandLogoProps {
  /** Tailwind classes controlling outer sizing/placement. */
  className?: string
  /** Set true for above-the-fold uses (hero). Default is lazy loading. */
  priority?: boolean
  /** Override alt text. Defaults to the brand-name alt. */
  alt?: string
}

export function BrandLogo({ className = 'h-20 w-auto', priority = false, alt = 'Armour InfoSec Logo' }: BrandLogoProps) {
  return (
    <Image
      src="/logo/Armour-Infosec.png"
      alt={alt}
      width={160}
      height={160}
      priority={priority}
      className={`object-contain ${className}`}
    />
  )
}
