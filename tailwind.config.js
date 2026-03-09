/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef8f8',
          500: '#0f766e',
          700: '#155e75',
          900: '#1e293b',
        },
      },
      boxShadow: {
        card: '0 4px 14px rgba(15, 23, 42, 0.08)',
      },
    },
  },
  plugins: [],
}
