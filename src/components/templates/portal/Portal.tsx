'use client'

import { useRef, type FC, type PropsWithChildren } from 'react'
import ReactDOM from 'react-dom'

const Portal: FC<PropsWithChildren> = ({ children }) => {
	const modalRef = useRef<HTMLElement | null>(document.getElementById('portal'))

	if (!modalRef.current) return null

	return ReactDOM.createPortal(children, modalRef.current)
}

export default Portal
