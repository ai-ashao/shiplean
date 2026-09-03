import { expect, type Locator, test } from '@playwright/test'

const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844 },
] as const

const fixtures = [
  {
    name: 'text',
    path: '/tool-reference',
    completion: ['Character count', 'Word count', 'Instant local result'],
  },
  {
    name: 'upload',
    path: '/tool-reference-upload',
    completion: ['Batch-ready input', 'Local processing', 'Multiple image formats'],
  },
] as const

const legalDocuments = [
  { name: 'privacy', path: '/privacy-policy', heading: 'Privacy Policy' },
  { name: 'terms', path: '/terms-of-service', heading: 'Terms of Service' },
] as const

async function expectInsideViewport(locator: Locator, viewportHeight: number) {
  await expect(locator).toBeVisible()
  const box = await locator.boundingBox()
  expect(box).not.toBeNull()
  expect(box?.y).toBeGreaterThanOrEqual(0)
  expect(box ? box.y + box.height : Infinity).toBeLessThanOrEqual(viewportHeight + 4)
}

for (const fixture of fixtures) {
  for (const viewport of viewports) {
    test(`${fixture.name} tool first viewport contract at ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height })
      await page.goto(fixture.path)

      await expectInsideViewport(page.locator('[data-tool-title]'), viewport.height)
      await expectInsideViewport(page.locator('[data-tool-description]'), viewport.height)
      await expectInsideViewport(page.locator('[data-tool-primary-region]'), viewport.height)
      await expectInsideViewport(page.locator('[data-tool-constraints]'), viewport.height)

      const valueSignals = page.locator('[data-tool-value-signals]')
      await expectInsideViewport(valueSignals, viewport.height)
      await expect(valueSignals).toContainText('Free')
      await expect(valueSignals).toContainText('Online')
      await expect(valueSignals).toContainText('No installation')
      await expect(valueSignals).toContainText('No signup')

      const completion = page.locator('[data-tool-completion]')
      await expectInsideViewport(completion, viewport.height)
      for (const expected of fixture.completion) {
        await expect(completion).toContainText(expected)
      }

      const firstViewport = page.locator('[data-tool-first-viewport]')
      const firstViewportBox = await firstViewport.boundingBox()
      expect(firstViewportBox).not.toBeNull()
      expect(
        firstViewportBox ? firstViewportBox.y + firstViewportBox.height : Infinity,
      ).toBeLessThanOrEqual(viewport.height + 4)

      const primaryAction = page.locator('[data-tool-primary-action]')
      await expect(primaryAction).toBeVisible()
      await expect(primaryAction).toBeEnabled()
      await primaryAction.focus()
      await expect(primaryAction).toBeFocused()

      await expect(page.locator('[data-site-header] [data-header-cta]')).toHaveCount(0)

      const headerGuides = page.locator('[data-site-header] a', { hasText: 'Guides' })
      const footerGuides = page.locator('[data-site-footer] a', { hasText: 'Guides' })
      expect((await headerGuides.count()) + (await footerGuides.count())).toBe(1)

      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
        await page.evaluate(() => window.innerWidth),
      )
    })
  }
}

for (const legalFixture of legalDocuments) {
  for (const viewport of viewports) {
    test(`${legalFixture.name} legal template at ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height })
      await page.goto(legalFixture.path)

      const legalDocument = page.locator(`[data-legal-document="${legalFixture.name}"]`)
      await expect(legalDocument.getByRole('heading', { level: 1 })).toHaveText(
        legalFixture.heading,
      )
      const starterNotice = page.locator('[data-legal-review-status="starter"]')
      const isNoindex =
        (await page.locator('meta[name="robots"][content="noindex,nofollow"]').count()) > 0
      if (isNoindex) {
        await expect(starterNotice).toBeVisible()
      } else {
        await expect(starterNotice).toHaveCount(0)
      }
      await expect(legalDocument.getByRole('navigation')).toBeVisible()

      const supportLink = legalDocument.locator('a[href^="mailto:"]')
      await expect(supportLink).toBeVisible()

      const firstSectionLink = legalDocument.getByRole('navigation').locator('a').first()
      await firstSectionLink.focus()
      await expect(firstSectionLink).toBeFocused()

      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
        await page.evaluate(() => window.innerWidth),
      )
    })
  }
}
