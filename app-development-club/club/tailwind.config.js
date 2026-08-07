/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        void: '#05060f',
        deep: '#090b1c',
        blue: { DEFAULT: '#4f7dff', bright: '#8bb1ff' },
        violet: { DEFAULT: '#9b5cff', bright: '#c79bff' },
        cyan: '#4be8ff',
        text: { DEFAULT: '#eef0ff', dim: '#8b93b8', faint: '#565f82' },
      },
      fontFamily: {
        display: ['Sora', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
