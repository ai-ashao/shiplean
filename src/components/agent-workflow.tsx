import type { Locale } from '@/i18n/config'
import { workflowMessages } from '@/i18n/workflow-messages'

export function AgentWorkflow({ locale = 'en' }: Readonly<{ locale?: Locale }>) {
  const copy = workflowMessages[locale]
  return (
    <div className="overflow-hidden rounded-xl border bg-border shadow-sm">
      <section
        className="flex min-h-64 flex-col justify-center bg-zinc-950 p-6 text-zinc-100 sm:p-10"
        aria-label={copy.ariaLabel}
      >
        <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
          {copy.inputLabel}
        </span>
        <code className="my-8 overflow-wrap-anywhere font-mono text-lg sm:text-2xl">
          $shiplean-quick-start
        </code>
        <p className="border-t border-white/10 pt-5 text-sm leading-6 text-zinc-400">
          {copy.prompt}
        </p>
      </section>
      <ol className="grid list-none gap-px border-t bg-border p-0 sm:grid-cols-2 lg:grid-cols-4">
        {copy.steps.map((step, index) => (
          <li className="flex min-h-52 flex-col bg-background p-6" key={step.code}>
            <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              <span className="rounded border px-1.5 py-0.5">
                {String(index + 1).padStart(2, '0')}
              </span>
              {step.code}
            </div>
            <h3 className="mt-auto text-lg font-semibold tracking-tight">{step.title}</h3>
            <p className="mb-0 mt-3 text-sm leading-6 text-muted-foreground">{step.text}</p>
          </li>
        ))}
      </ol>
    </div>
  )
}
