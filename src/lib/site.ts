import { publicEnv } from './config/env'

export const site = {
  name: 'ShipLean',
  url: publicEnv.siteUrl,
  description:
    'An Agent-ready TanStack Start SaaS scaffold for turning focused product ideas into verified MVPs.',
}

export function absoluteUrl(path = '/') {
  return new URL(path, site.url).toString()
}
