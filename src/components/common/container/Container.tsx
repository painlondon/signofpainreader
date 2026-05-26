import type { IContainer } from '@/shared/interfaces/components/common/container/container.interface'
import { formatClassName } from '@/utils/formats/class-name/format-class-name.util'
import type { FC } from 'react'
import styles from './Container.module.scss'

const Container: FC<IContainer> = ({ size = 'md', children, className, ...rest }) => {
	return (
		<div
			className={formatClassName([styles.container, styles[size], className])}
			{...rest}
		>
			{children}
		</div>
	)
}

export default Container
