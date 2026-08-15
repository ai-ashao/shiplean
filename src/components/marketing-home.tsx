import { Link } from '@tanstack/react-router'
import {
  ArrowRight,
  Check,
  CheckCircle2,
  CircleDot,
  Cloud,
  FileText,
  FolderTree,
  LayoutDashboard,
  Sparkles,
  Terminal,
} from 'lucide-react'
import { AgentWorkflow } from '@/components/agent-workflow'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { sandboxUiAvailable } from '@/lib/config/runtime'

type Locale = 'en' | 'zh-CN'
const workflowId = 'workflow'

const content = {
  en: {
    badge: 'TanStack Start · Cloudflare-first',
    title: 'A calm starting point for your next small product.',
    lede: 'ShipLean gives your coding agent the structure, context, and checks it needs to turn one focused idea into a working MVP.',
    primary: 'Explore the workflow',
    secondary: 'View pricing',
    proof: ['No database required', 'Bundled Agent Skill', 'One verification command'],
    sectionLabel: 'A scaffold your agent can understand',
    sectionTitle: 'Start with context, not cleanup.',
    sectionBody:
      'The repository ships with explicit architecture, product boundaries, and acceptance checks. Your agent can spend its time on the product instead of reverse-engineering the starter.',
    features: [
      {
        title: 'Product-ready shell',
        text: 'Public pages, a protected app route, and a clearly labeled local auth demo work before you add any service.',
        icon: LayoutDashboard,
      },
      {
        title: 'Agent-native workflow',
        text: 'The bundled Skill reads the project rules, scopes the first workflow, implements it, and verifies the result.',
        icon: Sparkles,
      },
      {
        title: 'One proven runtime',
        text: 'TanStack Start and Cloudflare stay the focus, so the template remains small, inspectable, and honest about support.',
        icon: Cloud,
      },
    ],
    workflowLabel: 'From download to review',
    workflowTitle: 'Four steps. One clear handoff.',
    manifestLabel: 'Built-in acceptance',
    manifestTitle: 'The finish line is part of the template.',
    manifestBody:
      'Formatting, strict TypeScript, domain tests, SEO assertions, a production build, and a fresh-server smoke test run together.',
    terminalReady: 'Ready for your review',
    ctaLead: 'Build the smallest version worth',
    ctaAccent: 'testing.',
    ctaBody:
      'Download the scaffold, describe your first user, and let the bundled Skill map the work.',
    cta: sandboxUiAvailable ? 'Open starter demo' : 'View the license',
  },
  'zh-CN': {
    badge: 'TanStack Start · Cloudflare 优先',
    title: '给下一个小产品，一个清爽可靠的起点。',
    lede: 'ShipLean 把结构、上下文和验收规则交给编程 Agent，帮助你把一个明确想法做成可运行的 MVP。',
    primary: '查看使用流程',
    secondary: '查看定价',
    proof: ['无需数据库即可运行', '内置 Agent Skill', '一条命令完整验证'],
    sectionLabel: '让 Agent 真正读得懂的脚手架',
    sectionTitle: '从上下文开始，不从清理模板开始。',
    sectionBody:
      '仓库自带清晰的架构、产品边界和验收标准。Agent 可以把时间用在产品上，而不是先考古和拆除无关代码。',
    features: [
      {
        title: '可直接运行的产品外壳',
        text: '公开页面、受保护工作台和明确标记的本地登录演示，在接入外部服务前就能使用。',
        icon: LayoutDashboard,
      },
      {
        title: '面向 Agent 的工作流',
        text: '内置 Skill 会读取项目规则、收敛首个流程、完成实现，并执行全仓验证。',
        icon: Sparkles,
      },
      {
        title: '只承诺一个可靠运行时',
        text: '专注 TanStack Start 和 Cloudflare，让模板保持轻量、可读，也不虚构未经验证的支持。',
        icon: Cloud,
      },
    ],
    workflowLabel: '从下载到验收',
    workflowTitle: '四个步骤，一次清晰交接。',
    manifestLabel: '内置验收合同',
    manifestTitle: '模板里已经写好完成标准。',
    manifestBody: '格式、严格类型、领域测试、SEO 断言、生产构建和全新服务冒烟测试，一次完整执行。',
    terminalReady: '等待你检查',
    ctaLead: '先做最小但',
    ctaAccent: '值得验证的版本。',
    ctaBody: '下载脚手架，描述第一个用户，让内置 Skill 把工作拆清楚。',
    cta: sandboxUiAvailable ? '打开模板演示' : '查看授权',
  },
} as const

export function MarketingHome({ locale }: Readonly<{ locale: Locale }>) {
  const copy = content[locale]

  return (
    <div className="pb-3">
      <section className="relative mx-3 overflow-hidden rounded-b-[2rem] bg-[#fcfcf9] sm:rounded-b-[2.75rem]">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[760px] -translate-x-1/2 rounded-full bg-[#efffc8] opacity-75 blur-[110px]" />
        <div className="relative mx-auto max-w-7xl px-5 pb-24 pt-24 text-center sm:px-8 sm:pb-32 sm:pt-32 lg:px-10">
          <div className="mx-auto max-w-4xl">
            <Badge
              variant="outline"
              className="mb-7 border-black/8 bg-white/90 px-2 py-1 pl-3 font-mono text-[10px] shadow-sm"
            >
              <CircleDot className="size-3 fill-[#b9f43a] text-[#86bd13]" />
              {copy.badge}
              <span className="ml-1 rounded-full bg-[#b9f43a] px-2 py-0.5 text-[9px] font-semibold text-black">
                v0.3
              </span>
            </Badge>
            <h1 className="text-balance text-5xl font-semibold tracking-[-0.065em] text-foreground sm:text-7xl lg:text-[5.4rem] lg:leading-[0.98]">
              {copy.title}
            </h1>
            <p className="mx-auto mt-7 max-w-2xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              {copy.lede}
            </p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="group rounded-full px-7 shadow-lg shadow-black/10"
              >
                <a href="#workflow">
                  {copy.primary}
                  <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full bg-white/70 px-7">
                <Link to="/pricing">{copy.secondary}</Link>
              </Button>
            </div>
            <ul className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-2 text-[11px] text-muted-foreground">
              {copy.proof.map((item) => (
                <li className="flex items-center gap-2" key={item}>
                  <Check className="size-3 text-[#75a90d]" /> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-20 sm:mt-24">
            <RepositoryPreview locale={locale} />
          </div>
          <div className="mt-24 sm:mt-32">
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
              {locale === 'zh-CN'
                ? '专注于一条可验证的产品路径'
                : 'One focused, verifiable product path'}
            </p>
            <div className="mx-auto mt-6 flex max-w-3xl flex-wrap justify-center gap-x-10 gap-y-4 text-sm font-semibold text-black/30 sm:text-base">
              <span>TanStack Start</span>
              <span>Cloudflare</span>
              <span>shadcn/ui</span>
              <span>TypeScript</span>
              <span>Codex</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-3 mt-3 rounded-[2rem] bg-[#fcfcf9] px-5 py-20 sm:rounded-[2.75rem] sm:px-8 sm:py-28 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#79a91b]">
              {copy.sectionLabel}
            </p>
            <h2 className="mt-5 text-balance text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">
              {copy.sectionTitle}
            </h2>
            <p className="mx-auto mt-6 max-w-2xl leading-7 text-muted-foreground">
              {copy.sectionBody}
            </p>
          </div>
          <div className="mt-14 grid gap-4 lg:grid-cols-[1.25fr_0.75fr]">
            <Card className="relative min-h-[420px] overflow-hidden border-black/8 bg-white shadow-none">
              <CardHeader className="relative z-10 max-w-md">
                <Sparkles className="mb-6 size-5 rounded-md bg-[#f2f3ec] p-1 text-black" />
                <CardTitle className="text-xl">{copy.features[1].title}</CardTitle>
                <CardDescription className="mt-2 leading-6">
                  {copy.features[1].text}
                </CardDescription>
              </CardHeader>
              <LaunchOrbit />
            </Card>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {[copy.features[0], copy.features[2]].map((feature, index) => (
                <Card
                  key={feature.title}
                  className="justify-between border-black/8 bg-white shadow-none"
                >
                  <CardHeader>
                    <feature.icon className="mb-5 size-5 rounded-md bg-[#f2f3ec] p-1 text-black" />
                    <CardTitle className="text-lg leading-6">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-6 text-muted-foreground">{feature.text}</p>
                    {index === 1 ? (
                      <div className="mt-6 flex flex-wrap gap-2">
                        {['TanStack', 'Cloudflare', 'Vitest', '+ Skill'].map((item, itemIndex) => (
                          <span
                            key={item}
                            className={
                              itemIndex === 3
                                ? 'rounded-full bg-[#b9f43a] px-3 py-1 text-[10px] font-medium'
                                : 'rounded-full bg-[#f2f3ec] px-3 py-1 text-[10px] text-muted-foreground'
                            }
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          <div className="mt-4 grid gap-px overflow-hidden rounded-2xl bg-white/10 p-px sm:grid-cols-4">
            {[
              ['TanStack Start', locale === 'zh-CN' ? '唯一应用框架' : 'single app framework'],
              ['Cloudflare', locale === 'zh-CN' ? '首选部署目标' : 'first deployment target'],
              ['pnpm verify', locale === 'zh-CN' ? '仓库验收合同' : 'repository acceptance'],
              ['No secrets', locale === 'zh-CN' ? '本地启动要求' : 'required for local start'],
            ].map(([value, label]) => (
              <div className="bg-[#0d0d0c] px-6 py-8 text-white" key={label}>
                <strong className="text-lg font-medium tracking-[-0.03em] sm:text-xl">
                  {value === 'pnpm verify' ? (
                    <code className="font-mono text-[#b9f43a]">{value}</code>
                  ) : (
                    value
                  )}
                </strong>
                <p className="mb-0 mt-2 text-xs text-white/45">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id={workflowId}
        className="mx-3 mt-3 rounded-[2rem] bg-[#fcfcf9] sm:rounded-[2.75rem]"
      >
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28 lg:px-10">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#79a91b]">
              {copy.workflowLabel}
            </p>
            <h2 className="mt-5 text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">
              {copy.workflowTitle}
            </h2>
          </div>
          <AgentWorkflow locale={locale} />
        </div>
      </section>

      <section className="mx-3 mt-3 rounded-[2rem] bg-[#fcfcf9] px-5 py-20 sm:rounded-[2.75rem] sm:px-8 sm:py-28 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-5xl font-semibold text-[#b9f43a]">”</span>
            <h2 className="mt-2 text-balance text-3xl font-medium tracking-[-0.04em] sm:text-5xl">
              {copy.manifestTitle}{' '}
              <span className="bg-[linear-gradient(transparent_62%,#dfff83_62%)]">
                {copy.terminalReady}.
              </span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl leading-7 text-muted-foreground">
              {copy.manifestBody}
            </p>
          </div>
          <div className="relative mx-auto mt-16 max-w-5xl overflow-hidden rounded-[1.75rem] bg-[#0d0d0c] px-6 py-20 text-center text-white sm:px-12 sm:py-28">
            <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-96 -translate-x-1/2 rounded-full bg-[#b9f43a]/25 blur-[90px]" />
            <div className="relative">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">
                {copy.manifestLabel}
              </p>
              <h2 className="mx-auto mt-5 max-w-3xl text-balance text-4xl font-semibold tracking-[-0.055em] sm:text-6xl">
                {copy.ctaLead} <span className="text-[#b9f43a]">{copy.ctaAccent}</span>
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-white/50">
                {copy.ctaBody}
              </p>
              <Button
                asChild
                size="lg"
                className="mt-8 rounded-full bg-[#b9f43a] px-7 text-black hover:bg-[#c8ff55]"
              >
                <Link to={sandboxUiAvailable ? '/login' : '/pricing'}>
                  {copy.cta} <ArrowRight />
                </Link>
              </Button>
              <VerifyStrip copy={copy} />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function RepositoryPreview({ locale }: Readonly<{ locale: Locale }>) {
  const isChinese = locale === 'zh-CN'
  const files = [
    ['AGENTS.md', isChinese ? '产品边界与完成标准' : 'Product boundaries and completion'],
    ['ARCHITECTURE.md', isChinese ? '模块与信任边界' : 'Modules and trust boundaries'],
    [
      '.agents/skills/shiplean-quick-start/SKILL.md',
      isChinese ? '内置 Agent 工作流' : 'Bundled Agent workflow',
    ],
    ['package.json', isChinese ? '真实验证命令' : 'Real verification command'],
  ] as const

  return (
    <div className="relative mx-auto w-full max-w-5xl pt-8 sm:px-12">
      <div
        className="pointer-events-none absolute inset-x-[8%] -top-10 bottom-[-60px]"
        aria-hidden="true"
      >
        <div className="absolute left-1/2 top-1/2 h-[66%] w-[92%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-black/8" />
        <div className="absolute left-1/2 top-1/2 h-[48%] w-[76%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-black/8" />
        <div className="absolute left-[11%] top-[45%] size-2 rounded-full bg-[#b9f43a] shadow-[0_0_18px_#b9f43a]" />
        <div className="absolute right-[8%] top-[55%] size-2 rounded-full bg-black" />
      </div>
      <Card className="absolute left-0 top-16 z-20 hidden w-52 gap-2 border-black/8 bg-white/95 p-4 text-left shadow-xl backdrop-blur md:flex">
        <CardDescription className="font-mono text-[9px] uppercase tracking-wider">
          {isChinese ? '仓库内置 Skill' : 'Bundled repository Skill'}
        </CardDescription>
        <CardTitle className="font-mono text-[11px] leading-5">shiplean-quick-start</CardTitle>
        <p className="mb-0 text-[10px] font-medium text-[#75a90d]">✓ .agents/skills/</p>
      </Card>
      <Card className="absolute bottom-12 right-0 z-20 hidden w-48 gap-2 border-black/8 bg-white/95 p-4 text-left shadow-xl backdrop-blur md:flex">
        <CardDescription className="font-mono text-[9px] uppercase tracking-wider">
          {isChinese ? '仓库验收' : 'Repository acceptance'}
        </CardDescription>
        <CardTitle className="font-mono text-base tracking-[-0.03em]">pnpm verify</CardTitle>
        <p className="mb-0 text-[10px] text-muted-foreground">check → test → build → e2e</p>
      </Card>
      <div className="relative z-10 overflow-hidden rounded-2xl border border-black/10 bg-card text-left shadow-[0_30px_80px_rgba(0,0,0,0.14)]">
        <div className="flex h-11 items-center border-b px-4">
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="size-2.5 rounded-full bg-muted-foreground/25" />
            <span className="size-2.5 rounded-full bg-muted-foreground/25" />
            <span className="size-2.5 rounded-full bg-muted-foreground/25" />
          </div>
          <span className="mx-auto -translate-x-5 font-mono text-[10px] text-muted-foreground">
            shiplean / repository
          </span>
        </div>
        <div className="grid min-h-[410px] sm:grid-cols-[0.95fr_1.05fr]">
          <aside className="border-b bg-muted/30 p-4 sm:border-b-0 sm:border-r sm:p-6">
            <div className="flex items-center gap-2 font-semibold">
              <FolderTree className="size-4" />
              <span className="text-xs">shiplean/</span>
            </div>
            <div className="mt-5 space-y-2">
              {files.map(([file, description]) => (
                <div className="rounded-lg border border-black/6 bg-white p-3" key={file}>
                  <div className="flex min-w-0 items-center gap-2">
                    <FileText className="size-3.5 shrink-0 text-muted-foreground" />
                    <code className="truncate font-mono text-[10px] font-medium">{file}</code>
                  </div>
                  <p className="mb-0 mt-1 pl-[22px] text-[9px] text-muted-foreground">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </aside>
          <div className="min-w-0 bg-[#0d0d0c] p-5 text-white sm:p-7">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-widest text-white/35">
                  {isChinese ? '真实 Agent 交接流程' : 'Actual Agent handoff'}
                </p>
                <h2 className="mt-2 text-xl font-semibold tracking-tight">
                  {isChinese ? '从仓库合同开始开发' : 'Start from repository contracts'}
                </h2>
              </div>
              <Badge className="hidden bg-[#b9f43a] text-black sm:inline-flex">
                {isChinese ? '仓库内容' : 'Repository content'}
              </Badge>
            </div>
            <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <p className="mb-2 flex items-center gap-2 font-mono text-[9px] uppercase tracking-wider text-white/35">
                <Terminal className="size-3.5" />{' '}
                {isChinese ? '在编程 Agent 中调用' : 'Invoke in your coding agent'}
              </p>
              <code className="font-mono text-xs text-[#b9f43a] sm:text-sm">
                $shiplean-quick-start
              </code>
            </div>
            <ol className="mt-5 space-y-0">
              {[
                isChinese
                  ? '读取 AGENTS.md 与 ARCHITECTURE.md'
                  : 'Read AGENTS.md and ARCHITECTURE.md',
                isChinese ? '收敛并实现一个产品流程' : 'Scope and build one product workflow',
                isChinese ? '运行 pnpm verify 完成验收' : 'Run pnpm verify for acceptance',
              ].map((step, index) => (
                <li
                  className="flex items-center gap-3 border-b border-white/10 py-3 last:border-0"
                  key={step}
                >
                  <span className="grid size-5 shrink-0 place-items-center rounded-full bg-white/8 font-mono text-[9px] text-white/60">
                    {index + 1}
                  </span>
                  <span className="text-xs text-white/65">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}

function LaunchOrbit() {
  return (
    <div className="absolute inset-x-0 bottom-0 h-64" aria-hidden="true">
      <div className="absolute left-1/2 top-1/2 h-36 w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-black/10" />
      <div className="absolute left-1/2 top-1/2 h-24 w-[58%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-black/10" />
      <div className="absolute left-1/2 top-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-2xl bg-[#0d0d0c] text-white shadow-2xl shadow-[#b9f43a]/40">
        <span className="font-mono text-xs">SL</span>
      </div>
      <span className="absolute left-[17%] top-1/2 size-2 rounded-full bg-[#b9f43a] shadow-[0_0_16px_#b9f43a]" />
      <span className="absolute right-[16%] top-[40%] size-2 rounded-full bg-black" />
      <span className="absolute bottom-[16%] left-[48%] size-1.5 rounded-full bg-black/25" />
    </div>
  )
}

function VerifyStrip({ copy }: Readonly<{ copy: (typeof content)[Locale] }>) {
  return (
    <div className="mx-auto mt-12 max-w-2xl overflow-hidden rounded-xl border border-white/10 bg-black/25 text-left">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="size-2 rounded-full bg-white/15" />
        <span className="size-2 rounded-full bg-white/15" />
        <span className="size-2 rounded-full bg-white/15" />
        <code className="ml-2 font-mono text-[9px] text-white/30">pnpm verify</code>
      </div>
      <div className="grid gap-3 p-4 font-mono text-[10px] text-white/65 sm:grid-cols-3 sm:p-5">
        {['format & tests', 'production build', 'HTTP smoke'].map((item) => (
          <p className="mb-0 flex items-center gap-2" key={item}>
            <CheckCircle2 className="size-3.5 text-[#b9f43a]" /> {item}
          </p>
        ))}
        <Separator className="bg-white/10 sm:col-span-3" />
        <p className="mb-0 text-[#b9f43a] sm:col-span-3">✓ {copy.terminalReady}</p>
      </div>
    </div>
  )
}
