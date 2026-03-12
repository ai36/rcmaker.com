'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { CONSENT_COOKIE, type ConsentValue, readCookie, writeCookie } from '@/lib/consent'

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void
  }
}

function updateGtagConsent(value: ConsentValue) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('consent', 'update', { analytics_storage: value })
  }
}

export function ConsentBanner() {
  const t = useTranslations('Consent')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const stored = readCookie(CONSENT_COOKIE) as ConsentValue | undefined
    if (!stored) {
      setVisible(true)
    } else {
      updateGtagConsent(stored)
    }
  }, [])

  function accept() {
    writeCookie(CONSENT_COOKIE, 'granted')
    updateGtagConsent('granted')
    setVisible(false)
  }

  function decline() {
    writeCookie(CONSENT_COOKIE, 'denied')
    updateGtagConsent('denied')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 flex justify-center">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full max-w-2xl rounded-xl border border-border bg-background/95 backdrop-blur-sm shadow-lg px-5 py-4">
        <p className="flex-1 text-sm text-muted-foreground leading-relaxed">
          {t('message')}
        </p>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={decline}
            className="px-4 py-1.5 text-sm rounded-md border border-border text-muted-foreground hover:text-foreground hover:bg-accent transition-colors touch-manipulation"
          >
            {t('decline')}
          </button>
          <button
            onClick={accept}
            className="px-4 py-1.5 text-sm rounded-md bg-foreground text-background hover:opacity-90 transition-opacity touch-manipulation font-medium"
          >
            {t('accept')}
          </button>
        </div>
      </div>
    </div>
  )
}
