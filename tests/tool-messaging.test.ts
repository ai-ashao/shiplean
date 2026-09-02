import { describe, expect, it } from 'vitest'
import {
  buildEnglishToolSeoDescription,
  buildEnglishToolSeoTitle,
  deriveToolValueSignals,
  validateEnglishToolMessaging,
} from '@/lib/tool-messaging'

const localFreeTool = {
  free: true,
  online: true,
  installationRequired: false,
  signupRequired: false,
  processing: 'local' as const,
  noWatermark: true,
}

describe('tool messaging', () => {
  it('puts the four primary value signals first', () => {
    const signals = deriveToolValueSignals(localFreeTool)

    expect(signals.slice(0, 4).map((signal) => signal.key)).toEqual([
      'free',
      'online',
      'noInstallation',
      'noSignup',
    ])
  })

  it('adds local-only claims only for local processing', () => {
    const serverSignals = deriveToolValueSignals({
      ...localFreeTool,
      processing: 'server',
    })

    expect(serverSignals.map((signal) => signal.key)).not.toContain('localProcessing')
    expect(serverSignals.map((signal) => signal.key)).not.toContain('browserBased')
  })

  it('builds free-online SEO intent copy', () => {
    expect(
      buildEnglishToolSeoTitle({
        primaryKeyword: 'Resize Image to KB',
        experience: localFreeTool,
      }),
    ).toContain('Free Online')

    const description = buildEnglishToolSeoDescription({
      task: 'resize images to your target KB size',
      experience: localFreeTool,
      formats: ['JPG', 'PNG', 'WebP'],
    })

    expect(description).toContain('Free online')
    expect(description).toContain('No installation')
    expect(description).toContain('No signup')
  })

  it('flags unsupported local-processing claims', () => {
    const issues = validateEnglishToolMessaging({
      heroDescription:
        'Free online image tool. No installation or signup. Files stay on your device.',
      seoTitle: 'Image Tool - Free Online Tool',
      seoDescription: 'Free online image tool with no installation or signup.',
      experience: {
        ...localFreeTool,
        processing: 'server',
      },
    })

    expect(issues).toContain('Local-processing claims require experience.processing === local.')
  })
})
