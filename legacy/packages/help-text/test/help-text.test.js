"use strict";
import { elementUpdated, expect, fixture, html } from "@open-wc/testing";
import "@spectrum-web-components/help-text/sp-help-text.js";
import { testForLitDevWarnings } from "../../../test/testing-helpers.js";
describe("HelpText", () => {
  testForLitDevWarnings(
    async () => await fixture(
      html`
                    <sp-help-text>This is help text.</sp-help-text>
                `
    )
  );
  it("loads default help-text accessibly", async () => {
    const el = await fixture(
      html`
                <sp-help-text>This is help text.</sp-help-text>
            `
    );
    await elementUpdated(el);
    await expect(el).to.be.accessible();
  });
  it("loads negative/icon help-text accessibly", async () => {
    const el = await fixture(
      html`
                <sp-help-text variant="negative" icon>
                    This is negative help text.
                </sp-help-text>
            `
    );
    await elementUpdated(el);
    await expect(el).to.be.accessible();
  });
});
//# sourceMappingURL=help-text.test.js.map
