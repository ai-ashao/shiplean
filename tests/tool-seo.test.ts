import { describe, expect, it } from 'vitest'
import type { ToolLandingConfig } from '@/components/tool-landing'
import type { ToolRegistryItem } from '@/lib/tool-registry'
import { toolPageHead } from '@/lib/tool-seo'

const config: ToolLandingConfig = {
  version: '0.1',
  preset: 'tool-default',
  toolId: 'example-tool',
  locale: 'en',
  seo: {
    title: 'Example Tool - Free Online Tool',
    description: 'Free online example tool. No installation or signup required.',
    path: '/example-tool',
  },
  hero: {
    title: 'Example Tool',
    description: 'Free online example tool. No installation or signup required.',
  },
  experience: {
    free: true,
    online: true,
    installationRequired: false,
    signupRequired: false,
    processing: 'local',
  },
}

const registry = [
  {
    id: 'example-tool',
    label: 'Example Tool',
    href: '/example-tool',
    status: 'live',
    localizations: {
      'zh-CN': { label: '示例工具', href: '/zh/example-tool' },
    },
  },
] satisfies ReadonlyArray<ToolRegistryItem>

describe('toolPageHead', () => {
  it('uses ToolLandingConfig SEO and Tool Registry alternates', () => {
    const head = toolPageHead(config, registry)

    expect(head.meta).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'description', content: config.seo.description }),
      ]),
    )
    expect(head.links).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ rel: 'canonical' }),
        expect.objectContaining({ rel: 'alternate', hrefLang: 'en' }),
        expect.objectContaining({ rel: 'alternate', hrefLang: 'zh-CN' }),
        expect.objectContaining({ rel: 'alternate', hrefLang: 'x-default' }),
      ]),
    )
  })

  it('does not fabricate alternates for an unregistered route', () => {
    const head = toolPageHead({ ...config, toolId: 'not-registered' }, registry)
    expect(head.links.filter((link) => link.rel === 'alternate')).toHaveLength(0)
  })
})
