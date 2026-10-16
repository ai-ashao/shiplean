# [Product] design contract

Status: template — replace placeholders before treating this as a product decision.
Baseline: ShipLean design baseline v1 (2026-10-16).

## Product and visual direction

Describe the first task, users, chosen references, visual personality and boundaries. Record which starter defaults are retained or replaced. Do not invent SEO scope or product capabilities here.

## Foundations

| Role | Product decision | Code source |
| --- | --- | --- |
| Canvas / surface / border | Actual light/dark values | Token file |
| Text / supporting text | Actual light/dark values | Token file |
| Accent / on-accent / focus | Actual values and states | Token file |
| Display / body / code fonts | Families including locale fallbacks | Font/style file |
| Type scale | Title, section, body, label, metadata, code | Token/style file |
| Spacing / widths | Gutters, prose width, workbench width, section gaps | Token/layout file |
| Radius / elevation | Finite values and intended uses | Token/style file |

Use existing project tokens; do not keep placeholders or duplicate the framework's token system unnecessarily.

## Components and states

Name the owning component/style for primary/secondary/quiet actions, fields, navigation, inline prose links, recommendation rows, downloads, tabs/disclosures and feedback. Define hit areas and focus/hover/selected/disabled/error/busy behavior where applicable.

Inline prose links require a persistent non-color distinction. Interface navigation and recommendations do not need default underlines. Keep decorative navigation arrows out of cards and links.

## Page templates

For each real page family, document composition, representative route, content width, primary action and mobile behavior. Include acquisition/tool, browse and article templates only when they exist. Respect the product's mode and approved reference.

## Content, themes and exports

Record copy/metadata hierarchy, long-label behavior, dark mode, reduced motion and supported locale constraints. Scope site styling separately from user-generated previews and exported documents. Document intentional exceptions with their reason and owner.

## Acceptance

List actual repository commands and representative routes. Apply the ShipLean browser review matrix: phone, intermediate width, desktop; first viewport, main task and lower sections; applicable states, themes and keyboard/touch behavior. Verify actual files for exporter changes.

Save a dated report with visual evidence, workflow results and limitations. Preserve SEO route identity, canonical/hreflang, sitemap and internal-link reachability. Report local, Git, CI and deployment outcomes separately.

## Maintenance

New UI uses these components and tokens. Update this file when a deliberate design decision changes; confirm computed browser appearance rather than trusting classes alone. Adopt upstream baseline changes explicitly without replacing the product's identity.
