---
name: shiplean-quick-start
description: Turn a downloaded ShipLean TanStack Start template into a specific product with an AI coding agent. Use when starting a new ShipLean project, adapting its routes and branding, adding product features, or preparing the project for a verified Cloudflare-first release.
---

# ShipLean Quick Start

Build the user's product inside the downloaded ShipLean repository while preserving its tested boundaries.

## Orient

1. Read `AGENTS.md` completely.
2. Read `ARCHITECTURE.md` for module ownership and state boundaries.
3. Inspect `README.md`, `package.json`, the relevant routes, and `git status` when Git is present.
4. Translate the user's product idea into a concrete first user task, public routes, required state, and explicit non-goals. Ask only when a missing choice would materially change the product.

## Build

1. Reuse the existing TanStack Start and Cloudflare-first structure. Do not introduce Next.js or multi-framework abstractions.
2. Keep the anonymous core useful without auth, a database, or secrets unless the requested feature genuinely requires them.
3. For every new public route, add a title, description, canonical URL, and sitemap consideration.
4. Keep sandbox auth and billing visibly separate from production integrations.
5. Keep provider payloads in adapters. Require verified payment events before production entitlements. Preserve the append-only credits ledger as the source of truth.
6. Preserve keyboard focus, narrow-screen behavior, and reduced-motion behavior when changing UI.
7. Use `TASKS/add-module.md` as the contract when adding a substantial module.

## Handle production integrations

Treat Better Auth, PostgreSQL/Drizzle, Stripe, Resend, R2, and account-backed Cloudflare deployment as unconfigured until the repository and environment prove otherwise. When the user requests one:

1. Inspect its existing contract and manifest.
2. Implement the adapter without leaking provider types into domain rules.
3. Add provider-specific verification and failure tests.
4. Never describe sandbox results as production evidence.

## Finish

1. Run `pnpm verify`.
2. Fix failures caused by the work and rerun the complete command.
3. Report the product behavior delivered, verification evidence, files changed, and any production boundary still deferred.

## Example invocation

`Use $shiplean-quick-start to turn this template into a bilingual image metadata cleaner. Keep the first workflow anonymous and deployable to Cloudflare.`
