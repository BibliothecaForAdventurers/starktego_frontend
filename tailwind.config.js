/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cta: {
          100: '#87272d',
        },
      },
      backgroundImage: {
        'dungeon': "url('/map.png')",
      },
      textShadow: {
        sm: '0 1px 2px var(--tw-shadow-color)',
        DEFAULT: '0 2px 4px var(--tw-shadow-color)',
        lg: '0 8px 16px var(--tw-shadow-color)',
      },
      fontFamily: {
        display: ['IM Fell DW Pica', 'serif'],
        body: ['IM Fell DW Pica', 'serif'],
        lords: ['Lords', 'serif'],
      },
      gridTemplateColumns: {
        // Simple 16 column grid
        '20': 'repeat(20, minmax(0, 1fr))',
      },
    },
  },
  plugins: [    
    plugin(function ({ matchUtilities, theme }) {
    matchUtilities(
      {
        'text-shadow': (value) => ({
          textShadow: value,
        }),
      },
      { values: theme('textShadow') }
    );
  }),],
}