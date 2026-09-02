import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
  useRouterState,
} from '@tanstack/react-router'
import { ChevronDown, Globe2 } from 'lucide-react'
import type { ReactNode } from 'react'
import { PrivacyControls } from '@/components/privacy-controls'
import { Button } from '@/components/ui/button'
import { type Locale, localeConfig, localeFromPathname } from '@/i18n/config'
import { shellMessages } from '@/i18n/messages'
import { localeAlternatesForPath, localizedPathOrDefault } from '@/i18n/routes'
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
  const locale = localeFromPathname(pathname)
  const copy = shellMessages[locale]
  const homePath = localizedPathOrDefault('home', locale)
  const nav = [
    { label: copy.nav.home, href: homePath },
    { label: copy.nav.workflow, href: `${homePath}#workflow` },
    { label: copy.nav.guides, href: localizedPathOrDefault('guides', locale) },
    { label: copy.nav.pricing, href: localizedPathOrDefault('pricing', locale) },
  ]
  const localeAlternates = localeAlternatesForPath(pathname)

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="ship-header">
        <div className="ship-header-inner">
          <Brand locale={locale} />
          <nav className="ship-main-nav" aria-label={copy.primaryNavigation}>
            {nav.map(({ label, href }) => (
              <a href={href} key={label}>
                {label}
              </a>
            ))}
          </nav>
          <div className="ship-header-actions">
            <nav className="ship-language-menu" aria-label={copy.languageSwitcher}>
              <Globe2 aria-hidden="true" />
              <span className="ship-language-current">{localeConfig[locale].label}</span>
              {localeAlternates.length > 0 && <ChevronDown aria-hidden="true" />}
              {localeAlternates.map((alternate) => (
                <a
                  aria-label={
                    locale === 'zh-CN' ? `切换到${alternate.label}` : `Switch to ${alternate.label}`
                  }
                  className="locale-switch"
                  data-locale-switch
                  href={alternate.path}
                  hrefLang={alternate.locale}
                  key={alternate.locale}
                  lang={alternate.locale}
                >
                  {alternate.shortLabel}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <div className="preview-banner">
        <span className="preview-banner-dot" />
        <span>{copy.previewNotice}</span>
      </div>

      <main>
        <Outlet />
      </main>
      <footer className="ship-footer">
        <div className="ship-footer-inner">
          <p className="ship-footer-copyright">© 2026 ShipLean. All rights reserved.</p>
          <div className="ship-footer-links">
            <a href={localizedPathOrDefault('guides', locale)}>{copy.footer.guides}</a>
            <a href={localizedPathOrDefault('pricing', locale)}>{copy.footer.pricing}</a>
            <a href={localizedPathOrDefault('about', locale)}>{copy.footer.about}</a>
            <a href={localizedPathOrDefault('contact', locale)}>{copy.footer.contact}</a>
            <a href={localizedPathOrDefault('privacy', locale)}>{copy.footer.privacy}</a>
            <a href={localizedPathOrDefault('terms', locale)}>{copy.footer.terms}</a>
            <PrivacyControls locale={locale} />
          </div>
        </div>
      </footer>
    </div>
  )
}

function Brand({ locale }: Readonly<{ locale: Locale }>) {
  const copy = shellMessages[locale]
  return (
    <a
      className="ship-brand"
      href={localizedPathOrDefault('home', locale)}
      aria-label={`ShipLean ${copy.nav.home}`}
    >
      <span className="ship-brand-mark">
        SL
        <i />
      </span>
      <span>ShipLean</span>
    </a>
  )
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  const pathname = useRouterState({ select: (state) => state.location.pathname })
  const locale = localeFromPathname(pathname)
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.name,
    url: site.url,
    description: site.description,
    inLanguage: localeConfig[locale].htmlLang,
  }
  return (
    <html lang={localeConfig[locale].htmlLang}>
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
  const pathname = useRouterState({ select: (state) => state.location.pathname })
  const locale = localeFromPathname(pathname)
  const copy = shellMessages[locale].notFound
  return (
    <section className="grid min-h-[70vh] place-items-center px-5 text-center">
      <div>
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          {copy.kicker}
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight">{copy.title}</h1>
        <Button asChild className="mt-7">
          <a href={localizedPathOrDefault('home', locale)}>{copy.returnHome}</a>
        </Button>
      </div>
    </section>
  )
}
