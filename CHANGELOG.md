# Changelog

## Unreleased

- Added Tool Landing v0.1 and evolved it into the task-first Tool Landing v0.2 candidate.
- Added Tool Registry, Related Tools, truthful Tool Value Signals, Constraints, Completion Highlights, Capabilities, Helpful Guidance, and Tool structured data.
- Added configurable Tool Directory Footer infrastructure and Header/Footer Guides placement.
- Added localized Tool Registry routes as the shared source for Tool hreflang, language switching, sitemap entries, Related Tools, and Footer discovery.
- Added Tool Landing, Tool Registry, Site Navigation, and Tool-site validators so invalid checked-in configuration can fail verification.
- Added real-browser first-viewport acceptance at 1440×900 and 390×844, including a realistic upload-first reference fixture.
- Enabled GitHub verification on pushes to both `main` and `dev`.
- Added explicit Playwright Chromium installation to the CI runner.
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
