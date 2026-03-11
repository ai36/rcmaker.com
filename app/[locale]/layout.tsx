import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { ThemeProvider } from '@/components/ThemeProvider'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { PROJECT_NAME, SITE_DESCRIPTION, SITE_URL } from '@/constants'
import { ogLocale } from '@/lib/metadata'
import { routing } from '@/i18n/routing'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return {
    title: {
      default: PROJECT_NAME,
      template: `%s — ${PROJECT_NAME}`,
    },
    description: SITE_DESCRIPTION,
    metadataBase: new URL(SITE_URL),
    openGraph: {
      title: PROJECT_NAME,
      description: SITE_DESCRIPTION,
      url: SITE_URL,
      siteName: PROJECT_NAME,
      type: 'website',
      locale: ogLocale(locale),
    },
    twitter: {
      card: 'summary_large_image',
      title: PROJECT_NAME,
      description: SITE_DESCRIPTION,
    },
  }
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const messages = await getMessages()

  return (
    <NextIntlClientProvider messages={messages}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <SiteHeader />
        {children}
      </ThemeProvider>
    </NextIntlClientProvider>
  )
}
