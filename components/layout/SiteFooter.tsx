import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import { NAV_ITEMS, EXTERNAL_LINKS } from '@/constants'

export async function SiteFooter() {
  const t = await getTranslations()

  return (
    <footer className="mt-auto border-t border-border bg-muted/30">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 font-semibold text-foreground">
              <Image src="/logo.svg" alt="React Component Maker" width={32} height={32} className="shrink-0" />
              React Component Maker
            </div>
            <p className="mt-1.5 text-xs text-muted-foreground">
              {t('Footer.tagline')}
            </p>
          </div>

          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-foreground transition-colors touch-manipulation"
              >
                {t(`Nav.${item.labelKey}`)}
              </Link>
            ))}
            <Separator orientation="vertical" className="h-4 hidden sm:block" />
            <a
              href={EXTERNAL_LINKS.marketplace}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors touch-manipulation"
            >
              {t('Nav.marketplace')}
            </a>
            <a
              href={EXTERNAL_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors touch-manipulation"
            >
              GitHub
            </a>
          </nav>
        </div>

        <Separator className="my-6" />

        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} React Component Maker. {t('Footer.copyright')}
        </p>
      </div>
    </footer>
  )
}
