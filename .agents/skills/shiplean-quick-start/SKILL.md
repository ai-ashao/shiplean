---
name: shiplean-quick-start
description: Turn a downloaded ShipLean TanStack Start template into an independently owned product repository with an AI coding agent. Use when starting a new ShipLean project, adapting its routes and branding, adding product features, or preparing the project for a verified Cloudflare-first release.
---

# ShipLean Quick Start

Build the user's product from the downloaded ShipLean template while preserving its tested boundaries and giving the product an independent Git identity.

## Orient

1. Read `AGENTS.md` completely.
2. Read `ARCHITECTURE.md` for module ownership and state boundaries.
3. Inspect `README.md`, `package.json`, the relevant routes, `git status`, the current branch, and `git remote -v` when Git is present.
4. Translate the user's product idea into a concrete first user task, public routes, required state, and explicit non-goals. Ask only when a missing choice would materially change the product.

## Establish project identity

Treat an explicit request to use this Skill to create or start a new product as authorization to create and bind an independent private GitHub repository for that product. Do not require the user to perform Git setup manually.

1. Derive a repository slug from the product name. Use the authenticated GitHub owner and private visibility by default. Ask only when the product name or owner cannot be inferred safely; never default to public visibility.
2. If the checkout still points at the canonical ShipLean repository, rename that remote to `template`, disable its push URL, and remove any branch upstream that targets it. Keep it available for fetch-only template comparison.
3. If the downloaded archive has no Git metadata, initialize a repository with `main` as its initial branch. Preserve any existing product repository whose origin is not the ShipLean template instead of creating a duplicate.
4. Use authenticated GitHub tooling to create the independent repository without overwriting or repurposing an existing remote repository. Bind the new repository as `origin` and read it back before editing product code.
5. If GitHub authentication, ownership, or a repository-name collision prevents safe creation, stop the external mutation and report the single concrete gate. Never fall back to the ShipLean repository.

The hard invariant is that product-specific commits and pushes must never target `ai-ashao/shiplean`. Before every commit or push, verify that `origin` is the independently created product repository and that the `template` push URL remains disabled. Preserve and exclude unrelated pre-existing working-tree changes.

## Build

1. Reuse the existing TanStack Start and Cloudflare-first structure. Do not introduce Next.js or multi-framework abstractions.
2. Keep the anonymous core useful without auth, a database, or secrets unless the requested feature genuinely requires them.
3. For every new public route, add a title, description, canonical URL, and sitemap consideration.
4. Register localized public routes under a stable page identity in the locale route registry. Generate language switches, `hreflang`, canonical paths, and sitemap entries from that registry. Never fabricate an alternate for a locale whose equivalent page does not exist.
5. Make locale route files thin wrappers around one shared page component. Put user-facing copy in a typed dictionary built with `defineMessages`; a new field or supported locale must fail TypeScript until every shipped translation is structurally complete.
6. For a file-based tool site, read `docs/tool-landing-standard-v0.1.md` and use its upload-first route and interaction-state contracts. Stack the concise intro above the complete upload area, keep both within the first viewport, implement and verify the required upload states, and navigate accepted files to a separate editor/workbench route. Do not render the editor workbench on the landing page. When live relevant tools exist, place a compact related-tools section immediately after the upload-first region without letting it displace the upload area from the first viewport.
7. Keep sandbox auth and billing visibly separate from production integrations.
8. Keep provider payloads in adapters. Require verified payment events before production entitlements. Preserve the append-only credits ledger as the source of truth.
9. Preserve keyboard focus, narrow-screen behavior, and reduced-motion behavior when changing UI.
10. Use `TASKS/add-module.md` as the contract when adding a substantial module.

## Handle production integrations

Treat Better Auth, PostgreSQL/Drizzle, Stripe, Resend, R2, and account-backed Cloudflare deployment as unconfigured until the repository and environment prove otherwise. When the user requests one:

1. Inspect its existing contract and manifest.
2. Implement the adapter without leaking provider types into domain rules.
3. Add provider-specific verification and failure tests.
4. Never describe sandbox results as production evidence.

## Finish

1. Run `pnpm verify`.
2. Fix failures caused by the work and rerun the complete command.
3. Recheck `git status`, the active branch, `git remote -v`, and the target repository. Do not proceed if `origin` resolves to the ShipLean template.
4. For a new product repository created by this workflow, commit only the intended product files, push the verified branch to `origin`, and read back the remote branch SHA.
5. Report the product behavior delivered, repository URL and pushed SHA, verification evidence, files changed, and any production boundary still deferred. If repository creation or push was blocked, report it as incomplete rather than implying delivery.

## Example invocation

`Use $shiplean-quick-start to turn this template into a bilingual image metadata cleaner. Keep the first workflow anonymous and deployable to Cloudflare.`
