import { createFileRoute } from '@tanstack/react-router'
import { StarterDashboard } from '@/components/starter-dashboard'
import { requireSandboxSession } from '@/lib/auth/sandbox-guards'
import { pageHead } from '@/lib/seo'

export const Route = createFileRoute('/dashboard')({
  loader: () => requireSandboxSession(),
  head: () =>
    pageHead({
      title: 'SaaS Starter Dashboard',
      description:
        'Preview the protected dashboard shell and Agent-first workflow included in the ShipLean SaaS scaffold.',
      path: '/dashboard',
    }),
  component: DashboardPage,
})

function DashboardPage() {
  const session = Route.useLoaderData()
  return (
    <section className="dashboard-page section-pad">
      <header className="dashboard-header">
        <div>
          <p className="eyebrow">
            <span>MVP SHELL</span> MAKER@SHIPLEAN.LOCAL
          </p>
          <h1>Your Agent-ready workspace.</h1>
          <p>
            This local route demonstrates the protected application shell. Download the template,
            open it in your coding agent, and invoke the bundled Skill to make it your product.
          </p>
        </div>
      </header>
      <StarterDashboard session={session} />
    </section>
  )
}
