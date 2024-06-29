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
        'seccion-tabla': 'calc(100vh - 125px)'
      },
      width: {
        navbar: 'calc(100% - 50px)'
      },
      gridTemplateColumns: {
        // Define a custom grid template for auto-fill with minmax
        'auto-fill-cards': 'repeat(auto-fill, minmax(240px, 1fr))',
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
        'c-primary': '#721ff7', // Color principal
        'c-secondary': '#33BBCF', // Color secundario
        'c-error': '#B93B3B', // Color para errores
        'c-grey': ' #0000008A', //Color clarito para detalles
        'c-borde': '#003399', // Color para botones grises transparentes
        'c-primary-hover': '#eaf6ff',
        'c-primary-hover2': '#f7fcff',
        'c-company-bg-color': '#f4f7fe'

        // color para hover de botones

        /* ***********************************

        Solo pongan los colores así como aparece aquí arriba, no se cuestionen el porqué.
        No hay nada más que hacer, así lo quieren tailwind y next ui y no sirven bien las cosas de otra forma. fin.
        No hay necesidad de extender y configurar esto con componentes de next ui!!!!

        *********************************** */
      },
    },
    screens: {
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

      '2k': '2129px',
      //'2k': '2560px',
      // => @media (min-width: 1536px) { ... }

      '3k': '3326px',

      //'4k': '3840px',
      // => @media (min-width: 1536px) { ... }

      '5k': '5120px',
      // => @media (min-width: 1536px) { ... }
    },
  },
  darkMode: 'class',
  plugins: [nextui()],
}
