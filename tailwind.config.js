/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Montserrat"', 'sans-serif'],
      },
      colors: {
        'studio-black': '#050505',
        'studio-white': '#ffffff',
        'studio-gold': '#C5A47E',
        'studio-gray': '#999999',
        'studio-light': '#F9F9F9',
      },
      letterSpacing: {
        'tight': '-0.03em',
        'normal': '0',
        'wide': '0.05em',
        'widest': '0.1em',
        'ultra': '0.3em',
      },
      fontSize: {
        '2xs': '0.6rem',
        'hero': 'clamp(4rem, 15vw, 12rem)',
      },
      height: {
        'screen-90': '90vh',
      },
      keyframes: {
        'slide-up': {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        'slide-up': 'slide-up 0.4s ease-out forwards',
      },
    }
  },
  plugins: [],
}
