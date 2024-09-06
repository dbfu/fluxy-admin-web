import { defaultSetting } from './src/default-setting';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--ant-color-primary)',
        shallow: 'var(--ant-color-bg-text-hover)',
      },
      height: {
        header: `${defaultSetting.headerHeight}px`
      },
      spacing: {
        header: `${defaultSetting.headerHeight}px`
      }
    },
  },
  plugins: [],
}