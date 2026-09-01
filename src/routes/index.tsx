import { createFileRoute } from '@tanstack/react-router'
import { MarketingHome } from '@/components/marketing-home'
import { localizedPageHead } from '@/lib/seo'

export const Route = createFileRoute('/')({
  head: () =>
    localizedPageHead({
      pageId: 'home',
      locale: 'en',
      title: 'Ship useful products, skip the boilerplate tax',
      description:
        'Download an affordable TanStack Start SaaS scaffold, open it in your coding agent, and use the bundled Skill to build a verified MVP.',
    }),
  component: HomePage,
})

function HomePage() {
  return <MarketingHome locale="en" />
}
