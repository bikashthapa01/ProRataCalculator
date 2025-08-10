/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#111221",
        card: "#18192a",
        primary: {
          text: "#F5F7FA",
          secondary: "#B1B3C7",
          highlight: "#9B7FFF",
        },
        accent: {
          from: "#7c53ff",
          to: "#2c2470",
        },
        button: {
          bg: "#7C53FF",
          hover: "#6a45e6",
          text: "#fff",
        },
        glass: "rgba(28, 22, 56, 0.6)",
      },
      fontFamily: {
        sans: ["Inter", "Arial", "sans-serif"],
        button: ["Inter", "Arial", "sans-serif"],
      },
      fontSize: {
        "heading-sm": ["2.5rem", { lineHeight: "1.2", fontWeight: "700" }],
        "heading-lg": ["3.5rem", { lineHeight: "1.1", fontWeight: "700" }],
        body: ["1rem", { lineHeight: "1.7", fontWeight: "400" }],
        button: ["1rem", { lineHeight: "1.5", fontWeight: "600" }],
      },
      spacing: {
        section: "64px",
        header: "64px",
      },
      borderRadius: {
        card: "24px",
        button: "9999px",
      },
      boxShadow: {
        card: "0 8px 32px rgba(45,37,102,0.15)",
        soft: "0 4px 16px rgba(45,37,102,0.1)",
      },
      backdropBlur: {
        glass: "16px",
      },
      maxWidth: {
        container: "1200px",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        "scale-in": "scaleIn 0.3s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
