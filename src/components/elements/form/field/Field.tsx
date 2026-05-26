import type { IField } from '@/shared/interfaces/components/elements/form/form.interface'
import { formatClassName } from '@/utils/formats/class-name/format-class-name.util'
import type { FC } from 'react'
import styles from '../Form.module.scss'

const Field: FC<IField> = ({
	error,
	label,
	className,
	inputClassName,
	children,
	...rest
}) => {
	return (
		<div className={formatClassName([styles.field, className])}>
			{label && <label className={styles.label}>{label}</label>}
			{children}
			{error && <span className={styles.error}>{error.message}</span>}
			<input
				className={formatClassName([styles.input, inputClassName])}
				{...rest}
			/>
		</div>
	)
}

export default Field
