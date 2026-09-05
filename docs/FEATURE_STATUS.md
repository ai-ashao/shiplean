# ShipLean 当前功能状态

最后语义核对：2026-09-05。

| 能力 | 当前状态 | 证据或边界 |
|---|---|---|
| TanStack Start + React + strict TypeScript scaffold | 已实现 | 当前只提供 TanStack Start |
| 顶层 Tool / SaaS Product Mode | Candidate 已实现 | `src/lib/product-config.ts` 单一模式入口 |
| Product Mode route/surface hardening | Candidate 已实现 | Pricing/App 默认随模式切换；可显式 override；verify mode-aware |
| ShipLean 官网 / 模板运行时分离 | 已实现 | 官网归 `ai-ashao/shiplean-site`；模板使用中性 `Starter Product` |
| SaaS default homepage + shell | Candidate 已实现 | Hero / Product Preview / Outcomes / Workflow / Pricing Entry / FAQ / Header CTA |
| Tool default homepage + shell | Candidate 已实现 | task-first Tool Landing；默认无 SaaS Header CTA |
| SaaS-only Pricing surface | Candidate 已实现 | SaaS 默认启用；Tool 默认 404 + 不进 sitemap；可显式开启 |
| SaaS-only App surface | Candidate 已实现 | SaaS 默认启用；Tool 默认隐藏 login / dashboard / sandbox API |
| Login / Dashboard indexability | 已实现 | 始终 `noindex,nofollow` |
| `shiplean-quick-start` Skill | 已实现 | 先选 Product Mode 与品牌，再进入对应开发合同 |
| `pnpm verify` 一键门禁 | 已实现 | 格式、测试、构建、类型、HTTP smoke、browser viewport |
| Mode-aware browser / HTTP acceptance | Candidate 已实现 | 不再写死 SaaS；按 active mode 与 surface 状态验收 |
| GitHub CI on main/dev | 已实现 | Runner 显式安装 Chromium |
| SEO Metadata Contract v0.1 | 已实现 | 通用结构化 audit、Tool Landing 兼容接入、sitemap 全量 SSR metadata 门禁 |
| Tool Landing v0.2 task-first fields | Candidate 已实现 | Constraints / Completion / Capabilities / Helpful Guidance |
| Tool localized-route source of truth | Candidate 已实现 | Registry 驱动 Tool hreflang / switch / sitemap / Related / Footer |
| Tool Directory Footer | Candidate 已实现 | site navigation + live Tool Registry |
| Product / SaaS / Tool navigation validators | Candidate 已实现 | mode-specific Header CTA / Tools / Workflow / Pricing 约束 |
| Tool Landing config validator | Candidate 已实现 | Completion / Capabilities / Related / messaging / structured-data |
| Site Navigation / Registry validator | Candidate 已实现 | unknown/planned/duplicate 配置可失败 |
| Tool reference routes | 已实现 | text + realistic upload fixtures，均强制 Tool shell 且 noindex |
| First Viewport browser acceptance | 已实现 | 1440×900 与 390×844 |
| Free local Tool Privacy / Terms template | 已实现 | 仅覆盖免费、无账号、输入本地处理的工具 |
| Legal production review gate | 已实现 | `pnpm deploy` 前置严格 Validator；starter 页面 noindex 且不进入 sitemap |
| Subscription SaaS legal template | 未实现 | Product Mode 不代表 SaaS legal 已完成 |
| Result / Workbench monetization | 未实现 | 暂不加入 Landing |
| 生产认证、PostgreSQL、支付、邮件、对象存储 | 未实现 | 后续阶段 |

Tool Landing v0.2 与 Product Modes 当前仍是 candidate。稳定晋升需要真实产品 consumer 证据。
