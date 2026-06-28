interface TerminalProps {
  title?: string
  children: React.ReactNode
  className?: string
}

export function Terminal({ title = 'terminal', children, className = '' }: TerminalProps) {
  return (
    <div className={`relative rounded-lg border border-gray-200 dark:border-cyber-border overflow-hidden bg-gray-50 dark:bg-cyber-dark transition-colors duration-300 shadow-sm ${className}`}>
      {/* Decorative static scan-lines — sits above the content
          at very low opacity for a subtle CRT texture. */}
      <div aria-hidden="true" className="absolute inset-0 cyber-scanlines-static opacity-60 z-10" />
      <div className="relative z-0 flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-cyber-card border-b border-gray-200 dark:border-cyber-border">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500/80" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <span className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <span className="text-xs text-gray-500 dark:text-gray-400 font-mono ml-2">{title}</span>
      </div>
      <div className="relative z-0 p-4 font-mono text-sm text-gray-700 dark:text-gray-300 overflow-x-auto">
        {children}
      </div>
    </div>
  )
}
