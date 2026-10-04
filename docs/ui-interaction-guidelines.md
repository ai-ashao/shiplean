# UI interaction guidelines

Use these guidelines when adapting ShipLean into a tool, content site, or SaaS product. They define interaction meaning and guard against recurring UI mistakes, while leaving visual choices to the product's brand and page context. Follow `DESIGN.md` for the starter's current visual language and `docs/ui-control-spacing.md` for form spacing.

## Make the page hierarchy clear

- Give each section one primary purpose. Use typography, spacing, surface contrast, and image scale to separate the primary task from supporting facts and secondary actions.
- Let content determine the layout. Do not force every list into the same card grid or add empty columns merely for symmetry. Keep scan paths and line lengths comfortable at desktop and mobile widths.
- Use cards and borders when they group meaningful content or mark an interactive region. Avoid identical boxes around every item when a simpler image-and-text row is easier to scan.
- Keep related actions close to the content they affect. Do not repeat a separate “View details” link when the image, title, or whole card already reaches the same destination.

## Choose the clickable area deliberately

- **Whole card:** use when the card has one clear destination and users reasonably expect the entire surface to open it. Give the full hit area hover, pointer, and focus feedback.
- **Image or title:** use for image-and-text lists when descriptions are informational. Only the actual link gets interactive feedback; do not make the entire row look clickable.
- **Pill, filled, or outlined control:** use for short actions, filters, related entities, and compact navigation. Distinguish interactive pills from passive status tags.
- **Multiple actions:** give each action its own clear hit area. Do not nest interactive elements or stretch one link across another control.

Use an `<a>` for navigation and a `<button>` for an action that changes the current page. A pointer cursor confirms clickability on desktop but cannot be the only signal; controls must be understandable before hover and on touch screens.

## Links and arrows

- Do not add decorative arrows or chevrons to links, buttons, cards, list rows, or headings merely to say “open,” “continue,” or “click here.” Directional controls such as a select indicator, carousel navigation, or a back action may use a directional icon when it carries real meaning.
- Do not underline interface links by default. Prefer a clearly bounded pill or control, an interactive card, or a clickable image or title where those patterns fit the content.
- In dense prose or citations, an underline is allowed when a link cannot be separated into a clear control and another non-color cue would not make it distinguishable. Record the reason in the change summary. Do not rely on color alone or reveal that a link exists only on hover. See [WCAG Failure F73](https://www.w3.org/WAI/WCAG22/Techniques/failures/F73).
- Do not add a preview drawer, chip, or extra button solely to avoid an underline. Any preview must solve a real user task and remain distinct from ordinary navigation.

## States and review

- Give feedback only to the actual hit area. Provide visible keyboard focus, distinct selected and disabled states, comfortable touch targets, and restrained hover or pressed feedback.
- Keep motion subtle and respect reduced-motion preferences. Avoid layout shifts, accidental card navigation when using a nested control, dead links, and navigation that only works through JavaScript.
- Check every new interaction pattern at a desktop width and a narrow mobile width with pointer, keyboard, and touch behavior. Verify that focus is visible, text does not overflow, and independent controls remain usable.
- When reviewing competitors, distinguish first-party UI from injected ads or browser features. For example, Google AdSense ad intents can insert links into prose and chips after paragraphs; their appearance is not evidence of the site's own navigation design.

These are guardrails, not a fixed component library. Choose shape, color, density, and motion to serve the product's content and existing design system.
