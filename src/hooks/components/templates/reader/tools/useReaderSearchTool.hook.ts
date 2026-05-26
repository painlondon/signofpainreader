import {
	READER_SEARCH_TOOL_MAX_RESULTS,
	READER_SEARCH_TOOL_SNIPPET_AFTER,
	READER_SEARCH_TOOL_SNIPPET_BEFORE,
} from '@/base/reader/reader.base'
import type {
	IReaderBookResponse,
	IReaderSearchResult,
} from '@/shared/interfaces/components/templates/reader/reader.interface'
import { useCallback, useState } from 'react'

export const useReaderSearchTool = () => {
	const [query, setQuery] = useState('')
	const [results, setResults] = useState<IReaderSearchResult[]>([])

	const search = useCallback((q: string, book: IReaderBookResponse | null) => {
		setQuery(q)

		if (!q.trim() || !book) {
			setResults([])
			return
		}

		const lower = q.toLowerCase()
		const found: IReaderSearchResult[] = []

		for (const ch of book.chapters) {
			if (found.length >= READER_SEARCH_TOOL_MAX_RESULTS) break

			const plain = ch.html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ')
			const idx = plain.toLowerCase().indexOf(lower)

			if (idx !== -1) {
				const snippet = plain
					.slice(
						Math.max(0, idx - READER_SEARCH_TOOL_SNIPPET_BEFORE),
						idx + READER_SEARCH_TOOL_SNIPPET_AFTER
					)
					.trim()

				found.push({
					chapterIndex: ch.order,
					chapterTitle: ch.title,
					snippet,
				})
			}
		}

		setResults(found)
	}, [])

	const clear = useCallback(() => {
		setQuery('')
		setResults([])
	}, [])

	return { query, results, search, clear }
}
