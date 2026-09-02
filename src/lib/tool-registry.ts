import type { Locale } from '@/i18n/config'

export type ToolRegistryLocalization = {
  label: string
  href: string
  description?: string
}

export type ToolRegistryItem = {
  id: string
  label: string
  href: string
  description?: string
  tags?: ReadonlyArray<string>
  status: 'live' | 'planned'
  localizations?: Partial<Record<Locale, ToolRegistryLocalization>>
}

export type ResolvedToolRegistryItem = Omit<ToolRegistryItem, 'localizations'> & {
  label: string
  href: string
  description?: string
}

export function assertUniqueToolRegistry(registry: ReadonlyArray<ToolRegistryItem>) {
  const seen = new Set<string>()

  for (const tool of registry) {
    if (seen.has(tool.id)) {
      throw new Error(`Duplicate tool registry id: ${tool.id}`)
    }
    seen.add(tool.id)
  }
}

export function resolveToolPresentation(
  tool: ToolRegistryItem,
  locale: Locale,
): ResolvedToolRegistryItem {
  const localized = tool.localizations?.[locale]

  return {
    id: tool.id,
    label: localized?.label ?? tool.label,
    href: localized?.href ?? tool.href,
    description: localized?.description ?? tool.description,
    tags: tool.tags,
    status: tool.status,
  }
}

export function resolveRelatedTools(input: {
  registry: ReadonlyArray<ToolRegistryItem>
  currentToolId: string
  requestedIds?: ReadonlyArray<string>
  maxItems?: number
}) {
  const { registry, currentToolId, requestedIds, maxItems = 6 } = input
  assertUniqueToolRegistry(registry)

  const live = registry.filter((tool) => tool.status === 'live' && tool.id !== currentToolId)

  if (requestedIds && requestedIds.length > 0) {
    const byId = new Map(live.map((tool) => [tool.id, tool]))
    return requestedIds
      .map((id) => byId.get(id))
      .filter((tool): tool is ToolRegistryItem => Boolean(tool))
      .slice(0, maxItems)
  }

  const current = registry.find((tool) => tool.id === currentToolId)
  const currentTags = new Set(current?.tags ?? [])

  return [...live]
    .map((tool) => ({
      tool,
      score: (tool.tags ?? []).reduce((total, tag) => total + (currentTags.has(tag) ? 1 : 0), 0),
    }))
    .sort((a, b) => b.score - a.score || a.tool.label.localeCompare(b.tool.label))
    .slice(0, maxItems)
    .map(({ tool }) => tool)
}
