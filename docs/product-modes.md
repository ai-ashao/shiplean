# Product Modes

ShipLean's runtime is a **product template**, not the ShipLean marketing website.

The public ShipLean website belongs in the separate `ai-ashao/shiplean-site` repository. The `ai-ashao/shiplean` repository must not ship vendor pricing, ShipLean marketing claims, or a ShipLean sales homepage as the default product runtime.

## Source of truth

Set the product mode in:

```ts
src/lib/product-config.ts
```

Supported modes:

```ts
type ProductMode = 'saas' | 'tool'
```

The same config also owns the neutral starter brand:

```ts
productConfig.brand.name
productConfig.brand.mark
productConfig.brand.description
```

The checked-in brand is intentionally generic (`Starter Product`). A coding Agent must replace it with the real product identity during adaptation.

## SaaS mode

Default shell:

```text
Logo | Home | Workflow | Guides | Pricing | Primary CTA | Language
```

Default homepage:

```text
Hero
→ Product Preview
→ Outcomes
→ Workflow
→ Pricing Entry
→ FAQ
→ Final CTA
```

SaaS mode may use a Header CTA. The checked-in pricing page is neutral example content only and must be replaced with real plans, entitlements, and billing behavior before launch.

## Tool mode

Default shell:

```text
Logo | Tools | Guides | Language
```

Default homepage:

```text
Compact intro
→ Primary Tool
→ Constraints
→ Value Signals
→ Completion Highlights
→ Capabilities
→ FAQ
```

Tool mode has no SaaS-style Header CTA by default. It keeps the task-first Tool Landing quality contract.

## Shared Core

Both modes share:

- TanStack Start / Cloudflare runtime;
- typed locale routes;
- SEO metadata contract;
- legal-review infrastructure;
- Field / Select / Button spacing contract;
- accessibility baseline;
- `pnpm verify`;
- Agent Skill and repository contracts.

Product mode changes **composition and navigation**, not the underlying engineering contract.

## QA routes

`/tool-reference` and `/tool-reference-upload` are Tool-mode QA surfaces even when the checked-in starter defaults to SaaS mode. This lets the repository verify Tool shell behavior without changing the active product mode.

## Custom layouts

A product may replace the default SaaS or Tool composition when the user explicitly asks for another layout. Custom composition must preserve the shared SEO, accessibility, truthful-claim, responsive, and verification contracts.

Do not add ShipLean marketing sections back into the product template. Vendor marketing belongs in `shiplean-site`.
