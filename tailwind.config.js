/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#F9FAFB',
        surface: '#FFFFFF',
        ink: '#18181B',
        steel: '#71717A',
        whisper: 'rgba(226,232,240,0.5)',
        accent: '#006633'
      },
      fontFamily: {
        display: ['Cabinet Grotesk', 'sans-serif'],
        body: ['Satoshi', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
