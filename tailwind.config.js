module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    options: {
      safelist: [],
    },
  },

  darkMode: `class`,
};
