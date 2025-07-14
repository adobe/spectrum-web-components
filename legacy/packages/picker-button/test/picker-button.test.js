"use strict";
import { elementUpdated, expect, fixture, html } from "@open-wc/testing";
import "@spectrum-web-components/picker-button/sp-picker-button.js";
import { testForLitDevWarnings } from "../../../test/testing-helpers.js";
describe("PickerButton", () => {
  testForLitDevWarnings(
    async () => await fixture(
      html`
                    <sp-picker-button label="More"></sp-picker-button>
                `
    )
  );
  it("loads default picker-button accessibly", async () => {
    const el = await fixture(
      html`
                <sp-picker-button label="More"></sp-picker-button>
            `
    );
    await elementUpdated(el);
    await expect(el).to.be.accessible();
  });
  it("loads labeled picker-button accessibly", async () => {
    const el = await fixture(
      html`
                <sp-picker-button>
                    <span slot="label">All</span>
                </sp-picker-button>
            `
    );
    await elementUpdated(el);
    await expect(el).to.be.accessible();
  });
});
//# sourceMappingURL=picker-button.test.js.map
