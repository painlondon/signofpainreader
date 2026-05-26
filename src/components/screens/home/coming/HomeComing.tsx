import Container from '@/components/common/container/Container'
import type { IHome } from '@/shared/interfaces/components/screens/home/home.interface'
import { Fragment, type FC } from 'react'
import styles from './HomeComing.module.scss'

const HomeComing: FC<IHome> = ({ page }) => {
	const teasers = page?.coming_teasers?.value
		? JSON.parse(page.coming_teasers.value)
		: []

	return (
		<section className={styles.section}>
			<Container className={styles.wrapper}>
				<div className={styles.box}>
					<h2 className={styles.heading}>{page.coming_heading.value}</h2>
					<p className={styles.description}>{page.coming_description.value}</p>
					<ul className={styles.teasers}>
						{teasers.map((teaser: string, index: number) => (
							<Fragment key={index}>
								<li className={styles.teaser}>{teaser}</li>

								{index !== teasers.length - 1 && (
									<li className={styles.teaser}>
										<span>—</span>
									</li>
								)}
							</Fragment>
						))}
					</ul>
				</div>
			</Container>
			<div className={styles.divider} />
		</section>
	)
}

export default HomeComing
