export default {content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      width: {
        '120': '30rem',
        '144': '36rem',
        '160': '40rem',
      },
      height: {
        '120': '30rem',
        '144': '36rem',
        '160': '40rem',
      },
      animation: {
        'pulse-slow': 'pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
}