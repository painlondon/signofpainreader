import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

export default {
	content: ['./src/**/*.tsx'],
	theme: {
		fontFamily: {
			cinzel: ['var(--font-cinzel), serif'],
			garamond: ['var(--font-garamond), serif'],
			sans: ['var(--font-sans), sans-serif'],
			lora: ['var(--font-lora), sans-serif'],
		},
		colors: {
			transparent: 'transparent',
			white: '#fff',
			black: '#080808',
			gray: {
				600: '#0D0B0A',
				500: '#14100D',
				400: '#2A2520',
				300: '#9A9087',
				200: '#E2D9CC',
				100: '#D4C9B8',
			},
			red: {
				600: '#240609',
				500: '#6B0A14',
				400: '#C0152A',
				300: 'rgba(192, 21, 42, 0.35)',
				200: 'rgba(192, 21, 42, 0.25)',
				100: 'rgba(192,21,42,0.18)',
			},
		},
		lineHeight: {
			xs: '.9',
			normal: '1',
			sm: '1.3',
			md: '1.6',
			lg: '1.8',
			xl: '2.1',
		},
		zIndex: {
			0: '0',
			1: '1',
			2: '2',
			3: '3',
		},
		keyframes: {
			fade: {
				from: { opacity: '0' },
				to: { opacity: '1' },
			},
			spin: {
				from: { transform: 'rotate(0deg)' },
				to: { transform: 'rotate(-1turn)' },
			},
			pulse: {
				'0%, 100%': { opacity: '.4', transform: 'scaleY(1)' },
				'50%': { opacity: '1', transform: 'scaleY(1.1)' },
			},
			slideFromLeft: {
				from: { transform: 'translateX(-100%)' },
				to: { transform: 'translateX(0)' },
			},
		},
		animation: {
			fade: 'fade 250ms ease-in-out forwards',
			spin: 'spin 1.1s linear infinite',
			pulse: 'pulse 2s ease-in-out infinite',
			slideFromLeft: 'slideFromLeft 300ms ease-in-out forwards',
		},
		extend: {
			transitionTimingFunction: {
				DEFAULT: 'ease-out',
			},
			transitionDuration: {
				DEFAULT: '250ms',
			},
		},
	},
	plugins: [
		plugin(
			({
				addComponents,
				theme,
				addUtilities,
			}: {
				addUtilities: Function
				addComponents: Function
				theme: Function
			}) => {
				addComponents({
					'.red-button': {
						fontFamily: theme('fontFamily.cinzel'),
						fontSize: '13px',
						fontWeight: '700',
						textTransform: 'uppercase',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						backgroundColor: theme('colors.red.400'),
						color: theme('colors.gray.200'),
						letterSpacing: '0.3em',
						boxShadow:
							'0 0 40px rgba(192, 21, 42, 0.4), 0 0 80px rgba(192, 21, 42, 0.15)',
						transition:
							'box-shadow 250ms linear, background-color 250ms linear',

						'&:hover': {
							backgroundColor: '#d91a32',
							boxShadow:
								'0 0 60px rgba(192, 21, 42, 0.6), 0 0 120px rgba(192, 21, 42, 0.25)',
						},
					},

					'.line-divider': {
						width: '100%',
						height: '1px',
						background: `linear-gradient(to right, transparent, ${theme('colors.red.400')}, transparent)`,
						opacity: '0.3',
					},
				})

				addUtilities({
					'.file-like-bg': {
						width: '100%',
						height: '100%',
						position: 'absolute',
						top: '0',
						bottom: '0',
						left: '0',
						right: '0',
						objectPosition: 'center',
						objectFit: 'cover',
						pointerEvents: 'none',
					},
				})
			}
		),
	],
} satisfies Config
