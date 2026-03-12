'use client'

import { useLocale } from 'next-intl'
import { usePathname, Link } from '@/i18n/navigation'

export function LocaleSwitchLink({ className }: { className?: string }) {
  const locale = useLocale()
  const pathname = usePathname()

  const targetLocale = locale === 'en' ? 'ru' : 'en'
  const label = locale === 'en' ? 'Русский' : 'English'

  return (
    <Link
      href={pathname}
      locale={targetLocale}
      className={className}
    >
      {label}
    </Link>
  )
}
