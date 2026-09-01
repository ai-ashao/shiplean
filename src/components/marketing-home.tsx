import { Link } from '@tanstack/react-router'
import {
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronRight,
  Cloud,
  Code2,
  Database,
  FileCheck2,
  FolderTree,
  Gauge,
  LockKeyhole,
  Play,
  ShieldCheck,
  Sparkles,
  Terminal,
} from 'lucide-react'
import { AgentWorkflow } from '@/components/agent-workflow'
import { Button } from '@/components/ui/button'
import type { Locale } from '@/i18n/config'
import { marketingHomeMessages } from '@/i18n/home-messages'
import { sandboxUiAvailable } from '@/lib/config/runtime'

const workflowId = 'workflow'

const contracts = [
  { icon: ShieldCheck, name: 'AGENTS.md' },
  { icon: FolderTree, name: 'ARCHITECTURE.md' },
  { icon: FileCheck2, name: 'pnpm verify' },
]

export function MarketingHome({ locale }: Readonly<{ locale: Locale }>) {
  const c = marketingHomeMessages[locale]

  return (
    <div className="marketing-shell mx-auto max-w-[1180px] px-4 sm:px-6">
      <section className="starter-hero">
        <div className="starter-hero-copy">
          <p className="mb-5 flex items-center gap-2 text-xs font-medium text-accent-foreground">
            <span className="grid size-6 place-items-center rounded-md bg-accent">
              <Sparkles className="size-3.5" />
            </span>
            {c.kicker}
          </p>
          <h1 className="max-w-3xl text-balance text-[2.65rem] font-semibold leading-[1.08] tracking-[-0.045em] sm:text-6xl">
            {c.title}
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg">
            {c.lede}
          </p>
          <div className="starter-hero-actions mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="group px-6">
              <a href={`#${workflowId}`}>
                {c.primary}
                <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-card px-6">
              <Link to="/guides">
                <BookOpen /> {c.secondary}
              </Link>
            </Button>
          </div>
          <div className="starter-hero-trust mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[11px] text-muted-foreground">
            {c.trust.map((item) => (
              <span className="flex items-center gap-1.5" key={item}>
                <Check className="size-3 text-[#22a06b]" />
                {item}
              </span>
            ))}
          </div>
        </div>
        <QuickStartPanel locale={locale} />
      </section>

      <section className="starter-notice mt-7 rounded-xl border px-5 py-4 sm:flex sm:items-center sm:justify-between">
        <div className="flex gap-3">
          <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full border bg-white text-foreground">
            <CheckCircle2 className="size-4" />
          </span>
          <div>
            <h2 className="text-sm font-semibold">{c.noticeTitle}</h2>
            <p className="mb-0 mt-1 text-xs text-muted-foreground">{c.noticeBody}</p>
          </div>
        </div>
        <Link
          className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-foreground sm:mt-0"
          to="/guides"
        >
          {c.boundaryLink} <ChevronRight className="size-3.5" />
        </Link>
      </section>

      <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-5">
        {c.metrics.map(([label, value, note], index) => (
          <article
            className={`metric-card ${index === 4 ? 'col-span-2 lg:col-span-1' : ''}`}
            key={label}
          >
            <div className="flex items-start justify-between gap-2 text-xs text-muted-foreground">
              <span>{label}</span>
              {index === 0 ? (
                <Code2 />
              ) : index === 1 ? (
                <Cloud />
              ) : index === 2 ? (
                <Gauge />
              ) : index === 3 ? (
                <LockKeyhole />
              ) : (
                <Sparkles />
              )}
            </div>
            <strong>{value}</strong>
            <p>{note}</p>
          </article>
        ))}
      </div>

      <section className="mt-6 space-y-3">
        <article className="min-h-[430px] rounded-xl border bg-card p-5 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-medium text-muted-foreground">{c.overview}</p>
              <h2 className="mt-2 text-xl font-semibold tracking-tight">{c.overviewBody}</h2>
            </div>
            <span className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-[11px] font-medium text-emerald-700">
              {c.status}
            </span>
          </div>
          <RepositoryMap locale={locale} />
        </article>
        <article className="rounded-xl border bg-card p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold">{c.coverage}</h2>
            <ShieldCheck className="size-4 text-muted-foreground" />
          </div>
          <p className="mt-2 text-xs leading-5 text-muted-foreground">{c.coverageHint}</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {contracts.map(({ icon: Icon, name }, index) => (
              <div className="flex gap-3 rounded-lg border bg-background p-4" key={name}>
                <span className="grid size-8 shrink-0 place-items-center rounded-md border bg-background">
                  <Icon className="size-4" />
                </span>
                <div>
                  <code className="text-xs font-medium text-foreground">{name}</code>
                  <p className="mb-0 mt-1 text-[11px] leading-4 text-muted-foreground">
                    {c.contractLabels[index]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section id={workflowId} className="scroll-mt-28 py-20 sm:py-28">
        <div className="mb-10 max-w-2xl">
          <p className="section-kicker">{c.workflow}</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
            {c.workflowTitle}
          </h2>
        </div>
        <AgentWorkflow locale={locale} />
      </section>

      <section className="overflow-hidden rounded-xl border bg-card">
        <div className="p-7 sm:p-10">
          <p className="section-kicker">{c.boundary}</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em]">{c.boundaryTitle}</h2>
          <p className="mt-5 max-w-xl text-sm leading-7 text-muted-foreground">{c.boundaryBody}</p>
        </div>
        <div className="grid grid-cols-2 gap-px border-t bg-border p-px lg:grid-cols-4">
          {[Database, LockKeyhole, Cloud, Terminal].map((BoundaryIcon, index) => {
            const [label, status] = c.boundaryItems[index]
            return (
              <div className="flex min-h-36 flex-col justify-between bg-background p-5" key={label}>
                <BoundaryIcon className="size-5 text-muted-foreground" />
                <span className="text-sm font-medium">{label}</span>
                <small className={index === 3 ? 'text-[#4f8b60]' : 'text-[#c6533b]'}>
                  {status}
                </small>
              </div>
            )
          })}
        </div>
      </section>

      <section className="starter-final py-20 text-center sm:py-28">
        <h2 className="mx-auto max-w-3xl text-balance text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
          {c.finalTitle}
        </h2>
        <p className="mx-auto mt-5 max-w-2xl leading-7 text-muted-foreground">{c.finalBody}</p>
        <Button asChild size="lg" className="mt-8 px-7">
          <Link to={sandboxUiAvailable ? '/login' : '/pricing'}>
            <Play />
            {sandboxUiAvailable ? c.finalDemo : c.finalLicense}
          </Link>
        </Button>
      </section>
    </div>
  )
}

function QuickStartPanel({ locale }: Readonly<{ locale: Locale }>) {
  const c = marketingHomeMessages[locale]
  return (
    <section
      aria-label={c.quickStartAria}
      className="quick-start-panel overflow-hidden rounded-xl border bg-card"
      data-core-workbench
    >
      <div className="flex items-center justify-between border-b px-4 py-3 text-xs">
        <span className="flex items-center gap-2 font-medium">
          <Terminal className="size-4" /> Quick start
        </span>
        <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2 py-1 text-[10px] text-emerald-700">
          READY
        </span>
      </div>
      <div className="bg-[#0f172a] p-5 font-mono text-xs leading-7 text-[#e2e8f0]">
        <p className="text-[#64748b]"># {c.quickStartComment}</p>
        <p className="mt-3 text-white">
          <span className="text-[#a99df8]">$</span> shiplean-quick-start
        </p>
        <p className="mt-5 text-[#94a3b8]">{c.quickStartPrompt}</p>
      </div>
      <div className="grid grid-cols-3 divide-x border-t text-center text-[10px] text-muted-foreground">
        <span className="py-3">READ</span>
        <span className="py-3">BUILD</span>
        <span className="py-3">VERIFY</span>
      </div>
    </section>
  )
}

function RepositoryMap({ locale }: Readonly<{ locale: Locale }>) {
  const zh = locale === 'zh-CN'
  const rows = [
    [
      Code2,
      'src/routes',
      zh ? '公开页面与受保护应用外壳' : 'Public pages and protected app shell',
      '12',
    ],
    [
      FolderTree,
      'src/modules',
      zh ? '可选能力与清晰禁用路径' : 'Optional capabilities with clean disable paths',
      '03',
    ],
    [
      ShieldCheck,
      '.agents/skills',
      zh ? '随仓库提供的快速启动 Skill' : 'Bundled quick-start Skill',
      '01',
    ],
    [
      FileCheck2,
      'tests + e2e',
      zh ? '从领域规则到新服务冒烟测试' : 'Domain rules through fresh-server smoke',
      'PASS',
    ],
  ]
  return (
    <div className="mt-9 overflow-hidden rounded-lg border">
      <div className="grid grid-cols-[1fr_auto] border-b bg-background px-4 py-3 text-[10px] uppercase tracking-wider text-muted-foreground">
        <span>Repository surface</span>
        <span>Status</span>
      </div>
      <div className="divide-y">
        {rows.map(([Icon, name, note, value]) => {
          const RowIcon = Icon as typeof Code2
          return (
            <div
              className="grid grid-cols-[auto_1fr_auto] items-center gap-3 px-4 py-4"
              key={name as string}
            >
              <RowIcon className="size-4 text-muted-foreground" />
              <div>
                <code className="text-xs font-medium">{name as string}</code>
                <p className="mb-0 mt-1 text-[11px] text-muted-foreground">{note as string}</p>
              </div>
              <span className="font-mono text-[10px] text-emerald-700">{value as string}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
