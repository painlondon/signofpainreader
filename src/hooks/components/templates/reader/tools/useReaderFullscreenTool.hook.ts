import { useCallback, useEffect, useRef, useState } from 'react'

export const useReaderFullscreenTool = () => {
	const containerRef = useRef<HTMLDivElement | null>(null)
	const [isFullscreen, setIsFullscreen] = useState(false)

	const toggle = useCallback(() => {
		if (!document.fullscreenElement) {
			containerRef.current?.requestFullscreen?.()
		} else {
			document.exitFullscreen?.()
		}
	}, [])

	useEffect(() => {
		const handler = () => setIsFullscreen(!!document.fullscreenElement)
		document.addEventListener('fullscreenchange', handler)
		return () => document.removeEventListener('fullscreenchange', handler)
	}, [])

	return { containerRef, isFullscreen, toggle }
}
