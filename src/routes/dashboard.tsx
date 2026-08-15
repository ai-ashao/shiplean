import { createFileRoute } from '@tanstack/react-router'
import { SandboxLogout } from '@/components/sandbox-logout'
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
    <section className="mx-auto min-h-[80vh] max-w-7xl px-5 py-12 sm:px-8 sm:py-16 lg:px-10">
      <header className="mb-10 flex flex-col justify-between gap-6 border-b pb-8 sm:flex-row sm:items-end">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            Local starter · Application shell
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Good afternoon, maker.
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
            This protected route is ready to become your product workspace. Start with one useful
            user task.
          </p>
        </div>
        <SandboxLogout />
      </header>
      <StarterDashboard session={session} />
    </section>
  )
}
