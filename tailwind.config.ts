import type { Config } from "tailwindcss";

const { fontFamily } = require("tailwindcss/defaultTheme");
const { heroui } = require("@heroui/theme");

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
		"./node_modules/@heroui/theme/dist/components/dropdown.js",
		"./node_modules/@heroui/theme/dist/components/modal.js",
	],
	theme: {
		container: {
			center: true,
			padding: "1rem",
			screens: {
				xl: "1152px",
			},
		},
		extend: {
			fontFamily: {
				poppins: ["var(--font-poppins)", ...fontFamily.sans],
			},
			colors: {
				primary: {
					500: "#005bc4",
					600: "#0046ab",
					700: "#00217b",
					800: "#001c73",
				},
				blue: {
					500: "#2d66e4",
					600: "#125cd8",
					700: "#00238e",
					800: "#000e71",
				},
				secondary: {
					50: "#f9d6d5",
					//* Background
					100: "#f6bbba",
					200: "#f19a97",
					//* Complement
					300: "#ec7874",
					400: "#e85652",
					//* Default
					500: "#e3342f",
					//* Hovered
					600: "#bd2b27",
					//* Active
					700: "#97231f",
					800: "#721a18",
					900: "#4c1110",
					1000: "#C1C1C1",
				},
				"primary-bg": "#dc3545", // bg
				"primary-hover": "#bb2d3b", // hover
				dark: "#212529",
				light: "#ffffff",
				"theme-gray": "#f8f9fa",
			},
			boxShadow: {
				footer: "0px -2px 4px rgba(0, 0, 0, 0.25)",
				"card-menu": "0 4px 18px rgba(0, 0, 0, 0.15)",
			},
		},
	},
	plugins: [heroui()],
};
export default config;
