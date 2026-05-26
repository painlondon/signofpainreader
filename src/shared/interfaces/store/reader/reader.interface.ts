import type { TypeReaderFontFamily } from '@/shared/types/components/templates/reader/reader.type'
import type { IReaderBookProgress } from '../../components/templates/reader/reader.interface'

interface IReaderSettings {
	fontFamily: TypeReaderFontFamily
	fontSize: number
	lineHeight: number
	width: 'narrow' | 'normal' | 'wide'
}

export interface IReaderStore {
	isShow: boolean
	currentSlug: string
	progress: Record<string, IReaderBookProgress>
	settings: IReaderSettings
	emailGiven: boolean
	emailDismissed: string[]
	toggleReader: (slug: string) => void
	setProgress: (slug: string, p: Partial<IReaderBookProgress>) => void
	setSettings: (s: Partial<IReaderSettings>) => void
	setEmailGiven: () => void
	dismissEmail: (slug: string) => void
	resetProgress: (slug: string) => void
}
