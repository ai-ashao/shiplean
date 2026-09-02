import type { ReactNode } from 'react'
import { resolveRelatedTools, type ToolRegistryItem } from '@/lib/tool-registry'
import type { ToolLandingConfig, ToolSectionItem } from './types'
import { ToolValueSignals } from './value-signals'

export function ToolLandingPage({
  config,
  tool,
  registry = [],
}: Readonly<{
  config: ToolLandingConfig
  tool: ReactNode
  registry?: ReadonlyArray<ToolRegistryItem>
}>) {
  const related =
    config.relatedTools && registry.length > 0
      ? resolveRelatedTools({
          registry,
          currentToolId: config.toolId,
          requestedIds: config.relatedTools.toolIds,
        })
      : []

  return (
    <article className="pb-16 sm:pb-20" data-tool-landing-version={config.version}>
      <section
        className="mx-auto w-full max-w-5xl px-4 pb-8 pt-6 sm:px-6 sm:pt-8"
        data-tool-first-viewport
      >
        {config.breadcrumbs && config.breadcrumbs.length > 1 ? (
          <nav
            aria-label="Breadcrumb"
            className="mb-4 flex flex-wrap items-center gap-2 text-xs text-muted-foreground"
          >
            {config.breadcrumbs.map((item, index) => (
              <span className="inline-flex items-center gap-2" key={item.href}>
                {index > 0 ? <span aria-hidden="true">/</span> : null}
                <a className="hover:text-foreground" href={item.href}>
                  {item.label}
                </a>
              </span>
            ))}
          </nav>
        ) : null}

        <div className="mx-auto max-w-3xl text-center">
          {config.hero.eyebrow ? (
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              {config.hero.eyebrow}
            </p>
          ) : null}

          <h1 className="mt-2 text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            {config.hero.title}
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-pretty text-sm leading-6 text-muted-foreground sm:text-base">
            {config.hero.description}
          </p>

          <ToolValueSignals experience={config.experience} labels={config.valueLabels} />
        </div>

        <div className="mt-5 scroll-mt-20" data-tool-primary-region>
          {tool}
        </div>
      </section>

      {related.length > 0 && config.relatedTools ? (
        <section className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6" data-related-tools>
          <h2 className="text-xl font-semibold tracking-tight">{config.relatedTools.title}</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <a
                className="rounded-xl border bg-card p-4 transition-colors hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                href={item.href}
                key={item.id}
              >
                <h3 className="font-medium">{item.label}</h3>
                {item.description ? (
                  <p className="mt-1 text-sm leading-5 text-muted-foreground">{item.description}</p>
                ) : null}
              </a>
            ))}
          </div>
        </section>
      ) : null}

      <ItemSection section={config.benefits} />
      <ItemSection section={config.howItWorks} itemsKey="steps" numbered />
      <ItemSection section={config.features} />
      <ItemSection section={config.useCases} />

      {config.faq?.items.length ? (
        <section className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
          <h2 className="text-2xl font-semibold tracking-tight">{config.faq.title}</h2>
          <div className="mt-5 divide-y rounded-xl border">
            {config.faq.items.map((item) => (
              <details className="group px-4 py-4 sm:px-5" key={item.question}>
                <summary className="cursor-pointer list-none pr-8 font-medium">
                  {item.question}
                </summary>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
      ) : null}

      {config.seoContent?.map((block) => (
        <section className="mx-auto w-full max-w-3xl px-4 py-7 sm:px-6" key={block.heading}>
          <h2 className="text-2xl font-semibold tracking-tight">{block.heading}</h2>
          <div className="mt-4 space-y-4 text-sm leading-7 text-muted-foreground sm:text-base">
            {block.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>
      ))}

      {config.bottomAction ? (
        <section className="mx-auto w-full max-w-5xl px-4 pt-8 sm:px-6">
          <div className="rounded-2xl border bg-muted/30 px-5 py-7 text-center sm:px-8">
            <h2 className="text-2xl font-semibold tracking-tight">{config.bottomAction.title}</h2>
            {config.bottomAction.description ? (
              <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                {config.bottomAction.description}
              </p>
            ) : null}
            <a
              className="mt-5 inline-flex min-h-10 items-center justify-center rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              href={config.bottomAction.href}
            >
              {config.bottomAction.actionLabel}
            </a>
          </div>
        </section>
      ) : null}
    </article>
  )
}

function ItemSection({
  section,
  itemsKey = 'items',
  numbered = false,
}: Readonly<{
  section?:
    | {
        title: string
        items: ReadonlyArray<ToolSectionItem>
      }
    | {
        title: string
        steps: ReadonlyArray<ToolSectionItem>
      }
  itemsKey?: 'items' | 'steps'
  numbered?: boolean
}>) {
  if (!section) return null

  const items =
    itemsKey === 'steps' && 'steps' in section
      ? section.steps
      : 'items' in section
        ? section.items
        : []

  if (items.length === 0) return null

  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-9 sm:px-6">
      <h2 className="text-2xl font-semibold tracking-tight">{section.title}</h2>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <div className="rounded-xl border bg-card p-4" key={item.title}>
            {numbered ? (
              <p className="font-mono text-xs font-semibold text-muted-foreground">
                {String(index + 1).padStart(2, '0')}
              </p>
            ) : null}
            <h3 className={numbered ? 'mt-2 font-medium' : 'font-medium'}>{item.title}</h3>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
