export const IS_SERVER = typeof window === 'undefined'
export const IS_PRODUCTION = process.env.ENV === 'production'

export const NO_INDEX_PAGE = { robots: { index: false, follow: false } }
export const INDEX_PAGE = { robots: { index: true, follow: true } }
export const WEBSITE_URL = process.env.CLIENT_URL as string

export const BRAND_NAME = 'SIGN OF PAIN'
export const EMAIL = 'support@signofpain.com'