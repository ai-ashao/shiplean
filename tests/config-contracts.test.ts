import { describe, expect, it } from 'vitest'
import { validateLegalProfile } from '@/lib/legal'
import {
  siteNavigation,
  validateSiteNavigation,
  validateToolSiteNavigation,
} from '@/lib/site-navigation'
import { validateToolLandingConfig } from '@/lib/tool-landing-validation'
import { validateToolRegistry } from '@/lib/tool-registry'
import { legalProfile } from '@/modules/legal-profile'
import { toolReferenceConfigs } from '@/modules/tool-reference-configs'
import { toolRegistry } from '@/modules/tool-registry'

describe('real configuration contracts', () => {
  it('keeps the checked-in legal profile structurally valid', () => {
    expect(validateLegalProfile(legalProfile)).toEqual([])
  })

  it('keeps the checked-in site navigation internally valid', () => {
    expect(validateSiteNavigation(siteNavigation, toolRegistry)).toEqual([])
  })

  it('keeps the checked-in Tool Registry internally valid', () => {
    expect(validateToolRegistry(toolRegistry)).toEqual([])
  })

  it('keeps every checked-in Tool Landing reference config valid', () => {
    for (const config of toolReferenceConfigs) {
      expect(validateToolLandingConfig(config, toolRegistry)).toEqual([])
    }
  })

  it('provides a stricter validator for Tool-site product repositories', () => {
    expect(
      validateToolSiteNavigation(
        {
          guidesPlacement: 'header',
          header: {
            links: ['tools', 'guides'],
            toolsHref: { en: '/tools' },
          },
          footer: {
            toolGroups: [],
            secondaryPages: ['about', 'contact', 'privacy', 'terms'],
          },
        },
        [],
      ),
    ).toEqual([])

    expect(validateToolSiteNavigation(siteNavigation, toolRegistry)).toEqual(
      expect.arrayContaining([
        'Tool-site Header must include Tools.',
        'Tool-site Header must not retain the starter Workflow link.',
      ]),
    )
  })
})
