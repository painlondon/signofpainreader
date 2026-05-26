import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	reactStrictMode: true,
	poweredByHeader: false,
	env: {
		ENV: process.env.APP_ENV,
		CLIENT_URL: process.env.NEXT_APP_URL,
		SHOPIFY_GRAPHQL_URL: process.env.SHOPIFY_GRAPHQL_URL,
		SHOPIFY_TOKEN: process.env.SHOPIFY_TOKEN,
		KLAVIYO_ID: process.env.KLAVIYO_ID,
		KLAVIYO_TOKEN: process.env.KLAVIYO_TOKEN,
	},
}

export default nextConfig
