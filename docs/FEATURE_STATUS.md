# ShipLean 当前功能状态

最后语义核对：2026-09-02。实现证据见 `mvp-acceptance.md`、`tool-landing-v0.1-implementation.md`、`tool-landing-v0.2-implementation.md`，技术边界见 `../ARCHITECTURE.md`。

| 能力 | 当前状态 | 证据或边界 |
|---|---|---|
| TanStack Start + React + strict TypeScript scaffold | 已实现 | 当前只提供 TanStack Start |
| shadcn/Tailwind 本地 UI foundation | 已实现 | 无运行时 UI 服务依赖 |
| 英中营销、指南、定价和应用示例 | 已实现 | 当前路由和 smoke 覆盖 |
| 本地 HttpOnly identity demo | 已实现 | 明确不是生产认证 |
| bundled `shiplean-quick-start` Skill | 已实现 | 验证流程包含 Skill contract |
| `pnpm verify` 一键门禁 | 已实现 | 格式、测试、构建、类型、HTTP smoke 与 browser viewport |
| Cloudflare-first 本地 bundle | 已实现 | 未声明 account-backed 生产部署 |
| Tool Landing v0.1 shared composition | Candidate 已实现 | 保留兼容，继续由 v0.2 演进 |
| Tool Landing v0.2 task-first fields | Candidate 已实现 | Constraints / Completion / Capabilities / Helpful Guidance |
| Tool Value Signals | 已实现 | Free / Online / No installation / No signup 等 claim 必须与真实行为一致 |
| Tool Registry / Related Tools | 已实现 | 支持产品 live tools 与可选本地化展示 |
| Tool Directory Footer infrastructure | Candidate 已实现 | 由 site navigation + Tool Registry 驱动；默认 starter registry 为空 |
| Guides Header/Footer placement | Candidate 已实现 | 通过 site navigation config 保证主导航区域二选一 |
| Tool Structured Data | 已实现 | WebApplication / FAQPage / BreadcrumbList 仅输出可见、可验证信息 |
| Tool reference route | 已实现 | `/tool-reference` 为 noindex 基础设施参考页，不算真实生产 consumer |
| First Viewport browser acceptance | 已实现 | Playwright 验证 1440×900 与 390×844 |
| Explicit product-local layout override | 规范已定义 | 用户明确指定参考布局时可绕过 default hierarchy，但不能绕过质量门禁 |
| 生产认证、PostgreSQL、支付、邮件、对象存储 | 未实现 | 明确推迟到后续阶段 |

v0.2 仍是 candidate。稳定晋升需要 reference route + 两个真实产品 consumer 的证据。
