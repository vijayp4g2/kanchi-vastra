/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FDFBF7',
          100: '#FBF6E9',
          200: '#F5E6CA',
          300: '#EEE0C0',
        },
        maroon: {
          50: '#F9E6E9',
          100: '#F5CBD2',
          200: '#EAB0B9',
          300: '#D98090',
          400: '#C05068',
          500: '#A42444',
          600: '#901030',
          700: '#800020', // Base
          800: '#600018',
          900: '#400010',
          950: '#2A0005'
        },
        gold: {
          50: '#FCF9EE',
          100: '#F8F1D6',
          200: '#F2E4B8',
          300: '#EDD699',
          400: '#D4AF37', // Base
          500: '#C29D2D',
          600: '#A38120',
          700: '#856616',
          800: '#6B5010',
          900: '#423008',
        },
        charcoal: {
          50: '#F5F5F5',
          100: '#E5E5E5',
          200: '#CCCCCC',
          300: '#B3B3B3',
          400: '#808080',
          500: '#666666',
          600: '#4D4D4D',
          700: '#333333', // Base Charcoal
          800: '#1A1A1A',
          900: '#0D0D0D',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        cormorant: ['"Cormorant Garamond"', 'serif'],
        sans: ['Poppins', 'sans-serif'],
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideLeft: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        zoomIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'rain-drop': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(200%)' },
        }
      },
      animation: {
        'fadeIn': 'fadeIn 0.5s ease-out forwards',
        'slideDown': 'slideDown 0.4s ease-out forwards',
        'slideUp': 'slideUp 0.4s ease-out forwards',
        'slideLeft': 'slideLeft 0.4s ease-out forwards',
        'zoomIn': 'zoomIn 0.3s ease-out forwards',
        'rain-drop': 'rain-drop 1.5s cubic-bezier(0.76, 0.05, 0.86, 0.06) infinite',
      },

    },
  },
  plugins: [],
}
