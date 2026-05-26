import { ApolloLink, HttpLink } from '@apollo/client'
import {
	CombinedGraphQLErrors,
	CombinedProtocolErrors,
} from '@apollo/client/errors'
import { ErrorLink } from '@apollo/client/link/error'
import { RemoveTypenameFromVariablesLink } from '@apollo/client/link/remove-typename'
import toast from 'react-hot-toast'

const removeTypenameLink = new RemoveTypenameFromVariablesLink()

const errorLink = new ErrorLink(({ error, operation }) => {
	if (CombinedGraphQLErrors.is(error)) {
		error.errors.forEach(({ message, locations, path }) =>
			toast.error(
				`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
			)
		)
	} else if (CombinedProtocolErrors.is(error)) {
		error.errors.forEach(({ message, extensions }) =>
			toast.error(
				`[Protocol error]: Message: ${message}, Extensions: ${JSON.stringify(
					extensions
				)}`
			)
		)
	} else {
		toast.error(`[Network error]: ${error}`)
	}
})

const shopifyLink = new HttpLink({
	uri: process.env.SHOPIFY_GRAPHQL_URL as string,
	headers: {
		'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_TOKEN as string,
		'Accept-Language': 'en-US',
	},
})

export const apolloLinks = ApolloLink.from([
	removeTypenameLink,
	errorLink,
	shopifyLink,
])
