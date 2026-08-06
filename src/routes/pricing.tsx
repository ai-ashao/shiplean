import { createFileRoute, Link } from '@tanstack/react-router'
import { pageHead } from '@/lib/seo'

export const Route = createFileRoute('/pricing')({
  head: () =>
    pageHead({
      title: 'Pricing',
      description:
        'Preview the ShipLean TanStack Start SaaS scaffold or buy the Agent-ready template once for $66 during founding.',
      path: '/pricing',
    }),
  component: PricingPage,
})

const core = [
  'TanStack Start shell',
  'Public and protected route examples',
  'Local auth boundary demo',
  'Agent project contracts',
  'Cloudflare-first config',
]
const pro = [
  'Everything in Core',
  'Downloadable commercial template',
  'Bundled shiplean-quick-start Skill',
  'Dashboard and application shell',
  'Module task contracts',
  'One-command verification',
  '12 months of updates',
]

function PricingPage() {
  return (
    <section className="pricing-page section-pad">
      <header className="page-intro centered">
        <p className="eyebrow">
          <span>PAY ONCE</span> KEEP BUILDING
        </p>
        <h1>
          Starter-kit pricing
          <br />
          for small-product math.
        </h1>
        <p>
          No subscription for code you run yourself. Download the scaffold, open it in your coding
          agent, and invoke the bundled Skill to build your MVP.
        </p>
      </header>
      <div className="pricing-grid">
        <article className="price-card">
          <div className="price-top">
            <p>STARTER PREVIEW</p>
            <strong>$0</strong>
            <span>MIT license</span>
          </div>
          <ul>
            {core.map((item) => (
              <li key={item}>↳ {item}</li>
            ))}
          </ul>
          <Link className="button button-plain full" to="/login">
            Open the starter demo
          </Link>
        </article>
        <article className="price-card featured">
          <div className="price-flag">FOUNDING RUN / LIMITED</div>
          <div className="price-top">
            <p>PRO</p>
            <strong>$66</strong>
            <span>one-time commercial license</span>
          </div>
          <ul>
            {pro.map((item) => (
              <li key={item}>↳ {item}</li>
            ))}
          </ul>
          <span className="button button-disabled full">Download sale opens later</span>
        </article>
        <article className="price-card">
          <div className="price-top">
            <p>STANDARD</p>
            <strong>$99</strong>
            <span>after founding period</span>
          </div>
          <ul>
            {pro.map((item) => (
              <li key={item}>↳ {item}</li>
            ))}
          </ul>
          <span className="button button-disabled full">Not on sale yet</span>
        </article>
      </div>
      <p className="renewal-note">
        Optional updates after year one: <strong>$39/year</strong>. Your existing code keeps working
        whether you renew or not. Payment and credits modules for products built with ShipLean are
        planned for phase two and are not included in the current MVP.
      </p>
    </section>
  )
}
