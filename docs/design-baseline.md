# Shared design baseline

Version 1 · 2026-10-16. Applies to new products and incremental migrations. This is the shared quality contract; it is not the visual identity of every ShipLean product.

## Ownership and precedence

| Layer | Owns | Does not own |
| --- | --- | --- |
| ShipLean baseline | Interaction meaning, hierarchy, token roles, states, responsive behavior, acceptance process | Every product's palette, typeface, page count or framework |
| Project `DESIGN.md` | Brand, actual token values, template composition, component choices and documented exceptions | SEO intent, permission to invent features or unsupported claims |
| Shared components | Executable variants and states in the project's own framework | Automatic migration of unrelated repositories |
| Release evidence | Rendered screenshots, workflow checks and explicit limitations | A claim that a successful build proves visual quality |

Read this document, the project's `DESIGN.md`, and the relevant existing components before changing UI. User-selected references take precedence over starter defaults. Preserve accessibility, search intent and verified product behavior. Update a product's design contract when a deliberate design decision changes.

Do not paste the starter's visual identity into every product. The starter `DESIGN.md` describes ShipLean's default preview. When adapting it, replace that file using [the project template](./templates/project-design.md). Existing products adopt incrementally; shared baseline updates never silently overwrite their design files or require a framework migration.

## Foundations

- Define shared colors by role: canvas, surface, text, supporting text, border, accent, on-accent, focus, selected, success and error. Dark mode overrides roles rather than scattering alternative hex values through components. Do not use the page background as a substitute for an on-accent text token.
- Declare a type scale for page titles, section titles, body, labels, metadata and code. Separate display, body and code roles even when two roles share a font. Choose actual typefaces per product and shipped languages.
- Use a small spacing scale, usually based on 4px increments. Define page gutters, prose width, section gaps, control height and component padding. A compact workbench and a long article need different density.
- Keep border/radius/elevation choices finite. Controls and comparison tables may need explicit boundaries; every paragraph and list does not need a box. Reserve shadows for useful surface separation.
- Use semantic variables with a small number of component overrides. Do not introduce a token generator, theme DSL or package dependency just to document existing CSS variables.

## Link and action taxonomy

| Role | Default presentation | Required behavior |
| --- | --- | --- |
| Inline prose/citation | Underline or another persistent non-color cue that works within a sentence | Readable at rest, visible focus, meaningful destination text |
| Global navigation/breadcrumb | No persistent underline; restrained hover/focus and current-page treatment | Crawlable links, current location, usable touch target |
| Section contents | No default underline; a defined list with readable item spacing | Anchor destinations, keyboard focus; current section when scroll tracking is implemented |
| Recommendation/list destination | Clickable row, title or card chosen deliberately | Feedback matches the real hit area; title plus useful context; no nested controls |
| Download/tool entry | Named secondary action or resource control | Explicit action/format; native link semantics and working download |
| Filter/tab/action | Button or the existing accessible control primitive | Selected/pressed state, keyboard handling and immediate feedback |

Removing all underlines is not a design system. Keeping every interface item underlined is not one either. Inline prose is a justified exception to the no-default-interface-underline rule in [interaction guidelines](./ui-interaction-guidelines.md). Never replace a recognizable link with color-only text or a hover-only discovery cue. Do not add generic navigation arrows to compensate.

## Component contract

Each reused interactive component defines: purpose, semantic element, variant, hit area, spacing, and applicable states. Reuse existing primitives before adding another locally styled button or link.

- Buttons: distinguish primary, secondary and quiet actions; allow wrapping without breaking labels; preserve action names while busy. Use links for navigation and buttons for in-page operations.
- Fields: visible labels, clear help/error association, readable input values and reserved trailing space for dropdown controls. Follow [control spacing](./ui-control-spacing.md).
- Lists/recommendations: choose one destination per row/card or clearly separate independent actions. Passive tags must not look like filters.
- Disclosures/contents: native disclosure is a good mobile default. Desktop sidebars are optional and must leave enough prose width; a boxed index is not mandatory.
- Feedback: initial, busy, success, empty, partial, error, disabled and selected states where relevant. Place essential feedback near the operation, including fullscreen views. Use words or structure in addition to color.
- Motion: short state transitions; respect reduced motion. Do not add fake delays or animation to instant local conversions.

## Template decisions belong to the product

Record the representative acquisition, workbench, browse and editorial templates that actually exist. Preserve Tool/SaaS mode boundaries and first-task visibility. A content site does not need an application dashboard layout; a tool does not need a decorative hero before its input.

Public interface styles must not leak into user documents, exported HTML/PDF, code samples or third-party embeds. Keep site prose and rendered user Markdown separately scoped. Preserve URL roles, Title/H1 intent, canonical/hreflang, internal links and indexability while restyling.

## Adoption and completion

1. Audit current components, tokens, page families and existing dirty changes.
2. Establish or update project `DESIGN.md` with actual values, component ownership and acceptance scope.
3. Implement one real representative page per affected template using shared primitives.
4. Inspect desktop/mobile and relevant states; adjust the design from rendered evidence.
5. Apply the same components across affected pages/locales, then run [design acceptance](./design-acceptance.md).

ShipLean owns the baseline and handoff, while products own their implementation. The baseline does not expand a product's page pool, authorize a push/deploy, or automatically migrate all products.
