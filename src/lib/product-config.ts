export type ProductMode = 'saas' | 'tool'
export type ProductSurface = 'pricing' | 'app'

export type ProductConfig = {
  mode: ProductMode
  brand: {
    name: string
    mark: string
    description: string
  }
  starter: {
    showPreviewBanner: boolean
  }
  /**
   * Optional surface overrides.
   *
   * By default SaaS enables Pricing + App, while Tool disables both.
   * Use an explicit override only when the real product requires a different boundary,
   * such as a paid Tool site that needs a Pricing page.
   */
  surfaces?: Partial<Record<ProductSurface, boolean>>
}

/**
 * ShipLean's runtime is a product template, not the ShipLean marketing website.
 * Change this file first when adapting the repository into a real product.
 */
export const productConfig: ProductConfig = {
  mode: 'saas',
  brand: {
    name: 'Starter Product',
    mark: 'SP',
    description:
      'A focused product starter with typed routes, shared UI, and repository-wide verification.',
  },
  starter: {
    showPreviewBanner: true,
  },
}

export function productSurfaceEnabled(
  surface: ProductSurface,
  config: ProductConfig = productConfig,
): boolean {
  return config.surfaces?.[surface] ?? config.mode === 'saas'
}

export function validateProductConfig(config: ProductConfig): ReadonlyArray<string> {
  const issues: string[] = []

  if (!config.brand.name.trim()) issues.push('Product brand name is required.')
  if (!config.brand.description.trim()) issues.push('Product brand description is required.')

  const markLength = [...config.brand.mark.trim()].length
  if (markLength < 1 || markLength > 3) {
    issues.push('Product brand mark must contain 1–3 visible characters.')
  }

  return issues
}

export function surfaceModeForPath(pathname: string): ProductMode {
  if (pathname.startsWith('/tool-reference')) return 'tool'
  return productConfig.mode
}
