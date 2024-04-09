/** @type {import('tailwindcss').Config} */
import zmUIPlugin from './tailwind/index';
import daisyuiPlugin from 'daisyui';
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    'node_modules/daisyui/dist/**/*.js',
    'node_modules/react-daisyui/dist/**/*.js',
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyuiPlugin, zmUIPlugin],
};
