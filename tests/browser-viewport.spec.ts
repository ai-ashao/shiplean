import { expect, test } from '@playwright/test'

const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844 },
] as const

for (const viewport of viewports) {
  test(`tool landing first viewport contract at ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height })
    await page.goto('/tool-reference')

    await expect(page.locator('[data-tool-title]')).toBeVisible()
    await expect(page.locator('[data-tool-description]')).toBeVisible()
    const valueSignals = page.locator('[data-tool-value-signals]')
    await expect(valueSignals).toBeVisible()
    await expect(valueSignals).toContainText('Free')
    await expect(valueSignals).toContainText('Online')
    await expect(valueSignals).toContainText('No installation')
    await expect(valueSignals).toContainText('No signup')

    const primaryRegion = page.locator('[data-tool-primary-region]')
    const regionBox = await primaryRegion.boundingBox()
    expect(regionBox).not.toBeNull()
    expect(regionBox?.y).toBeGreaterThanOrEqual(0)
    expect(regionBox ? regionBox.y + regionBox.height : Infinity).toBeLessThanOrEqual(
      viewport.height + 4,
    )

    const primaryAction = page.locator('[data-tool-primary-action]')
    await expect(primaryAction).toBeVisible()
    await expect(primaryAction).toBeEnabled()
    await primaryAction.focus()
    await expect(primaryAction).toBeFocused()

    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
      await page.evaluate(() => window.innerWidth),
    )
  })
}
