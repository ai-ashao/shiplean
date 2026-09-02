# Tool Landing v0.1 — Implementation Contract

Status: implementation package for ShipLean `dev`.

## Core principles

1. **Layout fixed** — tool pages use one vertical information architecture.
2. **Brand flexible** — product repositories change global design tokens, typography, radius, surfaces, logo, and decorative language without changing the page hierarchy.
3. **Task first** — the primary tool interaction appears immediately after the compact intro.
4. **Value obvious** — eligible tools visibly answer whether the tool is free, online, requires installation, or requires signup.

## Fixed page order

The shared root shell owns **Header** and **Footer**. A tool page owns the regions between them:

1. Breadcrumb, when the route is nested.
2. Compact tool intro.
3. Value signals.
4. Complete primary tool/upload region.
5. Related tools, when eligible live destinations exist.
6. Benefits.
7. How it works.
8. Features.
9. Use cases.
10. FAQ.
11. Explanatory SEO content.
12. Bottom action.

Optional sections may be omitted. Remaining sections should not be arbitrarily reordered.

## First viewport contract

At **1440 × 900** and **390 × 844**:

- the H1 is visible;
- the concise description is visible;
- the primary value signals are visible;
- the complete upload/tool interaction and its primary CTA are visible without scrolling;
- accepted file guidance or task constraints are visible when the tool needs them;
- no horizontal overflow exists;
- sticky shell UI must not cover the H1 or primary action.

The shared component intentionally keeps the intro compact and places the tool immediately after it. The product-owned tool slot must also remain compact enough to satisfy this contract.

Do not place these above the tool:

- large hero artwork;
- logo walls;
- testimonials;
- pricing;
- long-form marketing copy;
- unrelated promotions;
- a second large CTA.

## Primary value signals

For tools that actually satisfy the conditions, the first four visible signals are:

1. **Free**
2. **Online**
3. **No installation**
4. **No signup**

Secondary signals may include:

- Browser-based
- Files stay on your device
- No watermark

`Browser-based`, `processed locally`, `files stay on your device`, and `no upload` are local-processing claims. They must only be used when the implementation proves `processing: 'local'`.

Avoid unverifiable default claims such as:

- 100% secure
- safest
- fastest
- unlimited
- private

## SEO messaging contract

For English tool pages that are free and online:

- H1 prioritizes the exact primary task/keyword.
- Hero description should naturally state **free** and **online**.
- Hero description should also state **no installation** and **no signup** when true.
- Meta title or meta description should naturally include both **free** and **online**.
- Do not mechanically force the exact same title pattern on every page.

Recommended pattern:

```text
H1:
Resize Image to KB

Hero description:
Resize JPG, PNG and WebP images to your target file size online for free.
No installation or signup required.

Meta title:
Resize Image to KB - Free Online Tool

Meta description:
Free online tool to resize images to a target KB size.
No installation or signup required.
```

Use localized equivalent wording for non-English routes.

## Related tools

Related tools:

- are ordinary crawlable links;
- include only live canonical tools;
- exclude the current tool;
- appear immediately after the complete primary tool region;
- never displace the primary tool from the first viewport.

Use `tool-registry.ts` as the shared source of truth.

## Structured data

The package can generate:

- `WebApplication`
- `FAQPage`
- `BreadcrumbList`

Only emit FAQ schema when the same FAQ is visibly rendered. Only emit breadcrumb schema when the visible breadcrumb exists. A free `Offer` is emitted only when `experience.free === true`.

## Brand variation

Do not fork the page structure to make sites look different.

Change product-level design tokens instead:

- accent color;
- typography;
- radius;
- surface/border treatment;
- shadow strength;
- background;
- logo;
- decorative language.

This keeps UX and SEO stable while preserving product identity.

## Route integration

A route should use ShipLean's existing `pageHead` helper for metadata and the shared root shell for Header/Footer.

Example:

```tsx
import { createFileRoute } from '@tanstack/react-router'
import {
  ToolLandingPage,
  ToolStructuredData,
  type ToolLandingConfig,
} from '@/components/tool-landing'
import { pageHead } from '@/lib/seo'
import { buildToolStructuredData } from '@/lib/tool-structured-data'
import { site } from '@/lib/site'
import { toolRegistry } from '@/modules/tool-registry'

const config = {
  version: '0.1',
  preset: 'tool-default',
  toolId: 'resize-image-to-kb',
  seo: {
    title: 'Resize Image to KB - Free Online Tool',
    description:
      'Free online tool to resize images to a target KB size. No installation or signup required.',
    path: '/resize-image-to-kb',
  },
  hero: {
    eyebrow: 'Free online image tool',
    title: 'Resize Image to KB',
    description:
      'Resize JPG, PNG and WebP images to your target size online for free. No installation or signup required.',
  },
  experience: {
    free: true,
    online: true,
    installationRequired: false,
    signupRequired: false,
    processing: 'local',
  },
  relatedTools: {
    title: 'Related tools',
    toolIds: ['compress-image-to-200kb', 'png-to-jpg'],
  },
} satisfies ToolLandingConfig

export const Route = createFileRoute('/resize-image-to-kb')({
  head: () =>
    pageHead({
      title: config.seo.title,
      description: config.seo.description,
      path: config.seo.path,
    }),
  component: Page,
})

function Page() {
  const structuredData = buildToolStructuredData(config, site)

  return (
    <>
      <ToolStructuredData items={structuredData} />
      <ToolLandingPage
        config={config}
        registry={toolRegistry}
        tool={<ProductOwnedUpload />}
      />
    </>
  )
}
```

The actual upload/editor handoff stays in the product repository.
