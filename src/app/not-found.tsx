import { Button } from '@/components/Button'
import { Terminal } from '@/components/Terminal'

export default function NotFound() {
  return (
    <div className="pt-24 min-h-screen flex items-center justify-center bg-cyber-darker">
      <div className="max-w-xl mx-auto px-4 text-center">
        <div className="text-8xl font-mono font-bold gradient-text mb-4">404</div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Page Not Found</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          The resource you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Terminal title="error.log" className="mb-8 text-left">
          <div className="space-y-1 text-xs">
            <p className="text-red-400">[ERROR] 404 - Resource not found</p>
            <p className="text-gray-500">[INFO] Redirecting to safe zone...</p>
            <p><span className="text-accent">$</span> cd /home</p>
          </div>
        </Terminal>
        <Button href="/" variant="primary">
          Return Home
        </Button>
      </div>
    </div>
  )
}
