import type { FC } from 'react'

const BurgerIcon: FC = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M1 4h22" />
			<path d="M1 12h22" />
			<path d="M1 20h22" />
		</svg>
	)
}

export default BurgerIcon
