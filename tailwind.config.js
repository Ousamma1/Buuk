// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
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
