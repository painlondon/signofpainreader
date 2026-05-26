import type { IReaderKeyboardToolHook } from '@/shared/interfaces/components/templates/reader/reader.interface'
import { useEffect } from 'react'

export const useReaderKeyboardTool = ({
	onNext,
	onPrev,
	onToggleFs,
	onOpenSearch,
	onCloseAll,
}: IReaderKeyboardToolHook) => {
	useEffect(() => {
		const handler = (e: KeyboardEvent) => {
			const tag = (e.target as HTMLElement).tagName
			if (tag === 'INPUT' || tag === 'TEXTAREA') return

			switch (e.key) {
				case 'ArrowRight':
				case 'ArrowDown':
					e.preventDefault()
					onNext()
					break
				case 'ArrowLeft':
				case 'ArrowUp':
					e.preventDefault()
					onPrev()
					break
				case 'f':
				case 'F':
					onToggleFs()
					break
				case '/':
					e.preventDefault()
					onOpenSearch()
					break
				case 'Escape':
					onCloseAll()
					break
			}
		}

		window.addEventListener('keydown', handler)
		return () => window.removeEventListener('keydown', handler)
	}, [onNext, onPrev, onToggleFs, onOpenSearch, onCloseAll])
}
