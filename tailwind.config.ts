import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'uz-black': '#040404',
        'uz-white': '#FDFDFD',
        'uz-indigo': '#4B3FFF',
        'uz-gold': '#FFDE00',
        'uz-teal': '#00C7CE',
        'uz-graphite': '#1C1C1C',
        'uz-slate': '#4A4A4A',
        'uz-silver': '#9A9A9A',
        'uz-fog': '#E0E0E0',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'ui-monospace', 'monospace'],
        display: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        'mono-wide': '0.25em',
        'mono-wider': '0.3em',
        'mono-widest': '0.4em',
        'tight-800': '-0.04em',
      },
      maxWidth: {
        '1440': '1440px',
      },
      spacing: {
        '63': '63px',
        '126': '126px',
        '189': '189px',
      },
      fontSize: {
        // Golden ratio 1.618 scale
        'hero': ['clamp(72px, 10vw, 160px)', { lineHeight: '0.9', letterSpacing: '-0.04em' }],
        'statement': ['clamp(36px, 5vw, 72px)', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        'cta': ['clamp(48px, 8vw, 120px)', { lineHeight: '0.95', letterSpacing: '-0.04em' }],
      },
      borderRadius: {
        'none': '0',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'reveal': 'cubic-bezier(0.76, 0, 0.24, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
