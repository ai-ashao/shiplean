# ShipLean Agent Contract

## Product boundary

ShipLean is a TanStack Start–only, Cloudflare-first product starter. Do not introduce Next.js, multi-framework abstractions, or claims that an untested provider/runtime is supported.

## Working rules

- Keep the downloaded scaffold useful without a database, payment provider, or external secrets.
- When phase-two payment modules are introduced, keep provider payloads out of domain rules.
- A future payment event must be verified by its adapter before applying entitlements in production.
- Future credits must use an append-only ledger rather than a mutable balance as the source of truth.
- Sandbox behavior must remain visually and technically distinguishable from real payment/auth.
- File-based tool-site landing pages must use a vertical first-viewport structure and fully show the upload area. After valid files are selected, navigate to a separate editor/workbench route; do not place the editor workbench on the landing page.
- New public routes need title, description, canonical, and sitemap consideration.
- Register localized public routes by stable page identity. Only real translated equivalents may produce a language switch or `hreflang`; derive sitemap entries from the same registry.
- Localized variants of one page must render the same shared page component. Keep user-facing copy in typed locale dictionaries; do not duplicate substantial JSX across locale route files.
- Privacy and Terms routes for free, account-free, browser-local tools must use the shared `free-local-tool` legal template and `src/modules/legal-profile.ts`; do not replace them with free-form route copy. Keep `reviewStatus: starter` until product facts and appropriate legal review are complete.
- Default product contact and support email is `support@<public-domain>` unless the user specifies another address.
- Product deployment must pass `pnpm legal:check`; `starter` legal pages must remain `noindex` and outside the sitemap.
- Preserve keyboard focus, narrow-screen layout, and reduced-motion behavior.

## Completion command

Run `pnpm verify`. It must pass formatting/lint checks, strict TypeScript, domain tests, SEO assertions, and the production build.
Before a production deployment, `pnpm deploy` must also pass the strict legal-profile gate.

## Current non-goals

- Next.js and shared framework packages
- Productized SEO tools or SEO SaaS features
- Payments, orders, webhooks, entitlements, and credits before phase two
- Subscription-SaaS Privacy / Terms modules before their later dedicated phase
- Teams, RBAC, multi-tenancy, and a no-code editor
- Creem, PayPal, Alipay, or WeChat Pay adapters
- Claiming a production Cloudflare smoke test before it has actually run
