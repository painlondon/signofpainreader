import Container from '@/components/common/container/Container'
import Logo from '@/components/elements/logo/Logo'
import BurgerIcon from '@/components/icons/BurgerIcon'
import MaximizeIcon from '@/components/icons/MaximizeIcon'
import MinimizeIcon from '@/components/icons/MinimizeIcon'
import SearchIcon from '@/components/icons/SearchIcon'
import SettingsIcon from '@/components/icons/SettingsIcon'
import XIcon from '@/components/icons/XIcon'
import type { IReaderNavigation } from '@/shared/interfaces/components/templates/reader/reader.interface'
import { formatClassName } from '@/utils/formats/class-name/format-class-name.util'
import type { FC } from 'react'
import styles from './ReaderNavigation.module.scss'

const ReaderNavigation: FC<IReaderNavigation> = ({
	book,
	tocOpen,
	toggleToc,
	toggleSearch,
	srchOpen,
	setOpen,
	toggleSettings,
	toggleFs,
	isFullscreen,
	closeReader,
}) => {
	return (
		<Container size="full" className={styles.navigation}>
			<Logo className={styles.logo} />
			<div className={styles.title}>{book.title}</div>
			<div className={styles.controls}>
				<button
					type="button"
					className={formatClassName([
						styles.control,
						tocOpen && styles.active,
					])}
					onClick={toggleToc}
					title="Table of Contents"
				>
					<BurgerIcon />
				</button>
				<button
					type="button"
					className={formatClassName([
						styles.control,
						srchOpen && styles.active,
					])}
					onClick={toggleSearch}
					title="Search (/)"
				>
					<SearchIcon />
				</button>
				<button
					type="button"
					className={formatClassName([
						styles.control,
						setOpen && styles.active,
					])}
					onClick={toggleSettings}
					title="Settings"
				>
					<SettingsIcon />
				</button>
				<button
					type="button"
					className={formatClassName([
						styles.control,
						isFullscreen && styles.active,
					])}
					onClick={toggleFs}
					title="Fullscreen (F)"
				>
					{isFullscreen ? <MinimizeIcon /> : <MaximizeIcon />}
				</button>
				<div className={styles.divider} />
				<button
					type="button"
					className={styles.control}
					onClick={closeReader}
					title="Close"
				>
					<XIcon />
				</button>
			</div>
		</Container>
	)
}

export default ReaderNavigation
