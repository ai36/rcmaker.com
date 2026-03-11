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
  const t = await getTranslations({ locale, namespace: 'Docs' })
  return {
    title: t('metaTitle'),
    description: t('metaDesc'),
    alternates: pageAlternates(locale, '/docs'),
  }
}

export default async function DocsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const content = readMarkdownFile(`content/${locale}/README.md`)
  return (
    <DocLayout>
      <MarkdownContent content={content} />
    </DocLayout>
  )
}
