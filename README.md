# rcmaker.com

Marketing and documentation site for the [React Component Maker](https://marketplace.visualstudio.com/items?itemName=ai36.react-component-maker) VS Code extension.

## Tech Stack

- **Next.js 16** — App Router, server components, static generation
- **React 19** — UI
- **TypeScript** — strict mode
- **Tailwind CSS v4** — styling
- **next-intl v4** — i18n (EN / RU), `localePrefix: 'as-needed'`
- **react-markdown** — markdown rendering for docs pages
- **next-themes** — light / dark / system theme

## Project Structure

```
app/
├── layout.tsx              # Root layout (html, fonts, scroll-smooth)
├── robots.ts               # /robots.txt
├── sitemap.ts              # /sitemap.xml
└── [locale]/
    ├── layout.tsx          # Locale layout (header, theme, i18n provider)
    ├── page.tsx            # Home page
    ├── docs/page.tsx       # Documentation
    ├── changelog/page.tsx  # Changelog
    └── roadmap/page.tsx    # Roadmap

components/
├── layout/
│   ├── SiteHeader.tsx      # Adaptive header with mobile drawer
│   ├── Sidebar.tsx         # Docs sidebar with anchor navigation
│   ├── SiteFooter.tsx
│   └── DocLayout.tsx
├── MarkdownContent.tsx     # Markdown renderer with code copy button
├── HeroBeams.tsx
└── ThemeProvider.tsx

content/
├── en/                     # English markdown content
│   ├── README.md           # Docs
│   ├── CHANGELOG.md
│   └── SOON.md             # Roadmap
└── ru/                     # Russian markdown content

messages/
├── en.json                 # English translations
└── ru.json                 # Russian translations

lib/
├── metadata.ts             # pageAlternates(), ogLocale() helpers
├── slugHash.ts             # djb2 hash for heading anchor IDs
├── markdown.ts             # readMarkdownFile()
└── utils.ts                # cn()

constants/
└── index.ts                # NAV_ITEMS, SIDEBAR_ITEMS, EXTERNAL_LINKS, SITE_URL
```

## Localization

The site supports English (default) and Russian via `next-intl` with `localePrefix: 'as-needed'`:

| Locale | URL prefix | Example |
|--------|-----------|---------|
| EN | *(none)* | `https://rcmaker.com/docs` |
| RU | `/ru` | `https://rcmaker.com/ru/docs` |

Translations live in `messages/en.json` and `messages/ru.json`.
Markdown content lives in `content/en/` and `content/ru/`.

## Docs Sidebar Navigation

Sidebar items in `constants/index.ts` use `headingText: { en, ru }` with the exact heading text from the markdown files. The `slugHash()` function (djb2) computes a stable anchor ID from the heading text — the same function is used in both the rehype plugin (sets `id` on headings) and the sidebar (builds `href`). This works for any Unicode text including Cyrillic.

## SEO

Each page exports `generateMetadata` with:
- Localized `title` and `description`
- `alternates.canonical` — locale-specific canonical URL
- `alternates.languages` — hreflang for EN, RU, and `x-default`
- `openGraph.locale` — `en_US` or `ru_RU`
- Twitter card (summary_large_image) — from layout base metadata

## Development

```bash
npm run dev     # start dev server at http://localhost:3000
npm run build   # production build
npm run lint    # ESLint
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_PROJECT_NAME` | Site/product name (default: `RC Maker`) |
| `NEXT_PUBLIC_GA_ID` | Google Analytics measurement ID |
| `NEXT_PUBLIC_API_URL` | API base URL |
| `NEXT_PUBLIC_MARKETPLACE_URL` | VS Code Marketplace URL |
| `NEXT_PUBLIC_GITHUB_URL` | GitHub repository URL |
