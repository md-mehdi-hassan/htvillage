/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#0a0a0a',
          900: '#111111',
          800: '#1a1a1a',
          700: '#242424',
          600: '#2e2e2e',
        },
        olive: {
          400: '#9aa36a',
          500: '#7d824e',
          600: '#6a6f42',
          700: '#585c37',
        },
        accent: {
          yellow: '#e8c547',
        },
      },
      fontFamily: {
        display: ['"Outfit"', 'system-ui', 'sans-serif'],
        body: ['"Outfit"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        hero: '0.12em',
        wide2: '0.2em',
        wide3: '0.28em',
      },
    },
  },
  plugins: [],
}
