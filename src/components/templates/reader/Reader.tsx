'use client'

import CoinsIcon from '@/components/icons/CoinsIcon'
import { useReader } from '@/hooks/components/templates/reader/useReader.hook'
import { useToggleScrollBar } from '@/hooks/helpers/toggle-scrollbar/useToggleScrollBar.hook'
import type { IReader } from '@/shared/interfaces/components/templates/reader/reader.interface'
import Link from 'next/link'
import type { FC } from 'react'
import Portal from '../portal/Portal'
import styles from './Reader.module.scss'
import ReaderArea from './area/ReaderArea'
import ReaderGateway from './gateway/ReaderGateway'
import ReaderNavigation from './navigation/ReaderNavigation'
import ReaderPanel from './panel/ReaderPanel'
import ReaderProgress from './progress/ReaderProgress'

const Reader: FC<IReader> = ({
	url,
	donatePage,
	gatewayPage,
	content,
	page,
	donateButtonLabel,
	donateButtonLink,
}) => {
	const {
		isGatewayOpen,
		setIsGatewayOpen,
		loading,
		error,
		book,
		tocOpen,
		srchOpen,
		setOpen,
		containerRef,
		settings,
		percentRead,
		isFullscreen,
		toggleToc,
		toggleSearch,
		toggleSettings,
		toggleFs,
		chIdx,
		query,
		results,
		goToChapter,
		inputRef,
		search,
		clear,
		setSettings,
		scrollRef,
		chapterRefs,
		store,
	} = useReader({ url })

	const isError = !store.isShow || loading || !!error || !book

	useToggleScrollBar(!isError)

	if (isError) return null

	return (
		<Portal>
			<div className={styles.overlay}>
				<div ref={containerRef} className={styles.reader}>
					<ReaderNavigation
						book={book}
						isFullscreen={isFullscreen}
						tocOpen={tocOpen}
						srchOpen={srchOpen}
						setOpen={setOpen}
						toggleToc={toggleToc}
						toggleSearch={toggleSearch}
						toggleSettings={toggleSettings}
						toggleFs={toggleFs}
						closeReader={() => store.toggleReader(store.currentSlug)}
					/>
					<div className={styles.body}>
						<ReaderArea
							book={book}
							settings={settings}
							scrollRef={scrollRef}
							chapterRefs={chapterRefs}
						/>
						<ReaderPanel
							book={book}
							chIdx={chIdx}
							tocOpen={tocOpen}
							srchOpen={srchOpen}
							setOpen={setOpen}
							setSettings={setSettings}
							inputRef={inputRef}
							query={query}
							results={results}
							goToChapter={goToChapter}
							search={search}
							clear={clear}
							settings={settings}
							toggleSettings={toggleSettings}
							toggleSrch={toggleSearch}
							toggleToc={toggleToc}
						/>
					</div>
					<ReaderProgress
						percentRead={percentRead}
						chIdx={chIdx}
						totalChapters={book.totalChapters}
					/>
					{isGatewayOpen &&
						gatewayPage &&
						!store.emailGiven &&
						!store.emailDismissed.includes(store.currentSlug) &&
						Math.round(percentRead) >= gatewayPage && (
							<ReaderGateway
								slug={store.currentSlug}
								setIsGatewayOpen={setIsGatewayOpen}
								content={content}
							/>
						)}
					{donatePage &&
						Math.round(percentRead) >= donatePage &&
						donateButtonLabel &&
						donateButtonLink && (
							<Link
								className={styles.donate}
								href={donateButtonLink}
								target="_blank"
								rel="noopener noreferrer"
							>
								<span>{donateButtonLabel}</span>
								<CoinsIcon />
							</Link>
						)}
				</div>
			</div>
		</Portal>
	)
}

export default Reader
