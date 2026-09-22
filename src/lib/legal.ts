export const legalTemplateVersion = '0.2' as const

export type LegalReviewStatus = 'starter' | 'reviewed'

export type LegalProvider = {
  name: string
  purpose: string
}

export type LegalAnalyticsProfile = LegalProvider

export type LegalFeatureProfile = {
  analytics: false | LegalAnalyticsProfile
}

export type LegalProfile = {
  templateVersion: typeof legalTemplateVersion
  templateKind: 'free-local-tool'
  reviewStatus: LegalReviewStatus
  productName: string
  siteUrl: string
  contactEmail: string
  lastUpdated: string
  features: LegalFeatureProfile
  privacy: {
    localProcessing: string
    technicalData: string
    browserStorage: ReadonlyArray<string>
    serviceProviders: ReadonlyArray<LegalProvider>
  }
}

export type LegalSection = {
  id: string
  title: string
  paragraphs: ReadonlyArray<string>
  items?: ReadonlyArray<string>
}

export type LegalDocument = {
  kind: 'privacy' | 'terms'
  title: string
  description: string
  sections: ReadonlyArray<LegalSection>
}

export function defineLegalProfile<const T extends LegalProfile>(profile: T): T {
  return profile
}

export function defaultSupportEmailForSite(
  siteUrl: string,
  options: Readonly<{ fallbackSiteUrl?: string }> = {},
): string {
  try {
    return supportEmailForPublicSite(siteUrl)
  } catch (error) {
    if (!options.fallbackSiteUrl) throw error
    return supportEmailForPublicSite(options.fallbackSiteUrl)
  }
}

function supportEmailForPublicSite(siteUrl: string): string {
  const hostname = new URL(siteUrl).hostname.toLowerCase().replace(/^www\./, '')
  if (
    !hostname ||
    hostname === 'localhost' ||
    hostname.includes(':') ||
    /^\d+(\.\d+)+$/.test(hostname)
  ) {
    throw new Error('A public domain is required to derive the default support email.')
  }
  return `support@${hostname}`
}

export function validateLegalProfile(
  profile: LegalProfile,
  options: Readonly<{ requireReviewed?: boolean }> = {},
): ReadonlyArray<string> {
  const issues: string[] = []
  const requiredFields = {
    productName: profile.productName,
    siteUrl: profile.siteUrl,
    contactEmail: profile.contactEmail,
    localProcessing: profile.privacy.localProcessing,
    technicalData: profile.privacy.technicalData,
  }

  for (const [field, value] of Object.entries(requiredFields)) {
    if (!value.trim()) issues.push(`Legal profile ${field} is required.`)
    if (/\b(?:todo|tbd|replace me|your company|your product|example\.com)\b/i.test(value)) {
      issues.push(`Legal profile ${field} still contains placeholder copy.`)
    }
  }

  try {
    const url = new URL(profile.siteUrl)
    if (!['http:', 'https:'].includes(url.protocol)) throw new Error('unsupported protocol')
    if (options.requireReviewed && url.protocol !== 'https:') {
      issues.push('Reviewed legal profiles require an HTTPS siteUrl.')
    }
  } catch {
    issues.push('Legal profile siteUrl must be an absolute HTTP(S) URL.')
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.contactEmail)) {
    issues.push('Legal profile contactEmail must be a valid email address.')
  }

  if (!isIsoDate(profile.lastUpdated)) {
    issues.push('Legal profile lastUpdated must use a valid YYYY-MM-DD date.')
  }

  validateList('browserStorage', profile.privacy.browserStorage, issues, { allowEmpty: true })

  const providers = [
    ...profile.privacy.serviceProviders,
    ...(profile.features.analytics ? [profile.features.analytics] : []),
  ]
  for (const provider of providers) {
    if (!provider.name.trim() || !provider.purpose.trim()) {
      issues.push('Every declared legal provider requires a name and purpose.')
    }
  }
  if (profile.features.analytics) {
    const analytics = profile.features.analytics
    if (!analytics.name.trim() || !analytics.purpose.trim()) {
      issues.push('Analytics requires a provider name and purpose.')
    }
  }

  if (options.requireReviewed && profile.reviewStatus !== 'reviewed') {
    issues.push('Legal profile must be reviewed before production launch.')
  }
  return Array.from(new Set(issues))
}

export function buildLegalDocument(
  kind: LegalDocument['kind'],
  profile: LegalProfile,
): LegalDocument {
  return kind === 'privacy' ? buildPrivacyDocument(profile) : buildTermsDocument(profile)
}

export function isLegalProfileLaunchReady(profile: LegalProfile): boolean {
  return validateLegalProfile(profile, { requireReviewed: true }).length === 0
}

function buildPrivacyDocument(profile: LegalProfile): LegalDocument {
  const analyticsParagraph = profile.features.analytics
    ? `${profile.features.analytics.name} is loaded only after you choose to allow analytics and is used for ${profile.features.analytics.purpose}. Analytics is not required to use the tools.`
    : 'Optional analytics is not currently enabled.'
  const providers = uniqueProviders([
    ...profile.privacy.serviceProviders,
    ...(profile.features.analytics ? [profile.features.analytics] : []),
  ])

  return {
    kind: 'privacy',
    title: 'Privacy Policy',
    description: `How ${profile.productName} handles local tool inputs, basic site data, analytics choices, and support messages.`,
    sections: [
      {
        id: 'local-processing',
        title: '1. Local processing',
        paragraphs: [profile.privacy.localProcessing],
      },
      {
        id: 'site-data',
        title: '2. Site data and analytics',
        paragraphs: [profile.privacy.technicalData, analyticsParagraph],
        ...(profile.privacy.browserStorage.length > 0
          ? { items: profile.privacy.browserStorage }
          : {}),
      },
      {
        id: 'third-parties',
        title: '3. Third-party services',
        paragraphs: [
          'Hosting, security, and analytics providers may process limited technical information under their own terms. The site does not sell tool inputs or use them for model training.',
        ],
        items: providers.map((provider) => `${provider.name}: ${provider.purpose}`),
      },
      {
        id: 'choices-contact',
        title: '4. Your choices and contact',
        paragraphs: [
          'You can change optional analytics consent using the control on this page or clear locally stored preferences in your browser.',
          `This policy may be updated as the site changes. For privacy questions, email ${profile.contactEmail}.`,
        ],
      },
    ],
  }
}

function buildTermsDocument(profile: LegalProfile): LegalDocument {
  return {
    kind: 'terms',
    title: 'Terms of Service',
    description: `Simple terms for using the free browser-based tools available on ${profile.productName}.`,
    sections: [
      {
        id: 'permitted-use',
        title: '1. Permitted use',
        paragraphs: [
          'You may use the tools for lawful personal or commercial work. You are responsible for having the rights and permissions required for any files or information you process.',
          'Do not disrupt, overload, probe, bypass security, distribute harmful material, or use the site to violate applicable law or another person’s rights.',
        ],
      },
      {
        id: 'files-results',
        title: '2. Your files and results',
        paragraphs: [
          'Your files and generated results remain yours. Review results before relying on or sharing them, and keep original or backup copies of important files.',
        ],
      },
      {
        id: 'availability',
        title: '3. Availability and limitations',
        paragraphs: [
          'The site and tools are provided as available and may change, be limited, or be removed. A particular browser, format, or input may not always produce the same result.',
          'To the extent permitted by law, no guarantee is made that the service will be uninterrupted, error-free, or suitable for a particular purpose. Rights that cannot lawfully be limited remain unaffected.',
        ],
      },
      {
        id: 'changes-contact',
        title: '4. Changes and contact',
        paragraphs: [
          'These terms may be updated as the site changes. The updated date on this page identifies the current version.',
          `Questions about these terms may be sent to ${profile.contactEmail}.`,
        ],
      },
    ],
  }
}

function uniqueProviders(providers: ReadonlyArray<LegalProvider>): LegalProvider[] {
  const byName = new Map<string, LegalProvider>()
  for (const provider of providers) {
    const key = provider.name.trim().toLowerCase()
    const existing = byName.get(key)
    byName.set(
      key,
      existing ? { ...existing, purpose: `${existing.purpose}; ${provider.purpose}` } : provider,
    )
  }
  return [...byName.values()]
}

function validateList(
  field: string,
  values: ReadonlyArray<string>,
  issues: string[],
  options: Readonly<{ allowEmpty?: boolean }> = {},
) {
  if (!options.allowEmpty && values.length === 0) {
    issues.push(`Legal profile ${field} must not be empty.`)
  }
  const normalized = values.map((value) => value.trim().toLowerCase())
  if (normalized.some((value) => !value))
    issues.push(`Legal profile ${field} contains an empty item.`)
  if (new Set(normalized).size !== normalized.length) {
    issues.push(`Legal profile ${field} contains duplicate items.`)
  }
}

function isIsoDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false
  const parsed = new Date(`${value}T00:00:00.000Z`)
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().startsWith(value)
}
