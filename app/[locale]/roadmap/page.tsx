import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { DocLayout } from '@/components/layout/DocLayout'
import { MarkdownContent } from '@/components/MarkdownContent'
import { readMarkdownFile } from '@/lib/markdown'
import { pageAlternates } from '@/lib/metadata'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Roadmap' })
  return {
    title: t('metaTitle'),
    alternates: pageAlternates(locale, '/roadmap'),
  }
}

export default async function RoadmapPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const content = readMarkdownFile(`content/${locale}/SOON.md`)
  return (
    <DocLayout>
      <MarkdownContent content={content} />
    </DocLayout>
  )
}
