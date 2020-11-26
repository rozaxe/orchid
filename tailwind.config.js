const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('./colors')
const theme = require('./theme')

const spacing = {
  '1/12g': 'calc(960px / 12 * 1)',
  '2/12g': 'calc(960px / 12 * 2)',
  '3/12g': 'calc(960px / 12 * 3)',
  '4/12g': 'calc(960px / 12 * 4)',
  '5/12g': 'calc(960px / 12 * 5)',
  '6/12g': 'calc(960px / 12 * 6)',
  '7/12g': 'calc(960px / 12 * 7)',
  '8/12g': 'calc(960px / 12 * 8)',
  '9/12g': 'calc(960px / 12 * 9)',
  '10/12g': 'calc(960px / 12 * 10)',
  '11/12g': 'calc(960px / 12 * 11)',
  '12g': '960px'
}

module.exports = {
  purge: false,
  theme: {
    extend: {
      colors: {
        ...colors,
        ...theme,
      },
      flex: {
        '0': '0 0 0',
      },
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      spacing,
      maxWidth: spacing,
      minWidth: spacing,
    },
  },
  variants: {},
  plugins: [
    require('@tailwindcss/ui'),
  ],
}
