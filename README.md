# ShipLean

[简体中文](README.zh-CN.md)

An Agent-ready TanStack Start SaaS scaffold for turning a focused product idea into a verified MVP without paying for a heavyweight boilerplate.

ShipLean currently provides **TanStack Start only**. There is no Next.js edition or framework switcher.

## Use the downloaded template

1. Download and unpack ShipLean into a local workspace.
2. Open the repository in Codex, Claude Code, or another coding agent that can read project files.
3. Invoke the bundled Skill and describe the product:

```text
Use $shiplean-quick-start to turn this template into a bilingual feedback SaaS.
The first user is a solo founder and the first workflow is collecting one shareable feedback board.
```

The canonical Skill lives at `.agents/skills/shiplean-quick-start/SKILL.md`. If an agent does not automatically discover project Skills, explicitly ask it to read that file before starting the task.

The Skill reads `AGENTS.md` and `ARCHITECTURE.md`, scopes the first workflow, creates and binds an independent private GitHub repository, preserves the scaffold boundaries, implements the requested product, and finishes with `pnpm verify` before committing and pushing the verified result.

When a Git clone still points at `ai-ashao/shiplean`, the Skill keeps that remote as a fetch-only `template` and creates the product repository as `origin`. Product-specific commits must never be pushed to the ShipLean template repository.

`$shiplean-quick-start` is a prompt for the coding Agent, not a terminal command.

## Run locally

```bash
pnpm install
pnpm dev
```

No external secret is required. `/login` and `/dashboard` form a visibly labeled local identity demo. They do not create a production account or charge a card.
Production builds hide and reject these sandbox routes unless both sandbox flags are explicitly enabled.

## Verify

```bash
pnpm verify
```

The command checks formatting and lint rules, strict TypeScript, platform and Skill contracts, the Cloudflare-oriented production build, and a fresh-server HTTP smoke covering public metadata, security headers, bilingual routes, and the local session boundary.

## MVP boundary

Included now:

- TanStack Start, React, and TypeScript strict;
- shadcn/ui component conventions with Tailwind CSS, neutral tokens, and local UI primitives;
- public landing, guide, pricing, login, and protected dashboard examples;
- bundled `shiplean-quick-start` Agent Skill;
- `AGENTS.md`, architecture, module task contract, and one-command verification;
- local HttpOnly identity demo with no external auth dependency;
- Cloudflare-first build and deployment path;
- baseline metadata, canonical, hreflang, robots, and sitemap required by the public site.

Deferred to phase two:

- production auth and PostgreSQL persistence;
- payments, orders, webhooks, entitlements, and credits;
- productized SEO generators or SEO SaaS features;
- email, object storage, and account-backed Cloudflare deployment evidence.

See [ARCHITECTURE.md](./ARCHITECTURE.md) and [docs/mvp-acceptance.md](./docs/mvp-acceptance.md) for the implementation boundaries and acceptance evidence.

## Documentation

- [Build your first ShipLean MVP](./docs/getting-started.md): download, run, open the coding Agent, invoke the bundled Skill, and verify the result.
- [Configuration reference](./docs/configuration.md): public variables, server-only variables, sandbox behavior, and Cloudflare settings.
- [Architecture](./ARCHITECTURE.md): runtime shape, trust boundaries, and module ownership.
- [Current feature status](./docs/FEATURE_STATUS.md): rolling implementation and deferral matrix.
- [Cloudflare deployment boundary](./docs/deployment.md): production setup and final-origin checks.
- [MVP acceptance evidence](./docs/mvp-acceptance.md): what the current repository proves and what remains deferred.
- [Upgrade policy](./docs/upgrades.md): dependency and migration rules.

## UI foundation

The default template uses shadcn/ui conventions without a runtime UI service. Configuration lives
in `components.json`, design tokens live in `src/styles.css`, and reusable primitives live in
`src/components/ui`. Add or replace components locally so downloaded projects remain fully owned
and usable without external secrets.
