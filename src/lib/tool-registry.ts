export type ToolRegistryItem = {
  id: string
  label: string
  href: string
  description?: string
  tags?: ReadonlyArray<string>
  status: 'live' | 'planned'
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
