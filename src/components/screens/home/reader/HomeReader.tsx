'use client'

import Container from '@/components/common/container/Container'
import type { IHome } from '@/shared/interfaces/components/screens/home/home.interface'
import { useReaderStore } from '@/store/reader/reader.store'
import type { FC } from 'react'
import styles from './HomeReader.module.scss'

const HomeReader: FC<IHome> = ({ page }) => {
	const { toggleReader } = useReaderStore()

	return (
		<section className={styles.section}>
			<Container className={styles.wrapper}>
				<div className={styles.box}>
					<h2 className={styles.heading}>{page.reader_heading.value}</h2>
					<p className={styles.description}>{page.reader_description.value}</p>
				</div>
				<button
					className={styles.button}
					onClick={() => toggleReader(page.product.reference.handle)}
				>
					{page.reader_button.value}
				</button>
			</Container>
			<div className={styles.divider} />
		</section>
	)
}

export default HomeReader
