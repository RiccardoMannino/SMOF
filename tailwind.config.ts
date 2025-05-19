export type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";
import { Config } from "tailwindcss";

export default {
	content: [
		"../src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"../src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"../src/app/**/*.{js,ts,jsx,tsx,mdx}",
		"../src/sanity/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {},
	plugins: [typography],
} satisfies Config;
