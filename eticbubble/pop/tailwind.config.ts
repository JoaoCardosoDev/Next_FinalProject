import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
    darkMode: ["class"],
    content: ["./src/**/*.tsx"],
  theme: {
  	extend: {
  		fontFamily: {
  			sans: [
  				'manifold-cf',
  				...fontFamily.sans
  			]
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			clarity: "#f3ffff",
  			protocol: "#afcbd6",
  			system: "#79a6b9",
  			membrane: "#beb780",
  			sector: "#20464f",
  			archive: "#0e1a26",
  			background: "#f3ffff",
  			foreground: "#20464f",
  			muted: {
  				DEFAULT: "#afcbd6",
  				foreground: "#20464f",
  			},
  			card: {
  				DEFAULT: "#f3ffff",
  				foreground: "#20464f",
  			},
  			accent: {
  				DEFAULT: "#beb780",
  				foreground: "#0e1a26",
  			},
  			primary: {
  				DEFAULT: "#20464f",
  				foreground: "#f3ffff",
  			},
  			secondary: {
  				DEFAULT: "#79a6b9",
  				foreground: "#0e1a26",
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		transitionProperty: {
  			'all': 'all',
  		},
  		transitionDuration: {
  			'700': '700ms',
  		},
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
