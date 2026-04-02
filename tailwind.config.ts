import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        bgModal: 'rgba(220, 229, 242, 0.8)',
      },
      screens: {
        smmb: '460px',
      },
      keyframes: {
        'email-border-flash': {
          '0%, 100%': {
            borderColor: 'rgb(148 163 184)',
            backgroundColor: 'rgb(255 255 255)',
          },
          '50%': {
            borderColor: 'rgb(34 197 94)',
            backgroundColor: 'rgb(220 252 231)',
          },
        },
      },
      animation: {
        'email-border-flash': 'email-border-flash 1.5s ease-in-out 1',
      },
    },
  },
  plugins: [],
}
export default config
