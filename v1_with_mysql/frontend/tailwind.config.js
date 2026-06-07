/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f4f6fa',
          100: '#e8ecf4',
          200: '#c6d1e4',
          300: '#94aacb',
          400: '#5c7bab',
          500: '#3d598b',
          600: '#2e4571',
          700: '#26375d',
          800: '#1d2745',
          900: '#0F172A', // Deep navy / Near-black
          950: '#0B0F19', // Executive dark
        },
        primary: {
          DEFAULT: '#2563EB', // Royal Blue
          dark: '#1D4ED8',
          light: '#3B82F6',
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
        'glass-hover': '0 12px 40px 0 rgba(31, 38, 135, 0.12)',
      }
    },
  },
  plugins: [],
}


