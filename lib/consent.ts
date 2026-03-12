import { PROJECT_NAME } from '@/constants'

export const CONSENT_COOKIE = PROJECT_NAME.toLowerCase().replace(/\s+/g, '_') + '_analytics'

export type ConsentValue = 'granted' | 'denied'

export function readCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined
  const match = document.cookie.match(new RegExp('(?:^|;)\\s*' + name + '=([^;]*)'))
  return match ? decodeURIComponent(match[1]) : undefined
}

export function writeCookie(name: string, value: string, days = 365) {
  const d = new Date()
  d.setDate(d.getDate() + days)
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${d.toUTCString()};path=/;SameSite=Lax`
}
