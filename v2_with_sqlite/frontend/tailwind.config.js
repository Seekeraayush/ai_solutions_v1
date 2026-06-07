export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: {
          deep:     '#07070F',
          base:     '#0D0D1A',
          card:     '#12121F',
          elevated: '#1A1A2E',
        },
        violet: { DEFAULT: '#7C3AED', light: '#8B5CF6', dark: '#6D28D9' },
        cyan:   { DEFAULT: '#06D6D6', light: '#22D3EE', dark: '#0891B2' },
        border: { subtle: 'rgba(124,58,237,0.2)', bright: 'rgba(124,58,237,0.5)' },
      },
      fontFamily: {
        grotesk: ['Space Grotesk', 'sans-serif'],
        sans:    ['DM Sans', 'sans-serif'],
      },
      boxShadow: {
        glow:       '0 0 40px rgba(124,58,237,0.25)',
        'glow-sm':  '0 0 20px rgba(124,58,237,0.15)',
        'glow-cyan':'0 0 40px rgba(6,214,214,0.2)',
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #7C3AED 0%, #06D6D6 100%)',
        'gradient-card':  'linear-gradient(135deg, rgba(124,58,237,0.08) 0%, rgba(6,214,214,0.04) 100%)',
      }
    },
  },
  plugins: [],
}
