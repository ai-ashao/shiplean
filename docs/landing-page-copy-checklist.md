# Landing Page Copy Checklist

Status: **pre-launch editorial checklist**.

Use this checklist for public homepages, Tool Landing pages, SaaS landing pages, category pages, and other indexable acquisition pages.

This checklist is intentionally lightweight. It does not replace keyword/SERP research, browser QA, legal review, or ShipLean's existing validators.

## 1. Search intent

- [ ] The page has one clear primary search intent or product-acquisition role.
- [ ] The primary keyword/topic is based on real research or an explicit user decision.
- [ ] The Title and H1 still represent that intent.
- [ ] Marketing edits did not replace the searched task with vague brand language.
- [ ] Supporting keywords are used naturally rather than mechanically repeated.

For Tool Mode, the page remains consistent with `src/modules/tool-seo-brief.ts`.

## 2. Hero clarity

Within the first viewport, a new visitor should be able to answer:

- [ ] What is this?
- [ ] What can I accomplish here?
- [ ] Why might I choose this result over the next search result?
- [ ] What should I do next?

Recommended structure:

```text
SEO Claim
→ User Benefit
→ Proof
→ CTA
```

## 3. Negative-anchor audit

- [ ] No low catalog count is promoted merely because it is available.
- [ ] No copy describes the product as `small`, `new`, `limited`, or `growing` unless that fact is material.
- [ ] No sentence apologizes for having fewer items/features than competitors.
- [ ] No unnecessary number creates an unfavorable comparison frame.
- [ ] Required limits and material restrictions remain clearly disclosed.

Useful rule:

> Do not voluntarily quantify a disadvantage. Do quantify a real advantage or a constraint the user needs to know.

## 4. Benefit translation

For each prominent feature:

- [ ] The user outcome is clear.
- [ ] Technical implementation is used as proof when useful.
- [ ] The copy does not assume users care about implementation details by themselves.

Example:

```text
Browser-local processing
→ Your files never leave your device.
```

## 5. Proof and trust

- [ ] Major marketing claims have visible proof.
- [ ] License, privacy, format, speed, source, or compatibility claims match actual behavior.
- [ ] Unsupported superlatives are removed.
- [ ] Structured data does not claim more than the visible page proves.
- [ ] Trust signals are concrete rather than generic (`Verified source`, not `Trusted by everyone`).

## 6. Language quality

- [ ] The page uses searcher/task language before decorative brand language.
- [ ] Section headings describe real content (`New Fonts`, `Related Tools`, `How It Works`).
- [ ] Generic AI-marketing phrases are removed when they add no information.
- [ ] Copy is concise enough that the primary task remains visually dominant.

Avoid filler such as:

```text
Unlock endless possibilities
Revolutionize your workflow
Powerful and easy to use
The ultimate solution
```

## 7. CTA alignment

- [ ] The primary CTA matches the user's current intent.
- [ ] CTA wording describes the real next action.
- [ ] There is not a competing SaaS-style CTA on a task-first Tool page without a product reason.
- [ ] Secondary actions do not distract from the primary task.

## 8. SEO + marketing final gate

Before launch, confirm:

- [ ] SEO determines **what the page is about**.
- [ ] Marketing improves **why the user should choose it**.
- [ ] Proof explains **why the marketing claim is credible**.
- [ ] No marketing edit weakened the page's keyword mapping.
- [ ] No SEO edit made the page read like keyword-stuffed machine copy.

If these cannot all be checked, revise the copy before changing the page's keyword mapping or adding more sections.

See [SEO + Marketing Copy Principles](./seo-marketing-copy-principles.md) for the full rationale.
