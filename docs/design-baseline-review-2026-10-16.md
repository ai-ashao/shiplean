# Shared design baseline review — 2026-10-16

## Existing foundation

ShipLean already had a starter `DESIGN.md`, semantic Tailwind/shadcn tokens and UI primitives, plus interaction, control-spacing and web-product-quality documents. The interaction guide already distinguishes prose from interface links and prohibits generic decorative arrows. The browser gate already tests real starter viewports. The gap was adoption and ownership: there was no explicit product design template or single design acceptance handoff connecting those documents to implementation and release evidence.

## Added contract

- `docs/design-baseline.md`: shared versus product ownership, semantic token roles, link/action taxonomy, component states, product-owned page templates and incremental migration.
- `docs/design-acceptance.md`: page/state/theme/width matrix; visual inspection distinct from automated checks; actual export verification; dated evidence format; separate local/Git/CI/deployment outcomes.
- `docs/templates/project-design.md`: a template for each product's actual identity, values, component ownership, page families and verification commands. It is explicitly a template, not a completed product design.
- Connected these documents from `AGENTS.md`, the bundled quick-start skill, starter `DESIGN.md`, README, getting-started and the existing quality guide.

The starter palette remains its own default. Projects do not import one mandatory aesthetic, a new Theme DSL, MDFormats-specific components or a different framework. Existing projects adopt deliberately rather than receiving automatic overwrites.

## Preservation and verification

The worktree was already dirty in design/quality documentation and runtime surfaces. Those edits were read and preserved. This task adds documentation and entry-point guidance only in ShipLean; it does not change runtime code, dependencies, CI or deployment configuration. A pre-edit diff/document snapshot was saved outside the repository for comparison.

`pnpm verify` passed against the complete current worktree: Biome, 91 unit tests, production client/SSR build, strict TypeScript, HTTP SEO/internal-link/security/session smoke and 10 real-browser viewport checks. Local relative links in the three new contract documents were also checked. These checks include preexisting changes and do not attribute those changes to this task.

MDFormats is the first explicitly adapted consumer in this task: its own `DESIGN.md` and shared UI implementation live in the MDFormats repository, with a separate dated acceptance report. No other product was migrated.

Final pre-delivery recheck repeated `pnpm verify` successfully. The Git delivery contains only the ten baseline/template/documentation-entry files from this task. In four overlapping documents, only this task's additions are staged; earlier design and runtime changes remain in the working tree. Existing artifacts and `docs/OPTIMIZATION_PLAN.md` are excluded.

These results describe local acceptance before the separately authorized commit/push. Exact Git and CI outcomes are reported after remote readback; no deployment or production outcome is implied.
