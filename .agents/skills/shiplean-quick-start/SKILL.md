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
4. For public tools, read `docs/tool-landing-standard-v0.2.md` and `docs/tool-landing-v0.2-implementation.md`.
5. Translate the user's product idea into a concrete first user task, public routes, required state, and explicit non-goals. Ask only when a missing choice would materially change the product.

## Establish project identity

Treat an explicit request to use this Skill to create or start a new product as authorization to create and bind an independent private GitHub repository for that product. Do not require the user to perform Git setup manually.

1. Derive a repository slug from the product name. Use the authenticated GitHub owner and private visibility by default. Ask only when the product name or owner cannot be inferred safely; never default to public visibility.
2. If the checkout still points at the canonical ShipLean repository, rename that remote to `template`, disable its push URL, and remove any branch upstream that targets it. Keep it available for fetch-only template comparison.
3. If the downloaded archive has no Git metadata, initialize a repository with `main` as its initial branch. Preserve any existing product repository whose origin is not the ShipLean template instead of creating a duplicate.
4. Use authenticated GitHub tooling to create the independent repository without overwriting or repurposing an existing remote repository. Bind the new repository as `origin`, read back the remote branch SHA, and verify it before editing product code.
5. If GitHub authentication, ownership, or a repository-name collision prevents safe creation, stop the external mutation and report the single concrete gate. Never fall back to the ShipLean repository.

The hard invariant is that product-specific commits and pushes must never target `ai-ashao/shiplean`.

## Build

1. Reuse the existing TanStack Start and Cloudflare-first structure. Do not introduce Next.js or multi-framework abstractions.
2. Keep the anonymous core useful without auth, a database, or secrets unless the requested feature genuinely requires them.
3. For every new public route, add a title, description, canonical URL, and sitemap consideration.
4. Register localized public routes under a stable page identity. Generate language switches, hreflang, canonical paths, and sitemap entries from that registry. Never fabricate a locale equivalent that does not exist.
5. Make locale route files thin wrappers around shared page components. Keep user-facing copy typed and structurally complete across shipped locales.

### Tool-site shell

6. Tool-site Header has no default CTA. Do not add `Get started`, `Try free`, `Sign up`, or similar SaaS actions unless the user's real product explicitly requires them.
7. Configure Header/Footer through `src/lib/site-navigation.ts`, not page-specific markup.
8. For a small tool catalog, prefer `Logo | Tools | Guides | Language`.
9. For a large catalog, prefer `Logo | Tools | Language` and move Guides to Footer.
10. Guides belongs in one primary navigation area only: Header OR Footer.
11. Use Footer tool groups for 3–4 important categories, 4–6 live tools per group, and a category `View more` link when needed. Do not dump the full catalog into Footer.
12. Product repositories populate `src/modules/tool-registry.ts` with real live tools. Planned tools must not appear as working Footer or Related Tool destinations.

### Default Tool Landing

13. Unless the user explicitly requests another layout, use the single `tool-default` `ToolLandingPage`.
14. Do not invent new page hierarchies for visual variety.
15. Keep the task-first order: compact intro → primary tool → constraints → value signals → completion highlights → supporting sections.
16. Treat the first viewport as a hard product contract. At 1440×900 and 390×844, keep the H1, concise description, complete primary tool, primary CTA, configured critical constraints, core access signals, and configured completion highlights visible without scrolling.
17. When true, make `Free`, `Online`, `No installation`, and `No signup` obvious.
18. Never invent trust claims. `Browser-based` requires online local processing. Local-data claims require local processing. `No watermark` requires actual watermark-free output.
19. Put basic input limits in typed `constraints`, not hidden in FAQ.
20. Put 3–5 concrete task abilities in `completion.highlights`.
21. Prefer `capabilities` over generic SaaS-style `features`. Keep capability wording concrete and tied to shipped behavior.
22. Render How It Works only when it adds real task knowledge. Omit generic `Upload → Process → Download` filler.
23. Use Helpful Guidance for task-specific standards, decisions, limitations, and recommendations that help the user complete the job.
24. Treat generic SEO Supporting Content as the lowest-priority explanatory layer.
25. Use `toolPageHead(config)` for Tool Landing metadata.
26. Use Tool Registry for Related Tools. Only link live canonical destinations and omit the current tool.
27. Structured data must match visible, provable behavior.

### Explicit reference/custom layout

28. If the user explicitly asks to follow a reference product, competitor, screenshot, or custom layout, that request overrides the default `ToolLandingPage` hierarchy.
29. Implement the custom composition locally in the product repository. Do not add a competitor-specific ShipLean preset.
30. Preserve the shared Shell, SEO, i18n, accessibility, truthful value signals, mobile usability, and first-viewport quality gates.
31. Explicit design overrides the default layout, not the quality contract.

### Brand

32. Keep brand variation in product-level tokens and assets: accent, typography, radius, surfaces, borders, logo, and decorative language.
33. Do not introduce a Theme DSL without repeated evidence from at least two real product consumers.

## Handle production integrations

Treat Better Auth, PostgreSQL/Drizzle, Stripe, Resend, R2, and account-backed Cloudflare deployment as unconfigured until the repository and environment prove otherwise.

## Finish

1. Run `pnpm verify`.
2. Fix failures caused by the work and rerun the complete command.
3. For a default Tool Landing or meaningful layout change, require real-browser first-viewport evidence at 1440×900 and 390×844.
4. Do not claim the viewport contract passed from source inspection or jsdom.
5. Verify no horizontal overflow.
6. Verify Header has no unintended CTA and Guides appears in only the configured primary navigation area.
7. Verify Footer groups contain only intended live tools.
8. Verify visible and metadata copy correctly reflects free/online/install/signup/processing behavior.
9. Recheck Git status, branch, remotes, and target repository before commit/push.
10. Report changed files, verification evidence, both viewport results, and any remaining production boundary.

## Example invocation

`Use $shiplean-quick-start to build a free bilingual image utility. Use the default tool layout, keep the first task anonymous, and configure a Tool Directory footer from the live registry.`
