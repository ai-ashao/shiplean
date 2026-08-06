import { createFileRoute } from '@tanstack/react-router'
import { SandboxLogin } from '@/components/sandbox-login'
import { pageHead } from '@/lib/seo'

export const Route = createFileRoute('/login')({
  head: () =>
    pageHead({
      title: 'Starter Demo Login',
      description:
        'Open the local ShipLean SaaS starter dashboard without external auth configuration.',
      path: '/login',
    }),
  component: LoginPage,
})

function LoginPage() {
  return (
    <section className="login-page">
      <SandboxLogin />
    </section>
  )
}
