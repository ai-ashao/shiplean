import type { Locale } from '@/i18n/config'
import {
  hreflangAlternates,
  isPublicPageIndexable,
  localizedPath,
  type PublicPageId,
} from '@/i18n/routes'
import { absoluteUrl, site } from './site'

export function pageHead(input: {
  title: string
  description: string
  path: string
  alternates?: ReadonlyArray<{ locale: string; path: string }>
  indexable?: boolean
}) {
  const title = input.title === site.name ? site.name : `${input.title} · ${site.name}`
  const canonical = absoluteUrl(input.path)

  return {
    meta: [
      { title },
      { name: 'description', content: input.description },
      { property: 'og:title', content: title },
      { property: 'og:description', content: input.description },
      { property: 'og:url', content: canonical },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
      ...(input.indexable === false ? [{ name: 'robots', content: 'noindex,nofollow' }] : []),
    ],
    links: [
      { rel: 'canonical', href: canonical },
      ...(input.alternates || []).map((alternate) => ({
        rel: 'alternate',
        hrefLang: alternate.locale,
        href: absoluteUrl(alternate.path),
      })),
    ],
  }
}

export function localizedPageHead(input: {
  pageId: PublicPageId
  locale: Locale
  title: string
  description: string
}) {
  const path = localizedPath(input.pageId, input.locale)
  if (!path) throw new Error(`Missing ${input.locale} route for ${input.pageId}`)

  return pageHead({
    title: input.title,
    description: input.description,
    path,
    alternates: hreflangAlternates(input.pageId),
    indexable: isPublicPageIndexable(input.pageId),
  })
}
