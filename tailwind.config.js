module.exports = {
  enabled: process.env.NODE_ENV === 'production',
  plugins: [require('flowbite/plugin')],
  content: ['./src/**/*.{js,ts,jsx,tsx}', './node_modules/flowbite/**/*.js'],
  options: {
    safelist: [],
  },
  theme: {
    screens: {
      xs: '340px',
      // => @media (min-width: 640px) { ... }
      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      colors: {
        primary: '#67009b',
        primaryLight: '#e7b8ff',
        // 'gray-700': '#273444',
        // gray: '#8492a6',
        // 'gray-50': '#f8fafc',
      },
      width: {
        130: '62rem',
        128: '47rem',
        30: '30rem',
        19: '19rem',
      },
      height: {
        127: '20rem',
        128: '30rem',
      },
    },
  },

  darkMode: `class`,
};
