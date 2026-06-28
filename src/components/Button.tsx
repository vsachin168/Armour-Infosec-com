import Link from 'next/link'

interface ButtonProps {
  href?: string
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  className?: string
  /** Render as a plain <a download target="_blank"> for file downloads instead of Next.js Link. */
  download?: boolean
}

export function Button({ href, variant = 'primary', size = 'md', children, className = '', download = false }: ButtonProps) {
  const base = 'inline-flex items-center justify-center font-semibold transition-all duration-200 rounded-lg active:scale-[0.98]'

  const variants = {
    primary: 'bg-accent text-white hover:bg-accent-dim elevation-2',
    secondary: 'bg-accent/10 border border-accent/40 text-accent hover:bg-accent/15',
    ghost: 'text-ink-soft hover:text-accent hover:bg-accent/5 border border-transparent hover:border-accent/20',
  }

  const sizes = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  }

  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`

  if (href) {
    if (download) {
      return (
        <a href={href} download target="_blank" rel="noopener noreferrer" className={classes}>
          {children}
        </a>
      )
    }
    return <Link href={href} className={classes}>{children}</Link>
  }

  return <button className={classes}>{children}</button>
}
