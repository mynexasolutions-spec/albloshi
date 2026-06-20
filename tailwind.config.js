/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  corePlugins: {
    // Disable Tailwind's CSS reset so existing custom CSS is not overridden
    preflight: false,
    // Disable Tailwind's .container plugin — we use the custom one from utilities.css
    container: false,
  },
  theme: {
    extend: {},
  },
  plugins: [],
};
