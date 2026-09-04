import { describe, expect, it } from 'vitest'
import { auditSeoMetadata } from '@/lib/seo-validation'

const validInput = {
  title: 'Browser Image Resizer for Fast Local Exports',
  description:
    'Resize images locally in your browser with clear dimensions, predictable output, and no account or installation required.',
  path: '/image-resizer',
}

describe('SEO metadata audit', () => {
  it('treats missing core metadata and malformed site paths as errors', () => {
    const audit = auditSeoMetadata({ title: ' ', description: '', path: 'image-resizer?x=1' })

    expect(audit.errors.map((issue) => issue.code)).toEqual([
      'seo.title.required',
      'seo.description.required',
      'seo.path.invalid',
    ])

    expect(
      auditSeoMetadata({ ...validInput, path: '/%' }).errors.map((issue) => issue.code),
    ).toContain('seo.path.invalid')
  })

  it('keeps length guidance and duplicated hero copy advisory', () => {
    const audit = auditSeoMetadata({
      ...validInput,
      title: 'Image Resizer',
      description: 'Resize images locally.',
      heroDescription: 'Resize images locally.',
    })

    expect(audit.errors).toEqual([])
    expect(audit.warnings.map((issue) => issue.code)).toEqual(
      expect.arrayContaining([
        'seo.title.length',
        'seo.description.length',
        'seo.description.matches-hero',
      ]),
    )
  })

  it('warns when pageHead would append an already present brand', () => {
    const audit = auditSeoMetadata({ ...validInput, title: `${validInput.title} · ShipLean` })
    expect(audit.warnings.map((issue) => issue.code)).toContain('seo.title.includes-brand')
  })

  it('accepts natural keyword variants and warns on unrelated intent', () => {
    const matching = auditSeoMetadata({
      ...validInput,
      primaryKeyword: 'image resize tool',
      heroTitle: 'Resize Images in Your Browser',
    })
    expect(matching.warnings.map((issue) => issue.code)).not.toEqual(
      expect.arrayContaining([
        'seo.primary-keyword.title',
        'seo.primary-keyword.description',
        'seo.primary-keyword.hero',
      ]),
    )

    const unrelated = auditSeoMetadata({
      ...validInput,
      primaryKeyword: 'invoice generator',
      heroTitle: 'Resize Images',
    })
    expect(unrelated.errors).toEqual([])
    expect(unrelated.warnings.map((issue) => issue.code)).toEqual(
      expect.arrayContaining([
        'seo.primary-keyword.title',
        'seo.primary-keyword.description',
        'seo.primary-keyword.hero',
      ]),
    )
  })

  it('warns about unsupported social image schemes', () => {
    const audit = auditSeoMetadata({ ...validInput, socialImage: 'data:image/png;base64,abc' })
    expect(audit.warnings.map((issue) => issue.code)).toContain('seo.social-image.invalid')

    const ambiguous = auditSeoMetadata({ ...validInput, socialImage: 'social/image.png' })
    expect(ambiguous.warnings.map((issue) => issue.code)).toContain('seo.social-image.invalid')
  })
})
