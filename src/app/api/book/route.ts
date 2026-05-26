import type {
	IReaderBookResponse,
	IReaderChapter,
} from '@/shared/interfaces/components/templates/reader/reader.interface'
import type { TypeReaderCover } from '@/shared/types/components/templates/reader/reader.type'
import EPub from 'epub'
import { NextRequest, NextResponse } from 'next/server'

function countWords(html: string): number {
	return html
		.replace(/<[^>]+>/g, ' ')
		.trim()
		.split(/\s+/)
		.filter(Boolean).length
}

function buildTocTitles(epub: EPub): Record<string, string> {
	const map: Record<string, string> = {}
	for (const entry of epub.toc ?? []) {
		const href = entry.href ?? ''
		const title = entry.title ?? ''
		if (!title) continue
		map[href] = title
		const bare = href.split('/').pop()?.split('#')[0] ?? ''
		if (bare) map[bare] = title
	}
	return map
}

export async function POST(_req: NextRequest) {
	let epub: EPub

	try {
		const { url } = await _req.json()

		if (!url) {
			return NextResponse.json({ error: 'URL is required' }, { status: 400 })
		}

		const response = await fetch(url)

		if (!response.ok) {
			throw new Error('Failed to download epub')
		}

		const arrayBuffer = await response.arrayBuffer()
		const buffer = Buffer.from(arrayBuffer)

		epub = new EPub(buffer)

		await epub.parse()
	} catch (err) {
		console.error('[epub] parse error:', err)
		return NextResponse.json({ error: 'Failed to parse epub' }, { status: 500 })
	}

	let cover: TypeReaderCover | undefined

	if (epub.metadata.cover) {
		try {
			cover = await epub.getImage(epub.metadata.cover as string)
		} catch {}
	}

	const tocTitles = buildTocTitles(epub)

	const chapterJobs = epub.flow.map(
		async (item, index): Promise<IReaderChapter | null> => {
			let html = ''
			try {
				html = await epub.getChapter(item.id)
			} catch {
				return null
			}

			const plainText = html.replace(/<[^>]+>/g, '').trim()
			if (plainText.length < 60) return null

			const bareHref = (item.href ?? '').split('/').pop()?.split('#')[0] ?? ''
			const title =
				tocTitles[item.href ?? ''] ??
				tocTitles[bareHref] ??
				item.title ??
				`Chapter ${index + 1}`

			return {
				id: item.id,
				order: index,
				title,
				href: item.href ?? '',
				html,
				wordCount: countWords(html),
			}
		}
	)

	const raw = await Promise.all(chapterJobs)
	const chapters = raw.filter((c): c is IReaderChapter => c !== null)
	const totalWords = chapters.reduce((sum, ch) => sum + ch.wordCount, 0)

	const body: IReaderBookResponse = {
		title: epub.metadata.title,
		author: epub.metadata.creator ?? '',
		description: epub.metadata.description ?? '',
		language: epub.metadata.language ?? 'en',
		cover,
		totalChapters: chapters.length,
		totalWords,
		chapters,
	}

	return NextResponse.json(body, {
		headers: {
			'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=600',
		},
	})
}
