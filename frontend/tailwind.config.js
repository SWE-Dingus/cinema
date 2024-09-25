/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',   // Scan all files in the 'app' directory
    './pages/**/*.{js,ts,jsx,tsx}', // Scan all files in the 'pages' directory
    './components/**/*.{js,ts,jsx,tsx}', // Scan all files in the 'components' directory
    './src/**/*.{js,ts,jsx,tsx}',   // Optional: if you use 'src' as your main folder
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}