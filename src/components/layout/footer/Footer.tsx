import Container from '@/components/common/container/Container'
import Logo from '@/components/elements/logo/Logo'
import type { IFooter } from '@/shared/interfaces/components/layout/footer/footer.interface'
import Link from 'next/link'
import type { FC } from 'react'
import styles from './Footer.module.scss'

const Footer: FC<IFooter> = ({ footer }) => {
	return (
		<footer className={styles.footer}>
			<Container size="full" className={styles.wrapper}>
				<Logo className={styles.logo} />
				<p className={styles.tagline}>"This is the sign of your pain."</p>
				{footer && (
					<ul className={styles.list}>
						{footer.items.map((item, index) => (
							<li key={index} className={styles.item}>
								{!item.url || item.url?.includes('/empty') ? (
									<span className={styles.link}>{item.title}</span>
								) : (
									<Link className={styles.link} href={item.url}>
										{item.title}
									</Link>
								)}
							</li>
						))}
					</ul>
				)}
			</Container>
		</footer>
	)
}

export default Footer
