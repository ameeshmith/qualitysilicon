/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: {
          950: '#050811',
          900: '#090D1A',
          800: '#0F1629',
        },
        cobalt: {
          500: '#2D5BFF',
          400: '#3B82F6',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Plus Jakarta Sans', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(45, 91, 255, 0.12)',
        'glass-hover': '0 12px 40px 0 rgba(6, 182, 212, 0.22)',
        'electric': '0 0 25px rgba(45, 91, 255, 0.45)',
        'cyan-glow': '0 0 25px rgba(6, 182, 212, 0.4)',
      },
      animation: {
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};
