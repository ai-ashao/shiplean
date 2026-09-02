import type { ToolLandingConfig } from '@/components/tool-landing/types'
import { pageHead } from './seo'

export function toolPageHead(config: Pick<ToolLandingConfig, 'seo'>) {
  return pageHead({
    title: config.seo.title,
    description: config.seo.description,
    path: config.seo.path,
  })
}
