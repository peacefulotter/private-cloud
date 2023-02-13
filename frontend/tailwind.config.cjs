const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
    plugins: [
        require('flowbite/plugin')
    ],
	content: [
		"./src/**/*.{js,jsx,ts,tsx}",
		'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
	],
	theme: {
		extend: {
			colors: {
				'first': '#82A455', 
				'second': '#008D56', 
				'third': '#006C41', 
				'fourth': '#002D1A', 
				'fifth': '#564946', 
				'sixth': '#1d2a45'
			},
			animation: {
				'fade-in': 'fadein 100ms ease-in forwards',
			},
			keyframes: {
				fadein: {
					'0%': { opacity: 0, transform: 'scale(50%)' }, 
					'100%': { opacity: 1, transform: 'scale(100%)' }
				}
			},
			fontFamily: {
				mono: [
				  'JetBrains Mono',
				  ...defaultTheme.fontFamily.mono,
				]
			}
		},
    },
}
  