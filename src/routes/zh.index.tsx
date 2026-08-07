import { createFileRoute, Link } from '@tanstack/react-router'
import { AgentWorkflow } from '@/components/agent-workflow'
import { sandboxUiAvailable } from '@/lib/config/runtime'
import { pageHead } from '@/lib/seo'

const sectionIds = {
  product: 'product',
  workflow: 'workflow',
  pricing: 'pricing',
} as const

export const Route = createFileRoute('/zh/')({
  head: () =>
    pageHead({
      title: '让独立开发者用得起的 TanStack 启动模板',
      description:
        '下载 ShipLean TanStack Start SaaS 脚手架，用编程 Agent 打开，并调用内置 Skill 快速做出可验证的 MVP。',
      path: '/zh',
      alternates: [
        { locale: 'en', path: '/' },
        { locale: 'zh-CN', path: '/zh' },
        { locale: 'x-default', path: '/' },
      ],
    }),
  component: ChineseHome,
})

function ChineseHome() {
  return (
    <>
      <section className="hero section-pad" id={sectionIds.product}>
        <div className="hero-copy">
          <p className="eyebrow">
            <span>01</span> TANSTACK START 产品模板
          </p>
          <h1>
            先把产品做出来。
            <br />
            <em>别先交模板税。</em>
          </h1>
          <p className="hero-lede">
            下载轻量的 TanStack Start SaaS 脚手架，用 Codex 或 Claude Code 打开，然后调用仓库内置
            Skill，把产品想法快速变成可验证的 MVP。
          </p>
          <div className="button-row">
            <a className="button button-dark" href="#workflow">
              查看使用方法 <span>↓</span>
            </a>
            <a className="button button-plain" href="#pricing">
              查看 $66 创始定价
            </a>
          </div>
          <div className="hero-proof">
            <span>内置 AGENT SKILL</span>
            <span>$66 创始价格</span>
            <span>一条命令完整验证</span>
          </div>
        </div>
        <aside className="shipping-note" aria-label="产品摘要">
          <div className="note-top">
            <span>SHIP / LEAN</span>
            <span>编号 0066</span>
          </div>
          <div className="barcode" aria-hidden="true" />
          <dl>
            <dt>运行框架</dt>
            <dd>TanStack Start</dd>
            <dt>首选部署</dt>
            <dd>Cloudflare</dd>
            <dt>产品路径</dt>
            <dd>Agent → MVP</dd>
            <dt>授权方式</dt>
            <dd>商业授权</dd>
          </dl>
          <div className="note-stamp">
            把
            <br />
            利润
            <br />
            留下
          </div>
        </aside>
      </section>

      <section className="rail-section section-pad" id={sectionIds.workflow}>
        <div className="section-heading">
          <div>
            <p className="eyebrow">
              <span>02</span> 下载 → AGENT → MVP
            </p>
            <h2>
              你提供想法。
              <br />
              Skill 规划路线。
            </h2>
          </div>
          <p>模板自带架构、项目规则、任务合同和验收命令，Agent 无需先花时间考古。</p>
        </div>
        <AgentWorkflow locale="zh-CN" />
      </section>

      <section className="manifest-section section-pad">
        <div className="manifest-copy">
          <p className="eyebrow">
            <span>03</span> SKILL 就是上手指南
          </p>
          <h2>调用一次，开始开发。</h2>
          <p>内置 Skill 先读取架构和边界，再把产品想法收敛为可执行范围，完成后运行全仓验证。</p>
          <Link className="text-link" to="/guides">
            阅读构建说明（英文）→
          </Link>
        </div>
        <div className="manifest-terminal">
          <div>
            <span className="terminal-dot red" />
            <span className="terminal-dot amber" />
            <span className="terminal-dot green" />
            <code>shiplean / quick-start</code>
          </div>
          <pre>{`$shiplean-quick-start

> 做一个专注的 SaaS MVP……
✓ 读取项目合同
✓ 收敛首个用户流程
✓ 实现产品功能
✓ 运行 pnpm verify

等待你检查_`}</pre>
        </div>
      </section>

      <section className="closing-cta section-pad" id={sectionIds.pricing}>
        <span className="big-number">$66</span>
        <div>
          <p className="eyebrow">创始用户授权</p>
          <h2>
            比你差点买下的
            <br />
            那套模板便宜得多。
          </h2>
        </div>
        {sandboxUiAvailable ? (
          <Link className="button button-light" to="/login">
            体验脚手架
          </Link>
        ) : (
          <a className="button button-light" href="#pricing">
            查看授权定价
          </a>
        )}
      </section>
    </>
  )
}
