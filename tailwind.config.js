// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Adjust this according to your project's file structure
  ],
  // darkMode:"class",
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    // Optional DaisyUI configuration
    styled: true,
    themes: true,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
  },
};
