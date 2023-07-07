/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				custom: {
					500: "#00808C",
				},
			},
		},
	},
	plugins: [],
};
