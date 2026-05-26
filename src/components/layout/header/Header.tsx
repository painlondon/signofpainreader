'use client'

import Container from '@/components/common/container/Container'
import Logo from '@/components/elements/logo/Logo'
import BurgerIcon from '@/components/icons/BurgerIcon'
import XIcon from '@/components/icons/XIcon'
import { useOutsideState } from '@/hooks/helpers/outside/useOutsideState.hook'
import type { IHeader } from '@/shared/interfaces/components/layout/header/header.interface'
import { formatClassName } from '@/utils/formats/class-name/format-class-name.util'
import Link from 'next/link'
import type { FC } from 'react'
import styles from './Header.module.scss'

const Header: FC<IHeader> = ({ header }) => {
	const { isShow, toggle, ref, buttonRef } = useOutsideState()

	return (
		<header className={styles.header}>
			<Container className={styles.wrapper} size="full">
				<button ref={buttonRef} className={styles.trigger} onClick={toggle}>
					<BurgerIcon />
				</button>
				<Logo className={styles.logo} />
				{header && (
					<div
						className={formatClassName([styles.menu, isShow && styles.opened])}
					>
						<div className={styles.head}>
							<div className={styles.heading}>Menu</div>
							<button ref={buttonRef} className={styles.close} onClick={toggle}>
								<XIcon />
							</button>
						</div>
						<nav ref={ref} className={styles.navigation}>
							<ul className={styles.list}>
								{header.items.map((item, index) => (
									<li key={index} className={styles.item}>
										{!item.url || item.url?.includes('/empty') ? (
											<span className={styles.link}>{item.title}</span>
										) : (
											<Link
												className={styles.link}
												href={item.url}
												onClick={toggle}
											>
												{item.title}
											</Link>
										)}
									</li>
								))}
							</ul>
						</nav>
					</div>
				)}
			</Container>
		</header>
	)
}

export default Header
