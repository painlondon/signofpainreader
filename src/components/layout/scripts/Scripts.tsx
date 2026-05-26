import { getClaritySnippet } from '@/snippets/clarity/clarity.snippet'
import Script from 'next/script'
import type { FC } from 'react'

const Scripts: FC = () => {
	return (
		<Script
			strategy="lazyOnload"
			dangerouslySetInnerHTML={{ __html: getClaritySnippet() }}
		/>
	)
}

export default Scripts
