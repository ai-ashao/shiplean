# ShipLean

[简体中文](README.zh-CN.md)

An Agent-ready TanStack Start SaaS scaffold for turning a focused product idea into a verified MVP without paying for a heavyweight boilerplate.

## Use the downloaded template

1. Download and unpack ShipLean into a local workspace.
2. Open the repository in Codex, Claude Code, or another coding agent that can read project files.
3. Invoke the bundled Skill and describe the product:

```text
Use $shiplean-quick-start to turn this template into a bilingual feedback SaaS.
The first user is a solo founder and the first workflow is collecting one shareable feedback board.
```

The canonical Skill lives at `.agents/skills/shiplean-quick-start/SKILL.md`. If an agent does not automatically discover project Skills, explicitly ask it to read that file before starting the task.

The Skill reads `AGENTS.md` and `ARCHITECTURE.md`, scopes the first workflow, preserves the scaffold boundaries, implements the requested product, and finishes with `pnpm verify`.

## Run locally

```bash
pnpm install
pnpm dev
```

No external secret is required. `/login` and `/dashboard` form a visibly labeled local identity demo. They do not create a production account or charge a card.

## Verify

```bash
pnpm verify
```

The command checks formatting and lint rules, strict TypeScript, platform and Skill contracts, the Cloudflare-oriented production build, and a fresh-server HTTP smoke covering public metadata, security headers, bilingual routes, and the local session boundary.

## MVP boundary

Included now:

- TanStack Start, React, and TypeScript strict;
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
