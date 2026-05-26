import Container from '@/components/common/container/Container'
import type { IHome } from '@/shared/interfaces/components/screens/home/home.interface'
import { formatToRoman } from '@/utils/formats/to-roman/format-to-roman.util'
import type { FC } from 'react'
import styles from './HomeAbout.module.scss'

const HomeAbout: FC<IHome> = ({ page }) => {
	const cards = page?.about_cards?.value
		? JSON.parse(page.about_cards.value)
		: []

	return (
		<section className={styles.section}>
			<Container className={styles.wrapper}>
				{page?.about_heading_1?.value && page?.about_heading_2?.value && (
					<div className={styles.heading}>
						<span>{page.about_heading_1.value}</span>
						<span>{page.about_heading_2.value}</span>
					</div>
				)}
				<ul className={styles.cards}>
					{cards.map((card: string, index: number) => (
						<li key={index} className={styles.card}>
							<span className={styles.number}>{formatToRoman(index + 1)}</span>
							<p className={styles.description}>{card}</p>
						</li>
					))}
				</ul>
			</Container>
			<div className={styles.divider} />
		</section>
	)
}

export default HomeAbout
