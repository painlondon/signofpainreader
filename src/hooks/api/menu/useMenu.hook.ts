import {
	type MenuQuery,
	type MenuQueryVariables,
	MenuDocument,
} from '@/__generated__/shopify/storefront'
import { apolloClient } from '@/api/apollo/apollo.client'

export const useMenu = async () => {
	const { data } = await apolloClient.query<MenuQuery, MenuQueryVariables>({
		query: MenuDocument,
	})

	return {
		header: data?.header,
		footer: data?.footer,
	}
}
