import { createFileRoute, Link } from '@tanstack/react-router'
import { AgentWorkflow } from '@/components/agent-workflow'
import { sandboxUiAvailable } from '@/lib/config/runtime'
import { pageHead } from '@/lib/seo'

const workflowId = 'workflow'

export const Route = createFileRoute('/')({
  head: () =>
    pageHead({
      title: 'Ship useful products, skip the boilerplate tax',
      description:
        'Download an affordable TanStack Start SaaS scaffold, open it in your coding agent, and use the bundled Skill to build a verified MVP.',
      path: '/',
      alternates: [
        { locale: 'en', path: '/' },
        { locale: 'zh-CN', path: '/zh' },
        { locale: 'x-default', path: '/' },
      ],
    }),
  component: HomePage,
})

function HomePage() {
  return (
    <>
      <section className="hero section-pad">
        <div className="hero-copy">
          <p className="eyebrow">
            <span>01</span> TANSTACK START PRODUCT KIT
          </p>
          <h1>
            Ship the product.
            <br />
            <em>Skip the tax.</em>
          </h1>
          <p className="hero-lede">
            Download a lean TanStack Start SaaS scaffold, open it in your coding agent, and invoke
            the bundled Skill to turn an idea into a verified MVP.
          </p>
          <div className="button-row">
            <a className="button button-dark" href="#workflow">
              See how it works <span>↓</span>
            </a>
            <Link className="button button-plain" to="/pricing">
              See the $66 scaffold
            </Link>
          </div>
          <div className="hero-proof">
            <span>BUNDLED AGENT SKILL</span>
            <span>$66 FOUNDING</span>
            <span>ONE VERIFY COMMAND</span>
          </div>
        </div>
        <aside className="shipping-note" aria-label="Product summary">
          <div className="note-top">
            <span>SHIP / LEAN</span>
            <span>REF 0066</span>
          </div>
          <div className="barcode" aria-hidden="true" />
          <dl>
            <dt>Runtime</dt>
            <dd>TanStack Start</dd>
            <dt>Deploy</dt>
            <dd>Cloudflare-first</dd>
            <dt>Mode</dt>
            <dd>Agent → MVP</dd>
            <dt>License</dt>
            <dd>Commercial</dd>
          </dl>
          <div className="note-stamp">
            KEEP
            <br />
            THE
            <br />
            MARGIN
          </div>
        </aside>
      </section>
      <section className="rail-section section-pad" id={workflowId}>
        <div className="section-heading">
          <div>
            <p className="eyebrow">
              <span>02</span> DOWNLOAD → AGENT → MVP
            </p>
            <h2>
              Bring the idea.
              <br />
              Let the Skill map the route.
            </h2>
          </div>
          <p>
            The template carries the architecture, project rules, task contracts, and acceptance
            command. Your agent starts with context instead of archaeology.
          </p>
        </div>
        <AgentWorkflow />
      </section>
      <section className="manifest-section section-pad">
        <div className="manifest-copy">
          <p className="eyebrow">
            <span>03</span> THE SKILL IS THE ONBOARDING
          </p>
          <h2>One invocation starts the build.</h2>
          <p>
            The bundled Skill reads the architecture and guardrails, turns your idea into a scoped
            implementation, and finishes with the repository-wide verification contract.
          </p>
          <Link className="text-link" to="/guides">
            Read the build notes →
          </Link>
        </div>
        <div className="manifest-terminal">
          <div>
            <span className="terminal-dot red" />
            <span className="terminal-dot amber" />
            <span className="terminal-dot green" />
            <code>shiplean / quick-start</code>
          </div>
          <pre>{`$shiplean-quick-start\n\n> Build a focused SaaS MVP…\n✓ read project contracts\n✓ scope the first workflow\n✓ implement the product\n✓ run pnpm verify\n\nMVP READY FOR REVIEW_`}</pre>
        </div>
      </section>
      <section className="closing-cta section-pad">
        <span className="big-number">$66</span>
        <div>
          <p className="eyebrow">FOUNDING LICENSE</p>
          <h2>
            Less than the template
            <br />
            you almost overpaid for.
          </h2>
        </div>
        <Link className="button button-light" to={sandboxUiAvailable ? '/login' : '/pricing'}>
          {sandboxUiAvailable ? 'Open the starter demo' : 'View scaffold pricing'}
        </Link>
      </section>
    </>
  )
}
