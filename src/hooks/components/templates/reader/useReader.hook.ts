'use client'

import type { IReaderHook } from '@/shared/interfaces/components/templates/reader/reader.interface'
import { useReaderStore } from '@/store/reader/reader.store'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useReaderFullscreenTool } from './tools/useReaderFullscreenTool.hook'
import { useReaderKeyboardTool } from './tools/useReaderKeyboardTool.hook'
import { useReaderSearchTool } from './tools/useReaderSearchTool.hook'
import { useReaderBook } from './useReaderBook.hook'
import { useReaderSettings } from './useReaderSettings.hook'

export const useReader = ({ url }: IReaderHook) => {
	const store = useReaderStore()

	const { book, loading, error } = useReaderBook(url)

	const { settings, setSettings, incFontSize, decFontSize } =
		useReaderSettings()

	const {
		containerRef,
		isFullscreen,
		toggle: toggleFs,
	} = useReaderFullscreenTool()

	const { query, results, search, clear } = useReaderSearchTool()

	const [scrollEl, setScrollEl] = useState<HTMLDivElement | null>(null)

	const scrollRef = useCallback((node: HTMLDivElement | null) => {
		setScrollEl(node)
	}, [])

	const chapterRefs = useRef<(HTMLDivElement | null)[]>([])

	const [chIdx, setChIdx] = useState(0)
	const [percentRead, setPercentRead] = useState(0)

	useEffect(() => {
		if (!scrollEl || !book) return

		const saved = store.progress[store.currentSlug]

		if (saved?.scrollTop) {
			scrollEl.scrollTop = saved.scrollTop
		}
	}, [scrollEl, book])

	useEffect(() => {
		if (!scrollEl) return

		const onScroll = () => {
			const { scrollTop, scrollHeight, clientHeight } = scrollEl

			const max = scrollHeight - clientHeight

			if (max <= 0) return

			const pct = Math.round((scrollTop / max) * 100)
			setPercentRead(Math.min(100, Math.max(0, pct)))

			store.setProgress(store.currentSlug, { scrollTop })
		}

		scrollEl.addEventListener('scroll', onScroll, { passive: true })
		return () => scrollEl.removeEventListener('scroll', onScroll)
	}, [scrollEl])

	useEffect(() => {
		if (!scrollEl || !book) return

		const observer = new IntersectionObserver(
			(entries) => {
				const visible = entries
					.filter((e) => e.isIntersecting)
					.sort((a, b) => b.intersectionRatio - a.intersectionRatio)

				if (visible[0]) {
					const idx = chapterRefs.current.indexOf(
						visible[0].target as HTMLDivElement
					)
					if (idx >= 0) setChIdx(idx)
				}
			},
			{
				root: scrollEl,
				threshold: [0, 0.1, 0.3],
				rootMargin: '0px 0px -60% 0px',
			}
		)

		chapterRefs.current.forEach((ref) => {
			if (ref) observer.observe(ref)
		})

		return () => observer.disconnect()
	}, [scrollEl, book])

	const goToChapter = useCallback((ci: number) => {
		chapterRefs.current[ci]?.scrollIntoView({
			behavior: 'smooth',
			block: 'start',
		})
	}, [])

	const [tocOpen, setTocOpen] = useState(false)
	const [srchOpen, setSrchOpen] = useState(false)
	const [setOpen, setSetOpen] = useState(false)
	const inputRef = useRef<HTMLInputElement>(null)

	const closeAll = useCallback(() => {
		setTocOpen(false)
		setSrchOpen(false)
		setSetOpen(false)
	}, [])

	const toggleToc = useCallback(() => {
		setTocOpen((v) => !v)
		setSrchOpen(false)
		setSetOpen(false)
	}, [])

	const toggleSearch = useCallback(() => {
		setSrchOpen((v) => {
			if (!v) {
				setTocOpen(false)
				setSetOpen(false)
			}
			return !v
		})
	}, [])

	const toggleSettings = useCallback(() => {
		setSetOpen((v) => !v)
		setTocOpen(false)
		setSrchOpen(false)
	}, [])

	useReaderKeyboardTool({
		onNext: () => scrollEl?.scrollBy({ top: 200, behavior: 'smooth' }),
		onPrev: () => scrollEl?.scrollBy({ top: -200, behavior: 'smooth' }),
		onToggleFs: toggleFs,
		onOpenSearch: toggleSearch,
		onCloseAll: closeAll,
	})

	const [isGatewayOpen, setIsGatewayOpen] = useState(true)

	return {
		isGatewayOpen,
		setIsGatewayOpen,
		loading,
		error,
		book,
		tocOpen,
		srchOpen,
		setOpen,
		containerRef,
		settings,
		percentRead,
		isFullscreen,
		toggleToc,
		toggleSearch,
		toggleSettings,
		toggleFs,
		chIdx,
		query,
		results,
		goToChapter,
		inputRef,
		search,
		clear,
		setSettings,
		store,
		scrollRef,
		chapterRefs,
	}
}
