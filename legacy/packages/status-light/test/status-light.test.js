"use strict";
import "@spectrum-web-components/status-light/sp-status-light.js";
import { elementUpdated, expect, fixture, html } from "@open-wc/testing";
describe("Status Light", () => {
  it("loads correctly", async () => {
    const el = await fixture(
      html`
                <sp-status-light variant="positive"></sp-status-light>
            `
    );
    await elementUpdated(el);
    expect(el).to.not.be.undefined;
    const rootEl = el.shadowRoot ? el.shadowRoot.querySelector("#root") : el.querySelector("#root");
    expect(rootEl).to.not.be.undefined;
  });
  it("[disabled] manages [aria-disabled]", async () => {
    const el = await fixture(
      html`
                <sp-status-light variant="positive"></sp-status-light>
            `
    );
    await elementUpdated(el);
    expect(el.hasAttribute("aria-disabled")).to.be.false;
    el.disabled = true;
    await elementUpdated(el);
    expect(el.hasAttribute("aria-disabled")).to.be.true;
    expect(el.getAttribute("aria-disabled")).to.equal("true");
  });
});
//# sourceMappingURL=status-light.test.js.map
