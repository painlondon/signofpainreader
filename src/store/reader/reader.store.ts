import { EnumStorage } from '@/shared/enums/storage/storage.enum'
import type { IReaderStore } from '@/shared/interfaces/store/reader/reader.interface'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useReaderStore = create<IReaderStore>()(
	persist(
		(set, get) => ({
			isShow: false,
			currentSlug: '',
			progress: {},
			settings: {
				fontSize: 18,
				fontFamily: 'garamond',
				lineHeight: 160,
				width: 'normal',
			},
			emailGiven: false,
			emailDismissed: [],
			toggleReader: (slug) =>
				set((s) => {
					const isSameSlug = s.currentSlug === slug

					return {
						isShow: isSameSlug ? !s.isShow : true,
						currentSlug: isSameSlug && s.isShow ? s.currentSlug : slug,
					}
				}),

			setProgress: (slug, p) =>
				set((s) => ({
					progress: {
						...s.progress,
						[slug]: { ...s.progress[slug], ...p },
					},
				})),

			setSettings: (s) =>
				set((prev) => ({ settings: { ...prev.settings, ...s } })),

			setEmailGiven: () => set({ emailGiven: true }),

			dismissEmail: (slug) =>
				set((state) => ({
					emailDismissed: [
						...state.emailDismissed.filter((s) => s !== slug),
						slug,
					],
				})),

			resetProgress: (slug) =>
				set((s) => {
					const next = { ...s.progress }
					delete next[slug]
					return { progress: next }
				}),
		}),
		{
			name: EnumStorage.READER,
			partialize: (state) => ({
				progress: state.progress,
				settings: state.settings,
				emailGiven: state.emailGiven,
				emailDismissed: state.emailDismissed,
			}),
		}
	)
)
