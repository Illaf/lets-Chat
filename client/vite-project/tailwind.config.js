/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      boxShadow: {
        'custom': 'inset 1px 0px 0px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
}

