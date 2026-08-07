# Changelog

## Unreleased

- Upgraded Vite to `7.3.6` to remove known development-server vulnerabilities.
- Enforced the sandbox session before rendering the dashboard and disabled caching on session responses.
- Added `Secure` to sandbox cookies over HTTPS and fixed the native Google Tag command queue shape.
- Removed remaining ShipCheap-era marks and unsupported MIT license claims from the scaffold UI.
- Increased the GitHub verification job timeout so Runner queue time does not cancel the job before execution.

## 0.2.0 - 2026-08-06

- Repositioned the MVP as an Agent-ready TanStack Start SaaS scaffold.
- Added the bundled `shiplean-quick-start` Skill and download → Agent → Skill → MVP workflow.
- Replaced the payment console with a protected starter dashboard and implementation checklist.
- Removed the SEO generator, programmatic tool pages, billing sandbox, orders, entitlements, and credits from the MVP.
- Kept baseline public-site metadata, bilingual routes, security headers, local identity boundary, Cloudflare bundle, and one-command verification.

Production auth, PostgreSQL, payments, email, storage, and account-backed Cloudflare deployment remain phase-two work and are not claimed as complete.
