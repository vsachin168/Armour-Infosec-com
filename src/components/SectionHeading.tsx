interface SectionHeadingProps {
  tag?: string
  title: string
  description?: string
  align?: 'left' | 'center'
}

export function SectionHeading({ tag, title, description, align = 'center' }: SectionHeadingProps) {
  const alignClass = align === 'center' ? 'text-center' : 'text-left'

  return (
    <div className={`mb-12 ${alignClass}`}>
      {tag && (
        <span className="inline-block font-mono text-xs text-accent uppercase tracking-widest mb-3">
          {'// '}{tag}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
        {title}
      </h2>
      {description && (
        <p className={`text-gray-500 dark:text-gray-400 text-lg max-w-2xl ${align === 'center' ? 'mx-auto' : ''}`}>
          {description}
        </p>
      )}
    </div>
  )
}
