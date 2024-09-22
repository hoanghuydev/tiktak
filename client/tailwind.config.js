module.exports = {
  content: ['./src/**/*.{html,js,tsx}'],
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
    },
  },
  plugins: [],
};
