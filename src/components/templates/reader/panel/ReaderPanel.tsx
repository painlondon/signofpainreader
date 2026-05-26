import Container from '@/components/common/container/Container'
import ChevronLeftIcon from '@/components/icons/ChevronLeftIcon'
import SearchIcon from '@/components/icons/SearchIcon'
import XIcon from '@/components/icons/XIcon'
import type { IReaderPanel } from '@/shared/interfaces/components/templates/reader/reader.interface'
import { formatClassName } from '@/utils/formats/class-name/format-class-name.util'
import type { FC } from 'react'
import styles from './ReaderPanel.module.scss'

const ReaderPanel: FC<IReaderPanel> = ({
	tocOpen,
	book,
	chIdx,
	srchOpen,
	goToChapter,
	inputRef,
	query,
	search,
	clear,
	setOpen,
	setSettings,
	toggleSrch,
	toggleToc,
	toggleSettings,
	results,
	settings,
}) => {
	return (
		<>
			{tocOpen && (
				<Container size="full" className={styles.toc}>
					<div className={styles.wrapper}>
						<div className={styles.head}>
							<div className={styles.heading}>Contents</div>
							<div className={styles.name}>{book.title}</div>
						</div>
						{book.chapters.map((ch, i) => {
							const isActive = i === chIdx

							return (
								<div
									key={ch.id}
									className={formatClassName([
										styles.chapter,
										isActive && styles.active,
									])}
									onClick={() => {
										goToChapter(i)
										toggleToc()
									}}
								>
									<span>Chapter {i + 1}</span>
									{ch.title}
								</div>
							)
						})}
					</div>
					<button className={styles.foot} onClick={toggleToc}>
						<ChevronLeftIcon />
						<span>Back</span>
					</button>
				</Container>
			)}
			{srchOpen && (
				<Container size="full" className={styles.search}>
					<div className={styles.wrapper}>
						<div className={styles.field}>
							<div className={styles.find}>
								<SearchIcon />
							</div>
							<input
								ref={inputRef}
								className={styles.input}
								value={query}
								onChange={(e) => search(e.target.value, book)}
								placeholder="Search in book…"
							/>
							<button
								type="button"
								className={styles.close}
								onClick={() => {
									toggleSrch()
									clear()
								}}
							>
								<XIcon />
							</button>
						</div>
						<div className={styles.results}>
							{query && results.length === 0 && (
								<div className={styles.empty}>
									No results found for &ldquo;{query}&rdquo;
								</div>
							)}
							{results.map((r, i) => (
								<div
									key={i}
									className={styles.result}
									onClick={() => {
										goToChapter(r.chapterIndex)
										toggleSrch()
										clear()
									}}
									onMouseEnter={(e) =>
										(e.currentTarget.style.background = 'var(--hover)')
									}
									onMouseLeave={(e) =>
										(e.currentTarget.style.background = 'transparent')
									}
								>
									<span>{r.chapterTitle}</span>
									<span>…{r.snippet}…</span>
								</div>
							))}
						</div>
					</div>
					<button className={styles.foot} onClick={toggleSrch}>
						<ChevronLeftIcon />
						<span>Back</span>
					</button>
				</Container>
			)}
			{setOpen && (
				<Container size="full" className={styles.settings}>
					<div className={styles.wrapper}>
						<div className={styles.setting}>
							<div className={styles.label}>Font Family</div>
							<div className={styles.options}>
								{(['garamond', 'sans', 'serif', 'mono'] as const).map((f) => (
									<button
										type="button"
										key={f}
										className={formatClassName([
											styles.option,
											settings.fontFamily === f && styles.active,
										])}
										onClick={() => setSettings({ fontFamily: f })}
									>
										{f === 'garamond'
											? 'Garamond'
											: f === 'sans'
												? 'Sans'
												: f === 'serif'
													? 'Serif'
													: 'Mono'}
									</button>
								))}
							</div>
						</div>
						<div className={styles.setting}>
							<div className={styles.label}>Font Size</div>
							<div className={styles.box}>
								<button
									type="button"
									className={styles.toggle}
									onClick={() =>
										setSettings({
											fontSize: Math.max(12, settings.fontSize - 1),
										})
									}
								>
									−
								</button>
								<span className={styles.value}>{settings.fontSize}px</span>
								<button
									type="button"
									className={styles.toggle}
									onClick={() =>
										setSettings({
											fontSize: Math.min(30, settings.fontSize + 1),
										})
									}
								>
									+
								</button>
							</div>
						</div>
						<div className={styles.setting}>
							<div className={styles.label}>Line Height</div>
							<div className={styles.options}>
								{([120, 140, 160, 180, 200] as const).map((lh) => (
									<button
										type="button"
										key={lh}
										className={formatClassName([
											styles.option,
											settings.lineHeight === lh && styles.active,
										])}
										onClick={() => setSettings({ lineHeight: lh })}
									>
										{`${lh}%`}
									</button>
								))}
							</div>
						</div>
					</div>
					<button className={styles.foot} onClick={toggleSettings}>
						<ChevronLeftIcon />
						<span>Back</span>
					</button>
				</Container>
			)}
		</>
	)
}

export default ReaderPanel
