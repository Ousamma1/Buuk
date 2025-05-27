// tailwind.config.js
module.exports = {
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        buuk: {
          900: "#0A1F44",  // darkest blue
          600: "#0D3B66",  // mid-tone
          300: "#3E5C76"   // lighter accent
        }
      }
    }
  },
  plugins: [],
}
