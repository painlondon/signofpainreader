import { BRAND_NAME, NO_INDEX_PAGE } from '@/base/global/global.base'
import NotFound from '@/components/screens/not-found/NotFound'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: `Not Found | ${BRAND_NAME}`,
	...NO_INDEX_PAGE,
}

export default function NotFoundPage() {
	return <NotFound />
}
