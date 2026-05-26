export const parseReader = (html: string, charsPerPage: number) => {
	if (typeof window === 'undefined') return [html]

	const parser = new DOMParser()
	const doc = parser.parseFromString(html, 'text/html')
	const nodes = Array.from(doc.body.childNodes)

	const pages: string[] = []
	let current = ''
	let currentLen = 0

	for (const node of nodes) {
		const el = node as Element
		const chunk = el.outerHTML ?? el.textContent ?? ''
		const textLen = el.textContent?.length ?? chunk.length

		if (currentLen + textLen > charsPerPage && current.trim()) {
			pages.push(current)
			current = chunk
			currentLen = textLen
		} else {
			current += chunk
			currentLen += textLen
		}
	}

	if (current.trim()) pages.push(current)
	return pages.length ? pages : [html]
}
