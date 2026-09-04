---
name: shiplean-quick-start
description: Turn a downloaded ShipLean TanStack Start template into an independently owned product repository with an AI coding agent. Use when starting a new ShipLean project, adapting its routes and branding, adding product features, or preparing the project for a verified Cloudflare-first release.
---

# ShipLean Quick Start

Build the user's product from the downloaded ShipLean template while preserving its tested boundaries and giving the product an independent Git identity.

ShipLean supports both SaaS products and public utility/tool products. Apply Tool-site rules only when the requested product is a tool site or contains public Tool Landing pages.

## Orient

1. Read `AGENTS.md` completely.
2. Read `ARCHITECTURE.md` for module ownership and state boundaries.
3. Inspect `README.md`, `package.json`, the relevant routes, `git status`, the current branch, and `git remote -v` when Git is present.
4. For public tools, read `docs/tool-landing-standard-v0.2.md`, `docs/tool-landing-v0.2-implementation.md`, and `docs/tool-landing-v0.2.1-hardening.md`.
5. Translate the user's product idea into a concrete first user task, public routes, required state, and explicit non-goals.

## Establish project identity

Treat an explicit request to use this Skill to create or start a new product as authorization to create and bind an independent private GitHub repository for that product.

1. Derive a repository slug from the product name. Use the authenticated GitHub owner and private visibility by default.
2. If the checkout still points at the canonical ShipLean repository, rename that remote to `template`, disable its push URL, and remove any branch upstream that targets it.
3. If the downloaded archive has no Git metadata, initialize a repository with `main` as its initial branch.
4. Use authenticated GitHub tooling to create the independent repository without overwriting an existing repository. Bind it as `origin`, read back the remote branch SHA, and verify it before editing product code.
5. If GitHub authentication, ownership, or a repository-name collision prevents safe creation, stop the external mutation and report the concrete gate.

The hard invariant is that product-specific commits and pushes must never target `ai-ashao/shiplean`.

## Build

1. Reuse the existing TanStack Start and Cloudflare-first structure.
2. Keep the anonymous core useful without auth, a database, or secrets unless the requested feature genuinely requires them.
3. For every new public route, use the shared metadata helpers, add title, description, canonical URL, and sitemap consideration, and follow `docs/seo-metadata-standard.md`.
4. Register localized public routes under a stable identity. For public tools, use the stable Tool Registry id and its localized routes as the route source of truth for language switching, hreflang, sitemap, Related Tools, and Footer discovery.
5. Never fabricate a locale equivalent that does not exist.
6. Keep user-facing copy typed and structurally complete across shipped locales.
7. For a free, account-free tool whose primary inputs stay in the browser, configure Privacy Policy and Terms of Service through the shared `free-local-tool` profile in `src/modules/legal-profile.ts`. Derive the default contact as `support@<public-domain>` and require the reviewed-profile validator before production launch. For subscription SaaS, keep the legal profile in `starter` and report that the dedicated SaaS legal module is not implemented yet.
8. Follow `docs/ui-control-spacing.md`: use shared fields and controls, preserve label-to-control spacing, and reserve explicit space between dropdown text, arrows, and adjacent actions.

### Tool-site shell

9. Tool-site Header has no default CTA. Do not add `Get started`, `Try free`, `Sign up`, or similar SaaS actions unless the user's real product explicitly requires them.
10. Configure Header/Footer through `src/lib/site-navigation.ts`, not page-specific markup.
11. For a small tool catalog, prefer `Logo | Tools | Guides | Language`.
12. For a large catalog, prefer `Logo | Tools | Language` and move Guides to Footer.
13. Guides belongs in one primary navigation area only: Header OR Footer.
14. Use Footer tool groups for 3–4 important categories, 4–6 live tools per group, and a category `View more` link when needed.
15. Populate `src/modules/tool-registry.ts` with real live tools. Planned or unknown tools must fail navigation/config validation instead of silently disappearing.
16. Remove starter `Workflow` and `Pricing` links when converting the shell to the default Tool-site navigation unless the user explicitly requires a paid Tool-site variant.

### Default Tool Landing

17. Unless the user explicitly requests another layout, use the single `tool-default` `ToolLandingPage`.
18. Keep the task-first order: compact intro → primary tool → constraints → value signals → completion highlights → supporting sections.
19. At 1440×900 and 390×844, keep H1, concise description, complete primary tool, primary CTA, configured critical constraints, core access signals, and configured completion highlights visible without scrolling.
20. When true, make `Free`, `Online`, `No installation`, and `No signup` obvious.
21. Never invent trust claims. `Browser-based` requires online local processing. Local-data claims require local processing. `No watermark` requires actual watermark-free output.
22. Put basic input limits in typed `constraints`.
23. Put 3–5 concrete task abilities in `completion.highlights`.
24. Prefer `capabilities` over generic SaaS-style `features`.
25. Render How It Works only when it adds real task knowledge.
26. Use Helpful Guidance for task-specific standards, decisions, limitations, and recommendations.
27. Treat generic SEO Supporting Content as the lowest-priority explanatory layer.
28. Use `toolPageHead(config)` for Tool Landing metadata and register the tool routes so hreflang can be generated truthfully.
29. Use Tool Registry for Related Tools. Only link live canonical destinations and render the correct localized route.
30. Structured data must match visible, provable behavior.
31. Add checked-in Tool Landing configs to a contract test and require `validateToolLandingConfig(...)` to return no errors. Use `auditToolLandingConfig(...)` to review advisory SEO warnings without treating heuristic length or keyword guidance as hard gates.

### Explicit reference/custom layout

32. If the user explicitly asks to follow a reference product, competitor, screenshot, or custom layout, that request overrides the default `ToolLandingPage` hierarchy.
33. Implement the custom composition locally in the product repository. Do not add a competitor-specific ShipLean preset.
34. Preserve the shared Shell, SEO, i18n, accessibility, truthful value signals, mobile usability, and first-viewport quality gates.
35. Preserve semantic QA markers such as `data-tool-title`, `data-tool-primary-region`, and `data-tool-primary-action` so shared browser acceptance can still verify the page.
36. Explicit design overrides the default layout, not the quality contract.

### Brand

37. Keep brand variation in product-level tokens and assets: accent, typography, radius, surfaces, borders, logo, and decorative language.
38. Do not introduce a Theme DSL without repeated evidence from at least two real product consumers.

## Handle production integrations

Treat Better Auth, PostgreSQL/Drizzle, Stripe, Resend, R2, and account-backed Cloudflare deployment as unconfigured until the repository and environment prove otherwise.

## Finish

1. Run `pnpm verify`.
2. Fix failures caused by the work and rerun the complete command.
3. For a Tool Landing or meaningful layout change, require real-browser first-viewport evidence at 1440×900 and 390×844.
4. For upload-first tools, compare against `/tool-reference-upload`, not only the smaller text fixture.
5. Do not claim the viewport contract passed from source inspection or jsdom.
6. Verify no horizontal overflow.
7. For Tool-site products, require `validateToolSiteNavigation(siteNavigation, toolRegistry)` to return no issues.
8. Require `validateToolRegistry(toolRegistry)` and every checked-in Tool Landing config validation to return no issues.
9. Verify Header has no unintended Tool-site CTA and Guides appears in only the configured primary navigation area.
10. Verify Footer groups contain only intended live tools.
11. Verify visible and metadata copy correctly reflects free/online/install/signup/processing behavior.
12. Confirm every sitemap URL passes the SSR metadata acceptance in `pnpm e2e`, and keep noindex routes outside the sitemap.
13. Before production deployment, run `pnpm legal:check`; do not bypass its reviewed-profile requirement.
14. Recheck Git status, branch, remotes, and target repository before commit/push.
15. Report changed files, verification evidence, both viewport results, and any remaining production boundary.
