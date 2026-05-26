import {
	type HomePageQuery,
	type HomePageQueryVariables,
	HomePageDocument,
} from '@/__generated__/shopify/storefront'
import { apolloClient } from '@/api/apollo/apollo.client'

export const useHomePage = async () => {
	const { data } = await apolloClient.query<
		HomePageQuery,
		HomePageQueryVariables
	>({
		query: HomePageDocument,
	})
	
	return {
		page: data?.home,
	}
}
