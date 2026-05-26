import Container from '@/components/common/container/Container'
import type { IReaderArea } from '@/shared/interfaces/components/templates/reader/reader.interface'
import { formatClassName } from '@/utils/formats/class-name/format-class-name.util'
import type { FC } from 'react'
import styles from './ReaderArea.module.scss'

function stripFirstHeading(html: string): string {
	return html.replace(/^\s*<h[1-6][^>]*>[\s\S]*?<\/h[1-6]>\s*/i, '')
}

const ReaderArea: FC<IReaderArea> = ({
	book,
	settings,
	scrollRef,
	chapterRefs,
}) => {
	return (
		<div ref={scrollRef} className={styles.scroll}>
			{book.chapters.map((ch, i) => (
				<div
					key={ch.id}
					ref={(el) => {
						if (chapterRefs.current) chapterRefs.current[i] = el
					}}
					className={styles.chapter}
					id={`chapter-${i}`}
				>
					<Container size="full" className={styles.head}>
						<div className={styles.headInner}>
							<div className={styles.label}>
								Chapter {i + 1} of {book.chapters.length}
							</div>
							<h1 className={styles.title}>{ch.title}</h1>
							<div className={styles.separator}>— ✦ —</div>
						</div>
					</Container>
					<Container size="full" className={styles.wrapper}>
						<div
							className={formatClassName([
								styles.content,
								`font-${settings.fontFamily}`,
							])}
							style={{
								fontSize: `${settings.fontSize}px`,
								lineHeight: `${settings.lineHeight}%`,
							}}
							dangerouslySetInnerHTML={{ __html: stripFirstHeading(ch.html) }}
						/>
					</Container>
				</div>
			))}
		</div>
	)
}

export default ReaderArea
