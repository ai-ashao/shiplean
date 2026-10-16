# Design acceptance and delivery

Use with [design baseline](./design-baseline.md), the project's `DESIGN.md`, and the existing functional verification command. This gate makes visual acceptance an explicit part of delivery; it does not require a new testing framework.

## Before implementation

- Read the project contract and inspect current components, tokens and representative pages. Preserve unrelated dirty work.
- List affected page families and representative routes. Include every changed shared template, not every duplicate locale page.
- Record chosen references and actual product constraints. Establish the project design contract before spreading a new pattern across routes. No user reconfirmation is needed for ordinary reversible choices already authorized by the task.
- Capture the current problem when modifying an existing interface. Source inspection is useful for diagnosis, not visual proof.

## Browser review matrix

| Dimension | Minimum evidence |
| --- | --- |
| Width | Narrow phone (320–390px), laptop/tablet (768–1024px), desktop (1440px); inspect long labels and supported languages |
| Position | First viewport, primary operation, one lower section, navigation and recommendations/footer |
| Content | Typical and long title/body/data; empty and invalid input when applicable |
| States | Default, hover, keyboard focus, selected, disabled, loading/error/success where supported |
| Theme | Light and dark when the product supports both; check on-accent text and code surfaces |
| Input | Mouse, keyboard and a touch-sized viewport; disclosures, menus, copy/import/download and Back/Forward where relevant |
| Output | Actual exported document/file for affected exporters; inspect content, pagination and first/middle/final markers for print changes |
| Motion | Reduced-motion mode and absence of unnecessary layout shifts |

For Tool Landing, preserve the stronger first-viewport contract at 1440×900 and 390×844. A reference page's upload/task surface, CTA and critical constraints must remain visible. A product's explicitly approved custom layout follows its own documented task-first acceptance criteria.

## Inspect, do not only assert

Check hierarchy, line length, clipping, actual spacing, click targets and interaction feedback in screenshots or the browser. An automated no-overflow assertion cannot judge composition. A successful build cannot judge either. Keep visual inspection and functional test results separate in the report.

- Content links remain recognizable without color perception. Interface links use the intended navigation/list/action pattern, not a blanket underline removal.
- Headers, directories, recommendation rows and download controls have appropriate emphasis and share their defined components.
- Focus is visible and not clipped. Collapsed contents do not trap focus or hide the only navigation path.
- Supporting text remains readable in both themes. Long titles and translations reflow instead of reducing everything to tiny text.
- Article styles do not change user Markdown previews or printed documents. Printing excludes site navigation and supporting UI.
- Missing samples, broken internal links, orphaned pages and fake features are failures even when the screenshot looks polished.

## Verification commands and findings

Run the repository's existing checks. In ShipLean this is `pnpm verify`; product repositories document their own commands in `DESIGN.md`. Add meaningful regression tests for new behavior such as disclosure, scroll tracking or fullscreen feedback. Do not create tests that merely search for documentation phrases or assert every cosmetic class name.

Classify findings as fixed and verified, deferred with a specific reason, or unverified. Fix blockers that obscure the task, lose content, break keyboard access or prevent export. Describe cosmetic limitations plainly rather than inventing a numerical design score.

## Delivery evidence template

```markdown
# Design acceptance — YYYY-MM-DD

Design contract/version:
Scope and representative routes:
Existing work preserved:

Changes: shared components, template changes and deliberate exceptions.
Visual evidence: paths + width/theme/state; explain what was inspected.
Behavior evidence: actual workflows and file readback where relevant.
Checks: commands and observed results; note skipped tests and limitations.
Findings: fixed / deferred / unverified, with reasons.
Delivery: local / commit / push / CI / deployment / production, separately.
```

Save product evidence in a dated repository report, with screenshots as local artifacts unless the user needs them versioned. Report exact Git/CI/deployment state; pushing a feature branch is not proof of deployment. Do not claim GSC outcomes from canonical or sitemap checks.

## Maintaining the baseline

Update project `DESIGN.md` alongside deliberate visual-contract changes. Record reusable cross-product principles in ShipLean; keep product palettes and one-off layouts in their product repository. Existing projects adopt baseline updates explicitly and incrementally. No automatic overwrite, cross-repository mass edit or framework migration is implied.
