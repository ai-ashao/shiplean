import { describe, expect, it } from 'vitest'
import {
  findToolRouteByPath,
  resolveRelatedTools,
  type ToolRegistryItem,
  toolHreflangAlternates,
  toolLocaleAlternatesForPath,
  toolSitemapPaths,
  validateToolRegistry,
} from '@/lib/tool-registry'

const registry = [
  {
    id: 'current',
    label: 'Current Tool',
    href: '/current',
    tags: ['image', 'resize'],
    status: 'live',
    localizations: {
      'zh-CN': { label: '当前工具', href: '/zh/current' },
    },
  },
  {
    id: 'closest',
    label: 'Closest Tool',
    href: '/closest',
    tags: ['image', 'resize'],
    status: 'live',
    localizations: {
      'zh-CN': { label: '最相关工具', href: '/zh/closest' },
    },
  },
  {
    id: 'other',
    label: 'Other Tool',
    href: '/other',
    tags: ['text'],
    status: 'live',
  },
  {
    id: 'planned',
    label: 'Planned Tool',
    href: '/planned',
    tags: ['image', 'resize'],
    status: 'planned',
  },
] satisfies ReadonlyArray<ToolRegistryItem>

describe('tool registry', () => {
  it('resolves explicitly requested live tools in the requested locale', () => {
    const related = resolveRelatedTools({
      registry,
      currentToolId: 'current',
      requestedIds: ['closest', 'planned', 'missing'],
      locale: 'zh-CN',
    })
    expect(related.map((tool) => tool.id)).toEqual(['closest'])
    expect(related[0]?.label).toBe('最相关工具')
    expect(related[0]?.href).toBe('/zh/closest')
  })

  it('falls back to tag relevance when explicit ids are absent', () => {
    expect(
      resolveRelatedTools({ registry, currentToolId: 'current' }).map((tool) => tool.id),
    ).toEqual(['closest', 'other'])
  })

  it('rejects duplicate registry ids', () => {
    expect(validateToolRegistry([...registry, registry[0] as ToolRegistryItem])).toContain(
      'Duplicate tool registry id: current',
    )
  })

  it('uses localized routes for switching, hreflang, and sitemap', () => {
    expect(findToolRouteByPath(registry, '/zh/current')).toMatchObject({
      locale: 'zh-CN',
      path: '/zh/current',
    })

    expect(toolLocaleAlternatesForPath(registry, '/current')).toEqual([
      expect.objectContaining({ locale: 'zh-CN', path: '/zh/current' }),
    ])

    expect(toolHreflangAlternates(registry, 'current')).toEqual([
      { locale: 'en', path: '/current' },
      { locale: 'zh-CN', path: '/zh/current' },
      { locale: 'x-default', path: '/current' },
    ])

    expect(toolSitemapPaths(registry)).toEqual(
      expect.arrayContaining(['/current', '/zh/current', '/closest', '/zh/closest', '/other']),
    )
    expect(toolSitemapPaths(registry)).not.toContain('/planned')
  })
})
