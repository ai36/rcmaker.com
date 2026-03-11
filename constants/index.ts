export const PROJECT_NAME = process.env.NEXT_PUBLIC_PROJECT_NAME ?? 'RC Maker'
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? ''
export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? ''

export const SITE_URL = 'https://rcmaker.com'
export const SITE_DESCRIPTION =
  'Quickly generate customizable React components using your own templates. A VS Code extension for developers.'

export const NAV_ITEMS = [
  { labelKey: 'docs', href: '/docs' },
  { labelKey: 'changelog', href: '/changelog' },
  { labelKey: 'roadmap', href: '/roadmap' },
] as const

export const SIDEBAR_ITEMS = [
  {
    titleKey: 'gettingStarted',
    items: [
      { labelKey: 'introduction', href: '/docs', headingText: { en: '', ru: '' } },
      { labelKey: 'features', href: '/docs', headingText: { en: '✨ Features', ru: '✨ Возможности' } },
      { labelKey: 'howToUse', href: '/docs', headingText: { en: '🚀 How to Use', ru: '🚀 Как использовать' } },
    ],
  },
  {
    titleKey: 'configuration',
    items: [
      { labelKey: 'settings', href: '/docs', headingText: { en: '⚙️ Configuration', ru: '⚙️ Настройки' } },
      { labelKey: 'projectConfig', href: '/docs', headingText: { en: 'Project file settings', ru: 'Локальная конфигурация' } },
      { labelKey: 'templateFolder', href: '/docs', headingText: { en: '📂 Template Folder', ru: '📂 Папка шаблонов' } },
    ],
  },
  {
    titleKey: 'templates',
    items: [
      { labelKey: 'availableLiterals', href: '/docs', headingText: { en: 'Available Literals', ru: 'Доступные переменные' } },
      { labelKey: 'fileFolderNames', href: '/docs', headingText: { en: '📁 File and Folder Names', ru: '📁 Названия файлов и папок' } },
      { labelKey: 'nameFormats', href: '/docs', headingText: { en: '🔤 Name Formats', ru: '🔤 Форматы имени' } },
    ],
  },
  {
    titleKey: 'more',
    items: [
      { labelKey: 'changelog', href: '/changelog', headingText: { en: '', ru: '' } },
      { labelKey: 'roadmap', href: '/roadmap', headingText: { en: '', ru: '' } },
    ],
  },
] as const

export const EXTERNAL_LINKS = {
  marketplace:
    process.env.NEXT_PUBLIC_MARKETPLACE_URL ?? 'https://marketplace.visualstudio.com/items?itemName=ai36.react-component-maker',
  github: process.env.NEXT_PUBLIC_GITHUB_URL ?? 'https://github.com/ai36/react-component-maker',
} as const
