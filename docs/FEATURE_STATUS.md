# ShipLean 当前功能状态

最后语义核对：2026-09-02。实现证据见 `mvp-acceptance.md`、`tool-landing-v0.1-implementation.md`，技术边界见 `../ARCHITECTURE.md`。

| 能力 | 当前状态 | 证据或边界 |
|---|---|---|
| TanStack Start + React + strict TypeScript scaffold | 已实现 | 当前只提供 TanStack Start |
| shadcn/Tailwind 本地 UI foundation | 已实现 | 无运行时 UI 服务依赖 |
| 英中营销、指南、定价和应用示例 | 已实现 | 当前路由和 smoke 覆盖 |
| 本地 HttpOnly identity demo | 已实现 | 明确不是生产认证 |
| bundled `shiplean-quick-start` Skill | 已实现 | 验证流程包含 Skill contract |
| `pnpm verify` 一键门禁 | 已实现 | 格式、测试、构建、类型和 HTTP smoke |
| Cloudflare-first 本地 bundle | 已实现 | 未声明 account-backed 生产部署 |
| Tool Landing shared composition | Candidate 已实现 | `tool-default` 仍需真实产品 consumer 验证后才能晋升 stable |
| Tool Value Signals | 已实现 | Free / Online / No installation / No signup 等 claim 必须与真实行为一致 |
| Tool Registry / Related Tools | 已实现 | 产品负责注册真实 live canonical tools |
| Tool Structured Data | 已实现 | WebApplication / FAQPage / BreadcrumbList 仅输出可见、可验证信息 |
| Tool reference route | 已实现 | `/tool-reference` 为 noindex 基础设施参考页，不算真实生产 consumer |
| First Viewport browser acceptance | 待验证 | 必须以 1440×900 与 390×844 的真实浏览器 layout evidence 验收 |
| 生产认证、PostgreSQL、支付、邮件、对象存储 | 未实现 | 明确推迟到后续阶段 |

产品边界、模板能力或验证门禁改变时同步更新；活跃开发每月、稳定阶段每季度语义核对。
