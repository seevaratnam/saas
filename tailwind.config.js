const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./src/**/*.{js,tsx}'],
  theme: {
    extend: {
      colors: {
        'royal-blue': {
          100: '#F0F1FC',
          200: '#D9DCF9',
          300: '#C2C7F5',
          400: '#959CED',
          500: '#6772E5',
          600: '#5D67CE',
          700: '#3E4489',
          800: '#2E3367',
          900: '#1F2245',
        },
      },
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      maxWidth: {
        '8xl': '90rem',
      },
    },
  },
  variants: {},
  plugins: [require('@tailwindcss/typography')],
  future: {
    purgeLayersByDefault: true,
    removeDeprecatedGapUtilities: true,
  },
};
