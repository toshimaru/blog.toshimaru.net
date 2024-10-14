const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './_includes/*.html',
    './_layouts/*.html',
    './*.html',
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.sky,
      },
      lineHeight: {
        11: '2.75rem',
        12: '3rem',
        13: '3.25rem',
        14: '3.5rem',
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.800'),
            a: {
              color: theme('colors.primary.500'),
              '&:hover': {
                color: `${theme('colors.primary.600')}`,
              },
              code: { color: theme('colors.primary.400') },
            },
            'code.language-plaintext': {
              fontWeight: 'inherit',
              padding: theme('spacing.[0.5]'),
              borderRadius: theme('borderRadius.DEFAULT'),
              backgroundColor: theme('colors.gray.100'),
            },
          }
        },
        invert: {
          css: {
            color: theme('colors.gray.300'),
            a: {
              color: theme('colors.primary.500'),
              '&:hover': {
                color: `${theme('colors.primary.400')}`,
              },
              code: { color: theme('colors.primary.400') },
            },
            'code.language-plaintext': {
              backgroundColor:  theme('colors.gray.800'),
            },
          }
        }
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')]
}
