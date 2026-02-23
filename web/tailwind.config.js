/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ui-bg': '#0f0f13',
        'ui-card': '#1a1a20',
        'ui-primary': '#8b5cf6',
        'ui-primary-hover': '#7c3aed',
        'ui-text': '#f3f4f6',
        'ui-text-muted': '#9ca3af'
      }
    },
  },
  plugins: [],
}
