# Tool Landing Standard v0.1

Status: experimental design contract. ShipLean does not yet ship a Tool Landing implementation or a production-verified preset.

## Purpose

This standard gives a downloaded ShipLean product a stable upload-first information architecture for a public, file-based browser tool. It reduces page-by-page layout invention while keeping file handling, the editor runtime, product rules, and copy owned by the product repository.

The standard is required when a ShipLean-derived product's primary task begins with file selection. ShipLean remains a general TanStack Start, Cloudflare-first product scaffold; this document must not turn the template core into an SEO tool product or add another framework.

The key words **MUST**, **MUST NOT**, **SHOULD**, and **MAY** describe the v0.1 contract.

## Evidence reviewed

| Source | Reusable evidence | Boundary |
| --- | --- | --- |
| `image-resize/src/components/target-size-landing.tsx` | Compact hero, working tool, related targets, steps, explanatory content, use cases, and FAQ form one real tool-page sequence. | Image processing and target-KB rules remain product code. |
| `image-resize/src/components/tool-page.tsx` | A tool slot can be shared while copy and related links remain route-owned. | Its current section API is image-specific and is not copied into ShipLean. |
| `mdformats/src/components/localized-page.tsx` and its workspaces | Route selection, localized copy, and interactive workspaces can stay separate. | MDFormats uses Next.js; its framework code is not a ShipLean implementation reference. |
| `GameKitHQ/src/pages/games/[game]/index.astro` | Available and planned states must be visibly different, and source claims need evidence. | The inspected page is a game hub, not a working tool landing page. It does not justify a `game-tool` preset. |
| ShipLean `src/lib/seo.ts` and `src/routes/sitemap.xml.ts` | Title, description, canonical, alternates, and sitemap already have route-level ownership. | Structured data and automatic route registration are not implemented by this standard. |

The reviewed products inform individual parts of this contract, but none yet proves the complete two-route upload-to-editor flow. A ShipLean-derived reference implementation and a second consumer are required before v0.1 candidates become stable core components.

## Applicability

Use this standard when all of the following are true:

- the public page begins one primary file-based task;
- the visitor selects or drops files on the landing page, then completes the task on a separate editor/workbench route;
- the product uses the `tool-default` upload-first protocol;
- route metadata and claims can describe the shipped behavior honestly.

Do not use it for a documentation article, directory, game hub, pricing page, waitlist, dashboard, or a page whose primary tool is only planned. A planned tool MAY have a separate preview page, but it MUST be visually labeled and MUST NOT emit structured data that presents it as working software.

## Ownership model

The standard has three layers:

1. **ShipLean infrastructure** owns the application shell, design tokens, route metadata helpers, sitemap mechanism, accessibility baseline, and verification command.
2. **Tool Landing recipe** owns page order, section presentation, and the draft configuration contract.
3. **Product code** owns the upload component, file handoff, editor/workbench route, domain rules, processing boundary, state, analytics events, product copy, and evidence for every claim.

Provider payloads, file-processing logic, upload behavior, and domain state MUST NOT enter the page configuration object.

## Canonical page sequence

Sections that are present MUST keep this order. A product MAY omit a conditional section, but MUST NOT rearrange the remaining sections without recording a product-level reason and acceptance evidence.

| Order | Region | Requirement | Contract |
| --- | --- | --- | --- |
| Shell | Header | Required | Shared application shell; compact and keyboard accessible. |
| 01 | Breadcrumb | Conditional | Required for nested indexable routes; omitted on the site home. |
| 02 | Tool intro | Required | One H1, one concise description, and only verified supporting facts. |
| 03 | Upload area | Required | The complete working drop/select interaction, accepted-file guidance, and adjacent error recovery. |
| 04 | Related tools | Conditional | First eligible section after the upload-first region; live, relevant internal destinations only. |
| 05 | Benefit strip | Conditional | Up to four factual benefits with evidence in the implementation. |
| 06 | How it works | Conditional | Use when the task has meaningful steps or constraints. |
| 07 | Features | Optional | Shipped capabilities only; do not duplicate the benefit strip. |
| 08 | Use cases | Optional | Distinct user situations, not keyword substitutions. |
| 09 | FAQ | Conditional | Real task questions with visible answers only. |
| 10 | Explanatory content | Optional | Helpful constraints, formats, limitations, or decision guidance. |
| 11 | Bottom action | Optional | Repeat or link to the primary action only when it reduces effort. |
| Shell | Footer | Required | Shared application shell and privacy controls where configured. |

The intro and upload area form one vertical **upload-first region**: intro above, upload area below. They MUST NOT become desktop side-by-side columns. Decorative artwork, testimonial walls, pricing, long-form copy, and unrelated promotions MUST NOT appear between them.

When eligible destinations exist, Related tools SHOULD be the first section after the upload-first region. It MUST NOT appear between the intro and upload area or push any part of the complete upload area below the first viewport. Keep it compact, omit the current tool, and order links by task relevance rather than traffic or publication date.

## Upload-to-editor route contract

- The landing page owns discovery, task explanation, and file selection. It MUST NOT render the editor/workbench or its detailed configuration controls.
- The upload area MUST support an explicit file chooser and MAY also support drag and drop. It MUST state accepted file types and any enforced size or count limits.
- After valid files are selected, the product MUST navigate to a separate editor/workbench route and preserve the selected files across that client transition.
- Invalid files MUST remain on the landing page with an actionable error adjacent to the upload area.
- A product that claims local processing MUST NOT upload file contents during the transition. Server-backed products MUST disclose the real upload boundary.
- The stateful editor/workbench route SHOULD be excluded from the sitemap and marked `noindex` unless the repository records a concrete reason for indexing it.

## Upload interaction-state contract

The upload area is a working control, not a static drop-zone illustration. Its visible state and accessible status MUST agree.

| State | Requirement | Behavior |
| --- | --- | --- |
| Idle | Required | Show the choose-file action, accepted types, and enforced size or count limits. Cancelling the system file picker returns here without an error. |
| Keyboard focus | Required | Show a visible focus indicator on the actionable control; Enter or Space opens the file picker where the chosen control semantics require it. |
| Drag active | Required when drag and drop is supported | Make the valid drop target clear without relying on color alone and prevent the browser from navigating to the dropped file. |
| Validating | Required when validation is perceptible | Announce that files are being checked and prevent duplicate selection or navigation while the check is active. |
| Invalid | Required | Keep the visitor on the landing page, explain the rejected file and recovery action next to the upload area, and allow an immediate retry. |
| Handoff | Required | After accepting files, communicate the transition, prevent duplicate activation, preserve the selected files, and navigate once to the editor/workbench route. |
| Transfer | Required only for server-backed uploads | Show real progress when available, expose failure and retry behavior, and never imply local-only processing. |
| Disabled | Conditional | Use only when file selection is genuinely unavailable and explain why; do not use it as a loading substitute. |

The landing page MUST NOT show a terminal “success” state for a valid selection: arrival in the editor/workbench is the successful outcome. State changes MUST preserve the upload area's dimensions closely enough to avoid disruptive layout shift.

## First-viewport contract

At 390 × 844 and 1440 × 900 viewports:

- the H1 MUST be visible without interaction;
- the complete upload area MUST appear within the first viewport, including its choose-file action and required file guidance;
- the editor/workbench and its configuration controls MUST NOT appear on the landing page;
- no horizontal page overflow is allowed;
- sticky shell UI MUST NOT cover the H1 or the upload control;
- an exception requires a documented product reason and visual evidence.

The intro SHOULD normally contain no more than an eyebrow, H1, one short paragraph, and four compact factual benefits. “Modern”, “fast”, “private”, “free”, and similar claims are content assertions, not decorative labels; each MUST match shipped behavior.

## Section omission rules

- Empty arrays MUST omit their section rather than render an empty heading or placeholder.
- Related tools MUST be omitted when the links are not live, relevant, and canonical. When present, the section SHOULD appear immediately after the upload-first region.
- FAQ MUST be omitted when answers merely repeat adjacent copy.
- Use cases MUST be omitted when they are only numeric, file-format, or keyword variants of the same task.
- A benefit MUST be omitted when the repository cannot prove it. For example, “processed locally” requires a verified no-upload boundary.
- Planned functionality MUST remain outside feature and benefit lists.

These rules take priority over making every page the same length.

## Draft component boundary

The following names describe a candidate API, not components that v0.1 claims are implemented:

```tsx
<ToolLandingPage config={pageConfig} upload={<ProductUpload />} />
```

`ToolLandingPage` MAY compose:

- `ToolIntro`
- `ToolUpload`
- `BenefitStrip`
- `HowItWorks`
- `FeatureGrid`
- `UseCaseGrid`
- `RelatedTools`
- `FaqSection`
- `SeoContent`
- `BottomAction`

The recipe MUST accept the working upload interaction as a React slot. It MUST NOT know the file handoff, editor state, result, provider, file format, storage, or entitlement model. Section components SHOULD use narrow semantic props and MUST preserve heading order, focus visibility, reduced motion, and responsive behavior.

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

The product upload and editor remain responsible for their detailed interaction, but a conforming flow MUST:

- preserve visible keyboard focus and logical source order;
- use one H1 and sequential section headings;
- label all inputs and controls with their purpose;
- announce asynchronous status and errors without relying only on color;
- keep error recovery next to the failed action;
- move focus to the editor's primary heading or task status after route navigation;
- honor `prefers-reduced-motion`;
- keep primary controls usable at 320 CSS pixels without horizontal scrolling;
- distinguish sandbox, planned, disabled, and production states in text as well as appearance.

## Reference implementation gate

The first implementation SHOULD split one existing `image-resize` target-size flow into an upload-first landing page and a separate editor/workbench route in its own product repository or isolated worktree. It MUST NOT migrate all target pages at once.

Acceptance evidence must include:

1. a before/after section inventory;
2. a working file-selection transition to a separate editor/workbench route with an unchanged processing boundary;
3. valid route metadata, canonical, sitemap decision, and any visible structured data;
4. desktop and 390px screenshots of both the landing page and editor/workbench route;
5. `document.body.scrollWidth <= window.innerWidth` at the narrow viewport;
6. keyboard operation of file selection, visible focus, and intentional focus placement after editor navigation;
7. verified idle, invalid, and handoff states plus drag-active or transfer states when those capabilities are supported;
8. reduced-motion behavior;
9. product tests plus `pnpm verify` in the target repository;
10. an explicit list of page-specific code that did not enter ShipLean.

The reference implementation is successful only if it makes the next comparable page smaller and more predictable without weakening the real tool.

## Promotion beyond v0.1

Candidate components may become ShipLean recipe code only after two real consumers demonstrate the same API. Before that point, copy the standard into the product decision record or implement locally; do not create a broad shared package.

The next version should be based on measured implementation evidence, not additional section ideas. A v0.2 decision should record:

- which fields were used, omitted, or changed;
- which sections were genuinely shared by two products;
- first-viewport and narrow-screen results;
- metadata and structured-data failures found during migration;
- whether `tool-default` is sufficient without another preset.
