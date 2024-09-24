/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        pixel: ['Pixel Tandysoft', 'sans-serif'],
        noto: ['Noto Sans JP', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        times: ['Times New Roman', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
