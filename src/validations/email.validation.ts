import { emailRegex } from '@/utils/regex/email.regex'

export const EMAIL_VALIDATION = {
	required: 'Email is required.',
	pattern: {
		value: emailRegex,
		message: 'Please enter a valid email address.',
	},
	maxLength: {
		value: 254,
		message: 'Email is too long.',
	},
}
