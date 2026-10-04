# Web product quality guidelines

Use this guide when designing or reviewing a ShipLean adaptation. It describes the qualities that make a working site feel like a coherent product. It is intentionally not a palette, a fixed grid, or a component catalog. Keep the product's SEO, page intent, truthful-content, accessibility, and mode contracts in `AGENTS.md`.

## Compose around the user's task

- Make the page's primary task or answer recognizable before its supporting explanation. Give it the strongest visual weight and a clear path to act.
- Use one dominant reading path per section. Give navigation, metadata, and secondary actions less emphasis than the work surface or content they support.
- Create hierarchy with a deliberate combination of type, spacing, alignment, imagery, and surface contrast. A border, shadow, color block, or card should explain a relationship, state, or hit area; remove it when it only repeats the same decoration.
- Choose list, table, gallery, card, or editorial layout from the content and comparison task. Do not default to identical three-column cards or leave large unusable side gutters just to keep a grid symmetrical.
- Keep terms, action placement, and component behavior consistent across routes. Reuse semantic roles and shared tokens, then allow a page-specific composition when it genuinely improves the task.

## Design the whole product state

- Review a component with real short, typical, long, missing, and erroneous content. Reserve space for media and let text wrap without collisions or horizontal overflow.
- Define initial, loading, success, empty, partial, error, disabled, and selected states where they can occur. Empty and error states should explain what happened and offer a useful next step; avoid a generic blank box or dead end.
- Show prompt feedback for user actions. Preserve the action label while work is in progress, prevent accidental duplicate submissions, and support retry or undo when appropriate. Do not show a spinner for an instant result solely to simulate activity.
- Keep meaningful filters, tabs, pagination, and view choices shareable and restorable with the URL when users are likely to revisit, share, or use Back/Forward. Transient disclosure state need not become a URL parameter by default.
- Put help near the relevant choice. Use a tooltip for supplementary detail, not for instructions needed to complete the task.

## Make density and responsiveness intentional

- Match information density to the task. A browse page can be scan-friendly and rich; a workbench can be compact; a guide should keep comfortable reading width. Do not equate large gaps or tiny text with polish.
- Check narrow mobile, laptop, and wide desktop layouts. Reflow content and controls instead of simply shrinking desktop columns. Keep the primary action reachable, focused controls visible, and interactive targets practical for touch.
- Use readable body text and clear contrast for supporting text. Do not apply the starter's small metadata typography to paragraphs, instructions, or mobile form inputs. Mobile inputs should remain at least 16px to avoid iOS focus zoom.
- Use motion to clarify a state change or add restrained delight. Keep it interruptible, avoid layout-moving effects, and honor reduced-motion preferences.

## Ship details users can trust

- Use real product states, assets, and data in previews or examples. Clearly label a demonstration or sandbox; do not imply that placeholder activity, counts, integrations, or results are live.
- Keep images stable while loading, avoid sudden layout shifts, and make controls respond promptly. On slow operations, show progress or a clear waiting state without blocking unrelated tasks.
- Check the rendered page rather than relying on component code alone. Review at least the first viewport, the main task flow, one lower section, a narrow viewport, and the relevant empty/error/loading states. Inspect pointer, keyboard, and touch behavior for new patterns.

## How to apply this guide

Use `DESIGN.md` for the current starter visual language, `docs/ui-interaction-guidelines.md` for links and hit areas, and `docs/ui-control-spacing.md` for form spacing. If a product reference or user request calls for a different aesthetic, preserve the quality principles here while adapting its shapes, color, type, imagery, and layout. Do not copy another product's brand or assets.

Research basis: [Vercel Web Interface Guidelines](https://vercel.com/design/guidelines) (living guidance on interaction, layout, and content states); [Linear's 2026 interface refresh](https://linear.app/now/behind-the-latest-design-refresh) (first-party account of information hierarchy and visual noise); and [web.dev on interaction responsiveness](https://web.dev/articles/inp) (updated September 2025). These sources inform the review questions, not ShipLean's visual identity.
