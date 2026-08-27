# Tool Landing Standard v0.1

Status: experimental design contract. ShipLean does not yet ship a Tool Landing implementation or a production-verified preset.

## Purpose

This standard gives a downloaded ShipLean product a stable default information architecture for a public, single-purpose browser tool. It reduces page-by-page layout invention while keeping the tool runtime, product rules, and copy owned by the product repository.

The standard is optional. ShipLean remains a general TanStack Start, Cloudflare-first product scaffold; adopting this document must not turn the template core into an SEO tool product or add another framework.

The key words **MUST**, **MUST NOT**, **SHOULD**, and **MAY** describe the v0.1 contract.

## Evidence reviewed

| Source | Reusable evidence | Boundary |
| --- | --- | --- |
| `image-resize/src/components/target-size-landing.tsx` | Compact hero, working tool, related targets, steps, explanatory content, use cases, and FAQ form one real tool-page sequence. | Image processing and target-KB rules remain product code. |
| `image-resize/src/components/tool-page.tsx` | A tool slot can be shared while copy and related links remain route-owned. | Its current section API is image-specific and is not copied into ShipLean. |
| `mdformats/src/components/localized-page.tsx` and its workspaces | Route selection, localized copy, and interactive workspaces can stay separate. | MDFormats uses Next.js; its framework code is not a ShipLean implementation reference. |
| `GameKitHQ/src/pages/games/[game]/index.astro` | Available and planned states must be visibly different, and source claims need evidence. | The inspected page is a game hub, not a working tool landing page. It does not justify a `game-tool` preset. |
| ShipLean `src/lib/seo.ts` and `src/routes/sitemap.xml.ts` | Title, description, canonical, alternates, and sitemap already have route-level ownership. | Structured data and automatic route registration are not implemented by this standard. |

Only the image-resize pages currently qualify as a direct Tool Landing reference. A second ShipLean-derived consumer is required before v0.1 candidates become stable core components.

## Applicability

Use this standard when all of the following are true:

- the public page has one primary task;
- a visitor can perform that task on the page;
- the product deliberately selects the `tool-default` protocol;
- route metadata and claims can describe the shipped behavior honestly.

Do not use it for a documentation article, directory, game hub, pricing page, waitlist, dashboard, or a page whose primary tool is only planned. A planned tool MAY have a separate preview page, but it MUST be visually labeled and MUST NOT emit structured data that presents it as working software.

## Ownership model

The standard has three layers:

1. **ShipLean infrastructure** owns the application shell, design tokens, route metadata helpers, sitemap mechanism, accessibility baseline, and verification command.
2. **Tool Landing recipe** owns page order, section presentation, and the draft configuration contract.
3. **Product code** owns the tool component, domain rules, processing boundary, state, analytics events, product copy, and evidence for every claim.

Provider payloads, file-processing logic, upload behavior, and domain state MUST NOT enter the page configuration object.

## Canonical page sequence

Sections that are present MUST keep this order. A product MAY omit a conditional section, but MUST NOT rearrange the remaining sections without recording a product-level reason and acceptance evidence.

| Order | Region | Requirement | Contract |
| --- | --- | --- | --- |
| Shell | Header | Required | Shared application shell; compact and keyboard accessible. |
| 01 | Breadcrumb | Conditional | Required for nested indexable routes; omitted on the site home. |
| 02 | Tool intro | Required | One H1, one concise description, and only verified supporting facts. |
| 03 | Tool panel | Required | The real primary interaction, not a screenshot or decorative mockup. |
| 04 | Benefit strip | Conditional | Up to four factual benefits with evidence in the implementation. |
| 05 | How it works | Conditional | Use when the task has meaningful steps or constraints. |
| 06 | Features | Optional | Shipped capabilities only; do not duplicate the benefit strip. |
| 07 | Use cases | Optional | Distinct user situations, not keyword substitutions. |
| 08 | Related tools | Conditional | Live, relevant internal destinations only. |
| 09 | FAQ | Conditional | Real task questions with visible answers only. |
| 10 | Explanatory content | Optional | Helpful constraints, formats, limitations, or decision guidance. |
| 11 | Bottom action | Optional | Repeat or link to the primary action only when it reduces effort. |
| Shell | Footer | Required | Shared application shell and privacy controls where configured. |

The intro and tool panel form one **tool-first region**. Decorative artwork, testimonial walls, pricing, long-form copy, and unrelated promotions MUST NOT appear between them.

## First-viewport contract

At 390 × 844 and 1440 × 900 viewports:

- the H1 MUST be visible without interaction;
- the start of the real tool panel MUST appear within the first viewport;
- no horizontal page overflow is allowed;
- sticky shell UI MUST NOT cover the H1 or the first tool control;
- an exception requires a documented product reason and visual evidence.

The intro SHOULD normally contain no more than an eyebrow, H1, one short paragraph, and four compact factual benefits. “Modern”, “fast”, “private”, “free”, and similar claims are content assertions, not decorative labels; each MUST match shipped behavior.

## Section omission rules

- Empty arrays MUST omit their section rather than render an empty heading or placeholder.
- Related tools MUST be omitted when the links are not live, relevant, and canonical.
- FAQ MUST be omitted when answers merely repeat adjacent copy.
- Use cases MUST be omitted when they are only numeric, file-format, or keyword variants of the same task.
- A benefit MUST be omitted when the repository cannot prove it. For example, “processed locally” requires a verified no-upload boundary.
- Planned functionality MUST remain outside feature and benefit lists.

These rules take priority over making every page the same length.

## Draft component boundary

The following names describe a candidate API, not components that v0.1 claims are implemented:

```tsx
<ToolLandingPage config={pageConfig} tool={<ProductTool />} />
```

`ToolLandingPage` MAY compose:

- `ToolIntro`
- `ToolPanel`
- `BenefitStrip`
- `HowItWorks`
- `FeatureGrid`
- `UseCaseGrid`
- `RelatedTools`
- `FaqSection`
- `SeoContent`
- `BottomAction`

The recipe MUST accept the working tool as a React slot. It MUST NOT know the tool's input, result, provider, file format, storage, or entitlement model. Section components SHOULD use narrow semantic props and MUST preserve heading order, focus visibility, reduced motion, and responsive behavior.

## Draft configuration contract

The configuration holds presentational content and route metadata. It should remain serializable and free of React nodes and business logic.

```ts
type ToolLandingConfig = {
  version: '0.1'
  preset: 'tool-default'
  seo: {
    title: string
    description: string
    path: string
    alternates?: ReadonlyArray<{ locale: string; path: string }>
  }
  hero: {
    eyebrow?: string
    title: string
    description: string
  }
  benefits?: ReadonlyArray<{ title: string; description?: string }>
  howItWorks?: {
    title: string
    steps: ReadonlyArray<{ title: string; description: string }>
  }
  features?: ReadonlyArray<{ title: string; description: string }>
  useCases?: ReadonlyArray<{ title: string; description: string }>
  relatedTools?: ReadonlyArray<{ label: string; to: string; description?: string }>
  faq?: ReadonlyArray<{ question: string; answer: string }>
  seoContent?: ReadonlyArray<{ heading: string; paragraphs: ReadonlyArray<string> }>
  bottomAction?: { title: string; description?: string; actionLabel: string }
}
```

The implementation MAY refine these fields after the reference migration. It MUST NOT add arbitrary section ordering, raw class names, provider payloads, or untyped HTML escape hatches to configuration.

## Preset policy

v0.1 defines exactly one candidate preset: `tool-default`.

An `image-tool`, `converter-tool`, `calculator-tool`, `generator-tool`, or `game-tool` preset MUST NOT enter ShipLean until:

1. two real product pages need the same structural difference;
2. the difference cannot be expressed by the tool slot or existing optional sections;
3. desktop, narrow-screen, keyboard, reduced-motion, and SEO acceptance evidence exists;
4. the preset removes product duplication without moving domain behavior into ShipLean.

Brand color, font, radius, and illustration style belong to design tokens or product assets, not structural presets.

## SEO and structured-data contract

Every new public Tool Landing route MUST consider title, description, canonical, sitemap membership, robots behavior, Open Graph, and localized alternates.

- The route owns metadata and passes stable values through ShipLean's SEO helper.
- Canonical URLs MUST identify the public preferred route.
- Sitemap entries MUST include only live canonical pages intended for indexing.
- Hreflang alternates MUST be reciprocal and point to genuinely localized equivalents.
- Breadcrumb structured data is conditional on a visible, nested breadcrumb.
- `WebApplication` structured data is allowed only for a working application and MUST match visible capabilities.
- FAQ structured data is allowed only when the same questions and answers are visible on the page.
- Related-tool links MUST be ordinary crawlable links, not configuration-only relationships.
- Structured data MUST NOT claim ratings, pricing, compatibility, privacy, or availability that the product cannot prove.

v0.1 does not add structured-data helpers or automatic sitemap registration. Those require a reference implementation and contract tests.

## Interaction and accessibility contract

The product tool remains responsible for its detailed interaction, but a conforming page MUST:

- preserve visible keyboard focus and logical source order;
- use one H1 and sequential section headings;
- label all inputs and controls with their purpose;
- announce asynchronous status and errors without relying only on color;
- keep error recovery next to the failed action;
- avoid focus loss when results appear;
- honor `prefers-reduced-motion`;
- keep primary controls usable at 320 CSS pixels without horizontal scrolling;
- distinguish sandbox, planned, disabled, and production states in text as well as appearance.

## Reference implementation gate

The first implementation SHOULD migrate one existing `image-resize` target-size page in its own product repository or isolated worktree. It MUST NOT migrate all target pages at once.

Acceptance evidence must include:

1. a before/after section inventory;
2. unchanged working tool behavior and processing boundary;
3. valid route metadata, canonical, sitemap decision, and any visible structured data;
4. desktop and 390px screenshots;
5. `document.body.scrollWidth <= window.innerWidth` at the narrow viewport;
6. keyboard operation of the primary task and visible focus;
7. reduced-motion behavior;
8. product tests plus `pnpm verify` in the target repository;
9. an explicit list of page-specific code that did not enter ShipLean.

The reference implementation is successful only if it makes the next comparable page smaller and more predictable without weakening the real tool.

## Promotion beyond v0.1

Candidate components may become ShipLean recipe code only after two real consumers demonstrate the same API. Before that point, copy the standard into the product decision record or implement locally; do not create a broad shared package.

The next version should be based on measured implementation evidence, not additional section ideas. A v0.2 decision should record:

- which fields were used, omitted, or changed;
- which sections were genuinely shared by two products;
- first-viewport and narrow-screen results;
- metadata and structured-data failures found during migration;
- whether `tool-default` is sufficient without another preset.
