import { IS_SERVER } from '@/base/global/global.base'

export const useToggleScrollBar = (isHidden: boolean) => {
	if (IS_SERVER) {
		return
	}

	const body = document.querySelector('body')

	if (!body) return

	body.style.overflow = isHidden ? 'hidden' : 'visible'
}
