export default {
  content: ['./src/**/*.{html,js,tsx,ts,jsx}'],
  theme: {
    extend: {
      boxShadow: {
        custom: '-1px 1px 4px 1px rgba(0,0,0,0.11)',
      },
      backgroundColor: {
        primary: '#f42750',
      },
      backgroundImage: {
        'black-to-transparent':
          'linear-gradient(to bottom, rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.00))',
        'black-to-transparent-bottom':
          'linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.00))',
      },
      scrollSnapAlign: {
        'start-center': 'start center',
      },
      scrollbar: {
        none: 'scrollbar-width: none',
      },
      display: {
        'webkit-box': '-webkit-box',
      },
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'],
        mono: ['Geist Mono', 'monospace'],
        playfair: ['Playfair Display', 'serif'],
        kanit: ['Kanit', 'sans-serif'],
        dancing: ['Dancing Script', 'cursive'],
      },
      animation: {
        fadeIn: 'fadeIn 1s forwards',
        fadeOut: 'fadeOut 1s forwards',
        slideIn: 'slideIn 1s forwards',
        slideOut: 'slideOut 1s forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        fadeOut: {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideOut: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [],
};
