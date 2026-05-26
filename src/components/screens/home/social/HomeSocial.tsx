import type { SocialFragment } from '@/__generated__/shopify/storefront'
import Container from '@/components/common/container/Container'
import type { IHome } from '@/shared/interfaces/components/screens/home/home.interface'
import Link from 'next/link'
import type { CSSProperties, FC } from 'react'
import styles from './HomeSocial.module.scss'

const HomeSocial: FC<IHome> = ({ page }) => {
	const socials =
		(page?.community_socials?.references?.nodes as SocialFragment[]) || []

	return (
		<section className={styles.section}>
			<Container className={styles.wrapper}>
				<p className={styles.heading}>{page?.community_heading?.value}</p>
				<ul className={styles.cards}>
					{socials.map((social: SocialFragment, index: number) => (
						<li
							key={index}
							className={styles.card}
							style={{ '--theme': social.theme.value } as CSSProperties}
						>
							<Link className={styles.link} href={social.link?.value}>
								<div
									className={styles.icon}
									dangerouslySetInnerHTML={{ __html: social.icon?.value }}
								/>
								<div className={styles.subscribers}>
									{social.subscribers?.value}
								</div>
								<div className={styles.label}>{social.heading?.value}</div>
							</Link>
						</li>
					))}
				</ul>
			</Container>
			<div className={styles.divider} />
		</section>
	)
}

export default HomeSocial
