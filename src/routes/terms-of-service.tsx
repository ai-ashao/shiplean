import { createFileRoute } from '@tanstack/react-router'
import { InformationPage } from '@/components/information-page'
import { localizedPageHead } from '@/lib/seo'

export const Route = createFileRoute('/terms-of-service')({
  head: () =>
    localizedPageHead({
      pageId: 'terms',
      locale: 'en',
      title: 'Terms of Service',
      description: 'Read the terms of service for this ShipLean-powered product.',
    }),
  component: TermsOfServicePage,
})

function TermsOfServicePage() {
  return (
    <InformationPage
      eyebrow="Terms of Service"
      title="Set clear expectations for using the product."
      description="This default page marks the place for the product's terms of service. It must be replaced with terms reviewed for the actual product before launch."
    >
      <p>
        Define acceptable use, account responsibilities, intellectual property, availability,
        limitations of liability, termination, changes, governing law, and the support contact.
      </p>
      <p>Do not treat this starter copy as legal advice or as a completed agreement.</p>
    </InformationPage>
  )
}
