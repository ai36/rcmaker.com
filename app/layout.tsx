import { Geist, Geist_Mono } from 'next/font/google'
import { getLocale } from 'next-intl/server'
import { GoogleAnalytics } from '@next/third-parties/google'
import './globals.css'
import { Developer } from '@/components/developer/Developer'
import { GA_ID } from '@/constants'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale()
  return (
    <html lang={locale} suppressHydrationWarning className="scroll-smooth">
      <head>
        <meta name="google-site-verification" content="9m21iS8l66LT5GGhFN_-H8hHEkP-f4ekCkIpCaqUs9I" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        {/* GA Consent Mode v2 — must run before gtag.js loads (afterInteractive) */}
        <script dangerouslySetInnerHTML={{ __html: `
          window.dataLayer=window.dataLayer||[];
          window.dataLayer.push(['consent','default',{analytics_storage:'granted',wait_for_update:1500}]);
        `}} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <Developer />
        {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
      </body>
    </html>
  )
}
