import { describe, expect, it } from 'vitest'
import type { ToolLandingConfig } from '@/components/tool-landing'
import { toolPageHead } from '@/lib/tool-seo'

const config: ToolLandingConfig = {
  version: '0.1',
  preset: 'tool-default',
  toolId: 'example-tool',
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

describe('toolPageHead', () => {
  it('uses ToolLandingConfig SEO as the route metadata source', () => {
    const head = toolPageHead(config)

    expect(head.meta).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'description', content: config.seo.description }),
      ]),
    )
    expect(head.links).toEqual(
      expect.arrayContaining([expect.objectContaining({ rel: 'canonical' })]),
    )
  })
})
