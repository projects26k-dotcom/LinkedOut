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
        coral: {
          50: '#fff5f3',
          100: '#ffe8e4',
          200: '#ffd5cc',
          300: '#ffb5a6',
          400: '#ff8a73',
          500: '#FF6B4A', // Brand Primary
          600: '#ea5230',
          700: '#c53c1e',
          800: '#a3331c',
          900: '#862f1d',
        },
        linkedout: {
          bg: '#f3f2ef',
          card: '#ffffff',
          border: '#e4e6eb',
          subtle: '#666666',
          dark: '#191919',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 0 0 1px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.04)',
        'card-hover': '0 0 0 1px rgba(0, 0, 0, 0.12), 0 6px 16px rgba(0, 0, 0, 0.08)',
        'modal': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      }
    },
  },
  plugins: [],
}
