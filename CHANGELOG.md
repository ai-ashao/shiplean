# Changelog

## Unreleased

- Separated the product-template runtime from the ShipLean marketing website in `ai-ashao/shiplean-site`; removed vendor homepage/pricing copy from the starter runtime and switched the checked-in brand to neutral `Starter Product`.
- Added explicit `product.mode = 'saas' | 'tool'` with mode-specific homepage composition, navigation, Header CTA rules, validation, and shared-shell routing.
- Hardened Product Modes so `pnpm verify` follows the active mode, Pricing/App surfaces default on for SaaS and off for Tool, disabled Pricing is excluded from sitemap, disabled App hides login/dashboard/session API, and login/dashboard stay `noindex`.
- Added Tool Landing v0.1 and evolved it into the task-first Tool Landing v0.2 candidate.
- Added Tool Registry, Related Tools, truthful Tool Value Signals, Constraints, Completion Highlights, Capabilities, Helpful Guidance, and Tool structured data.
- Added configurable Tool Directory Footer infrastructure and Header/Footer Guides placement.
- Added localized Tool Registry routes as the shared source for Tool hreflang, language switching, sitemap entries, Related Tools, and Footer discovery.
- Added Tool Landing, Tool Registry, Site Navigation, Tool-site, SaaS-site, and Product Config validators so invalid checked-in configuration can fail verification.
- Added SEO Metadata Contract v0.1 with structured generic and Tool Landing audits, Twitter metadata, optional absolute social images, and sitemap-wide SSR metadata acceptance.
- Added shared Field and Select primitives plus a UI spacing contract for label/control, dropdown-arrow, and adjacent-action separation.
- Added real-browser first-viewport acceptance at 1440×900 and 390×844, including a realistic upload-first reference fixture.
- Enabled GitHub verification on pushes to both `main` and `dev`.
- Added explicit Playwright Chromium installation to the CI runner.
- Replaced free-form Privacy and Terms placeholders with a focused `free-local-tool` legal profile, fixed concise document structures, mapped processing disclosures, default `support@domain` contact, deploy-blocking production review validation, and review-state-driven indexing. Subscription-SaaS legal modules remain deferred.
- Upgraded Vite to `7.3.6` to remove known development-server vulnerabilities.
- Enforced the sandbox session before rendering the dashboard and disabled caching on session responses.
- Added `Secure` to sandbox cookies over HTTPS and fixed the native Google Tag command queue shape.
- Removed remaining ShipCheap-era marks and unsupported MIT license claims from the scaffold UI.

## 0.2.0 - 2026-08-06

- Repositioned the MVP as an Agent-ready TanStack Start SaaS scaffold.
- Added the bundled `shiplean-quick-start` Skill and download → Agent → Skill → MVP workflow.
- Replaced the payment console with a protected starter dashboard and implementation checklist.
- Removed the SEO generator, programmatic tool pages, billing sandbox, orders, entitlements, and credits from the MVP.
- Kept baseline public-site metadata, bilingual routes, security headers, local identity boundary, Cloudflare bundle, and one-command verification.

Production auth, PostgreSQL, payments, email, storage, and account-backed Cloudflare deployment remain phase-two work and are not claimed as complete.
