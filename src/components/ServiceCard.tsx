import Link from 'next/link'

interface ServiceCardProps {
  icon: React.ReactNode
  title: string
  description: string
  href: string
}

export function ServiceCard({ icon, title, description, href }: ServiceCardProps) {
  return (
    <Link
      href={href}
      className="surface-card surface-card-hover block p-6 group"
    >
      <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-accent/10 border border-accent/20 text-accent mb-4 group-hover:bg-accent/20 transition-all duration-300">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-accent transition-colors">
        {title}
      </h3>
      <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
        {description}
      </p>
      <div className="mt-4 flex items-center text-accent text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
        <span>explore</span>
        <svg className="w-4 h-4 ml-1 translate-x-0 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  )
}
