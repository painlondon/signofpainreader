import { IS_SERVER } from '@/base/global/global.base'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { apolloLinks } from './links/apollo-links.api'

export const apolloClient = new ApolloClient({
	link: apolloLinks,
	defaultOptions: {
		query: {
			fetchPolicy: 'no-cache',
		},
	},
	cache: new InMemoryCache(),
	ssrMode: IS_SERVER,
})
