import { SITE_URL } from '@/constants'

export function pageAlternates(locale: string, path: string) {
  const enUrl = `${SITE_URL}${path}`
  const ruUrl = `${SITE_URL}/ru${path}`
  return {
    canonical: locale === 'en' ? enUrl : ruUrl,
    languages: {
      en: enUrl,
      ru: ruUrl,
      'x-default': enUrl,
    } as Record<string, string>,
  }
}

export function ogLocale(locale: string) {
  return locale === 'ru' ? 'ru_RU' : 'en_US'
}
