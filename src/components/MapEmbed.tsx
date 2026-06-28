import { businessAddress, googleMapsEmbedUrl, googleMapsUrl } from '@/lib/businessInfo'

export function MapEmbed() {
  return (
    <div className="rounded-2xl overflow-hidden border border-gray-200/60 dark:border-cyber-border bg-white/60 dark:bg-white/[0.03] backdrop-blur-sm">
      <div className="relative w-full aspect-[16/9] bg-gray-100 dark:bg-white/[0.02]">
        <iframe
          title="Armour Infosec - Ethical Hacking Training Institute in Indore Location Map"
          src={googleMapsEmbedUrl}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0"
        />
      </div>
      <div className="flex items-center justify-between gap-4 px-4 py-3 border-t border-gray-200/60 dark:border-cyber-border">
        <p className="text-xs font-mono text-gray-500 dark:text-gray-400 truncate">
          {businessAddress.cityStatePin}
        </p>
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-mono text-accent hover:underline whitespace-nowrap"
        >
          Find us on Google Maps →
        </a>
      </div>
    </div>
  )
}
