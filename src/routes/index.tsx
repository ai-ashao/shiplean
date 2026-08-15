import { createFileRoute } from '@tanstack/react-router'
import { MarketingHome } from '@/components/marketing-home'
import { pageHead } from '@/lib/seo'

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
  return <MarketingHome locale="en" />
}
