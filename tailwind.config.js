/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
	content: ['./src/**/*.{html,ts}', './node_modules/preline/preline.js'],
	theme: {
		extend: {
			colors: {
				orange: colors.orange,
				disabled: '#707578',
				elephant: {
					DEFAULT: '#153448',
					50: '#f2f9fd',
					100: '#e5f1f9',
					200: '#c5e3f2',
					300: '#91cde8',
					400: '#56b2da',
					500: '#3199c6',
					600: '#217ba8',
					700: '#1c6388',
					800: '#1b5471',
					900: '#1c475e',
					950: '#153448',
				},
				stonewall: {
					50: '#f4f4f2',
					100: '#e4e2dd',
					200: '#cbc6bd',
					300: '#ada497',
					400: '#948979',
					500: '#867b6c',
					600: '#73665b',
					700: '#5d524b',
					800: '#504743',
					900: '#473f3c',
					950: '#282220',
				},
				bayoux: {
					50: '#f2f8f9',
					100: '#deebef',
					200: '#c1d8e0',
					300: '#96bbca',
					400: '#6396ad',
					500: '#487a92',
					600: '#3e657c',
					700: '#3c5b6f',
					800: '#344856',
					900: '#2f3e4a',
					950: '#1b2731',
				},
				stark: {
					50: '#f9f6f3',
					100: '#f2ece2',
					200: '#dfd0b8',
					300: '#d3bd9e',
					400: '#c19e76',
					500: '#b3875c',
					600: '#a67450',
					700: '#8a5e44',
					800: '#704d3c',
					900: '#5c4032',
					950: '#312019',
				},
			},
		},
	},
	plugins: [require('preline/plugin'), require('@tailwindcss/forms')],
};
