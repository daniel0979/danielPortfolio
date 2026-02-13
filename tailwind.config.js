/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef5ff',
          100: '#d8e8ff',
          500: '#2f6df6',
          600: '#1f58d7',
          900: '#0f2247',
        },
      },
    },
  },
  plugins: [],
}
