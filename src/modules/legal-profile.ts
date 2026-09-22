import { publicEnv } from '@/lib/config/env'
import { defaultSupportEmailForSite, defineLegalProfile, legalTemplateVersion } from '@/lib/legal'
import { site } from '@/lib/site'

const starterFallbackSiteUrl = 'https://starter.invalid'
const analytics = publicEnv.ga4Id
  ? {
      name: 'Google Analytics 4',
      purpose: 'aggregated product usage measurement',
    }
  : false

export const legalProfile = defineLegalProfile({
  templateVersion: legalTemplateVersion,
  templateKind: 'free-local-tool',
  reviewStatus: 'starter',
  productName: site.name,
  siteUrl: site.url,
  contactEmail: defaultSupportEmailForSite(site.url, {
    fallbackSiteUrl: starterFallbackSiteUrl,
  }),
  lastUpdated: '2026-09-22',
  features: {
    analytics,
  },
  privacy: {
    localProcessing:
      'Supported tool inputs are processed in your browser and are not intentionally uploaded to our servers for processing.',
    technicalData:
      'Hosting and security providers may process ordinary request information, such as IP address, browser details, timestamps, and requested URLs, to deliver and protect the site. If you contact us, we receive the information you choose to send.',
    browserStorage: ['An analytics consent preference stored in local browser storage.'],
    serviceProviders: [
      {
        name: 'Cloudflare',
        purpose: 'website hosting, request delivery, security, and operational infrastructure',
      },
    ],
  },
})
