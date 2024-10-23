import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        inputText: "#333333",
        text: "var(--text)",
      },
      width: {
        '1/10': '10%',
        '9/10': '90%',
      },
    },
  },
  plugins: [],
};
export default config;
