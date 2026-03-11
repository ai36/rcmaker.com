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
  const t = await getTranslations({ locale, namespace: 'Changelog' })
  return {
    title: t('metaTitle'),
    alternates: pageAlternates(locale, '/changelog'),
  }
}

export default async function ChangelogPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const content = readMarkdownFile(`content/${locale}/CHANGELOG.md`)
  return (
    <DocLayout>
      <MarkdownContent content={content} />
    </DocLayout>
  )
}
