import { describe, expect, it } from 'vitest'
import { resolveRelatedTools } from '@/lib/tool-registry'

const registry = [
  {
    id: 'resize-kb',
    label: 'Resize Image to KB',
    href: '/resize-image-to-kb',
    tags: ['image', 'compress'],
    status: 'live' as const,
  },
  {
    id: 'compress-200',
    label: 'Compress Image to 200KB',
    href: '/compress-image-to-200kb',
    tags: ['image', 'compress'],
    status: 'live' as const,
  },
  {
    id: 'png-jpg',
    label: 'PNG to JPG',
    href: '/png-to-jpg',
    tags: ['image', 'convert'],
    status: 'live' as const,
  },
  {
    id: 'future',
    label: 'Future Tool',
    href: '/future',
    tags: ['image'],
    status: 'planned' as const,
  },
]

describe('tool registry', () => {
  it('excludes the current tool and planned tools', () => {
    const related = resolveRelatedTools({
      registry,
      currentToolId: 'resize-kb',
    })

    expect(related.map((tool) => tool.id)).toEqual(['compress-200', 'png-jpg'])
  })

  it('respects explicit related-tool order', () => {
    const related = resolveRelatedTools({
      registry,
      currentToolId: 'resize-kb',
      requestedIds: ['png-jpg', 'compress-200'],
    })

    expect(related.map((tool) => tool.id)).toEqual(['png-jpg', 'compress-200'])
  })
})
