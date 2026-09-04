# SEO Metadata Contract v0.1

ShipLean treats page metadata as public-site infrastructure, not as a productized SEO feature. The contract keeps metadata complete and internally consistent without pretending that title length, keyword placement, or generated copy can guarantee rankings.

## Two validation layers

Layer A is the generic metadata contract in `src/lib/seo-validation.ts`. Call `auditSeoMetadata(...)` for any public page configuration. It returns structured `errors` and `warnings`.

Layer B is the Tool Landing integration in `src/lib/tool-landing-validation.ts`. Call `auditToolLandingConfig(...)` when an Agent needs structured diagnostics. Existing consumers may continue to call `validateToolLandingConfig(...)`; it remains backward compatible and returns only blocking error messages.

## Metadata generation

Use `pageHead(...)` for ordinary public pages and `toolPageHead(...)` for Tool Landing pages.

- Supply a page-specific title. `pageHead(...)` appends the configured site name, except when the title is already exactly the site name.
- Supply a non-empty description and a root-relative canonical path.
- `twitter:title` and `twitter:description` are generated with the existing Open Graph metadata.
- `socialImage` is optional. When present, use a root-relative site path or a complete HTTP(S) URL. ShipLean emits absolute `og:image` and `twitter:image` URLs.
- Do not add a placeholder image merely to satisfy metadata. A missing social image is not a validation failure.

## Blocking errors

Verification must fail when metadata is structurally invalid or contradicts the route contract:

- title or description is blank;
- the configured path is not `/` or a root-relative site path;
- SSR renders missing, duplicated, empty, or mismatched core metadata;
- an indexable sitemap URL returns a non-200 response or emits `noindex`;
- canonical or `og:url` does not match the sitemap URL;
- Tool Landing copy makes claims that contradict its typed experience configuration.

The HTTP smoke test reads every same-origin URL in `sitemap.xml` and checks its server-rendered title, description, canonical, Open Graph, Twitter, response status, and indexability. Explicit noindex reference and starter legal pages are tested separately and must remain outside the sitemap.

## Advisory warnings

The audit reports these for human review without failing the legacy validator:

- titles outside roughly 30–65 characters;
- descriptions outside roughly 100–180 characters, with 120–160 as a useful English drafting target;
- an SEO description identical to the visible Hero description;
- a page title that already contains the site name before automatic branding;
- a `primaryKeyword` intent that is not clearly represented in the title, description, or Hero title;
- an invalid or ambiguous `socialImage` value.

These are editorial heuristics, not search-engine limits. Natural language variants are allowed. The validator must not force exact-match repetition, auto-generate descriptions, or convert warnings into hard gates without evidence from real product consumers.

## Authoring workflow

1. Write page metadata from verified product behavior and user intent.
2. Add the route to the correct stable page or Tool Registry identity.
3. Use `primaryKeyword` only as an optional review hint for Tool Landing configs.
4. Run the relevant audit while editing and resolve every error. Review warnings in context.
5. Run `pnpm verify` so unit, build, type, SSR sitemap, and browser contracts execute together.

Keyword research, SERP analysis, ranking promises, and automated content generation remain outside this contract.
