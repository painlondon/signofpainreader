export type TypeReaderFontFamily = 'garamond' | 'sans' | 'cinzel' | 'lora'
export type TypeReaderTextWidth = 'narrow' | 'normal' | 'wide'

export type TypeReaderCover = {
	data: Buffer<ArrayBufferLike>
	mimeType: string
}
