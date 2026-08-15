import { createFileRoute, Link } from '@tanstack/react-router'
import { Check } from 'lucide-react'
import type { ReactNode } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { sandboxUiAvailable } from '@/lib/config/runtime'
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
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28 lg:px-10">
      <header className="mx-auto max-w-3xl text-center">
        <Badge variant="outline" className="font-mono text-[10px] uppercase tracking-widest">
          Pay once · Keep building
        </Badge>
        <h1 className="mt-6 text-balance text-4xl font-semibold tracking-[-0.045em] sm:text-6xl">
          Straightforward pricing for small-product math.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
          No subscription for code you run yourself. Download the scaffold, open it in your coding
          agent, and invoke the bundled Skill to build your MVP.
        </p>
      </header>
      <div className="mt-14 grid gap-5 lg:grid-cols-3">
        <PriceCard name="Starter preview" price="$0" note="local demo access" features={core}>
          {sandboxUiAvailable ? (
            <Button asChild variant="outline" className="w-full">
              <Link to="/login">Open the starter demo</Link>
            </Button>
          ) : (
            <Button variant="outline" className="w-full" disabled>
              Available after local install
            </Button>
          )}
        </PriceCard>
        <PriceCard
          name="Pro"
          price="$66"
          note="one-time commercial license"
          features={pro}
          featured
        >
          <Button className="w-full" disabled>
            Download sale opens later
          </Button>
        </PriceCard>
        <PriceCard name="Standard" price="$99" note="after founding period" features={pro}>
          <Button variant="outline" className="w-full" disabled>
            Not on sale yet
          </Button>
        </PriceCard>
      </div>
      <p className="mx-auto mt-10 max-w-3xl text-center text-sm leading-6 text-muted-foreground">
        Optional updates after year one: <strong>$39/year</strong>. Your existing code keeps working
        whether you renew or not. Payment and credits modules for products built with ShipLean are
        planned for phase two and are not included in the current MVP.
      </p>
    </section>
  )
}

function PriceCard({
  name,
  price,
  note,
  features,
  featured = false,
  children,
}: Readonly<{
  name: string
  price: string
  note: string
  features: readonly string[]
  featured?: boolean
  children: ReactNode
}>) {
  return (
    <Card
      className={
        featured ? 'relative border-foreground shadow-lg shadow-foreground/5' : 'shadow-none'
      }
    >
      {featured ? <Badge className="absolute -top-3 left-6">Founding offer</Badge> : null}
      <CardHeader>
        <CardDescription>{name}</CardDescription>
        <CardTitle className="text-5xl tracking-[-0.05em]">{price}</CardTitle>
        <CardDescription>{note}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <ul className="space-y-3 text-sm">
          {features.map((item) => (
            <li className="flex gap-2.5" key={item}>
              <Check className="mt-0.5 size-4 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>{children}</CardFooter>
    </Card>
  )
}
