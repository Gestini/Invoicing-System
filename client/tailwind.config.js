const { nextui } = require('@nextui-org/react')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',

    './src/renderer/*.{js,ts,jsx,tsx,mdx}',
    './src/renderer/src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      height: {
        'calc-sidebar': 'calc(100vh - 50px)',
        'seccio-general': 'calc(100vh - 45px)',
        'seccion-tabla': 'calc(100vh - 125px)',
      },
      width: {
        navbar: 'calc(100% - 50px)',
      },
      gridTemplateColumns: {
        // Define a custom grid template for auto-fill with minmax
        'auto-fill-cards': 'repeat(auto-fill, minmax(250px, 1fr))',
      },
      boxShadow: {
        cards: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
      },
      spacing: {
        '25px': '25px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      backgroundColor: {
        navBackground: '#F5F2F0',
      },
      colors: {
        'c-primary': 'var(--c-primary)',
        'c-primary-hover': 'var(--c-primary-hover)',
        'c-primary-hover2': 'var(--c-primary-hover2)',
        'c-company-bg-color': 'var(--c-company-bg-color)',
        'c-primary-route-active': 'var(--c-primary-route-active)',
        'c-primary-route-hover': 'var(--c-primary-route-hover)',
        'c-secondary': 'var(--c-secondary)',
        'c-bg-color-2': 'var(--c-bg-color-2)',
        'c-primary-sidebar': 'var(--c-primary-sidebar)',
        'c-card': 'var(--c-card)',
        'c-title': 'var(--c-title)',
        'c-gray': 'var(--c-gray)',
        'c-error': '#B93B3B',
        'c-grey': ' #0000008A',
        'c-borde': '#003399',
      },
    },
    screens: {
      sm: '640px',

      md: '768px',

      lg: '1024px',

      xl: '1280px',

      '2xl': '1536px',

      '2k': '2129px',

      '3k': '3326px',

      '5k': '5120px',
    },
  },
  darkMode: 'class',
  plugins: [nextui()],
}
