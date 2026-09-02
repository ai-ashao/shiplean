import { createFileRoute } from '@tanstack/react-router'
import { InformationPage } from '@/components/information-page'
import { localizedPageHead } from '@/lib/seo'

export const Route = createFileRoute('/contact')({
  head: () =>
    localizedPageHead({
      pageId: 'contact',
      locale: 'en',
      title: 'Contact',
      description: 'Find the support details for this ShipLean-powered product.',
    }),
  component: ContactPage,
})

function ContactPage() {
  return (
    <InformationPage
      eyebrow="Contact"
      title="Make support easy to find."
      description="This is the default contact page for a ShipLean-powered product. Replace the guidance below with a real support channel before launch."
    >
      <p>
        Add the support email, contact form, or community link that your users should use for help.
        Keep the first response path clear and owned by a real person or team.
      </p>
      <p>
        For the starter itself, use the project repository and issue tracker configured by your
        team.
      </p>
    </InformationPage>
  )
}
