# ShipLean Agent Contract

## Product boundary

ShipLean is a TanStack Start–only, Cloudflare-first product starter. Do not introduce Next.js, multi-framework abstractions, or claims that an untested provider/runtime is supported.

## Working rules

- Keep the downloaded scaffold useful without a database, payment provider, or external secrets.
- When phase-two payment modules are introduced, keep provider payloads out of domain rules.
- A future payment event must be verified by its adapter before applying entitlements in production.
- Future credits must use an append-only ledger rather than a mutable balance as the source of truth.
- Sandbox behavior must remain visually and technically distinguishable from real payment/auth.
- New public routes need title, description, canonical, and sitemap consideration.
- Preserve keyboard focus, narrow-screen layout, and reduced-motion behavior.

## Completion command

Run `pnpm verify`. It must pass formatting/lint checks, strict TypeScript, domain tests, SEO assertions, and the production build.

## Current non-goals

- Next.js and shared framework packages
- Productized SEO tools or SEO SaaS features
- Payments, orders, webhooks, entitlements, and credits before phase two
- Teams, RBAC, multi-tenancy, and a no-code editor
- Creem, PayPal, Alipay, or WeChat Pay adapters
- Claiming a production Cloudflare smoke test before it has actually run
