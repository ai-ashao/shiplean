# ShipLean Tool Landing v0.1 — Manual Install

This archive is designed to be copied into the root of `ai-ashao/shiplean` while you are on the `dev` branch.

## What it adds

- fixed vertical Tool Landing composition;
- first-viewport-first layout;
- Free / Online / No installation / No signup value signals;
- local-processing claim protection;
- Tool Registry + Related Tools resolution;
- English free-online SEO copy helpers;
- `WebApplication`, `FAQPage`, and `BreadcrumbList` JSON-LD builders;
- unit tests for messaging, registry, and schema behavior;
- an updated `shiplean-quick-start` Skill;
- an implementation contract document.

## Files to copy

Copy these directories/files into the repository root, preserving paths:

```text
src/components/tool-landing/
src/lib/tool-messaging.ts
src/lib/tool-registry.ts
src/lib/tool-structured-data.ts
tests/tool-messaging.test.ts
tests/tool-registry.test.ts
tests/tool-structured-data.test.ts
docs/tool-landing-v0.1-implementation.md
.agents/skills/shiplean-quick-start/SKILL.md
```

The Skill file is an intentional replacement of the existing file.

## No root-shell replacement

Do **not** replace `src/routes/__root.tsx` from this package.

ShipLean already owns Header/Footer in the root shell. Tool Landing v0.1 composes the fixed content **between** those shell regions.

## Recommended integration order

1. Check out `dev`.
2. Copy this archive over the repository root.
3. Run:
   ```bash
   pnpm check
   pnpm test
   pnpm build
   pnpm typecheck
   pnpm e2e
   ```
   or simply:
   ```bash
   pnpm verify
   ```
4. Add one real tool page as the reference consumer.
5. At 1440×900 and 390×844 verify:
   - H1 visible;
   - description visible;
   - Free / Online / No installation / No signup visible when true;
   - complete upload/tool region visible;
   - primary CTA visible;
   - no horizontal overflow.
6. Only after one real consumer passes, migrate additional tools.

## Suggested next file

Create a product-specific registry, for example:

```text
src/modules/tool-registry.ts
```

Example:

```ts
import type { ToolRegistryItem } from '@/lib/tool-registry'

export const toolRegistry = [
  {
    id: 'resize-image-to-kb',
    label: 'Resize Image to KB',
    href: '/resize-image-to-kb',
    description: 'Resize an image to a target file size.',
    tags: ['image', 'compress'],
    status: 'live',
  },
  {
    id: 'compress-image-to-200kb',
    label: 'Compress Image to 200KB',
    href: '/compress-image-to-200kb',
    description: 'Compress an image to about 200KB.',
    tags: ['image', 'compress'],
    status: 'live',
  },
] satisfies ReadonlyArray<ToolRegistryItem>
```

## Important boundary

The shared `ToolLandingPage` does not process files. Product repositories still own:

- file inputs;
- drag/drop;
- validation;
- local/server processing;
- editor/workbench state;
- result generation;
- analytics events.

This prevents ShipLean from turning into an image/PDF/converter-specific framework.
