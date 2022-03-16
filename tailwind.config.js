module.exports = {
  purge: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        'user-gray': 'linear-gradient(180deg, #ffffff 0%, #ffffff 30%, #e2e8f0 30%, #e2e8f0 100%)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
