const defaultTheme = require('tailwindcss/defaultTheme')

const safelist = ['pink', 'purple', 'blue', 'cyan', 'green', 'red', 'orange', 'yellow']
	.map( color => [
		`hover:bg-${color}-200`,
		`bg-${color}-500`,
		`hover:bg-${color}-400`,
		`text-${color}-200`,
		`stroke-${color}-200`,
		`group-hover:stroke-${color}-700`,
		`group-hover:text-${color}-700`
	] )
	.reduce( (acc, cur) => [...acc, ...cur], [] )

console.log(safelist);


/** @type {import('tailwindcss').Config} */
module.exports = {
    plugins: [
        require('flowbite/plugin')
    ],
	content: [
		"./src/**/*.{js,jsx,ts,tsx}",
		'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
	],
	safelist,
	theme: {
		extend: {
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
  