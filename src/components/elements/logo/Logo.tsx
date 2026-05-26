import { PUBLIC_ROUTE } from '@/base/route/route.base'
import type { IClassName } from '@/shared/interfaces/common/class-name/class-name.interface'
import { formatClassName } from '@/utils/formats/class-name/format-class-name.util'
import Link from 'next/link'
import type { FC } from 'react'
import styles from './Logo.module.scss'

const Logo: FC<IClassName> = ({ className }) => {
	return (
		<Link
			className={formatClassName([styles.logo, className])}
			href={PUBLIC_ROUTE.HOME}
		>
			SIGN
			<span> OF </span>
			PAIN
		</Link>
	)
}

export default Logo
