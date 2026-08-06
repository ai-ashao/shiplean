import {
  createRootRoute,
  HeadContent,
  Link,
  Outlet,
  Scripts,
  useRouterState,
} from '@tanstack/react-router'
import type { ReactNode } from 'react'
import { PrivacyControls } from '@/components/privacy-controls'
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
        ? [
            {
              name: 'google-site-verification',
              content: publicEnv.googleSiteVerification,
            },
          ]
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

  return (
    <div className="site-shell">
      <header className="site-header">
        <Link
          className="brand"
          to={isChinese ? '/zh' : '/'}
          aria-label={isChinese ? 'ShipLean 首页' : 'ShipLean home'}
        >
          <span className="brand-mark" aria-hidden="true">
            SC
          </span>
          <span>SHIPLEAN</span>
        </Link>
        <nav aria-label={isChinese ? '主导航' : 'Primary navigation'}>
          {isChinese ? (
            <>
              <a href="/zh#product">产品</a>
              <a href="/zh#workflow">方案</a>
              <a href="/zh#pricing">定价</a>
              <Link className="nav-locale" to="/" aria-label="Switch to English">
                EN
              </Link>
              <Link className="nav-cta" to="/login">
                体验脚手架
              </Link>
            </>
          ) : (
            <>
              <a href="/#workflow">Workflow</a>
              <Link to="/guides" activeProps={{ className: 'active' }}>
                Guides
              </Link>
              <Link to="/pricing" activeProps={{ className: 'active' }}>
                Pricing
              </Link>
              <Link className="nav-locale" to="/zh" aria-label="切换到中文版">
                中文
              </Link>
              <Link className="nav-cta" to="/login">
                Starter demo
              </Link>
            </>
          )}
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="site-footer">
        <div>
          <span className="status-dot" />{' '}
          {isChinese ? 'TANSTACK START / CLOUDFLARE 优先' : 'TANSTACK START / CLOUDFLARE-FIRST'}
        </div>
        <p>
          {isChinese
            ? '小步构建。掌控技术栈。留下利润。'
            : 'Build small. Own the stack. Keep the margin.'}
        </p>
        <div className="footer-links">
          {isChinese ? (
            <>
              <a href="/zh#workflow">使用路径</a>
              <a href="/zh#pricing">授权定价</a>
            </>
          ) : (
            <>
              <Link to="/guides">Guides</Link>
              <Link to="/pricing">License</Link>
            </>
          )}
          <PrivacyControls locale={isChinese ? 'zh-CN' : 'en'} />
        </div>
      </footer>
    </div>
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
    <section className="empty-state">
      <p className="eyebrow">404 / LOST CARGO</p>
      <h1>This route missed the launch.</h1>
      <Link className="button button-dark" to="/">
        Return home
      </Link>
    </section>
  )
}
