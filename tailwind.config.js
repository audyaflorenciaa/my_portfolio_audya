/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // These paths tell Tailwind CSS where to look for your utility classes.
    // It's crucial that all folders containing JSX/TSX files are listed here.
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Scans all files in the 'app' directory
    './pages/**/*.{js,ts,jsx,tsx,mdx}', // If you use the 'pages' directory (older Next.js or mixed)
    './components/**/*.{js,ts,jsx,tsx,mdx}', // Scans all files in the 'components' directory
    './lib/**/*.{js,ts,jsx,tsx,mdx}', // If you have components or JSX in 'lib'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
