import en from './messages/en.json'

declare module 'next-intl' {
  interface IntlMessages extends typeof en {}
}
