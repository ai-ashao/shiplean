# ShipLean

[English](README.md) | 简体中文

ShipLean 是一个面向编码 Agent 的 TanStack Start 产品脚手架，用来把聚焦的产品想法快速收敛成经过验证的 MVP。

ShipLean 同时面向 **SaaS 产品** 与 **公开工具站**。当前仓库仍保留 SaaS-oriented starter 路由，同时 Tool Landing 系统提供独立的 task-first 工具站基础。

## 使用下载后的模板

SaaS 示例：

```text
Use $shiplean-quick-start to turn this template into a bilingual feedback SaaS.
```

工具站示例：

```text
Use $shiplean-quick-start to build a free bilingual image utility.
Use the default Tool Landing, keep the first task anonymous, and populate the live Tool Registry.
```

Skill 正式入口是 `.agents/skills/shiplean-quick-start/SKILL.md`。

## 本地运行

```bash
pnpm install
pnpm dev
```

## 验证

```bash
pnpm verify
```

验证包含格式/lint、单元契约、Cloudflare-oriented build、严格 TypeScript、HTTP smoke 与 Playwright 浏览器验收。

Tool Landing 浏览器门禁覆盖：

```text
1440 × 900
390 × 844
```

并同时使用文本工具 fixture 与更接近真实图片工具的上传 fixture。

GitHub Actions 会在 Pull Request，以及 push 到 `main` / `dev` 时自动运行验证。

## 当前能力

- TanStack Start、React、严格 TypeScript
- SaaS-oriented 首页、指南、定价、登录与 Dashboard 示例
- `shiplean-quick-start` Agent Skill
- Cloudflare-first 构建路径
- canonical / hreflang / robots / sitemap 基线
- Tool Landing v0.2 task-first 结构
- Tool Registry 驱动的多语言工具路由、Related Tools、Footer、hreflang 与 sitemap
- Constraints、Value Signals、Completion Highlights、Capabilities、Helpful Guidance
- Tool Landing / Tool-site 配置 Validator
- 面向免费、无账号、浏览器本地处理工具的 typed Privacy / Terms 固定模板与上线审查门禁
- 1440×900 与 390×844 浏览器首屏验收

暂未实现：

- 顶层 `Tool | SaaS` Product Modes
- 订阅 SaaS 的 Privacy / Terms 模块
- 生产级 Auth / PostgreSQL / 支付 / 邮件 / 对象存储
- Tool Result / Workbench 广告变现系统
- Ads / Analytics 抽象

相关文档：

- [Tool Landing Standard v0.2](./docs/tool-landing-standard-v0.2.md)
- [Tool Landing v0.2.1 hardening](./docs/tool-landing-v0.2.1-hardening.md)
- [Legal page template](./docs/legal-pages.md)
- [Current feature status](./docs/FEATURE_STATUS.md)
