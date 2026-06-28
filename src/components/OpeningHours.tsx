import { businessHours, visitingHours } from '@/lib/businessInfo'

const ClockIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const CalendarIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
)

const cardClass =
  'group relative p-6 sm:p-7 rounded-2xl surface-card surface-card-hover transition-all duration-300'

const headingRow = 'flex items-center gap-3 mb-5 pb-4 border-b border-gray-200/60 dark:border-white/[0.06]'
const iconWrap =
  'w-10 h-10 flex items-center justify-center rounded-lg bg-accent/10 border border-accent/20 text-accent shrink-0 group-hover:bg-accent/15 transition-colors'

export function OpeningHours() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <section className={cardClass} aria-labelledby="business-hours-heading">
        <div className={headingRow}>
          <div className={iconWrap}>
            <CalendarIcon />
          </div>
          <div>
            <p className="text-xs font-mono text-accent uppercase tracking-widest">Open</p>
            <h3 id="business-hours-heading" className="text-lg font-semibold text-gray-900 dark:text-white">
              Business Hours
            </h3>
          </div>
        </div>
        <ul className="space-y-3">
          {businessHours.map((block) => {
            const isClosed = !block.opens
            return (
              <li
                key={block.label}
                className={`flex items-baseline justify-between gap-4 text-sm ${
                  isClosed
                    ? 'px-3 py-2 -mx-3 rounded-lg bg-red-500/5 dark:bg-red-500/10 border border-red-500/15 dark:border-red-500/20'
                    : ''
                }`}
              >
                <span className={`font-mono ${isClosed ? 'text-red-600 dark:text-red-400' : 'text-gray-600 dark:text-gray-300'}`}>
                  {block.label}
                </span>
                {isClosed ? (
                  <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-red-600 dark:text-red-400 uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" aria-hidden="true" />
                    {block.display}
                  </span>
                ) : (
                  <time className="font-mono text-gray-900 dark:text-white tabular-nums">
                    {block.display}
                  </time>
                )}
              </li>
            )
          })}
        </ul>
      </section>

      <section className={cardClass} aria-labelledby="visiting-hours-heading">
        <div className={headingRow}>
          <div className={iconWrap}>
            <ClockIcon />
          </div>
          <div>
            <p className="text-xs font-mono text-accent uppercase tracking-widest">Walk-in</p>
            <h3 id="visiting-hours-heading" className="text-lg font-semibold text-gray-900 dark:text-white">
              Visiting &amp; Inquiry Hours
            </h3>
          </div>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">
          Prefer to drop in? These are our dedicated windows for in-person enquiries and counselling.
        </p>
        <div className="space-y-3">
          <p className="font-mono text-sm text-gray-600 dark:text-gray-300">Monday – Saturday</p>
          <ul className="space-y-2 pl-4 border-l-2 border-accent/30">
            {visitingHours.map((slot) => (
              <li key={slot.display} className="flex items-center gap-2 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true" />
                <time className="font-mono text-gray-900 dark:text-white tabular-nums">
                  {slot.display}
                </time>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}
