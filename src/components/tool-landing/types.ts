export type ToolProcessingMode = 'local' | 'server' | 'hybrid'

export type ToolExperience = {
  free: boolean
  online: boolean
  installationRequired: boolean
  signupRequired: boolean
  processing: ToolProcessingMode
  noWatermark?: boolean
}

export type ToolValueSignalKey =
  | 'free'
  | 'online'
  | 'noInstallation'
  | 'noSignup'
  | 'browserBased'
  | 'localProcessing'
  | 'noWatermark'

export type ToolValueSignal = {
  key: ToolValueSignalKey
  label: string
  description?: string
}

export type ToolValueLabels = {
  free: string
  online: string
  noInstallation: string
  noSignup: string
  browserBased: string
  localProcessing: string
  noWatermark: string
}

export type ToolLandingA11y = {
  breadcrumbLabel?: string
  valueSignalsLabel?: string
}

export type ToolBreadcrumb = {
  label: string
  href: string
}

export type ToolSectionItem = {
  title: string
  description: string
}

export type ToolFaqItem = {
  question: string
  answer: string
}

export type ToolSeoContentBlock = {
  heading: string
  paragraphs: ReadonlyArray<string>
}

export type ToolLandingConfig = {
  version: '0.1'
  preset: 'tool-default'
  toolId: string
  seo: {
    title: string
    description: string
    path: string
    applicationCategory?: string
  }
  hero: {
    eyebrow?: string
    title: string
    description: string
  }
  experience: ToolExperience
  valueLabels?: Partial<ToolValueLabels>
  a11y?: ToolLandingA11y
  breadcrumbs?: ReadonlyArray<ToolBreadcrumb>
  relatedTools?: {
    title: string
    toolIds: ReadonlyArray<string>
  }
  benefits?: {
    title: string
    items: ReadonlyArray<ToolSectionItem>
  }
  howItWorks?: {
    title: string
    steps: ReadonlyArray<ToolSectionItem>
  }
  features?: {
    title: string
    items: ReadonlyArray<ToolSectionItem>
  }
  useCases?: {
    title: string
    items: ReadonlyArray<ToolSectionItem>
  }
  faq?: {
    title: string
    items: ReadonlyArray<ToolFaqItem>
  }
  seoContent?: ReadonlyArray<ToolSeoContentBlock>
  bottomAction?: {
    title: string
    description?: string
    actionLabel: string
    href: string
  }
  structuredData?: {
    applicationCategory?: string
    operatingSystem?: string
    priceCurrency?: string
    enableFaq?: boolean
    enableBreadcrumbs?: boolean
  }
}
