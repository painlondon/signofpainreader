import type { CustomerCreateInput } from '@/__generated__/shopify/storefront'
import type { IReaderGatewayHook } from '@/shared/interfaces/components/templates/reader/reader.interface'
import { useReaderStore } from '@/store/reader/reader.store'
import { useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'

export const useReaderGateway = ({
	slug,
	setIsGatewayOpen,
	content,
}: IReaderGatewayHook) => {
	const { setEmailGiven, dismissEmail } = useReaderStore()
	const [loading, setLoading] = useState(false)

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<CustomerCreateInput>({
		defaultValues: { email: '' },
		mode: 'onSubmit',
	})

	const onSubmit: SubmitHandler<CustomerCreateInput> = async ({ email }) => {
		setLoading(true)
		try {
			const res = await fetch('/api/subscribe', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email }),
			})

			if (!res.ok) throw new Error()

			setEmailGiven()
			setIsGatewayOpen(false)
			reset()
			toast.success(content.success)
		} catch (error) {
			toast.error(content.error)
		} finally {
			setLoading(false)
		}
	}

	const onDismiss = () => {
		dismissEmail(slug)
		setIsGatewayOpen(false)
		reset()
	}

	return {
		register,
		handleSubmit,
		errors,
		isLoading: isSubmitting || loading,
		onSubmit,
		onDismiss,
	}
}
