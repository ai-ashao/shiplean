import type { ToolLandingConfig } from '@/components/tool-landing/types'
import { defaultLocale } from '@/i18n/config'
import { validateEnglishToolMessaging } from './tool-messaging'
import type { ToolRegistryItem } from './tool-registry'

function duplicates(values: ReadonlyArray<string>): ReadonlyArray<string> {
  const seen = new Set<string>()
  const duplicateValues = new Set<string>()
  for (const value of values) {
    if (seen.has(value)) duplicateValues.add(value)
    seen.add(value)
  }
  return [...duplicateValues]
}

export function validateToolLandingConfig(
  config: ToolLandingConfig,
  registry: ReadonlyArray<ToolRegistryItem> = [],
): ReadonlyArray<string> {
  const issues: string[] = []

  if (!config.seo.path.startsWith('/')) {
    issues.push('Tool SEO path must be an absolute site path starting with "/".')
  }

  if (config.version === '0.2') {
    const highlights = config.completion?.highlights ?? []
    if (highlights.length < 3 || highlights.length > 5) {
      issues.push('Tool Landing v0.2 requires 3–5 completion highlights.')
    }
    for (const duplicate of duplicates(highlights)) {
      issues.push(`Duplicate completion highlight: ${duplicate}`)
    }
    if (config.features) {
      issues.push('Tool Landing v0.2 must use capabilities instead of deprecated features.')
    }
  }

  if (config.capabilities) {
    for (const duplicateId of duplicates(config.capabilities.items.map((item) => item.id))) {
      issues.push(`Duplicate capability id: ${duplicateId}`)
    }
  }

  if (config.breadcrumbs && config.breadcrumbs.length > 1) {
    const current = config.breadcrumbs.at(-1)
    if (current?.href !== config.seo.path) {
      issues.push('The current breadcrumb href must match the Tool Landing SEO path.')
    }
  }

  if (config.structuredData?.enableFaq && !config.faq?.items.length) {
    issues.push('FAQ structured data requires visible FAQ content.')
  }

  if (
    config.structuredData?.enableBreadcrumbs &&
    (!config.breadcrumbs || config.breadcrumbs.length < 2)
  ) {
    issues.push('Breadcrumb structured data requires visible breadcrumbs.')
  }

  if (config.relatedTools) {
    const ids = config.relatedTools.toolIds
    if (ids.includes(config.toolId)) {
      issues.push('Related Tools must not include the current tool id.')
    }
    for (const duplicateId of duplicates(ids)) {
      issues.push(`Duplicate Related Tool id: ${duplicateId}`)
    }

    if (registry.length > 0) {
      const byId = new Map(registry.map((tool) => [tool.id, tool]))
      for (const id of ids) {
        const tool = byId.get(id)
        if (!tool) issues.push(`Unknown Related Tool id: ${id}`)
        else if (tool.status !== 'live') issues.push(`Related Tool ${id} is not live.`)
      }
    }
  }

  const locale = config.locale ?? defaultLocale
  if (locale === 'en') {
    issues.push(
      ...validateEnglishToolMessaging({
        heroDescription: config.hero.description,
        seoTitle: config.seo.title,
        seoDescription: config.seo.description,
        experience: config.experience,
      }),
    )
  }

  return issues
}
