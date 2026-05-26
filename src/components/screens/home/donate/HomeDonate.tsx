import Container from '@/components/common/container/Container'
import CoinsIcon from '@/components/icons/CoinsIcon'
import type { IHome } from '@/shared/interfaces/components/screens/home/home.interface'
import Link from 'next/link'
import type { FC } from 'react'
import styles from './HomeDonate.module.scss'

const HomeDonate: FC<IHome> = ({ page }) => {
	return (
		<section className={styles.section}>
			<Container className={styles.wrapper}>
				<div className={styles.box}>
					<div className={styles.ornament}>— ✦ —</div>
					{page?.donate_heading?.value && (
						<h2 className={styles.heading}>{page.donate_heading.value}</h2>
					)}
					{page?.donate_description?.value && (
						<p
							className={styles.description}
							dangerouslySetInnerHTML={{
								__html: page.donate_description.value,
							}}
						/>
					)}
					<div className={styles.foot}>
						{page?.donate_button_label?.value &&
							page?.donate_button_link?.value && (
								<Link
									href={page.donate_button_link.value}
									target="_blank"
									rel="noopener noreferrer"
									className={styles.button}
								>
									<span>{page.donate_button_label.value}</span>
									<CoinsIcon />
								</Link>
							)}
						{page?.donate_note?.value && (
							<p className={styles.note}>{page.donate_note.value}</p>
						)}
					</div>
				</div>
			</Container>
			<div className={styles.divider} />
		</section>
	)
}

export default HomeDonate
