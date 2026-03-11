import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/lib/button-variants'
import { Separator } from '@/components/ui/separator'
import { EXTERNAL_LINKS, PROJECT_NAME } from '@/constants'
import { pageAlternates, ogLocale } from '@/lib/metadata'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { HeroBeams } from '@/components/HeroBeams'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Hero' })
  const title = `${PROJECT_NAME} — VS Code Extension`
  const description = t('description')
  return {
    title,
    description,
    alternates: pageAlternates(locale, ''),
    openGraph: { title, description, locale: ogLocale(locale) },
  }
}

const FEATURE_ICONS = [
  // Custom Templates
  <svg key="0" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
    <line x1="10" y1="9" x2="8" y2="9"/>
  </svg>,
  // TypeScript & JavaScript
  <svg key="1" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6"/>
    <polyline points="8 6 2 12 8 18"/>
  </svg>,
  // Style Files
  <svg key="2" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>,
  // Index & Type Files
  <svg key="3" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
  </svg>,
  // Unit Tests
  <svg key="4" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 11 12 14 22 4"/>
    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
  </svg>,
  // Naming Styles
  <svg key="5" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20h9"/>
    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
  </svg>,
  // Per-project Config
  <svg key="6" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/>
  </svg>,
  // Right-Click Workflow
  <svg key="7" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
    <line x1="8" y1="21" x2="16" y2="21"/>
    <line x1="12" y1="17" x2="12" y2="21"/>
  </svg>,
]

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations()

  const FEATURES = FEATURE_ICONS.map((icon, i) => ({
    icon,
    title: t(`Features.item${i}Title`),
    desc: t(`Features.item${i}Desc`),
  }))

  const STEPS = [
    { step: '01', title: t('HowItWorks.step0Title'), desc: t('HowItWorks.step0Desc') },
    { step: '02', title: t('HowItWorks.step1Title'), desc: t('HowItWorks.step1Desc') },
    { step: '03', title: t('HowItWorks.step2Title'), desc: t('HowItWorks.step2Desc') },
  ]

  const STATS = [
    t('Hero.stat0'), t('Hero.stat1'), t('Hero.stat2'), t('Hero.stat3'),
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative flex flex-col items-center justify-center px-6 pt-36 pb-36 text-center overflow-hidden">

        {/* ── Background ── */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden>

          <HeroBeams />

          {/* Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.4)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.4)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_70%_60%_at_72%_0%,black_0%,transparent_100%)]" />

          {/* Bottom fade */}
          <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-background to-transparent" />
        </div>

        <Badge variant="secondary" className="mb-6 gap-1.5 px-3 py-1 text-xs font-medium">
          <span className="relative flex size-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-green-500" />
          </span>
          {t('Hero.badge')}
        </Badge>

        <h1 className="max-w-3xl text-5xl sm:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
          {t('Hero.title')}<br />
          <span className="text-muted-foreground">{t('Hero.titleAccent')}</span>
        </h1>

        <p className="mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed">
          {t('Hero.description')}
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a
            href={EXTERNAL_LINKS.marketplace}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ size: 'lg', className: 'min-h-[48px] gap-2 px-6 font-medium' })}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 2 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
            </svg>
            {t('Hero.installBtn')}
          </a>
          <Link
            href="/docs"
            className={buttonVariants({ variant: 'outline', size: 'lg', className: 'min-h-[48px] gap-2 px-6' })}
          >
            {t('Hero.docsBtn')}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </Link>
          <a
            href={EXTERNAL_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ variant: 'ghost', size: 'lg', className: 'min-h-[48px] gap-2 px-6 text-muted-foreground' })}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            {t('Hero.githubBtn')}
          </a>
        </div>

        {/* Mini stats row */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
          {STATS.map((item) => (
            <span key={item} className="flex items-center gap-1.5">
              <svg width="10" height="10" viewBox="0 0 10 10" className="text-muted-foreground/40 shrink-0">
                <polyline points="1.5,5 3.5,7.5 8.5,2.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {item}
            </span>
          ))}
        </div>
      </section>

      <Separator className="opacity-30" />

      {/* ── How it works ─────────────────────────────────── */}
      <section className="px-6 py-20">
        <div className="max-w-5xl mx-auto w-full">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold tracking-tight">{t('HowItWorks.title')}</h2>
            <p className="mt-3 text-muted-foreground">{t('HowItWorks.subtitle')}</p>
          </div>

          <div className="relative grid md:grid-cols-3 gap-6">
            {/* Connecting line (desktop) */}
            <div className="hidden md:block absolute top-8 left-[calc(16.66%+24px)] right-[calc(16.66%+24px)] h-px border-t border-dashed border-border/60" />

            {STEPS.map(({ step, title, desc }) => (
              <div key={step} className="relative flex flex-col items-start rounded-xl border border-border bg-card p-6">
                <div className="mb-5 flex size-10 items-center justify-center rounded-full border-2 border-border bg-background text-sm font-bold text-foreground tabular-nums z-10">
                  {step}
                </div>
                <h3 className="font-semibold text-foreground">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Separator className="opacity-30" />

      {/* ── Features ─────────────────────────────────────── */}
      <section className="px-6 py-20">
        <div className="max-w-5xl mx-auto w-full">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">{t('Features.title')}</h2>
            <p className="mt-3 text-muted-foreground">{t('Features.subtitle')}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FEATURES.map(({ icon, title, desc }) => (
              <div
                key={title}
                className="group relative rounded-xl border border-border bg-card p-5 transition-all hover:border-transparent hover:shadow-md hover:shadow-black/5 overflow-hidden"
              >
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity -z-10 bg-gradient-to-br from-border via-border/50 to-transparent [padding:1px]" />
                <div className="mb-3 flex size-9 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                  {icon}
                </div>
                <h3 className="font-semibold text-sm text-foreground">{title}</h3>
                <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Separator className="opacity-30" />

      {/* ── Config example ────────────────────────────────── */}
      <section className="px-6 py-20">
        <div className="max-w-5xl mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <Badge variant="outline" className="mb-4 text-xs">{t('Config.badge')}</Badge>
            <h2 className="text-3xl font-bold tracking-tight">{t('Config.title')}</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              {t('Config.desc1').split('.rcmakerrc.json')[0]}
              <code className="text-foreground text-sm font-mono bg-muted px-1.5 py-0.5 rounded">.rcmakerrc.json</code>
              {t('Config.desc1').split('.rcmakerrc.json')[1]?.split('package.json')[0]}
              <code className="text-foreground text-sm font-mono bg-muted px-1.5 py-0.5 rounded">package.json</code>
              {t('Config.desc1').split('package.json')[1]}
            </p>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              {t('Config.desc2')}
            </p>
            <div className="mt-6">
              <Link
                href="/docs#project-file-settings"
                className={buttonVariants({ variant: 'outline', size: 'sm', className: 'gap-2' })}
              >
                {t('Config.cta')}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </Link>
            </div>
          </div>

          {/* Code window */}
          <div className="relative">
            <div className="rounded-xl border border-border bg-card overflow-hidden shadow-lg shadow-black/5">
              <div className="flex items-center gap-1.5 px-4 py-3 border-b border-border bg-muted/50">
                <span className="size-2.5 rounded-full bg-border" />
                <span className="size-2.5 rounded-full bg-border" />
                <span className="size-2.5 rounded-full bg-border" />
                <span className="ml-3 text-xs text-muted-foreground font-mono">.rcmakerrc.json</span>
              </div>
              <pre className="p-4 text-sm font-mono leading-relaxed overflow-x-auto">
                <code>
                  <span className="text-muted-foreground">{'{'}</span>{'\n'}
                  {'  '}<span className="text-foreground/70">&quot;useTypeScript&quot;</span><span className="text-muted-foreground">: </span><span className="text-foreground">true</span><span className="text-muted-foreground">,</span>{'\n'}
                  {'  '}<span className="text-foreground/70">&quot;folderNameStyle&quot;</span><span className="text-muted-foreground">: </span><span className="text-foreground/80">&quot;kebab-case&quot;</span><span className="text-muted-foreground">,</span>{'\n'}
                  {'  '}<span className="text-foreground/70">&quot;fileNameStyle&quot;</span><span className="text-muted-foreground">: </span><span className="text-foreground/80">&quot;PascalCase&quot;</span><span className="text-muted-foreground">,</span>{'\n'}
                  {'  '}<span className="text-foreground/70">&quot;createStyleFile&quot;</span><span className="text-muted-foreground">: </span><span className="text-foreground">true</span><span className="text-muted-foreground">,</span>{'\n'}
                  {'  '}<span className="text-foreground/70">&quot;styleExtension&quot;</span><span className="text-muted-foreground">: </span><span className="text-foreground/80">&quot;module.css&quot;</span><span className="text-muted-foreground">,</span>{'\n'}
                  {'  '}<span className="text-foreground/70">&quot;generateIndexFile&quot;</span><span className="text-muted-foreground">: </span><span className="text-foreground">true</span><span className="text-muted-foreground">,</span>{'\n'}
                  {'  '}<span className="text-foreground/70">&quot;indexInComponentFolder&quot;</span><span className="text-muted-foreground">: </span><span className="text-foreground/60">false</span>{'\n'}
                  <span className="text-muted-foreground">{'}'}</span>
                </code>
              </pre>
            </div>
          </div>
        </div>
        </div>
      </section>

      <Separator className="opacity-30" />

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="relative px-6 py-24 text-center overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_80%_at_50%_50%,hsl(var(--primary)/0.05),transparent)]" />

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-border/30 -z-10" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-border/20 -z-10" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full border border-border/10 -z-10" />

        <div className="absolute top-8 left-8 grid grid-cols-3 gap-1.5 opacity-20">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="size-1 rounded-full bg-foreground" />
          ))}
        </div>
        <div className="absolute bottom-8 right-8 grid grid-cols-3 gap-1.5 opacity-20">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="size-1 rounded-full bg-foreground" />
          ))}
        </div>

        <h2 className="text-3xl font-bold tracking-tight">{t('CTA.title')}</h2>
        <p className="mt-4 text-muted-foreground max-w-md mx-auto">{t('CTA.desc')}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href={EXTERNAL_LINKS.marketplace}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ size: 'lg', className: 'min-h-[48px] gap-2 px-8' })}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 2 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
            </svg>
            {t('CTA.installBtn')}
          </a>
          <Link
            href="/docs"
            className={buttonVariants({ variant: 'ghost', size: 'lg', className: 'min-h-[48px] gap-2 px-8 text-muted-foreground' })}
          >
            {t('CTA.docsBtn')}
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
