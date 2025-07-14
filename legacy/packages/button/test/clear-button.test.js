"use strict";
import "@spectrum-web-components/button/sp-clear-button.js";
import { expect, fixture, html } from "@open-wc/testing";
import { testForLitDevWarnings } from "../../../test/testing-helpers";
describe("Clear Button", () => {
  testForLitDevWarnings(
    async () => await fixture(
      html`
                    <sp-clear-button size="m" label="Clear"></sp-clear-button>
                `
    )
  );
  ["s", "m", "l", "xl"].map((size) => {
    it(`loads - ${size}`, async () => {
      const el = await fixture(
        html`
                    <sp-clear-button
                        size=${size}
                        label="Clear"
                    ></sp-clear-button>
                `
      );
      await expect(el).to.be.accessible();
    });
  });
});
//# sourceMappingURL=clear-button.test.js.map
