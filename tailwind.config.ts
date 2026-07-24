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
          900: '#030712',
          800: '#060810',
          700: '#111827',
        },
        electric: {
          cyan: '#00F0FF',
          gold: '#FFD700',
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
        display: ['var(--font-space-grotesk)', 'sans-serif'],
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.0) 100%)',
      }
    },
  },
  plugins: [],
}

export default config
