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
        display: ['Roboto', 'Arial', 'sans-serif'],
        body: ['Roboto', 'Arial', 'sans-serif'],
      },
      animation: {
        'marquee': 'marquee 40s linear infinite',
        'bounce-x': 'bounce-x 1s infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'bounce-x': {
          '0%, 100%': { transform: 'translateX(-25%)', animationTimingFunction: 'cubic-bezier(0.8,0,1,1)' },
          '50%': { transform: 'none', animationTimingFunction: 'cubic-bezier(0,0,0.2,1)' },
        }
      }
    },
  },
  plugins: [],
}
