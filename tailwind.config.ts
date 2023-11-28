import type { Config } from 'tailwindcss';

const config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        purple: 'hsl(259, 100%, 65%)',
        'light-red': 'hsl(0, 100%, 67%)',
        'off-white': 'hsl(0, 0%, 94%)',
        'light-grey': 'hsl(0, 0%, 86%)',
        'smokey-grey': 'hsl(0, 1%, 44%)',
        'off-black': 'hsl(0, 0%, 8%)',
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
