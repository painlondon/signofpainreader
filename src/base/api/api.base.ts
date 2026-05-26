export const API_BASE = {
	JUDGEME: {
		PRODUCT: (productId: string) =>
			`https://judge.me/api/v1/products/-1?api_token=${process.env.SHOPIFY_JUDGME_TOKEN}&shop_domain=${process.env.SHOPIFY_DOMAIN}&external_id=${productId}`,
		REVIEWS: (internalId: number | string, page: number) =>
			`https://judge.me/api/v1/reviews?shop_domain=${process.env.SHOPIFY_DOMAIN}&api_token=${process.env.SHOPIFY_JUDGME_TOKEN}&product_id=${internalId}&page=${page}&per_page=5`,
	},
}
