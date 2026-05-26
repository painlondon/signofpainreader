'use client'

import { BRAND_NAME } from '@/base/global/global.base'
import Container from '@/components/common/container/Container'
import type { IHome } from '@/shared/interfaces/components/screens/home/home.interface'
import { useReaderStore } from '@/store/reader/reader.store'
import type { FC } from 'react'
import styles from './HomeProduct.module.scss'

const HomeProduct: FC<IHome> = ({ page }) => {
	const { toggleReader } = useReaderStore()

	return (
		<section className={styles.section}>
			<Container className={styles.wrapper}>
				<div
					className={styles.book}
					onClick={() => toggleReader(page.product.reference.handle)}
				>
					<p className={styles.author}>{BRAND_NAME}</p>
					<div className={styles.ornament}></div>
					<h2 className={styles.name}>{page.product.reference.title}</h2>
					<div className={styles.ornament}></div>
					<p className={styles.note}>{page.product.reference.note.value}</p>
					<p className={styles.library}>{`${BRAND_NAME} Library`}</p>
				</div>
				<div className={styles.info}>
					{page?.product?.reference?.caption?.value && (
						<div className={styles.caption}>
							{page.product.reference.caption.value}
						</div>
					)}
					<h2 className={styles.heading}>{page?.product?.reference?.title}</h2>
					{page?.product?.reference?.descriptionHtml && (
						<div
							className={styles.description}
							dangerouslySetInnerHTML={{
								__html: page.product.reference.descriptionHtml,
							}}
						/>
					)}
					<ul className={styles.terms}>
						<li className={styles.term}>
							<span className={styles.label}>Length</span>
							<span className={styles.value}>
								{page?.product?.reference?.length?.value} Pages
							</span>
						</li>
						<li className={styles.term}>
							<span className={styles.label}>Genre</span>
							<span className={styles.value}>
								{page?.product?.reference?.collections.nodes?.[0].title}
							</span>
						</li>
						<li className={styles.term}>
							<span className={styles.label}>Price</span>
							<span className={styles.value}>Free</span>
						</li>
					</ul>
					{page?.product?.reference?.quote?.value && (
						<div className={styles.quote}>
							{page.product.reference.quote.value}
						</div>
					)}
					<button
						className={styles.button}
						onClick={() => toggleReader(page.product.reference.handle)}
					>
						{page?.product?.reference?.button?.value}
					</button>
				</div>
			</Container>
			<div className={styles.divider} />
		</section>
	)
}

export default HomeProduct
