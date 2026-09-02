import { createFileRoute } from '@tanstack/react-router'
import { InformationPage } from '@/components/information-page'
import { localizedPageHead } from '@/lib/seo'

export const Route = createFileRoute('/about')({
  head: () =>
    localizedPageHead({
      pageId: 'about',
      locale: 'en',
      title: 'About Us',
      description:
        'Learn why ShipLean keeps small-product infrastructure focused, local-first, and easy to own.',
    }),
  component: AboutPage,
})

function AboutPage() {
  return (
    <InformationPage
      eyebrow="About ShipLean"
      title="A smaller path from idea to a working product."
      description="ShipLean is a focused TanStack Start and Cloudflare-first starter for building useful MVPs without unnecessary infrastructure."
    >
      <p>
        The starter keeps the product boundary visible: public pages, a protected route example, a
        local auth boundary, and checks that make the deployment contract easier to verify.
      </p>
      <p>
        Every product built from ShipLean should replace this page with its own story, team details,
        and support commitments before launch.
      </p>
    </InformationPage>
  )
}
