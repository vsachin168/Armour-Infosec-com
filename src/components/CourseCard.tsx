import Link from 'next/link'

interface CourseCardProps {
  icon: React.ReactNode
  title: string
  /** e.g. "Beginner", "Intermediate", "Advanced" */
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  /** Short tagline shown beneath title. */
  description: string
  /** Optional certification prep tag, e.g. "OSCP+" or "CEH". */
  cert?: string
  href: string
  /** Renders a "NEW" pill in the card corner. */
  isNew?: boolean
}

const levelStyles: Record<CourseCardProps['level'], string> = {
  Beginner:
    'bg-blue-500/10 border-blue-500/30 text-blue-600 dark:text-blue-400',
  Intermediate:
    'bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400',
  Advanced:
    'bg-accent/10 border-accent/30 text-accent',
}

export function CourseCard({ icon, title, level, description, cert, href, isNew = false }: CourseCardProps) {
  return (
    <Link
      href={href}
      className="surface-card surface-card-hover group relative flex h-full flex-col p-6"
    >
      {isNew && (
        <span className="absolute -top-2 -right-2 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-accent text-white shadow-sm">
          New
        </span>
      )}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="w-11 h-11 flex items-center justify-center rounded-lg bg-accent/10 border border-accent/20 text-accent shrink-0 group-hover:bg-accent/20 transition-all duration-300">
          {icon}
        </div>
        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider border ${levelStyles[level]}`}>
          {level}
        </span>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-accent transition-colors">
        {title}
      </h3>
      <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4 flex-1">
        {description}
      </p>
      <div className="flex flex-wrap items-center gap-2 mb-5">
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-mono uppercase tracking-wide bg-gray-100 dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.06] text-gray-600 dark:text-gray-400">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true" />
          Hands-on Labs
        </span>
        {cert && (
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-mono uppercase tracking-wide bg-gray-100 dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.06] text-gray-600 dark:text-gray-400">
            {cert} prep
          </span>
        )}
      </div>
      <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-200/60 dark:border-white/[0.06]">
        <span className="text-sm font-semibold text-accent">Enroll Now</span>
        <svg className="w-4 h-4 text-accent translate-x-0 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  )
}
