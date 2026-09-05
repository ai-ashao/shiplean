import { describe, expect, it } from 'vitest'
import {
  type ProductConfig,
  productConfig,
  surfaceModeForPath,
  validateProductConfig,
} from '@/lib/product-config'
import {
  saasSiteNavigation,
  siteNavigationForMode,
  toolSiteNavigation,
  validateSaasSiteNavigation,
  validateToolSiteNavigation,
} from '@/lib/site-navigation'

describe('product modes', () => {
  it('keeps the template mode explicit and valid', () => {
    expect(['saas', 'tool']).toContain(productConfig.mode)
    expect(validateProductConfig(productConfig)).toEqual([])
  })

  it('selects a different shell contract for SaaS and Tool modes', () => {
    expect(siteNavigationForMode('saas')).toBe(saasSiteNavigation)
    expect(siteNavigationForMode('tool')).toBe(toolSiteNavigation)
    expect(saasSiteNavigation.header.cta).toBeDefined()
    expect(toolSiteNavigation.header.cta).toBeUndefined()
    expect(validateSaasSiteNavigation(saasSiteNavigation)).toEqual([])
    expect(validateToolSiteNavigation(toolSiteNavigation)).toEqual([])
  })

  it('keeps Tool QA routes on the Tool shell even when the starter defaults to SaaS', () => {
    expect(surfaceModeForPath('/tool-reference')).toBe('tool')
    expect(surfaceModeForPath('/tool-reference-upload')).toBe('tool')
  })

  it('rejects an empty or oversized starter brand', () => {
    const invalid = {
      ...productConfig,
      brand: {
        ...productConfig.brand,
        name: '',
        mark: 'TOOL',
      },
    } satisfies ProductConfig

    expect(validateProductConfig(invalid)).toEqual(
      expect.arrayContaining([
        'Product brand name is required.',
        'Product brand mark must contain 1–3 visible characters.',
      ]),
    )
  })
})
