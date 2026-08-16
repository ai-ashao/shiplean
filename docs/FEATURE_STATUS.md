# ShipLean 当前功能状态

最后语义核对：2026-08-16。实现证据见 `mvp-acceptance.md`，技术边界见 `../ARCHITECTURE.md`。

| 能力 | 当前状态 | 证据或边界 |
|---|---|---|
| TanStack Start + React + strict TypeScript scaffold | 已实现 | 当前只提供 TanStack Start |
| shadcn/Tailwind 本地 UI foundation | 已实现 | 无运行时 UI 服务依赖 |
| 英中营销、指南、定价和应用示例 | 已实现 | 当前路由和 smoke 覆盖 |
| 本地 HttpOnly identity demo | 已实现 | 明确不是生产认证 |
| bundled `shiplean-quick-start` Skill | 已实现 | 验证流程包含 Skill contract |
| `pnpm verify` 一键门禁 | 已实现 | 格式、测试、构建、类型和 HTTP smoke |
| Cloudflare-first 本地 bundle | 已实现 | 未声明 account-backed 生产部署 |
| 生产认证、PostgreSQL、支付、邮件、对象存储 | 未实现 | 明确推迟到后续阶段 |

产品边界、模板能力或验证门禁改变时同步更新；活跃开发每月、稳定阶段每季度语义核对。
