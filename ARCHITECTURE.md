# ShipLean Architecture

## Runtime shape

The MVP is one TanStack Start, Cloudflare-first SaaS scaffold. File routes own HTTP and page composition. Plain TypeScript modules own product rules. The repository is intentionally small enough for a coding Agent to inspect before it edits.

```text
downloaded template
        ↓
coding Agent + shiplean-quick-start Skill
        ↓
independent private product repository
        ↓
public product surface → local session boundary → protected app shell
        ↓
                    pnpm verify
```

## Repository entry points

- `.agents/skills/shiplean-quick-start/SKILL.md`: establishes an independent product repository and turns a product idea into an implementation workflow;
- `AGENTS.md`: product boundary, safety rules, and completion command;
- `docs/getting-started.md`: tutorial from private checkout to Agent-built, verified MVP;
- `docs/configuration.md`: environment and sandbox configuration reference;
- `TASKS/`: explicit contracts for substantial modules;
- `src/routes`: public, session, and application surfaces;
- `src/components/ui`: local shadcn/ui primitives owned by the downloaded project;
- `components.json` and `src/styles.css`: shadcn aliases, Tailwind entrypoint, and neutral design tokens;
- `src/lib/auth`: visibly local identity boundary;
- `src/modules/manifests.ts`: machine-readable module ownership and acceptance;
- `src/start.ts`: global security headers;
- `scripts/e2e-smoke.mjs`: fresh-server acceptance path.

## Current trust boundary

The local identity demo establishes an eight-hour HttpOnly, SameSite=Lax cookie and protects the dashboard workflow in the browser. It does not create an external account or imply that production auth is configured.

When a real MVP needs accounts, replace the server adapter while keeping provider session types out of product UI and preserving protected-route tests.

## Phase-two boundaries

Payments, orders, provider webhooks, entitlements, and credits are not part of the current MVP. When introduced, provider signatures must be verified before domain events are accepted, and credits must use an append-only ledger rather than a mutable balance as the source of truth.

Productized SEO tools are also out of scope. Public routes still retain baseline title, description, canonical, hreflang, robots, and sitemap behavior because those are website infrastructure rather than a product feature.

## Deployment status

Cloudflare Workers is the only intended first production runtime. The official Cloudflare Vite plugin and Wrangler entry produce a Workers bundle locally. No deployment is claimed until an account-backed smoke test and configuration readback have passed.
