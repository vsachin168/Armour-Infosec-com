import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // Keep design-system primitives in the bundle even before components
  // adopt them — added in commit b75c7e4+ for opt-in use.
  safelist: [
    'section-pad',
    'surface-card',
    'surface-card-hover',
    'elevation-1',
    'elevation-2',
    'elevation-3',
    'accent-pill',
    'hero-glow',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
          950: '#042f2e',
        },
        accent: {
          DEFAULT: 'var(--color-accent)',
          dim: 'var(--color-accent-dim)',
          glow: 'var(--color-accent-glow)',
        },
        cyber: {
          dark: 'var(--color-cyber-dark)',
          darker: 'var(--color-cyber-darker)',
          card: 'var(--color-cyber-card)',
          border: 'var(--color-cyber-border)',
          muted: 'var(--color-cyber-muted)',
        },
        ink: {
          DEFAULT: 'var(--color-ink)',
          soft: 'var(--color-ink-soft)',
        },
      },
      fontFamily: {
        mono: ['var(--font-mono)', 'JetBrains Mono', 'Fira Code', 'monospace'],
        sans: ['var(--font-sans)', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite alternate',
        'terminal-blink': 'terminal-blink 1s step-end infinite',
        'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
        'scan-line': 'scan-line 3s linear infinite',
      },
      keyframes: {
        'glow-pulse': {
          '0%': { boxShadow: '0 0 5px var(--color-accent-glow), 0 0 10px var(--color-accent-glow)' },
          '100%': { boxShadow: '0 0 20px var(--color-accent-glow), 0 0 40px var(--color-accent-glow)' },
        },
        'terminal-blink': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scan-line': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
      },
      backgroundImage: {
        'grid-pattern': 'linear-gradient(to right, #1f293710 1px, transparent 1px), linear-gradient(to bottom, #1f293710 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
}
export default config
