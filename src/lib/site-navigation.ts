import type { Locale } from '@/i18n/config'
import { resolveToolPresentation, type ToolRegistryItem } from './tool-registry'

export type GuidesPlacement = 'header' | 'footer' | 'none'

export type HeaderLinkId = 'home' | 'workflow' | 'tools' | 'guides' | 'pricing'

export type LocalizedValue = Partial<Record<Locale, string>>

export type FooterToolGroupConfig = {
  id: string
  title: LocalizedValue
  toolIds: ReadonlyArray<string>
  maxItems?: number
  viewMore?: {
    label: LocalizedValue
    href: LocalizedValue
  }
}

export type FooterSecondaryPageId = 'about' | 'contact' | 'privacy' | 'terms'

export type FooterCustomLink = {
  id: string
  label: LocalizedValue
  href: LocalizedValue
}

export type SiteNavigationConfig = {
  guidesPlacement: GuidesPlacement
  header: {
    links: ReadonlyArray<HeaderLinkId>
    toolsHref?: LocalizedValue
  }
  footer: {
    toolGroups: ReadonlyArray<FooterToolGroupConfig>
    secondaryPages: ReadonlyArray<FooterSecondaryPageId>
    customLinks?: ReadonlyArray<FooterCustomLink>
  }
}

/**
 * The template keeps its starter marketing navigation until a coding agent
 * converts the downloaded repository into a tool product.
 *
 * Recommended tool-site variants:
 *
 * Small catalog:
 *   header.links = ['tools', 'guides']
 *   guidesPlacement = 'header'
 *
 * Large catalog:
 *   header.links = ['tools']
 *   guidesPlacement = 'footer'
 */
export const siteNavigation: SiteNavigationConfig = {
  guidesPlacement: 'header',
  header: {
    links: ['home', 'workflow', 'guides', 'pricing'],
  },
  footer: {
    toolGroups: [],
    secondaryPages: ['about', 'contact', 'privacy', 'terms'],
  },
}

export type ResolvedFooterToolGroup = {
  id: string
  title: string
  tools: ReadonlyArray<ReturnType<typeof resolveToolPresentation>>
  viewMore?: {
    label: string
    href: string
  }
}

export function localizedNavigationValue(
  value: LocalizedValue,
  locale: Locale,
): string | undefined {
  return value[locale] ?? value.en ?? Object.values(value)[0]
}

export function resolveFooterToolGroups(input: {
  config: SiteNavigationConfig
  registry: ReadonlyArray<ToolRegistryItem>
  locale: Locale
}): ReadonlyArray<ResolvedFooterToolGroup> {
  const { config, registry, locale } = input
  const byId = new Map(registry.map((tool) => [tool.id, tool]))

  return config.footer.toolGroups.slice(0, 4).flatMap((group) => {
    const title = localizedNavigationValue(group.title, locale)
    if (!title) return []

    const limit = Math.min(Math.max(group.maxItems ?? 6, 1), 6)
    const tools = group.toolIds
      .map((id) => byId.get(id))
      .filter((tool): tool is ToolRegistryItem => Boolean(tool))
      .filter((tool) => tool.status === 'live')
      .slice(0, limit)
      .map((tool) => resolveToolPresentation(tool, locale))

    const viewMoreLabel = group.viewMore
      ? localizedNavigationValue(group.viewMore.label, locale)
      : undefined
    const viewMoreHref = group.viewMore
      ? localizedNavigationValue(group.viewMore.href, locale)
      : undefined

    if (tools.length === 0 && !(viewMoreLabel && viewMoreHref)) return []

    return [
      {
        id: group.id,
        title,
        tools,
        ...(viewMoreLabel && viewMoreHref
          ? {
              viewMore: {
                label: viewMoreLabel,
                href: viewMoreHref,
              },
            }
          : {}),
      },
    ]
  })
}

export function validateSiteNavigation(config: SiteNavigationConfig): ReadonlyArray<string> {
  const issues: string[] = []
  const headerHasGuides = config.header.links.includes('guides')

  if (config.guidesPlacement === 'header' && !headerHasGuides) {
    issues.push('Guides placement is header but the header links do not include guides.')
  }

  if (config.guidesPlacement !== 'header' && headerHasGuides) {
    issues.push('Guides must not appear in the header when placement is footer or none.')
  }

  if (config.header.links.includes('tools') && !config.header.toolsHref) {
    issues.push('Header includes tools but no toolsHref is configured.')
  }

  if (config.footer.toolGroups.length > 4) {
    issues.push('Footer tool directory supports at most four default groups.')
  }

  for (const group of config.footer.toolGroups) {
    if ((group.maxItems ?? 6) > 6) {
      issues.push(`Footer group ${group.id} must not show more than six tool links.`)
    }
  }

  return issues
}
