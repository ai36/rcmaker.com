'use client'

import { useLocale } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/navigation'
import { cn } from '@/lib/utils'

const LOCALES = [
  { code: 'en', label: 'EN' },
  { code: 'ru', label: 'RU' },
]

export function LocaleSelector() {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()

  return (
    <div className="flex items-center rounded-md border border-border/60 bg-muted/40 p-0.5 gap-0.5">
      {LOCALES.map(({ code, label }) => (
        <button
          key={code}
          onClick={() => router.replace(pathname, { locale: code })}
          aria-label={code === 'en' ? 'Switch to English' : 'Переключить на русский'}
          className={cn(
            'flex h-6 min-w-[26px] items-center justify-center rounded px-1 text-xs font-medium transition-colors touch-manipulation',
            locale === code
              ? 'bg-background text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
