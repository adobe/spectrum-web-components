"use strict";
import { elementUpdated, expect, fixture, html } from "@open-wc/testing";
import "@spectrum-web-components/button/sp-close-button.js";
import { testForLitDevWarnings } from "../../../test/testing-helpers.js";
describe("Close Button", () => {
  testForLitDevWarnings(
    async () => await fixture(html`
        <sp-close-button size="m" label="Close"></sp-close-button>
      `)
  );
  ["s", "m", "l", "xl"].map((size) => {
    it(`loads - ${size}`, async () => {
      const el = await fixture(html`
        <sp-close-button size=${size} label="Close"></sp-close-button>
      `);
      await expect(el).to.be.accessible();
    });
  });
  describe("accessibility", () => {
    it("should have accessible name with label attribute", async () => {
      const el = await fixture(html`
        <sp-close-button label="Close"></sp-close-button>
      `);
      await elementUpdated(el);
      expect(el.getAttribute("aria-label")).to.equal("Close");
      await expect(el).to.be.accessible();
    });
    it("should have accessible name with default slot content", async () => {
      const el = await fixture(html`
        <sp-close-button>Close</sp-close-button>
      `);
      await elementUpdated(el);
      await expect(el).to.be.accessible();
    });
    it("should have accessible name when disabled", async () => {
      const el = await fixture(html`
        <sp-close-button disabled>Close</sp-close-button>
      `);
      await elementUpdated(el);
      await expect(el).to.be.accessible();
    });
  });
});
//# sourceMappingURL=close-button.test.js.map
