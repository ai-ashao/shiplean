import type { Locale } from '@/i18n/config'
import { productHomeMessages } from '@/i18n/product-home-messages'
import { productConfig } from '@/lib/product-config'
import { localizedPageHead } from '@/lib/seo'
import { SaasStarterHome } from './saas-starter-home'
import { ToolStarterHome } from './tool-starter-home'

export function ProductHome({ locale }: Readonly<{ locale: Locale }>) {
  return productConfig.mode === 'tool' ? (
    <ToolStarterHome locale={locale} />
  ) : (
    <SaasStarterHome locale={locale} />
  )
}

export function productHomeHead(locale: Locale) {
  const meta = productHomeMessages[locale].meta
  const title = productConfig.mode === 'tool' ? meta.toolTitle : meta.saasTitle
  const description = productConfig.mode === 'tool' ? meta.toolDescription : meta.saasDescription

  return localizedPageHead({
    pageId: 'home',
    locale,
    title,
    description,
  })
}
