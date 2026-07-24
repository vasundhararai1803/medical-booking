/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#0ea5e9',
          600: '#0284c7', // primary deep cyan
          700: '#0369a1',
          900: '#0c4a6e',
        },
        teal: {
          600: '#0d9488', // secondary teal
        },
        medical: {
          blue: '#1e40af',
          sky: '#e0f2fe',
          dark: '#0f172a',
        }
      }
    },
  },
  plugins: [],
}
