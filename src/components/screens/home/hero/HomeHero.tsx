'use client'

import Container from '@/components/common/container/Container'
import type { IHome } from '@/shared/interfaces/components/screens/home/home.interface'
import { useReaderStore } from '@/store/reader/reader.store'
import type { FC } from 'react'
import styles from './HomeHero.module.scss'

const HomeHero: FC<IHome> = ({ page }) => {
	const { toggleReader } = useReaderStore()

	return (
		<section className={styles.section}>
			<div className={styles.overlay}></div>
			<Container className={styles.wrapper}>
				<div className={styles.info}>
					{page?.hero_caption?.value && (
						<p
							className={styles.caption}
							dangerouslySetInnerHTML={{ __html: page.hero_caption.value }}
						/>
					)}
					{page?.hero_heading_1?.value && page?.hero_heading_2?.value && (
						<h1 className={styles.heading}>
							{page.hero_heading_1.value}
							<span>{page.hero_heading_2.value}</span>
						</h1>
					)}
					{page?.hero_description?.value && (
						<p
							className={styles.description}
							dangerouslySetInnerHTML={{ __html: page.hero_description.value }}
						/>
					)}
					<div className={styles.box}>
						{page?.hero_button?.value && (
							<button
								className={styles.button}
								onClick={() => toggleReader(page.product.reference.handle)}
							>
								{page.hero_button.value}
							</button>
						)}
						{page?.hero_note?.value && (
							<p className={styles.note}>{page.hero_note.value}</p>
						)}
					</div>
				</div>
			</Container>
			<div className={styles.scroll}>
				<div className={styles.bar}></div>
				<span>Scroll</span>
			</div>
			<div className={styles.divider} />
		</section>
	)
}

export default HomeHero
