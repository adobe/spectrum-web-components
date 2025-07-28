"use strict";
import "@spectrum-web-components/button/sp-close-button.js";
import { expect, fixture, html } from "@open-wc/testing";
import { testForLitDevWarnings } from "../../../test/testing-helpers";
describe("Close Button", () => {
  testForLitDevWarnings(
    async () => await fixture(
      html`
                    <sp-close-button size="m" label="Close"></sp-close-button>
                `
    )
  );
  ["s", "m", "l", "xl"].map((size) => {
    it(`loads - ${size}`, async () => {
      const el = await fixture(
        html`
                    <sp-close-button
                        size=${size}
                        label="Close"
                    ></sp-close-button>
                `
      );
      await expect(el).to.be.accessible();
    });
  });
});
//# sourceMappingURL=close-button.test.js.map
