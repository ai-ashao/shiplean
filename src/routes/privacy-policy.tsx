import { createFileRoute } from '@tanstack/react-router'
import { InformationPage } from '@/components/information-page'
import { localizedPageHead } from '@/lib/seo'

export const Route = createFileRoute('/privacy-policy')({
  head: () =>
    localizedPageHead({
      pageId: 'privacy',
      locale: 'en',
      title: 'Privacy Policy',
      description: 'Read the privacy policy for this ShipLean-powered product.',
    }),
  component: PrivacyPolicyPage,
})

function PrivacyPolicyPage() {
  return (
    <InformationPage
      eyebrow="Privacy Policy"
      title="Explain what the product collects and why."
      description="This default page marks the place for the product's privacy policy. It must be replaced with an accurate policy before launch."
    >
      <p>
        Describe the information this product processes, the purposes and legal bases for
        processing, retention periods, service providers, user rights, and the contact method for
        privacy requests.
      </p>
      <p>
        If analytics or other optional services are enabled, document them here and keep the consent
        controls aligned with the actual implementation.
      </p>
    </InformationPage>
  )
}
