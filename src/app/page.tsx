import Home from '@/components/screens/home/Home'
import { useHomePage } from '@/hooks/api/page/useHomePage.hook'
import type { Metadata } from 'next'
import NotFoundPage from './not-found'

export const metadata: Metadata = {
	title: '',
	description: '',
}

export default async function HomePage() {
	const { page } = await useHomePage()

	if (!page) return <NotFoundPage />

	return <Home page={page} />
}
