"use strict";
import { elementUpdated, expect, fixture, html } from "@open-wc/testing";
import "@spectrum-web-components/coachmark/sp-coach-indicator.js";
import { testForLitDevWarnings } from "../../../test/testing-helpers.js";
describe("CoachIndicator", () => {
  testForLitDevWarnings(
    async () => await fixture(html`
                <sp-coach-indicator></sp-coach-indicator>
            `)
  );
  it("loads default coach-indicator accessibly", async () => {
    const el = await fixture(html`
            <sp-coach-indicator></sp-coach-indicator>
        `);
    await elementUpdated(el);
    await expect(el).to.be.accessible();
  });
});
//# sourceMappingURL=coach-indicator.test.js.map
