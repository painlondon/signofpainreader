import '@/assets/styles/global.scss'
import {
	BRAND_NAME,
	EMAIL,
	IS_PRODUCTION,
	WEBSITE_URL,
} from '@/base/global/global.base'
import Footer from '@/components/layout/footer/Footer'
import Header from '@/components/layout/header/Header'
import Scripts from '@/components/layout/scripts/Scripts'
import { useMenu } from '@/hooks/api/menu/useMenu.hook'
import Provider from '@/providers/Provider'
import type { Metadata, Viewport } from 'next'
import { unstable_noStore } from 'next/cache'
import { Cinzel, DM_Sans, EB_Garamond, Lora } from 'next/font/google'
import type { PropsWithChildren } from 'react'

const lora = Lora({
	weight: ['400', '600', '700'],
	display: 'swap',
	subsets: ['latin'],
	variable: '--font-lora',
	fallback: ['Helvetica', 'Arial'],
})

const cinzel = Cinzel({
	weight: ['400', '600', '700', '900'],
	display: 'swap',
	subsets: ['latin'],
	variable: '--font-cinzel',
	fallback: ['Helvetica', 'Arial'],
})

const garamond = EB_Garamond({
	weight: ['400', '500'],
	style: ['normal', 'italic'],
	display: 'swap',
	subsets: ['latin'],
	variable: '--font-garamond',
	fallback: ['Helvetica', 'Arial'],
})

const sans = DM_Sans({
	weight: ['300', '400', '500'],
	display: 'swap',
	subsets: ['latin'],
	variable: '--font-sans',
	fallback: ['Helvetica', 'Arial'],
})

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	maximumScale: 1,
	userScalable: false,
}

export const metadata: Metadata = {
	title: BRAND_NAME,
	metadataBase: new URL(WEBSITE_URL),
	openGraph: {
		siteName: BRAND_NAME,
		emails: EMAIL,
		type: 'website',
		locale: 'en_US',
	},
	authors: [{ name: BRAND_NAME, url: WEBSITE_URL }],
	applicationName: BRAND_NAME,
}

export default async function RootLayout({ children }: PropsWithChildren) {
	unstable_noStore()

	const { header, footer } = await useMenu()

	return (
		<html lang="en">
			<body
				className={`${cinzel.variable} ${garamond.variable} ${sans.variable} ${lora.variable}`}
			>
				<Provider>
					<Header header={header} />
					<main>{children}</main>
					<Footer footer={footer} />
					<div id="portal" />
				</Provider>
				{IS_PRODUCTION && <Scripts />}
			</body>
		</html>
	)
}
