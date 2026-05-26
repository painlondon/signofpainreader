import type { AllHTMLAttributes, PropsWithChildren } from 'react'
import type { FieldError } from 'react-hook-form'

export interface IField
	extends
		Omit<AllHTMLAttributes<HTMLInputElement>, 'value'>,
		PropsWithChildren {
	inputClassName?: string
	label?: string
	error?: FieldError
}
