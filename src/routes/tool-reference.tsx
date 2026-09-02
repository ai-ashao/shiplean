import { createFileRoute } from '@tanstack/react-router'
import { useId, useState } from 'react'
import {
  type ToolLandingConfig,
  ToolLandingPage,
  ToolStructuredData,
} from '@/components/tool-landing'
import { Button } from '@/components/ui/button'
import { site } from '@/lib/site'
import { toolPageHead } from '@/lib/tool-seo'
import { buildToolStructuredData } from '@/lib/tool-structured-data'

const config = {
  version: '0.2',
  preset: 'tool-default',
  toolId: 'tool-reference',
  seo: {
    title: 'Text Length Checker - Free Online Tool',
    description:
      'Free online text length checker for counting characters and words. No installation or signup required.',
    path: '/tool-reference',
    applicationCategory: 'UtilitiesApplication',
  },
  hero: {
    eyebrow: 'Free online reference tool',
    title: 'Text Length Checker',
    description: 'Count characters and words online for free. No installation or signup required.',
  },
  experience: {
    free: true,
    online: true,
    installationRequired: false,
    signupRequired: false,
    processing: 'local',
  },
  constraints: {
    other: ['Plain text input'],
  },
  completion: {
    highlights: ['Character count', 'Word count', 'Instant local result'],
  },
  capabilities: {
    title: 'Capabilities',
    items: [
      {
        id: 'characters',
        title: 'Count characters',
        description: 'Measure the exact number of characters in the current text.',
      },
      {
        id: 'words',
        title: 'Count words',
        description: 'Count whitespace-separated words without sending the text to a server.',
      },
      {
        id: 'local',
        title: 'Keep text local',
        description: 'The reference interaction uses browser state and does not submit the text.',
      },
    ],
  },
  valueLabels: {
    localProcessing: 'Data stays in your browser',
  },
  breadcrumbs: [
    { label: 'Home', href: '/' },
    { label: 'Tool Reference', href: '/tool-reference' },
  ],
  helpfulGuidance: [
    {
      heading: 'How the reference counter treats words',
      summary:
        'The counter trims surrounding whitespace and treats groups of non-whitespace characters as words.',
      items: [
        {
          label: 'Characters',
          title: 'Every typed character counts',
          description: 'Spaces and punctuation are included in the character total.',
        },
        {
          label: 'Words',
          title: 'Whitespace separates words',
          description: 'Multiple adjacent spaces do not create additional words.',
        },
      ],
    },
  ],
  faq: {
    title: 'Reference FAQ',
    items: [
      {
        question: 'Is this reference tool free to use?',
        answer: 'Yes. It is a local ShipLean reference route and does not require an account.',
      },
      {
        question: 'Does the text leave the browser?',
        answer: 'No. The reference counter uses client-side React state and does not submit text.',
      },
    ],
  },
  structuredData: {
    enableFaq: true,
    enableBreadcrumbs: true,
  },
} satisfies ToolLandingConfig

export const Route = createFileRoute('/tool-reference')({
  head: () => {
    const head = toolPageHead(config)

    return {
      ...head,
      meta: [...head.meta, { name: 'robots', content: 'noindex,nofollow' }],
    }
  },
  component: ToolReferencePage,
})

function ToolReferencePage() {
  const structuredData = buildToolStructuredData(config, site)

  return (
    <>
      <ToolStructuredData items={structuredData} />
      <ToolLandingPage config={config} tool={<TextLengthChecker />} />
    </>
  )
}

function TextLengthChecker() {
  const headingId = useId()
  const textId = useId()
  const [text, setText] = useState('')
  const [result, setResult] = useState({ characters: 0, words: 0 })

  function countText() {
    const trimmed = text.trim()
    setResult({
      characters: text.length,
      words: trimmed ? trimmed.split(/\s+/).length : 0,
    })
  }

  return (
    <section
      aria-labelledby={headingId}
      className="mx-auto max-w-3xl rounded-2xl border bg-card p-4 shadow-sm"
      data-reference-tool
    >
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h2 className="text-base font-semibold" id={headingId}>
            Check text length
          </h2>
          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            Paste text below. The reference tool does not submit it anywhere.
          </p>
        </div>
        <p aria-live="polite" className="text-xs text-muted-foreground">
          {result.characters} characters · {result.words} words
        </p>
      </div>

      <label className="mt-2 block text-sm font-medium" htmlFor={textId}>
        Text
      </label>
      <textarea
        className="mt-1 min-h-20 w-full resize-y rounded-lg border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
        id={textId}
        onChange={(event) => setText(event.target.value)}
        placeholder="Type or paste text here"
        value={text}
      />

      <div className="mt-2 flex items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground">Everything runs in this browser tab.</p>
        <Button data-tool-primary-action onClick={countText} type="button">
          Count text
        </Button>
      </div>
    </section>
  )
}
