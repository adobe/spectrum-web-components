"use strict";
import { elementUpdated, expect, fixture, html } from "@open-wc/testing";
import "@spectrum-web-components/color-loupe/sp-color-loupe.js";
import { testForLitDevWarnings } from "../../../test/testing-helpers.js";
describe("ColorLoupe", () => {
  testForLitDevWarnings(
    async () => await fixture(
      html`
                    <sp-color-loupe></sp-color-loupe>
                `
    )
  );
  it("loads default color-loupe accessibly", async () => {
    const el = await fixture(
      html`
                <sp-color-loupe></sp-color-loupe>
            `
    );
    await elementUpdated(el);
    await expect(el).to.be.accessible();
    expect(el.shadowRoot.querySelector("svg")).to.have.attribute(
      "aria-hidden",
      "true"
    );
  });
});
//# sourceMappingURL=color-loupe.test.js.map
