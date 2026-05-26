import Field from '@/components/elements/form/field/Field'
import Loader from '@/components/elements/loader/Loader'
import { useReaderGateway } from '@/hooks/components/templates/reader/gateway/useReaderGateway.hook'
import type { IReaderGateway } from '@/shared/interfaces/components/templates/reader/reader.interface'
import { EMAIL_VALIDATION } from '@/validations/email.validation'
import type { FC } from 'react'
import Portal from '../../portal/Portal'
import styles from './ReaderGateway.module.scss'

const ReaderGateway: FC<IReaderGateway> = ({
	content,
	slug,
	setIsGatewayOpen,
}) => {
	const { register, handleSubmit, errors, isLoading, onSubmit, onDismiss } =
		useReaderGateway({
			slug,
			setIsGatewayOpen,
			content,
		})

	return (
		<Portal>
			<div className={styles.overlay}>
				<div className={styles.modal}>
					<span className={styles.ornament}>✦</span>
					<h3 className={styles.heading}>{content.heading}</h3>
					<p className={styles.description}>{content.description}</p>
					<form
						onSubmit={handleSubmit(onSubmit)}
						noValidate
						className={styles.form}
					>
						<Field
							{...register('email', EMAIL_VALIDATION)}
							className={styles.field}
							inputClassName={styles.input}
							type="email"
							autoComplete="email"
							label="E-mail"
							placeholder="your@email.com"
							error={errors.email}
						/>
						{isLoading ? (
							<div className={styles.submit}>
								<Loader className={styles.loader} />
							</div>
						) : (
							<button className={styles.submit}>{content.submit}</button>
						)}
					</form>
					<button type="button" className={styles.skip} onClick={onDismiss}>
						{content.skip}
					</button>
				</div>
			</div>
		</Portal>
	)
}

export default ReaderGateway
