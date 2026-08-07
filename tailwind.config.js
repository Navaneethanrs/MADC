/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        void: '#050806',
        deep: '#09100c',
        green: { DEFAULT: '#00ff66', bright: '#39ff14', mint: '#00e676', dark: '#00a843' },
        blue: { DEFAULT: '#00ff66', bright: '#39ff14' },
        violet: { DEFAULT: '#00e676', bright: '#a3e635' },
        cyan: '#00ff66',
        text: { DEFAULT: '#f4f8f1', dim: '#98b8a5', faint: '#52705e' },
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
