export type TypeReaderFontFamily = 'garamond' | 'sans' | 'serif' | 'mono'
export type TypeReaderTextWidth = 'narrow' | 'normal' | 'wide'

export type TypeReaderCover = {
	data: Buffer<ArrayBufferLike>
	mimeType: string
}
