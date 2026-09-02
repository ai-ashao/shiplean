# Apply ShipLean Tool Landing v0.2

Target repository:

```text
ai-ashao/shiplean
branch: dev
reviewed base: b6e853bf309cc4a047ba10f52350b02f62160394
```

## Apply

1. Check out `dev`.
2. Ensure no unrelated uncommitted work will be overwritten.
3. Copy this overlay into the repository root, preserving paths.
4. Delete:
   ```text
   OVERLAY_MANIFEST.json
   ```
5. Run:
   ```bash
   pnpm check
   pnpm test
   pnpm build
   pnpm typecheck
   pnpm e2e
   pnpm e2e:browser
   ```
6. Then run:
   ```bash
   pnpm verify
   ```

## Expected behavior changes

- v0.1 Tool Landing configs remain accepted.
- v0.2 adds Constraints, Completion highlights, Capabilities, and Helpful Guidance.
- Default first-view order becomes Hero → Tool → Constraints → Value Signals → Completion.
- Footer infrastructure supports up to four Tool Directory groups driven by the live Tool Registry.
- Guides can be configured in Header or Footer, not both.
- Header still contains no default CTA.
- Explicit competitor/reference layouts remain product-local overrides; no new ShipLean preset is created.

## Product conversion note

The downloaded ShipLean starter intentionally keeps its existing marketing header configuration.

When converting a product into a tool site, edit only:

```text
src/lib/site-navigation.ts
src/modules/tool-registry.ts
```

Typical small catalog:

```text
header: Tools + Guides
Guides placement: header
```

Typical large catalog:

```text
header: Tools
Guides placement: footer
Footer: category groups
```
