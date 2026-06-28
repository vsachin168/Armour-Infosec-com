import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface BreadcrumbProps {
  items: { label: string; href?: string }[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm">
      <Link href="/" className="text-gray-500 dark:text-gray-400 hover:text-accent transition-colors font-mono">
        ~
      </Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1">
          <ChevronRight className="w-3 h-3 text-gray-400 dark:text-gray-600" />
          {item.href ? (
            <Link href={item.href} className="text-gray-500 dark:text-gray-400 hover:text-accent transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-accent">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
