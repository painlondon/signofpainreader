import type { ComponentPropsWithRef, PropsWithChildren } from 'react'

export interface IContainer
	extends Omit<ComponentPropsWithRef<'div'>, 'size'>, PropsWithChildren {
	size?: 'full' | 'md'
}
