"use strict";
import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { gotoStory } from "../../../test/a11y-helpers.js";
test.describe("Badge - ARIA Snapshots", () => {
  test("should have correct accessibility tree for default badge", async ({
    page
  }) => {
    const badge = await gotoStory(page, "badge--default", "sp-badge");
    const snapshot = await badge.ariaSnapshot();
    expect(snapshot).toBeTruthy();
    await expect(badge).toMatchAriaSnapshot();
  });
  test("should handle badge with icon", async ({ page }) => {
    const badge = await gotoStory(page, "badge--icons", "sp-badge");
    const snapshot = await badge.ariaSnapshot();
    expect(snapshot).toBeTruthy();
  });
  test("should maintain accessibility with semantic variants", async ({
    page
  }) => {
    await gotoStory(page, "badge--semantic", "sp-badge");
    const badges = page.locator("sp-badge");
    const count = await badges.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      const badge = badges.nth(i);
      const snapshot = await badge.ariaSnapshot();
      expect(snapshot).toBeTruthy();
    }
  });
});
test.describe("Badge - aXe Validation", () => {
  test("should not have accessibility violations - default", async ({
    page
  }) => {
    await gotoStory(page, "badge--default", "sp-badge");
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
    expect(results.violations).toEqual([]);
  });
  test("should not have violations - semantic variants", async ({ page }) => {
    await gotoStory(page, "badge--semantic", "sp-badge");
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
    expect(results.violations).toEqual([]);
  });
  test("should not have violations - with icon", async ({ page }) => {
    await gotoStory(page, "badge--icons", "sp-badge");
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
    expect(results.violations).toEqual([]);
  });
  test("should verify color contrast", async ({ page }) => {
    await gotoStory(page, "badge--semantic", "sp-badge");
    const results = await new AxeBuilder({ page }).withRules(["color-contrast"]).analyze();
    expect(results.violations).toEqual([]);
  });
});
//# sourceMappingURL=badge.a11y.spec.js.map
