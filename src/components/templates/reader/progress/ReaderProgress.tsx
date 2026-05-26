import Container from '@/components/common/container/Container'
import type { FC } from 'react'
import styles from './ReaderProgress.module.scss'

interface IReaderProgressScroll {
	percentRead: number
	chIdx: number
	totalChapters: number
}

const ReaderProgress: FC<IReaderProgressScroll> = ({
	percentRead,
	chIdx,
	totalChapters,
}) => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.bar}>
				<span style={{ width: `${percentRead}%` }} />
			</div>
			<Container size="full" className={styles.cols}>
				<div className={styles.chapter}>
					ch. {chIdx + 1} / {totalChapters}
				</div>
				<div className={styles.percent}>{percentRead}% read</div>
			</Container>
		</div>
	)
}

export default ReaderProgress
