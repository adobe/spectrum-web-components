"use strict";
import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { gotoStory } from "../../../test/a11y-helpers.js";
test.describe("Status Light - ARIA Snapshots", () => {
  test("should have correct accessibility tree structure", async ({ page }) => {
    const statusLight = await gotoStory(
      page,
      "statuslight--m",
      "sp-status-light"
    );
    const snapshot = await statusLight.ariaSnapshot();
    expect(snapshot).toBeTruthy();
    await expect(statusLight).toMatchAriaSnapshot();
  });
  test("should reflect different sizes", async ({ page }) => {
    const sizes = ["s", "m", "l"];
    for (const size of sizes) {
      const statusLight = await gotoStory(
        page,
        `statuslight--${size}`,
        "sp-status-light"
      );
      const snapshot = await statusLight.ariaSnapshot();
      expect(snapshot).toBeTruthy();
    }
  });
  test("should handle disabled state", async ({ page }) => {
    const statusLight = await gotoStory(
      page,
      "statuslight--disabled-true",
      "sp-status-light"
    );
    const snapshot = await statusLight.ariaSnapshot();
    expect(snapshot).toBeTruthy();
  });
});
test.describe("Status Light - aXe Validation", () => {
  test("should not have accessibility violations - medium size", async ({
    page
  }) => {
    await gotoStory(page, "statuslight--m", "sp-status-light");
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
    expect(results.violations).toEqual([]);
  });
  test("should not have violations - different sizes", async ({ page }) => {
    const sizes = ["s", "l"];
    for (const size of sizes) {
      await gotoStory(page, `statuslight--${size}`, "sp-status-light");
      const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
      expect(results.violations).toEqual([]);
    }
  });
  test("should not have violations - disabled state", async ({ page }) => {
    await gotoStory(page, "statuslight--disabled-true", "sp-status-light");
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
    expect(results.violations).toEqual([]);
  });
  test("should verify color contrast", async ({ page }) => {
    await gotoStory(page, "statuslight--m", "sp-status-light");
    const results = await new AxeBuilder({ page }).withRules(["color-contrast"]).analyze();
    expect(results.violations).toEqual([]);
  });
});
//# sourceMappingURL=status-light.a11y.spec.js.map
