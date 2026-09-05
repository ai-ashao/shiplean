import { describe, expect, it } from 'vitest'
import {
  type ProductConfig,
  productConfig,
  productSurfaceEnabled,
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

  it('uses mode-aware defaults for Pricing and App surfaces', () => {
    const saasConfig = { ...productConfig, mode: 'saas' } satisfies ProductConfig
    const toolConfig = { ...productConfig, mode: 'tool' } satisfies ProductConfig

    expect(productSurfaceEnabled('pricing', saasConfig)).toBe(true)
    expect(productSurfaceEnabled('app', saasConfig)).toBe(true)
    expect(productSurfaceEnabled('pricing', toolConfig)).toBe(false)
    expect(productSurfaceEnabled('app', toolConfig)).toBe(false)
  })

  it('supports explicit surface overrides for paid or account-backed tool products', () => {
    const paidTool = {
      ...productConfig,
      mode: 'tool',
      surfaces: {
        pricing: true,
        app: false,
      },
    } satisfies ProductConfig

    expect(productSurfaceEnabled('pricing', paidTool)).toBe(true)
    expect(productSurfaceEnabled('app', paidTool)).toBe(false)
  })

  it('removes disabled SaaS surfaces from navigation', () => {
    const publicOnlySaas = {
      ...productConfig,
      mode: 'saas',
      surfaces: {
        pricing: false,
        app: false,
      },
    } satisfies ProductConfig

    const navigation = siteNavigationForMode('saas', publicOnlySaas)
    expect(navigation.header.links).not.toContain('pricing')
    expect(navigation.header.cta).toBeUndefined()
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
