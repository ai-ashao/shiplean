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
import { sandboxUiAvailable } from '@/lib/config/runtime'

type Locale = 'en' | 'zh-CN'
const workflowId = 'workflow'

const copy = {
  en: {
    kicker: 'TanStack Start · Cloudflare-first',
    title: 'The small-product scaffold your coding agent can actually understand.',
    lede: 'Start from explicit architecture, honest product boundaries, and one complete verification command—not a pile of integrations you have to remove.',
    primary: 'Explore the workflow',
    secondary: 'Read the guides',
    noticeTitle: 'A focused starter, ready for your first product task',
    noticeBody: 'The scaffold runs without a database, payment provider, or external secret.',
    metrics: [
      ['Framework', 'TanStack Start', 'One supported app runtime'],
      ['Deploy target', 'Cloudflare', 'First-class configuration'],
      ['Verification', '1 command', 'Format through fresh-server E2E'],
      ['External secrets', '0 required', 'For the downloaded starter'],
      ['Agent workflow', 'Bundled', 'Skill and project contracts'],
    ],
    overview: 'Repository overview',
    overviewBody: 'A starter with enough context to change safely.',
    status: 'Ready for adaptation',
    coverage: 'Included contracts',
    coverageHint: 'The files your agent reads before it edits.',
    workflow: 'From download to review',
    workflowTitle: 'A short path with a visible finish line.',
    boundary: 'Product boundaries',
    boundaryTitle: 'Nothing pretends to be production-ready.',
    boundaryBody:
      'The local demo is useful, but visually and technically separate from real auth, payments, storage, and customer data.',
    finalTitle: 'Give one focused idea a dependable starting point.',
    finalBody:
      'Open the scaffold in your coding agent, describe the first user, and let the repository contracts guide the work.',
  },
  'zh-CN': {
    kicker: 'TanStack Start · Cloudflare 优先',
    title: '一个真正能让编程 Agent 读懂的小产品脚手架。',
    lede: '从明确架构、诚实边界和一条完整验收命令开始，而不是先拆掉一堆用不到的集成。',
    primary: '查看使用流程',
    secondary: '阅读指南',
    noticeTitle: '聚焦的起点，已经准备好承接第一个产品任务',
    noticeBody: '无需数据库、支付服务商或外部密钥，下载后即可运行。',
    metrics: [
      ['应用框架', 'TanStack Start', '只支持一个可靠运行时'],
      ['部署目标', 'Cloudflare', '提供一等配置'],
      ['完整验收', '1 条命令', '从格式到全新服务 E2E'],
      ['外部密钥', '无需配置', '脚手架本地启动要求'],
      ['Agent 工作流', '已内置', 'Skill 与项目合同'],
    ],
    overview: '仓库概览',
    overviewBody: '给 Agent 足够上下文，才能安全修改。',
    status: '等待产品化',
    coverage: '内置项目合同',
    coverageHint: 'Agent 修改代码之前会先读取这些文件。',
    workflow: '从下载到验收',
    workflowTitle: '路径够短，完成标准也清晰可见。',
    boundary: '产品真实性边界',
    boundaryTitle: '没有任何能力伪装成已经生产可用。',
    boundaryBody:
      '本地演示足够验证应用外壳，但与真实认证、支付、存储和客户数据在视觉与技术上保持分离。',
    finalTitle: '给一个明确想法，一个可靠起点。',
    finalBody: '用编程 Agent 打开脚手架，描述第一个用户，让仓库合同引导接下来的工作。',
  },
} as const

const contracts = [
  { icon: ShieldCheck, name: 'AGENTS.md', label: 'Product and engineering rules' },
  { icon: FolderTree, name: 'ARCHITECTURE.md', label: 'Runtime and module boundaries' },
  { icon: FileCheck2, name: 'pnpm verify', label: 'Repository acceptance contract' },
]

export function MarketingHome({ locale }: Readonly<{ locale: Locale }>) {
  const c = copy[locale]
  const zh = locale === 'zh-CN'

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
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
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
          <div className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-2 text-[11px] text-muted-foreground">
            {[
              zh ? '无需数据库' : 'No database required',
              zh ? '内置 Agent Skill' : 'Bundled Agent Skill',
              'pnpm verify',
            ].map((item) => (
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
          {zh ? '查看配置边界' : 'Review the boundaries'} <ChevronRight className="size-3.5" />
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
            {contracts.map(({ icon: Icon, name, label }) => (
              <div className="flex gap-3 rounded-lg border bg-background p-4" key={name}>
                <span className="grid size-8 shrink-0 place-items-center rounded-md border bg-background">
                  <Icon className="size-4" />
                </span>
                <div>
                  <code className="text-xs font-medium text-foreground">{name}</code>
                  <p className="mb-0 mt-1 text-[11px] leading-4 text-muted-foreground">{label}</p>
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
          {[
            [Database, zh ? '数据库' : 'Database'],
            [LockKeyhole, zh ? '生产认证' : 'Production auth'],
            [Cloud, zh ? '支付服务' : 'Payments'],
            [Terminal, zh ? '本地演示可用' : 'Local demo ready'],
          ].map(([Icon, label], index) => {
            const BoundaryIcon = Icon as typeof Database
            return (
              <div
                className="flex min-h-36 flex-col justify-between bg-background p-5"
                key={label as string}
              >
                <BoundaryIcon className="size-5 text-muted-foreground" />
                <span className="text-sm font-medium">{label as string}</span>
                <small className={index === 3 ? 'text-[#4f8b60]' : 'text-[#c6533b]'}>
                  {index === 3 ? 'Connected' : 'Not configured'}
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
            {sandboxUiAvailable
              ? zh
                ? '打开本地演示'
                : 'Open the local demo'
              : zh
                ? '查看授权'
                : 'View the license'}
          </Link>
        </Button>
      </section>
    </div>
  )
}

function QuickStartPanel({ locale }: Readonly<{ locale: Locale }>) {
  const zh = locale === 'zh-CN'
  return (
    <div className="quick-start-panel overflow-hidden rounded-xl border bg-card">
      <div className="flex items-center justify-between border-b px-4 py-3 text-xs">
        <span className="flex items-center gap-2 font-medium">
          <Terminal className="size-4" /> Quick start
        </span>
        <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2 py-1 text-[10px] text-emerald-700">
          READY
        </span>
      </div>
      <div className="bg-[#0f172a] p-5 font-mono text-xs leading-7 text-[#e2e8f0]">
        <p className="text-[#64748b]">
          # {zh ? '在编程 Agent 中调用' : 'invoke in your coding agent'}
        </p>
        <p className="mt-3 text-white">
          <span className="text-[#a99df8]">$</span> shiplean-quick-start
        </p>
        <p className="mt-5 text-[#94a3b8]">
          {zh ? '把这个模板改成我的产品：……' : 'Turn this template into my product: …'}
        </p>
      </div>
      <div className="grid grid-cols-3 divide-x border-t text-center text-[10px] text-muted-foreground">
        <span className="py-3">READ</span>
        <span className="py-3">BUILD</span>
        <span className="py-3">VERIFY</span>
      </div>
    </div>
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
