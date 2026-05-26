import type { IReaderBookResponse } from '@/shared/interfaces/components/templates/reader/reader.interface'
import { useEffect, useState } from 'react'

export const useReaderBook = (url: string) => {
	const [book, setBook] = useState<IReaderBookResponse | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		if (!url) return

		let cancelled = false
		setLoading(true)
		setError(null)

		fetch(`/api/book`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ url }),
		})
			.then((res) => {
				if (!res.ok) throw new Error(`HTTP ${res.status} — could not load book`)
				return res.json() as Promise<IReaderBookResponse>
			})
			.then((data) => {
				if (!cancelled) setBook(data)
			})
			.catch((err: Error) => {
				if (!cancelled) setError(err.message)
			})
			.finally(() => {
				if (!cancelled) setLoading(false)
			})

		return () => {
			cancelled = true
		}
	}, [url])

	return { book, loading, error }
}
