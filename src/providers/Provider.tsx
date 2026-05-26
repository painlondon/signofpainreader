'use client'

import { apolloClient } from '@/api/apollo/apollo.client'
import { IS_PRODUCTION } from '@/base/global/global.base'
import Toaster from '@/components/templates/toaster/Toaster'
import { loadDevMessages, loadErrorMessages } from '@apollo/client/dev'
import { ApolloProvider } from '@apollo/client/react'
import type { PropsWithChildren } from 'react'

if (!IS_PRODUCTION) {
	loadDevMessages()
	loadErrorMessages()
}

export default function Provider({ children }: PropsWithChildren) {
	return (
		<>
			<ApolloProvider client={apolloClient}>{children}</ApolloProvider>
			<Toaster />
		</>
	)
}
