import type {
	TypeReaderCover,
	TypeReaderFontFamily,
	TypeReaderTextWidth,
} from '@/shared/types/components/templates/reader/reader.type'
import type { Dispatch, RefObject, SetStateAction } from 'react'
import type { IHome } from '../../screens/home/home.interface'

export interface IReader extends IReaderGatewayContent, IHome {
	url: string
	gatewayPage?: number
	donatePage?: number
	donateButtonLabel?: string
	donateButtonLink?: string
}

export interface IReaderHook {
	url: string
}

export interface IReaderNavigation {
	book: IReaderBookResponse
	isFullscreen: boolean
	tocOpen: boolean
	srchOpen: boolean
	setOpen: boolean
	toggleToc: () => void
	toggleSearch: () => void
	toggleSettings: () => void
	toggleFs: () => void
	closeReader: () => void
}

export interface IReaderPanel {
	book: IReaderBookResponse
	chIdx: number
	tocOpen: boolean
	srchOpen: boolean
	setOpen: boolean
	inputRef: RefObject<HTMLInputElement | null>
	query: string
	results: IReaderSearchResult[]
	settings: IReaderSettings
	toggleToc: () => void
	toggleSrch: () => void
	toggleSettings: () => void
	goToChapter: (ci: number) => void
	search: (q: string, book: IReaderBookResponse | null) => void
	setSettings: (s: Partial<IReaderSettings>) => void
	clear: () => void
}

export interface IReaderArea {
	book: IReaderBookResponse
	settings: IReaderSettings
	scrollRef: (node: HTMLDivElement | null) => void
	chapterRefs: RefObject<(HTMLDivElement | null)[]>
}

export interface IReaderPagination {
	globalPage: number
	totalPages: number
	percentRead: number
	isFirstPage: boolean
	isLastPage: boolean
	goPrevPage: () => void
	goNextPage: () => void
	closeReader: () => void
}

export interface IReaderProgress {
	percentRead: number
	chIdx: number
	totalChapters: number
}

export interface IReaderGatewayHook extends IReaderGatewayContent {
	slug: string
	setIsGatewayOpen: Dispatch<SetStateAction<boolean>>
}

export interface IReaderGatewayContent {
	content: {
		heading: string
		description: string
		submit: string
		skip: string
		success: string
		error: string
	}
}

export interface IReaderGateway
	extends IReaderGatewayHook, IReaderGatewayContent {}

export interface IReaderChapter {
	id: string
	order: number
	title: string
	href: string
	html: string
	wordCount: number
}

export interface IReaderBookResponse {
	title: string
	author: string
	description: string
	language: string
	cover?: TypeReaderCover
	totalChapters: number
	totalWords: number
	chapters: IReaderChapter[]
}

export interface IReaderPaginationHook {
	book: IReaderBookResponse | null
	initialProgress?: Partial<IReaderBookProgress>
	fontSize: number
	lineHeight: number
	width: TypeReaderTextWidth
	containerHeight: number
}

export interface IReaderProgressHook {
	slug: string
	chIdx: number
	pgIdx: number
	enabled: boolean
}

export interface IReaderKeyboardToolHook {
	onNext: () => void
	onPrev: () => void
	onToggleFs: () => void
	onOpenSearch: () => void
	onCloseAll: () => void
}

export interface IReaderBookProgress {
	chapterIndex: number
	pageIndex: number
	scrollTop?: number
}

export interface IReaderSettings {
	fontSize: number
	fontFamily: TypeReaderFontFamily
	lineHeight: number
	width: TypeReaderTextWidth
}

export interface IReaderSearchResult {
	chapterIndex: number
	chapterTitle: string
	snippet: string
}
