import {
  createRootRoute,
  HeadContent,
  Link,
  Outlet,
  Scripts,
  useRouterState,
} from '@tanstack/react-router'
import { BookOpen, Box, Cloud, LayoutDashboard, MonitorPlay, Tags, Workflow } from 'lucide-react'
import type { ReactNode } from 'react'
import { PrivacyControls } from '@/components/privacy-controls'
import { Button } from '@/components/ui/button'
import { publicEnv } from '@/lib/config/env'
import { site } from '@/lib/site'
import styles from '@/styles.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: site.name },
      ...(publicEnv.googleSiteVerification
        ? [{ name: 'google-site-verification', content: publicEnv.googleSiteVerification }]
        : []),
    ],
    links: [{ rel: 'stylesheet', href: styles }],
  }),
  component: RootComponent,
  shellComponent: RootDocument,
  notFoundComponent: NotFound,
})

function RootComponent() {
  const pathname = useRouterState({ select: (state) => state.location.pathname })
  const isChinese = pathname === '/zh' || pathname.startsWith('/zh/')

  const nav = isChinese
    ? [
        { label: '首页', to: '/zh', icon: LayoutDashboard },
        { label: '使用流程', href: '/zh#workflow', icon: Workflow },
        { label: '指南', to: '/guides', icon: BookOpen },
        { label: '定价', to: '/pricing', icon: Tags },
      ]
    : [
        { label: 'Home', to: '/', icon: LayoutDashboard },
        { label: 'Workflow', href: '/#workflow', icon: Workflow },
        { label: 'Guides', to: '/guides', icon: BookOpen },
        { label: 'Pricing', to: '/pricing', icon: Tags },
      ]

  return (
    <div className="min-h-screen bg-background text-foreground lg:pl-64">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r bg-card lg:flex">
        <div className="flex h-16 items-center border-b px-5">
          <Brand isChinese={isChinese} />
        </div>
        <nav
          className="flex-1 space-y-1 p-4"
          aria-label={isChinese ? '主导航' : 'Primary navigation'}
        >
          {nav.map(({ label, to, href, icon: Icon }) =>
            href ? (
              <a className="side-nav-link" href={href} key={label}>
                <Icon /> {label}
              </a>
            ) : (
              <Link
                className="side-nav-link"
                activeProps={{ className: 'side-nav-link side-nav-link-active' }}
                to={to}
                key={label}
              >
                <Icon /> {label}
              </Link>
            ),
          )}
        </nav>
        <div className="space-y-3 border-t p-4">
          <div className="rounded-lg border bg-background p-3">
            <p className="m-0 flex items-center gap-2 text-xs font-medium">
              <Cloud className="size-3.5 text-[#5eae73]" /> Cloudflare-first
            </p>
            <p className="mb-0 mt-1 text-[11px] leading-5 text-muted-foreground">
              TanStack Start only. One runtime, one verification contract.
            </p>
          </div>
          <PrivacyControls locale={isChinese ? 'zh-CN' : 'en'} />
        </div>
      </aside>

      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-card/95 px-4 backdrop-blur sm:px-6">
        <div className="lg:hidden">
          <Brand isChinese={isChinese} />
        </div>
        <p className="hidden items-center gap-2 text-xs text-muted-foreground lg:flex">
          <Box className="size-3.5" /> Agent-ready product scaffold
        </p>
        <div className="flex items-center gap-2">
          <span className="hidden rounded-full bg-accent px-3 py-1.5 text-[11px] font-medium text-accent-foreground sm:inline-flex">
            <span className="mr-1.5 size-1.5 rounded-full bg-primary" /> Preview mode
          </span>
          <Link
            className="grid size-8 place-items-center rounded-full border bg-background text-[11px] font-semibold"
            to={isChinese ? '/' : '/zh'}
            aria-label={isChinese ? 'Switch to English' : '切换到中文版'}
          >
            {isChinese ? 'EN' : '中'}
          </Link>
          <Link
            className="grid size-8 place-items-center rounded-full border bg-card text-muted-foreground hover:text-foreground"
            to="/login"
            aria-label={isChinese ? '打开模板演示' : 'Open starter demo'}
          >
            <MonitorPlay className="size-4" />
          </Link>
        </div>
      </header>

      <div className="border-b border-[#f0c7b5] bg-[#ffe7da] px-4 py-2 text-center text-xs text-[#b4513b] sm:px-6">
        {isChinese
          ? '预览环境已启用 · 不会连接付款、数据库或生产认证服务'
          : 'Preview environment enabled · No payment, database, or production auth service is connected'}
      </div>

      <main>
        <Outlet />
      </main>
      <footer className="border-t bg-card px-5 py-8 sm:px-8">
        <div className="mx-auto flex max-w-[1180px] flex-col gap-4 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p className="m-0">© ShipLean · Build small. Keep control.</p>
          <div className="flex items-center gap-5">
            <Link to="/guides">Guides</Link>
            <Link to="/pricing">License</Link>
            <span>TanStack Start · Cloudflare</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

function Brand({ isChinese }: Readonly<{ isChinese: boolean }>) {
  return (
    <Link
      className="flex items-center gap-2.5 font-semibold tracking-[-0.02em]"
      to={isChinese ? '/zh' : '/'}
      aria-label={isChinese ? 'ShipLean 首页' : 'ShipLean home'}
    >
      <span className="relative grid size-8 place-items-center rounded-lg bg-primary font-mono text-[10px] text-primary-foreground">
        SL
        <i className="absolute -right-0.5 -top-0.5 size-2 rounded-full border-2 border-card bg-[#5eae73]" />
      </span>
      <span>ShipLean</span>
    </Link>
  )
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  const pathname = useRouterState({ select: (state) => state.location.pathname })
  const language = pathname === '/zh' || pathname.startsWith('/zh/') ? 'zh-CN' : 'en'
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.name,
    url: site.url,
    description: site.description,
  }
  return (
    <html lang={language}>
      <head>
        <HeadContent />
      </head>
      <body>
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        {children}
        <Scripts />
      </body>
    </html>
  )
}

function NotFound() {
  return (
    <section className="grid min-h-[70vh] place-items-center px-5 text-center">
      <div>
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          404 / Not found
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight">
          This route is not part of the starter.
        </h1>
        <Button asChild className="mt-7">
          <Link to="/">Return home</Link>
        </Button>
      </div>
    </section>
  )
}
