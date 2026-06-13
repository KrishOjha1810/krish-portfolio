/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Kanit', 'sans-serif'],
      },
      colors: {
        ink: '#0C0C0C',
        mist: '#D7E2EA',
      },
      keyframes: {
        aurora: {
          from: { backgroundPosition: '50% 50%, 50% 50%' },
          to: { backgroundPosition: '350% 50%, 350% 50%' },
        },
        spotlight: {
          '0%': { opacity: 0, transform: 'translate(-72%, -62%) scale(0.5)' },
          '100%': { opacity: 1, transform: 'translate(-50%, -40%) scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'border-spin': {
          '100%': { transform: 'rotate(-360deg)' },
        },
      },
      animation: {
        aurora: 'aurora 60s linear infinite',
        spotlight: 'spotlight 2.4s ease 0.4s 1 forwards',
        shimmer: 'shimmer 3s linear infinite',
        'border-spin': 'border-spin 7s linear infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
