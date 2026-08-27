import {
  createRootRoute,
  HeadContent,
  Link,
  Outlet,
  Scripts,
  useRouterState,
} from '@tanstack/react-router'
import { MonitorPlay } from 'lucide-react'
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
        { label: '首页', to: '/zh' },
        { label: '使用流程', href: '/zh#workflow' },
        { label: '指南', to: '/guides' },
        { label: '定价', to: '/pricing' },
      ]
    : [
        { label: 'Home', to: '/' },
        { label: 'Workflow', href: '/#workflow' },
        { label: 'Guides', to: '/guides' },
        { label: 'Pricing', to: '/pricing' },
      ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="ship-header">
        <div className="ship-header-inner">
          <Brand isChinese={isChinese} />
          <nav className="ship-main-nav" aria-label={isChinese ? '主导航' : 'Primary navigation'}>
            {nav.map(({ label, to, href }) =>
              href ? (
                <a href={href} key={label}>
                  {label}
                </a>
              ) : (
                <Link to={to} key={label}>
                  {label}
                </Link>
              ),
            )}
          </nav>
          <div className="ship-header-actions">
            <span className="preview-pill">
              <span /> {isChinese ? '预览模式' : 'Preview mode'}
            </span>
            <Link
              className="locale-switch"
              to={isChinese ? '/' : '/zh'}
              aria-label={isChinese ? 'Switch to English' : '切换到中文版'}
            >
              {isChinese ? 'EN' : '中'}
            </Link>
            <Link
              className="demo-link"
              to="/login"
              aria-label={isChinese ? '打开模板演示' : 'Open starter demo'}
            >
              <MonitorPlay />
              <span>{isChinese ? '打开演示' : 'Open demo'}</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="preview-banner">
        <span className="preview-banner-dot" />
        <span>
          {isChinese
            ? '预览环境已启用 · 不会连接付款、数据库或生产认证服务'
            : 'Preview environment enabled · No payment, database, or production auth service is connected'}
        </span>
      </div>

      <main>
        <Outlet />
      </main>
      <footer className="ship-footer">
        <div className="ship-footer-inner">
          <div>
            <Brand isChinese={isChinese} />
            <p>© ShipLean · Build small. Keep control.</p>
          </div>
          <div className="ship-footer-links">
            <Link to="/guides">Guides</Link>
            <Link to="/pricing">License</Link>
            <span>TanStack Start · Cloudflare</span>
            <PrivacyControls locale={isChinese ? 'zh-CN' : 'en'} />
          </div>
        </div>
      </footer>
    </div>
  )
}

function Brand({ isChinese }: Readonly<{ isChinese: boolean }>) {
  return (
    <Link
      className="ship-brand"
      to={isChinese ? '/zh' : '/'}
      aria-label={isChinese ? 'ShipLean 首页' : 'ShipLean home'}
    >
      <span className="ship-brand-mark">
        SL
        <i />
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
