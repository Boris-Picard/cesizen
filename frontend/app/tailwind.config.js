/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
		"*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			colors: {
				leather: {
					50: "#f8f5f2",
					100: "#eae2db",
					200: "#d4c3b3",
					300: "#bda38c",
					400: "#ae8a71",
					500: "#a47864",
					600: "#8d5f52",
					700: "#774c46",
					800: "#633f3d",
					900: "#523635",
					950: "#2d1b1b",
				},
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
			},
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
			},
			keyframes: {
				inspiration: {
					"0%": {
						transform: "scale(1)",
						opacity: "0.8",
						filter: "blur(0px) brightness(0.95)",
					},
					"50%": {
						transform: "scale(1.4)",
						opacity: "1",
						filter: "blur(1px) brightness(1.2)",
					},
					"100%": {
						transform: "scale(1)",
						opacity: "0.8",
						filter: "blur(0px) brightness(0.95)",
					},
				},
				retenue: {
					"0%, 100%": {
						transform: "scale(1.05)",
						opacity: "1",
					},
					"50%": {
						transform: "scale(1.1) translateX(1px)",
						opacity: "1",
					},
				},
				expiration: {
					"0%": {
						transform: "scale(1.4)",
						opacity: "1",
						filter: "blur(1px) brightness(1.2)",
					},
					"100%": {
						transform: "scale(1)",
						opacity: "0.7",
						filter: "blur(0px) brightness(0.9)",
					},
				},
				glow: {
					"0%": { filter: "drop-shadow(0 0 2px rgba(141, 95, 82, 0.3))" },
					"50%": { filter: "drop-shadow(0 0 8px rgba(141, 95, 82, 0.6))" },
					"100%": { filter: "drop-shadow(0 0 2px rgba(141, 95, 82, 0.3))" },
				},
				"phase-transition": {
					"0%": { opacity: "0", transform: "scale(0.95)" },
					"100%": { opacity: "1", transform: "scale(1)" },
				},
				"progress-pulse": {
					"0%, 100%": { opacity: "0.7" },
					"50%": { opacity: "1" },
				},
				"fade-in": {
					"0%": { opacity: "0", transform: "translateY(10px)" },
					"100%": { opacity: "1", transform: "translateY(0)" },
				},
				"slide-up": {
					"0%": { transform: "translateY(100%)" },
					"100%": { transform: "translateY(0)" },
				},
				"scale-in": {
					"0%": { transform: "scale(0.9)", opacity: "0" },
					"100%": { transform: "scale(1)", opacity: "1" },
				},
				float: {
					"0%, 100%": { transform: "translateY(0)" },
					"50%": { transform: "translateY(-10px)" },
				},
				"pulse-ring": {
					"0%": { transform: "scale(0.95)", opacity: "0.5" },
					"50%": { transform: "scale(1.05)", opacity: "0.8" },
					"100%": { transform: "scale(0.95)", opacity: "0.5" },
				},
				"breathe-ambient": {
					"0%, 100%": { transform: "scale(1) rotate(0deg)", opacity: "0.3" },
					"50%": { transform: "scale(1.1) rotate(3deg)", opacity: "0.5" },
				},
				"slide-up-fade": {
					"0%": { transform: "translateY(20px)", opacity: "0" },
					"100%": { transform: "translateY(0)", opacity: "1" },
				},
			},
			animation: {
				inspiration: "inspiration 1.5s ease-in-out forwards",
				retenue: "retenue 1s ease-in-out forwards",
				expiration: "expiration 1.5s ease-in-out forwards",
				glow: "glow 2s ease-in-out infinite",
				"phase-in": "phase-transition 0.3s ease-out forwards",
				"progress-active": "progress-pulse 2s ease-in-out infinite",
				"fade-in": "fade-in 0.5s ease-out",
				"slide-up": "slide-up 0.5s ease-out",
				"scale-in": "scale-in 0.3s ease-out",
				float: "float 6s ease-in-out infinite",
				"pulse-ring": "pulse-ring 3s ease-in-out infinite",
				"breathe-ambient": "breathe-ambient 8s ease-in-out infinite",
				"slide-up-fade": "slide-up-fade 0.5s ease-out forwards",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
};
