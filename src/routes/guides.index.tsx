import { createFileRoute, Link } from '@tanstack/react-router'
import { guides } from '@/lib/guides'
import { pageHead } from '@/lib/seo'

export const Route = createFileRoute('/guides/')({
  head: () =>
    pageHead({
      title: 'Build Guides',
      description:
        'Short, practical notes on using the ShipLean Skill, replacing the local auth boundary, and shipping a Cloudflare-first TanStack Start MVP.',
      path: '/guides',
    }),
  component: GuidesPage,
})

function GuidesPage() {
  return (
    <section className="guides-page section-pad">
      <header className="page-intro">
        <p className="eyebrow">
          <span>FIELD NOTES</span> NO FILLER
        </p>
        <h1>
          Build notes from
          <br />
          the launch floor.
        </h1>
        <p>Compact explanations for the decisions that make a small product cheaper to own.</p>
      </header>
      <div className="guide-list">
        {guides.map((guide) => (
          <Link key={guide.slug} to="/guides/$slug" params={{ slug: guide.slug }}>
            <span className="guide-number">{guide.number}</span>
            <div>
              <h2>{guide.title}</h2>
              <p>{guide.summary}</p>
            </div>
            <span className="guide-time">{guide.time} ↗</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
