# ShipLean

[English](README.md) | 简体中文

ShipLean 是一个面向编码 Agent 的 TanStack Start SaaS 脚手架，用来把聚焦的产品想法快速收敛成经过验证的 MVP，不需要先购买或维护一套沉重的全功能模板。

## 使用下载后的模板

1. 下载 ShipLean 并解压到本地工作区。
2. 使用 Codex、Claude Code 或其他能读取项目文件的编码 Agent 打开仓库。
3. 调用仓库自带的 Skill，并说明产品目标：

```text
Use $shiplean-quick-start to turn this template into a bilingual feedback SaaS.
The first user is a solo founder and the first workflow is collecting one shareable feedback board.
```

Skill 的正式入口是 `.agents/skills/shiplean-quick-start/SKILL.md`。如果 Agent 没有自动发现项目内 Skill，请明确要求它先阅读该文件。

该 Skill 会先读取 `AGENTS.md` 和 `ARCHITECTURE.md`，收敛首个用户工作流，保留脚手架边界，完成产品实现，最后运行 `pnpm verify`。

## 本地运行

```bash
pnpm install
pnpm dev
```

本地演示不需要外部密钥。`/login` 和 `/dashboard` 提供了明确标注的本地身份演示，不会创建生产账号，也不会产生真实扣费。

## 验证

```bash
pnpm verify
```

该命令会检查格式和 lint、严格 TypeScript、平台与 Skill 契约、面向 Cloudflare 的生产构建，以及一台全新服务上的 HTTP smoke。Smoke 覆盖公开 metadata、安全响应头、双语路由和本地会话边界。

## MVP 边界

当前已包含：

- TanStack Start、React 和严格 TypeScript
- 落地页、指南、定价、登录与受保护 Dashboard 示例
- 内置的 `shiplean-quick-start` Agent Skill
- `AGENTS.md`、架构文档、模块任务契约和一键验证
- 不依赖外部 Auth 的本地 HttpOnly 身份演示
- Cloudflare-first 构建与部署路径
- 公开站点所需的 metadata、canonical、hreflang、robots 和 sitemap 基线

第二阶段再接入：

- 生产级身份验证与 PostgreSQL 持久化
- 支付、订单、webhook、权益和积分
- 产品化 SEO 生成器或 SEO SaaS 功能
- 邮件、对象存储，以及基于真实账号的 Cloudflare 部署证据

实现边界和验收证据见 [ARCHITECTURE.md](./ARCHITECTURE.md) 与 [docs/mvp-acceptance.md](./docs/mvp-acceptance.md)。
