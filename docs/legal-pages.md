# Free local tool legal page template

ShipLean currently provides one legal template for a free, account-free tool whose primary inputs are processed locally in the browser. It renders Privacy Policy and Terms of Service from one typed product profile. Product routes must stay thin wrappers around the shared renderer instead of becoming independent prose pages.

This is a concise starting point, not legal advice or a universal agreement. It is intentionally written for small, free browser tools and does not require a company name, street address, or governing-law clause. The product owner remains responsible for the accuracy of the page and for adding anything required by the markets they serve.

## Configure one source of truth

Edit `src/modules/legal-profile.ts` when starting a product. The profile controls:

- product name, update date, and public URL; the URL comes from the same `VITE_SITE_URL` used by canonical metadata;
- the default `support@domain` contact address;
- plain-language summaries of local processing and limited technical request data;
- browser storage, infrastructure providers, and optional consent-gated analytics.

The Privacy and Terms routes both consume this profile through `LegalDocumentPage`. Do not duplicate their section JSX or write unrelated legal prose directly in route files.

## Review states

`reviewStatus: 'starter'` keeps a visible **check before launch** notice on both legal pages. Starter legal pages also emit `noindex,nofollow` and stay out of the sitemap. This is the correct state for the downloaded scaffold and for a product whose actual tools and data practices are not final.

Change the status to `reviewed` only after all profile facts match the implemented product and the operator has completed the review appropriate for its users and jurisdictions.

Two validation levels are available:

- `validateLegalProfile(profile)` checks the product facts, update date, placeholders, and provider declarations;
- `validateLegalProfile(profile, { requireReviewed: true })` additionally fails until the review state is `reviewed`.

`pnpm verify` uses the first form because the base scaffold intentionally has no final operator entity or jurisdiction. `pnpm legal:check` uses the strict form, and `pnpm deploy` runs it before building or contacting Cloudflare. A reviewed profile that passes the strict check makes both legal pages indexable and adds them to the sitemap.

## Supported product boundary

This template assumes the product is free, has no production accounts, does not accept payment, does not publish user content, and does not upload or persist the primary tool inputs. Optional consent-gated analytics is the only conditional integration currently represented.

Do not mark this profile as reviewed for a subscription SaaS product. Accounts, subscriptions, refunds, user content, cloud storage, AI-provider processing, and SaaS-specific consumer terms require a separate legal template that is intentionally deferred to a later phase.

## Localization

The starter currently ships one real English legal version. Do not publish `hreflang` or a language switch for untranslated legal pages. When a reviewed translation is added, register it under the existing stable `privacy` or `terms` page identity and render the same shared legal component with a structurally complete locale dictionary.
