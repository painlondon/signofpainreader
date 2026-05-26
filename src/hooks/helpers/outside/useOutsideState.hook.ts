import { useEffect, useRef, useState } from 'react'
import { useToggleScrollBar } from '../toggle-scrollbar/useToggleScrollBar.hook'

export const useOutsideState = <T extends HTMLElement>(
	isHideScrollbar?: boolean
) => {
	const [isShow, setIsShow] = useState(false)

	const buttonRef = useRef<HTMLButtonElement>(null)
	const ref = useRef<T>(null)

	const handleClickOutside = (event: any) => {
		if (!ref.current || !buttonRef.current) return

		if (
			!ref.current.contains(event.target) &&
			!buttonRef.current.contains(event.target)
		) {
			setIsShow(false)

			if (isHideScrollbar) return useToggleScrollBar(false)
		}
	}

	const toggle = () => {
		const newValue = !isShow

		setIsShow(newValue)

		if (isHideScrollbar) {
			useToggleScrollBar(newValue)
		}
	}

	useEffect(() => {
		document.addEventListener('click', handleClickOutside, true)

		return () => {
			document.removeEventListener('click', handleClickOutside, true)
		}
	})

	return { isShow, toggle, ref, buttonRef }
}
