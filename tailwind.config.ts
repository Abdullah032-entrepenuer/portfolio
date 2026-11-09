import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: '#050507',
          900: '#050507',
          800: '#0B0C10',
          700: '#12141C',
        },
        cyber: {
          emerald: '#10B981',
          indigo: '#6366F1',
          violet: '#8B5CF6',
        },
        electric: {
          cyan: '#10B981',
          gold: '#8B5CF6',
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'var(--font-kanit)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
        display: ['var(--font-syne)', 'var(--font-inter)', 'sans-serif'],
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.0) 100%)',
      }
    },
  },
  plugins: [],
}

export default config
