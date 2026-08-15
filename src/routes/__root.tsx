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
  const isHome = pathname === '/' || pathname === '/zh' || pathname === '/zh/'

  return (
    <div className="min-h-screen bg-[#dededc] text-foreground">
      <header className="relative z-50 mx-3 mt-3 rounded-t-[2rem] bg-[#fcfcf9] sm:rounded-t-[2.75rem]">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
          <Link
            className="flex items-center gap-2.5 font-semibold tracking-tight"
            to={isChinese ? '/zh' : '/'}
            aria-label={isChinese ? 'ShipLean 首页' : 'ShipLean home'}
          >
            <span
              className="relative grid size-8 place-items-center rounded-lg bg-primary font-mono text-[10px] text-primary-foreground shadow-sm"
              aria-hidden="true"
            >
              SL
              <i className="absolute -right-0.5 -top-0.5 size-2 rounded-full border-2 border-[#fcfcf9] bg-[#b9f43a]" />
            </span>
            <span>ShipLean</span>
          </Link>
          <nav
            className="flex items-center gap-1"
            aria-label={isChinese ? '主导航' : 'Primary navigation'}
          >
            {isChinese ? (
              <>
                <a
                  className="hidden rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground sm:block"
                  href="/zh#workflow"
                >
                  使用流程
                </a>
                <Link
                  className="hidden rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground sm:block"
                  to="/pricing"
                >
                  定价
                </Link>
                <Link
                  className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground"
                  to="/"
                  aria-label="Switch to English"
                >
                  EN
                </Link>
              </>
            ) : (
              <>
                <a
                  className="hidden rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground sm:block"
                  href="/#workflow"
                >
                  Workflow
                </a>
                <Link
                  className="hidden rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground sm:block"
                  to="/guides"
                  activeProps={{ className: 'bg-accent text-foreground' }}
                >
                  Guides
                </Link>
                <Link
                  className="hidden rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground sm:block"
                  to="/pricing"
                  activeProps={{ className: 'bg-accent text-foreground' }}
                >
                  Pricing
                </Link>
                <Link
                  className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground"
                  to="/zh"
                  aria-label="切换到中文版"
                >
                  中文
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>
      <main
        className={
          isHome
            ? undefined
            : 'mx-3 overflow-hidden rounded-b-[2rem] bg-[#fcfcf9] sm:rounded-b-[2.75rem]'
        }
      >
        <Outlet />
      </main>
      <footer className="mx-3 mt-3 rounded-[2rem] bg-[#fcfcf9] sm:rounded-[2.75rem]">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-10 text-sm text-muted-foreground sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-emerald-500" />
            {isChinese ? 'TanStack Start · Cloudflare 优先' : 'TanStack Start · Cloudflare-first'}
          </div>
          <p className="m-0">{isChinese ? '小步构建，保持掌控。' : 'Build small. Keep control.'}</p>
          <div className="flex items-center gap-4">
            <Link className="hover:text-foreground" to="/guides">
              Guides
            </Link>
            <Link className="hover:text-foreground" to="/pricing">
              License
            </Link>
            <PrivacyControls locale={isChinese ? 'zh-CN' : 'en'} />
          </div>
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
