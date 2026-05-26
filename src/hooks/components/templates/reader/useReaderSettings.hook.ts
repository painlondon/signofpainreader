import { useReaderStore } from '@/store/reader/reader.store'
import { useMemo } from 'react'

export const useReaderSettings = () => {
	const { settings, setSettings } = useReaderStore()

	const incFontSize = () => {
		if (settings.fontSize < 30) setSettings({ fontSize: settings.fontSize + 1 })
	}

	const decFontSize = () => {
		if (settings.fontSize > 12) setSettings({ fontSize: settings.fontSize - 1 })
	}

	return useMemo(
		() => ({
			settings,
			setSettings,
			incFontSize,
			decFontSize,
		}),
		[settings]
	)
}
