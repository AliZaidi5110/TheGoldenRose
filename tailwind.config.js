/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f3f7',
          100: '#ebe7ef',
          200: '#d7cfe0',
          300: '#c3b7d0',
          400: '#9f87b1',
          500: '#7b5792',
          600: '#5d3a6e',
          700: '#4a2e58',
          800: '#372342',
          900: '#301934',
        },
        purple: {
          50: '#f5f3f7',
          100: '#ebe7ef',
          200: '#d7cfe0',
          300: '#c3b7d0',
          400: '#9f87b1',
          500: '#7b5792',
          600: '#5d3a6e',
          700: '#4a2e58',
          800: '#372342',
          900: '#301934',
        },
        gold: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
    },
  },
  plugins: [],
}
