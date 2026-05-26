'use client'

import { PUBLIC_ROUTE } from '@/base/route/route.base'
import Container from '@/components/common/container/Container'
import Link from 'next/link'
import type { FC } from 'react'
import styles from './NotFound.module.scss'

const NotFound: FC = () => {
	return (
		<section className={styles.section}>
			<Container className={styles.wrapper}>
				<h1 className={styles.heading}>Not Found</h1>
				<p className={styles.description}>
					Sorry, we could not find what you were looking for.
				</p>
				<Link className={styles.button} href={PUBLIC_ROUTE.HOME}>
					Continue Shopping
				</Link>
			</Container>
		</section>
	)
}

export default NotFound
