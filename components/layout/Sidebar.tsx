'use client'

import { useTranslations, useLocale } from 'next-intl'
import { Link, usePathname } from '@/i18n/navigation'
import { SIDEBAR_ITEMS } from '@/constants'
import { slugHash } from '@/lib/slugHash'
import { cn } from '@/lib/utils'

export function Sidebar() {
  const pathname = usePathname()
  const t = useTranslations('Sidebar')
  const locale = useLocale()

  return (
    <aside className="hidden md:flex flex-col w-60 shrink-0 sticky top-14 self-start h-[calc(100vh-3.5rem)] border-r border-border/40 overflow-y-auto py-6 px-4">
      <nav className="flex flex-col gap-6">
        {SIDEBAR_ITEMS.map((section) => (
          <div key={section.titleKey}>
            <p className="mb-1 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {t(section.titleKey)}
            </p>
            <ul className="flex flex-col gap-0.5">
              {section.items.map((item) => {
                const text = item.headingText[locale as 'en' | 'ru'] ?? item.headingText.en
                const hash = slugHash(text)
                const anchor = hash ? `#${hash}` : ''
                const isActive = pathname === item.href && !anchor
                const cls = cn(
                  'flex items-center px-2 py-1.5 text-sm rounded-md transition-colors touch-manipulation',
                  isActive
                    ? 'bg-accent text-foreground font-medium'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                )
                return (
                  <li key={item.labelKey}>
                    {anchor ? (
                      <a href={`${item.href}${anchor}`} className={cls}>
                        {t(item.labelKey)}
                      </a>
                    ) : (
                      <Link href={item.href} aria-current={isActive ? 'page' : undefined} className={cls}>
                        {t(item.labelKey)}
                      </Link>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  )
}
